'use client';

import { useState } from 'react';
import ChatbotBox from './chatbot/ChatbotBox';

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="relative w-screen min-h-screen bg-gradient-to-br from-sky-200 to-sky-50 flex flex-col items-center pt-16 pb-24">
      {/* 메인 제목 */}
      <div className="text-center mb-6">
        <h1 className="text-5xl font-black text-black mb-2">AIco 코딩 교육 플랫폼</h1>
        <p className="text-lg text-gray-700">아래에서 자료를 참고하세요</p>
      </div>

      {/* PDF 뷰어 - embed 방식 */}
      <embed
        src="/slides/test1.pdf"
        type="application/pdf"
        className="w-[95%] max-w-6xl h-[700px] border rounded shadow-lg"
        title="파이썬 교육자료"
      />

      {/* 챗봇 열기 버튼 */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-white shadow-lg w-16 h-16 rounded-full flex items-center justify-center hover:scale-105 transition z-50"
        >
          <img src="/robot.png" alt="chat" className="w-10 h-10 object-contain" />
        </button>
      )}

      {/* 챗봇 UI */}
      {open && <ChatbotBox onClose={() => setOpen(false)} />}
    </main>
  );
}
