'use client';Add commentMore actions

import { useState } from 'react';
import ChatBubble from '@/components/chatBubble';

export default function ChatbotPage() {
  const [date, setDate] = useState(new Date().toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                            }));
  const [messages, setMessages] = useState([
    { from: 'bot', text: '안녕하세요! 무엇을 도와드릴까요?' },
    { from: 'bot', text: '파이썬을 공부하시면서, 궁금하신 부분을 질문해주세요' },
  ]);

  return (
    <main className="flex flex-col h-screen p-4 absolute z-10 py-12 right-2">
        <div className='relative pt-4 rounded-2xl shadow-5xl shadow-white bg-[rgba(255,255,255,0.77)] w-full h-full border-3'>
            <p className='w-full text-center text-gray-700 '>Today {date}</p>
            <div className="px-2 py-4 flex-1 overflow-y-auto space-y-2 text-black flex flex-col items-left">
                {messages.map((msg, idx) => (
                <ChatBubble key={idx} from={msg.from} text={msg.text} />
                ))}
            </div>
            <div className="absolute bottom-4 mt-4 flex gap-1 mx-1 w-full px-4">
                <input
                className="w-full border px-4 py-2 rounded-xl bg-white text-gray-600"
                placeholder="메시지를 입력하세요"
                />
                <button className='min-w-14 bg-[rgba(0,0,0,0.7)] rounded-xl cursor-pointer'>전송</button>
            </div>
        </div>
    </main>
  );
}
