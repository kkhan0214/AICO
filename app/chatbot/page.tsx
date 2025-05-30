'use client';

import { useState } from 'react';
import ChatBubble from '@/components/chatBubble';

type Message = {
  from: 'user' | 'bot';
  text: string;
};

export default function ChatbotPage() {
  const [date] = useState(
    new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  );

  const [messages, setMessages] = useState<Array<{ from: 'user' | 'bot'; text: string }>>([
    { from: 'bot', text: '안녕하세요! 무엇을 도와드릴까요?' },
    { from: 'bot', text: '파이썬을 공부하시면서, 궁금하신 부분을 질문해주세요' },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage: Message = { from: 'bot', text: data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: '에러가 발생했어요.' },
      ]);
    } finally {
      setInput('');
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-screen p-4 absolute z-10 py-12 right-2">
      <div className="relative pt-4 rounded-2xl shadow-5xl shadow-white bg-[rgba(255,255,255,0.77)] w-full max-h-[600px] overflow-y-auto border-3">
        <p className="w-full text-center text-gray-700">Today {date}</p>
      
        {/* ✅ 이 영역 안에서만 스크롤 발생 */}
        <div className="px-2 py-4 space-y-2 text-black flex flex-col">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} from={msg.from} text={msg.text} />
          ))}
          {loading && <ChatBubble from="bot" text="GPT가 답변을 작성 중이에요..." />}
        </div>
      
        {/* 입력창은 기존처럼 유지 */}
        <div className="absolute bottom-4 mt-4 flex gap-1 mx-1 w-full px-4">
          <input
            className="w-full border px-4 py-2 rounded-xl bg-white text-gray-600"
            placeholder="메시지를 입력하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 whitespace-nowrap bg-[rgba(0,0,0,0.7)] text-white rounded-xl"
          >
            전송
          </button>
        </div>
      </div>
    </main>
  );
}
