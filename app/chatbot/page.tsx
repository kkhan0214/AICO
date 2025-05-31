'use client';

import { useState } from 'react';
import Chat from '@/components/Chat';

export default function ChatbotPage() {
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

      {/* 챗봇 창 */}
      {open && (
        <div className="fixed bottom-6 right-6 w-[360px] h-[600px] bg-[rgba(255,255,255,0.95)] rounded-2xl border shadow-xl flex flex-col z-[1000]">
          {/* 헤더 */}
          <div className="relative pt-4 px-4 flex-shrink-0 border-b pb-2">
            <p className="text-center text-gray-700 font-semibold">AI 튜터 챗봇</p>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-sm bg-red-400 text-white px-2.5 py-1 rounded-full hover:bg-red-500 transition"
            >
              ✕
            </button>
          </div>

          {/* Chat 컴포넌트 */}
          <div className="flex-1 overflow-y-auto">
            <Chat />
          </div>
        </div>
      )}
    </main>
  );
}
