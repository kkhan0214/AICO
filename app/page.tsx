'use client';

import { useState, useRef, useEffect } from 'react';
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

  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: '안녕하세요! 무엇을 도와드릴까요?' },
    { from: 'bot', text: '파이썬을 공부하시면서, 궁금하신 부분을 질문해주세요' },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
    <main className="flex justify-center items-center min-h-screen bg-blue-50 p-4">
      <div className="w-full max-w-xl h-[700px] flex flex-col rounded-2xl bg-white shadow-lg border border-gray-300 overflow-hidden">
        <div className="text-center text-gray-500 pt-2">Today {date}</div>

        {/* 채팅 내용 영역 */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} from={msg.from} text={msg.text} />
          ))}
          {loading && <ChatBubble from="bot" text="GPT가 답변을 작성 중이에요..." />}
          <div ref={bottomRef} />
        </div>

        {/* 입력창 영역 */}
        <div className="border-t px-4 py-3 bg-white sticky bottom-0 z-10">
          <div className="flex gap-2">
            <input
              className="w-full border px-4 py-2 rounded-xl text-gray-700"
              placeholder="메시지를 입력하세요"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-purple-600 text-white px-4 py-2 rounded-xl"
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
