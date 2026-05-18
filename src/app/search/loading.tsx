import { Search } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <Search className="w-12 h-12 text-blue-400 animate-pulse mx-auto mb-4" />
        <p className="text-slate-400">Đang tải...</p>
      </div>
    </div>
  );
}