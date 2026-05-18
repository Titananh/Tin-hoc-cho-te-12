'use client';

import React, { useState, useRef } from 'react';
import { Play, RotateCcw, Code2 } from 'lucide-react';

const DEFAULT_CODE = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background: #f5f5f5;
    }
    h1 { color: #2563eb; }
    .card {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-top: 16px;
    }
    button {
      padding: 8px 16px;
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      margin-top: 12px;
    }
    button:hover { background: #1d4ed8; }
    #output { margin-top: 12px; color: #333; }
  </style>
</head>
<body>
  <h1>Xin chào lớp 12!</h1>
  <div class="card">
    <p>Đây là trang web đầu tiên của em.</p>
    <button onclick="chao()">Bấm tôi</button>
    <p id="output"></p>
  </div>

  <script>
    let count = 0;
    function chao() {
      count++;
      document.getElementById('output').textContent =
        'Bạn đã bấm ' + count + ' lần!';
    }
  </script>
</body>
</html>`;

export default function WebPlaygroundPage() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [previewKey, setPreviewKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runCode = () => {
    setPreviewKey(k => k + 1);
  };

  const resetCode = () => {
    setCode(DEFAULT_CODE);
    setPreviewKey(k => k + 1);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-foreground mb-1">🌐 Sân chơi HTML/CSS/JS</h1>
          <p className="text-muted text-sm">
            Viết HTML + CSS + JavaScript và xem kết quả trực tiếp. Thực hành chủ đề G-CS (Thiết kế web).
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={runCode}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
          >
            <Play size={14} /> Chạy
          </button>
          <button
            onClick={resetCode}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-muted hover:text-foreground text-sm font-medium transition-colors"
          >
            <RotateCcw size={14} /> Reset mẫu
          </button>
          <div className="flex items-center gap-1.5 ml-auto text-xs text-muted">
            <Code2 size={12} />
            <span>HTML + CSS + JS trong 1 file</span>
          </div>
        </div>

        {/* Editor + Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-220px)] min-h-[400px]">
          {/* Editor */}
          <div className="bg-surface rounded-xl border border-border overflow-hidden flex flex-col">
            <div className="px-4 py-2 border-b border-border bg-surface-elevated text-sm font-medium text-foreground">
              Code Editor
            </div>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              className="flex-1 p-4 bg-background text-foreground font-mono text-sm resize-none focus:outline-none"
              spellCheck={false}
              placeholder="Viết HTML/CSS/JS ở đây..."
            />
          </div>

          {/* Preview */}
          <div className="bg-white rounded-xl border border-border overflow-hidden flex flex-col">
            <div className="px-4 py-2 border-b border-border bg-gray-50 text-sm font-medium text-gray-700">
              Kết quả
            </div>
            <iframe
              ref={iframeRef}
              key={previewKey}
              srcDoc={code}
              className="flex-1 w-full"
              sandbox="allow-scripts"
              title="Web Preview"
            />
          </div>
        </div>

        {/* Tips */}
        <div className="mt-4 p-4 bg-surface rounded-xl border border-border">
          <p className="text-xs text-muted">
            💡 <strong>Mẹo:</strong> Bạn có thể viết CSS trong thẻ <code>&lt;style&gt;</code> và JavaScript trong thẻ <code>&lt;script&gt;</code> trong cùng 1 file HTML.
            Thay đổi code rồi bấm "Chạy" để xem kết quả mới.
          </p>
        </div>
      </div>
    </div>
  );
}
