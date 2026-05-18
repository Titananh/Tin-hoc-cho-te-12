import ErrorPage from '@/components/common/ErrorPage';

export default function NotFound() {
  return <ErrorPage />;
}

export function generateMetadata() {
  return {
    title: '404 - Trang không tìm thấy | Python Master 12',
    description: 'Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.',
  };
}