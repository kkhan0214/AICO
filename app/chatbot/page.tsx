'use client';

import { useState } from 'react';
import ChatBubble from '@/components/chatBubble';

type Message = {
  from: 'user' | 'bot';
  text: string;
};

export default function ChatbotPage() {
  const [open, setOpen] = useState(false);
  const [date] = useState(
    new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  );
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: '안녕하세요! 무엇을 도와드릴까요?' },
    { from: 'bot', text: '파이썬을 공부하시면서, 궁금하신 부분을 질문해주세요' },
  ]);

  return (
    <main className="relative w-screen h-screen bg-transparent">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-white shadow-lg w-16 h-16 rounded-full flex items-center justify-center hover:scale-105 transition z-50"
        >
          <img src="/robot.png" alt="chat" className="w-10 h-10" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 w-[360px] h-[600px] bg-[rgba(255,255,255,0.95)] rounded-2xl border shadow-xl flex flex-col justify-between z-50">
          <div className="relative pt-4 px-4 flex-shrink-0 border-b pb-2">
            <p className="text-center text-gray-700">Today {date}</p>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-sm text-gray-600 px-2 py-1 rounded hover:bg-gray-200"
            >
              닫기
            </button>
          </div>

          <div className="px-4 py-2 flex-1 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <ChatBubble key={idx} from={msg.from} text={msg.text} />
            ))}
          </div>

          <div className="border-t px-4 py-3 bg-white flex gap-2">
            <input
              className="flex-1 border px-3 py-2 rounded-xl text-gray-700"
              placeholder="메시지를 입력하세요"
            />
            <button className="bg-black text-white px-4 py-2 rounded-xl">
              전송
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
