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
    <main className="relative w-screen h-screen bg-gradient-to-br from-sky-200 to-sky-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-black text-black mb-2">파이썬 교육자료</h1>
        <p className="text-lg text-gray-700">(자료가 보여질 공간)</p>
      </div>

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-white shadow-lg w-16 h-16 rounded-full flex items-center justify-center hover:scale-105 transition z-50"
        >
          <img src="/robot.png" alt="chat" className="w-10 h-10" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 w-[360px] h-[600px] bg-[rgba(255,255,255,0.95)] rounded-2xl border shadow-xl flex flex-col justify-between z-[1000]">
          {/* 챗봇 헤더 + 닫기 버튼 */}
          <div className="relative pt-4 px-4 flex-shrink-0 border-b pb-2">
            <p className="text-center text-gray-700 font-semibold">AI 튜터 챗봇</p>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-sm bg-red-400 text-white px-2.5 py-1 rounded-full hover:bg-red-500 transition"
            >
              ✕
            </button>
          </div>

          {/* 메시지 영역 */}
          <div className="px-4 py-2 flex-1 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <ChatBubble key={idx} from={msg.from} text={msg.text} />
            ))}
          </div>

          {/* 입력 영역 */}
          <div className="border-t px-4 py-3 bg-white flex gap-2">
            <input
              className="flex-1 border px-3 py-2 rounded-xl text-gray-700"
              placeholder="메시지를 입력하세요"
            />
            <button className="bg-purple-600 text-white px-4 py-2 rounded-xl">
              전송
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
