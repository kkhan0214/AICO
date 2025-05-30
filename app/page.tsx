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
  const [open, setOpen] = useState(false);
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
    <main className="fixed bottom-4 right-4 z-50">
      {/* 챗봇 토글 버튼 */}
      {!open && (
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg"
          onClick={() => setOpen(true)}
        >
          챗봇 열기
        </button>
      )}

      {/* 챗봇 창 */}
      {open && (
        <div className="w-[360px] h-[600px] flex flex-col rounded-2xl bg-white shadow-2xl border border-gray-300 overflow-hidden">
          <div className="text-center text-gray-500 pt-2 border-b">Today {date}</div>

          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
            {messages.map((msg, idx) => (
              <ChatBubble key={idx} from={msg.from} text={msg.text} />
            ))}
            {loading && <ChatBubble from="bot" text="GPT가 답변을 작성 중이에요..." />}
            <div ref={bottomRef} />
          </div>

          <div className="border-t px-4 py-3 bg-white">
            <div className="flex gap-2 items-center">
              <input
                className="flex-1 border px-4 py-2 rounded-xl text-gray-700"
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
      )}
    </main>
  );
} 
