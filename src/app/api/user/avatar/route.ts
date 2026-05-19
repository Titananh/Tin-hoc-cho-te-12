import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

// Avatar validation constants
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MIN_DIMENSION = 100;
const MAX_DIMENSION = 1024;
const STORAGE_BUCKET = 'avatars';

/**
 * POST /api/user/avatar
 * Handles avatar upload (multipart/form-data)
 * Validates: max 2MB, JPEG/PNG/WebP only, dimensions 100x100 to 1024x1024
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để tải ảnh đại diện' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Parse multipart form data
    const formData = await request.formData();
    const file = formData.get('avatar') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'Vui lòng chọn file ảnh để tải lên' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Chỉ chấp nhận file ảnh định dạng JPEG, PNG hoặc WebP' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Kích thước file không được vượt quá 2MB' },
        { status: 400 }
      );
    }

    // Read file buffer for dimension validation
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Validate image dimensions by reading header bytes
    const dimensions = getImageDimensions(buffer, file.type);

    if (!dimensions) {
      return NextResponse.json(
        { error: 'Không thể đọc kích thước ảnh. Vui lòng thử file khác.' },
        { status: 400 }
      );
    }

    if (
      dimensions.width < MIN_DIMENSION ||
      dimensions.height < MIN_DIMENSION ||
      dimensions.width > MAX_DIMENSION ||
      dimensions.height > MAX_DIMENSION
    ) {
      return NextResponse.json(
        {
          error: `Kích thước ảnh phải từ ${MIN_DIMENSION}x${MIN_DIMENSION} đến ${MAX_DIMENSION}x${MAX_DIMENSION} pixel. Ảnh hiện tại: ${dimensions.width}x${dimensions.height}`,
        },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileExtension = file.type.split('/')[1] === 'jpeg' ? 'jpg' : file.type.split('/')[1];
    const fileName = `${userId}_${Date.now()}.${fileExtension}`;
    const filePath = `${userId}/${fileName}`;

    // Delete old avatar if exists
    const { data: existingFiles } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .list(String(userId));

    if (existingFiles && existingFiles.length > 0) {
      const filesToDelete = existingFiles.map((f) => `${userId}/${f.name}`);
      await supabaseAdmin.storage.from(STORAGE_BUCKET).remove(filesToDelete);
    }

    // Upload to Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error('Error uploading avatar:', uploadError);
      return NextResponse.json(
        { error: 'Không thể tải ảnh lên. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: publicUrlData } = supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);

    const avatarUrl = publicUrlData.publicUrl;

    // Update user's avatar_url in database
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ avatar_url: avatarUrl })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating avatar URL:', updateError);
      return NextResponse.json(
        { error: 'Không thể cập nhật ảnh đại diện. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      avatar_url: avatarUrl,
      message: 'Tải ảnh đại diện thành công',
    });
  } catch (error) {
    console.error('Error handling avatar upload:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải ảnh. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

/**
 * Parse image dimensions from buffer based on file type.
 * Reads header bytes to extract width and height without external dependencies.
 */
function getImageDimensions(
  buffer: Buffer,
  mimeType: string
): { width: number; height: number } | null {
  try {
    if (mimeType === 'image/png') {
      return getPngDimensions(buffer);
    } else if (mimeType === 'image/jpeg') {
      return getJpegDimensions(buffer);
    } else if (mimeType === 'image/webp') {
      return getWebpDimensions(buffer);
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * PNG dimensions are stored at bytes 16-23 in the IHDR chunk
 */
function getPngDimensions(buffer: Buffer): { width: number; height: number } | null {
  // PNG signature: 137 80 78 71 13 10 26 10
  if (buffer.length < 24) return null;
  if (buffer[0] !== 0x89 || buffer[1] !== 0x50 || buffer[2] !== 0x4e || buffer[3] !== 0x47) {
    return null;
  }

  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}

/**
 * JPEG dimensions are found in SOF0/SOF2 markers
 */
function getJpegDimensions(buffer: Buffer): { width: number; height: number } | null {
  if (buffer.length < 2) return null;
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;

  let offset = 2;
  while (offset < buffer.length - 1) {
    if (buffer[offset] !== 0xff) {
      offset++;
      continue;
    }

    const marker = buffer[offset + 1];

    // SOF0 (0xC0) or SOF2 (0xC2) markers contain dimensions
    if (marker === 0xc0 || marker === 0xc2) {
      if (offset + 9 > buffer.length) return null;
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      return { width, height };
    }

    // Skip to next marker
    if (offset + 3 >= buffer.length) return null;
    const segmentLength = buffer.readUInt16BE(offset + 2);
    offset += 2 + segmentLength;
  }

  return null;
}

/**
 * WebP dimensions depend on the format (VP8, VP8L, VP8X)
 */
function getWebpDimensions(buffer: Buffer): { width: number; height: number } | null {
  if (buffer.length < 30) return null;

  // Check RIFF header
  const riff = buffer.toString('ascii', 0, 4);
  const webp = buffer.toString('ascii', 8, 12);
  if (riff !== 'RIFF' || webp !== 'WEBP') return null;

  const format = buffer.toString('ascii', 12, 16);

  if (format === 'VP8 ') {
    // Lossy format - dimensions at offset 26-29
    if (buffer.length < 30) return null;
    const width = buffer.readUInt16LE(26) & 0x3fff;
    const height = buffer.readUInt16LE(28) & 0x3fff;
    return { width, height };
  } else if (format === 'VP8L') {
    // Lossless format - dimensions encoded in first 4 bytes after signature
    if (buffer.length < 25) return null;
    const bits = buffer.readUInt32LE(21);
    const width = (bits & 0x3fff) + 1;
    const height = ((bits >> 14) & 0x3fff) + 1;
    return { width, height };
  } else if (format === 'VP8X') {
    // Extended format - dimensions at offset 24-29
    if (buffer.length < 30) return null;
    const width = (buffer[24] | (buffer[25] << 8) | (buffer[26] << 16)) + 1;
    const height = (buffer[27] | (buffer[28] << 8) | (buffer[29] << 16)) + 1;
    return { width, height };
  }

  return null;
}
