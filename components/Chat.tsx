'use client';

import { useState } from 'react';
import ChatBubble from './chatBubble';

type Message = {
  from: 'user' | 'bot';
  text: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: '안녕하세요! 무엇을 도와드릴까요?' },
    { from: 'bot', text: '파이썬을 공부하시면서, 궁금하신 부분을 질문해주세요' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      const botMsg: Message = { from: 'bot', text: data.answer };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: Message = { from: 'bot', text: '오류가 발생했어요 😢' };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setInput('');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} from={msg.from} text={msg.text} />
        ))}
        {loading && <ChatBubble from="bot" text="답변 작성 중..." />}
      </div>

      <div className="flex-shrink-0 border-t px-4 py-3 bg-white flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="질문을 입력하세요"
          className="flex-1 border px-3 py-2 rounded-xl text-gray-700"
        />
        <button onClick={sendMessage} className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-xl">
          전송
        </button>
      </div>
    </div>
  );
}
