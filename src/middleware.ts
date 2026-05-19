import { NextResponse } from 'next/server';

export function middleware() {
  // Allow all routes - auth is handled client-side via localStorage
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
