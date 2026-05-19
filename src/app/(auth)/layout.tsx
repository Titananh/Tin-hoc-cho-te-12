import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Xác thực - Python Master 12',
  description: 'Đăng nhập hoặc đăng ký tài khoản Python Master 12',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
