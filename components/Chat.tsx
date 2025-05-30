'use client';

import { useState } from 'react';
import ChatBubble from './chatBubble';

// ✅ 명시적인 타입 선언
type Message = {
  from: 'user' | 'bot';
  text: string;
};

export default function Chat() {
  // ✅ useState에 타입 적용
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // ✅ 메시지 객체에 타입 명시
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
    <div className="w-full max-w-md mx-auto p-4">
      <div className="h-96 overflow-y-auto border rounded p-2 mb-4 flex flex-col gap-2">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} from={msg.from} text={msg.text} />
        ))}
        {loading && <ChatBubble from="bot" text="답변 작성 중..." />}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="질문을 입력하세요"
          className="flex-1 border px-3 py-2 rounded"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
          전송
        </button>
      </div>
    </div>
  );
}
