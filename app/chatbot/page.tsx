'use client';

import { useState } from 'react';
import ChatbotPage from './chatbot/page';

export default function ChatPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex w-full h-full bg-[url("/sample.png")] bg-contain bg-center bg-no-repeat'>
      {/* 열기/닫기 버튼 */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={
          open
            ? 'absolute top-3 right-12 z-40'
            : 'absolute right-12 bottom-16 bg-black w-24 h-24 rounded-full border-3 shadow-2xl flex items-center justify-center cursor-pointer'
        }
      >
        {open ? (
          <p className="cursor-pointer bg-[rgba(255,100,100,0.7)] w-30 py-0.5 rounded-2xl z-30 text-center">
            채팅 닫기
          </p>
        ) : (
          <img src="/robot.png" className="h-full" />
        )}
      </div>

      {/* 챗봇 */}
      {open && <ChatbotPage />}
    </div>
  );
}
