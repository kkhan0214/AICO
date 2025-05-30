'use client';

import { useState } from 'react';
import ChatbotPage from './chatbot/page';

const messages = [
  {
    from: 'bot',
    content: 'Great to see you today! How can I help?',
  },
  {
    from: 'user',
    content: '파이썬 개발이 처음이라 개발 환경을 구축해야 도와줘.',
  },
];

export default function ChatPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex w-full h-full bg-[url("/sample.png")] bg-contain bg-center bg-no-repeat'>
      <div onClick={() => setOpen((prev) => !prev)} className={ open ? 'absolute top-3 right-12 z-40': 'absolute right-12 bottom-16 bg-black w-24 h-24 rounded-full border-3 shadow-2xl flex items-center justify-center cursor-pointer'} >
        {open ? (<p className=" cursor-pointer bg-[rgba(255,100,100,0.7)] w-30 py-0.5 rounded-2xl z-30 text-center">
          채팅 닫기
        </p>) : (<img src="/robot.png" className="h-full" />) }
      </div>
      { open && (<ChatbotPage />) }
    </div>
  );
}
