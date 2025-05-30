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
        <div className="fixed bottom-6 right-6 w-[360px] h-[600px] bg-[rgba(255,255,255,0.95)] rounded-2xl border shadow-xl flex flex-col z-50">
          {/* 상단 바 */}
          <div className="relative px-4 py-3 border-b bg-white flex items-center justify-center">
            <p className="text-center text-gray-700 text-sm">AI 튜터 챗봇</p>
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-2 text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
            >
              닫기
            </button>
          </div>

          {/* 채팅 내용 */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-white">
            {messages.map((msg, idx) => (
              <ChatBubble key={idx} from={msg.from} text={msg.text} />
            ))}
          </div>

          {/* 입력창 */}
          <div className="border-t px-4 py-3 bg-white flex gap-2">
            <input
              className="flex-1 border px-3 py-2 rounded-xl text-gray-700"
              placeholder="메시지를 입력하세요"
            />
            <button className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700">
              전송
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
