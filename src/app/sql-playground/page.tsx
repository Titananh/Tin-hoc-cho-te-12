'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, BookOpen } from 'lucide-react';

const SAMPLE_QUERIES = [
  { label: 'SELECT cơ bản', sql: "SELECT * FROM HocSinh;" },
  { label: 'WHERE + ORDER BY', sql: "SELECT HoTen, DiemTB FROM HocSinh\nWHERE DiemTB >= 8\nORDER BY DiemTB DESC;" },
  { label: 'GROUP BY + HAVING', sql: "SELECT Lop, COUNT(*) AS SoHS, AVG(DiemTB) AS DiemTBLop\nFROM HocSinh\nGROUP BY Lop\nHAVING AVG(DiemTB) >= 7;" },
  { label: 'INNER JOIN', sql: "SELECT hs.HoTen, l.TenLop, l.GVCN\nFROM HocSinh hs\nINNER JOIN Lop l ON hs.MaLop = l.MaLop;" },
];

// Mock database table
const MOCK_DATA = [
  { MaHS: 'HS01', HoTen: 'Nguyễn Văn An', Lop: '12A1', DiemTB: 8.5 },
  { MaHS: 'HS02', HoTen: 'Trần Thị Bình', Lop: '12A2', DiemTB: 9.0 },
  { MaHS: 'HS03', HoTen: 'Lê Minh Châu', Lop: '12A1', DiemTB: 7.8 },
  { MaHS: 'HS04', HoTen: 'Phạm Đức Dũng', Lop: '12A2', DiemTB: 6.5 },
  { MaHS: 'HS05', HoTen: 'Hoàng Thị Em', Lop: '12A1', DiemTB: 8.2 },
  { MaHS: 'HS06', HoTen: 'Ngô Văn Phúc', Lop: '12A3', DiemTB: 7.0 },
  { MaHS: 'HS07', HoTen: 'Vũ Thị Giang', Lop: '12A3', DiemTB: 8.8 },
  { MaHS: 'HS08', HoTen: 'Đặng Quốc Hùng', Lop: '12A2', DiemTB: 5.5 },
];

/**
 * Mock SQL executor — giả lập kết quả cho một số câu đơn giản.
 * Sẽ thay bằng sql.js thật ở Pha 5.
 */
function executeMockSQL(sql: string): { columns: string[]; rows: (string | number)[][]; message?: string } | { error: string } {
  const normalized = sql.trim().toLowerCase().replace(/;$/, '');

  // SELECT *
  if (normalized === 'select * from hocsinh') {
    return {
      columns: ['MaHS', 'HoTen', 'Lop', 'DiemTB'],
      rows: MOCK_DATA.map(r => [r.MaHS, r.HoTen, r.Lop, r.DiemTB]),
    };
  }

  // WHERE DiemTB >= 8 ORDER BY DESC
  if (normalized.includes('where') && normalized.includes('diemtb >= 8')) {
    const filtered = MOCK_DATA.filter(r => r.DiemTB >= 8).sort((a, b) => b.DiemTB - a.DiemTB);
    return {
      columns: ['HoTen', 'DiemTB'],
      rows: filtered.map(r => [r.HoTen, r.DiemTB]),
    };
  }

  // GROUP BY Lop
  if (normalized.includes('group by')) {
    const groups: Record<string, number[]> = {};
    for (const r of MOCK_DATA) {
      if (!groups[r.Lop]) groups[r.Lop] = [];
      groups[r.Lop].push(r.DiemTB);
    }
    const rows = Object.entries(groups)
      .map(([lop, diems]) => [lop, diems.length, +(diems.reduce((a, b) => a + b, 0) / diems.length).toFixed(1)] as (string | number)[])
      .filter(row => {
        if (normalized.includes('having')) return (row[2] as number) >= 7;
        return true;
      });
    return { columns: ['Lop', 'SoHS', 'DiemTBLop'], rows };
  }

  // JOIN
  if (normalized.includes('join')) {
    return {
      columns: ['HoTen', 'TenLop', 'GVCN'],
      rows: [
        ['Nguyễn Văn An', '12A1', 'Cô Hương'],
        ['Lê Minh Châu', '12A1', 'Cô Hương'],
        ['Hoàng Thị Em', '12A1', 'Cô Hương'],
        ['Trần Thị Bình', '12A2', 'Thầy Minh'],
        ['Phạm Đức Dũng', '12A2', 'Thầy Minh'],
      ],
      message: '(Dữ liệu giả lập JOIN — tích hợp sql.js thật ở phiên bản sau)',
    };
  }

  // Default
  if (normalized.startsWith('select')) {
    return {
      columns: ['Kết quả'],
      rows: [['Câu SQL hợp lệ nhưng chưa được hỗ trợ trong trình giả lập. Hãy thử các câu mẫu bên dưới.']],
      message: 'Trình giả lập chỉ hỗ trợ một số câu cơ bản trên bảng HocSinh.',
    };
  }

  return { error: 'Chỉ hỗ trợ câu SELECT. Các lệnh INSERT/UPDATE/DELETE/CREATE sẽ có trong phiên bản tích hợp sql.js.' };
}

export default function SQLPlaygroundPage() {
  const [sql, setSQL] = useState(SAMPLE_QUERIES[0].sql);
  const [result, setResult] = useState<ReturnType<typeof executeMockSQL> | null>(null);

  const runQuery = () => {
    const res = executeMockSQL(sql);
    setResult(res);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">🗄️ Sân chơi SQL</h1>
          <p className="text-muted text-sm">
            Thực hành viết câu truy vấn SQL trên bảng <code className="bg-surface px-1.5 py-0.5 rounded text-primary">HocSinh</code>.
            <span className="text-yellow-600 ml-1">(Giả lập — sẽ tích hợp sql.js thật ở phiên bản sau)</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor */}
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-xl border border-border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface-elevated">
                <span className="text-sm font-medium text-foreground">SQL Editor</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setSQL(''); setResult(null); }}
                    className="p-1.5 rounded hover:bg-border transition-colors text-muted"
                    title="Xoá"
                  >
                    <RotateCcw size={14} />
                  </button>
                  <button
                    onClick={runQuery}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    <Play size={12} /> Chạy
                  </button>
                </div>
              </div>
              <textarea
                value={sql}
                onChange={e => setSQL(e.target.value)}
                className="w-full h-40 p-4 bg-background text-foreground font-mono text-sm resize-none focus:outline-none"
                placeholder="Viết câu SQL ở đây..."
                spellCheck={false}
              />
            </div>

            {/* Result */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-surface rounded-xl border border-border overflow-hidden"
              >
                <div className="px-4 py-2 border-b border-border bg-surface-elevated">
                  <span className="text-sm font-medium text-foreground">Kết quả</span>
                </div>
                {'error' in result ? (
                  <div className="p-4 text-red-500 text-sm">{result.error}</div>
                ) : (
                  <div className="overflow-x-auto">
                    {'message' in result && result.message && (
                      <p className="text-xs text-yellow-600 px-4 pt-2">{result.message}</p>
                    )}
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          {result.columns.map(col => (
                            <th key={col} className="px-4 py-2 text-left font-semibold text-foreground">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {result.rows.map((row, i) => (
                          <tr key={i} className="border-b border-border/50 hover:bg-background/50">
                            {row.map((cell, j) => (
                              <td key={j} className="px-4 py-2 text-muted">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-xs text-muted px-4 py-2">{result.rows.length} hàng</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Schema */}
            <div className="bg-surface rounded-xl p-4 border border-border">
              <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                <BookOpen size={14} /> Bảng HocSinh
              </h3>
              <div className="text-xs font-mono space-y-1 text-muted">
                <p><span className="text-primary">MaHS</span> VARCHAR(10) PK</p>
                <p><span className="text-primary">HoTen</span> NVARCHAR(50)</p>
                <p><span className="text-primary">Lop</span> VARCHAR(10)</p>
                <p><span className="text-primary">DiemTB</span> FLOAT</p>
              </div>
              <p className="text-xs text-muted mt-3">Dữ liệu mẫu: {MOCK_DATA.length} bản ghi</p>
            </div>

            {/* Câu mẫu */}
            <div className="bg-surface rounded-xl p-4 border border-border">
              <h3 className="font-semibold text-foreground text-sm mb-3">Câu mẫu</h3>
              <div className="space-y-2">
                {SAMPLE_QUERIES.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => { setSQL(q.sql); setResult(null); }}
                    className="w-full text-left text-xs px-3 py-2 rounded-lg bg-background hover:bg-primary/10 text-muted hover:text-primary transition-colors"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
