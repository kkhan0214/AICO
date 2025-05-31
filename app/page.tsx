'use client';

import { useState } from 'react';
import ChatbotBox from './chatbot/ChatbotBox';

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="relative w-screen h-screen bg-gradient-to-br from-sky-200 to-sky-50 flex items-center justify-center">
      {/* 메인 콘텐츠 */}
      <div className="text-center">
        <h1 className="text-5xl font-black text-black mb-2">파이썬 교육자료</h1>
        <p className="text-lg text-gray-700">(자료가 보여질 공간)</p>
      </div>

      {/* 챗봇 열기 버튼 */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-white shadow-lg w-16 h-16 rounded-full flex items-center justify-center hover:scale-105 transition z-50"
        >
          <img src="/robot.png" alt="chat" className="w-10 h-10" />
        </button>
      )}

      {/* 챗봇 UI */}
      {open && <ChatbotBox onClose={() => setOpen(false)} />}
    </main>
  );
}
