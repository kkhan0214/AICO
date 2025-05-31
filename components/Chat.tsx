'use client';

import { useState } from 'react';
import ChatbotPage from './chatbot/page';

export default function ChatPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex w-full h-full bg-[url("/sample.png")] bg-contain bg-center bg-no-repeat'>
      {/* 열기/닫기 버튼 */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={
          open
            ? 'absolute top-3 right-12 z-40'
            : 'absolute right-12 bottom-16 bg-black w-24 h-24 rounded-full border-3 shadow-2xl flex items-center justify-center cursor-pointer'
        }
      >
        {open ? (
          <p className="cursor-pointer bg-[rgba(255,100,100,0.7)] w-30 py-0.5 rounded-2xl z-30 text-center">
            채팅 닫기
          </p>
        ) : (
          <img src="/robot.png" className="h-full" />
        )}
      </div>

      {/* 챗봇 */}
      {open && <ChatbotPage />}
    </div>
  );
}

// chatbot/page.tsx
'use client';

import Chat from '@/components/Chat';

export default function ChatbotPage() {
  return (
    <div className="fixed bottom-6 right-6 w-[360px] h-[600px] bg-[rgba(255,255,255,0.95)] rounded-2xl border shadow-xl flex flex-col z-[1000]">
      <div className="relative pt-4 px-4 flex-shrink-0 border-b pb-2">
        <p className="text-center text-gray-700 font-semibold">AI 튜터 챗봇</p>
      </div>

      <Chat />
    </div>
  );
}

// components/Chat.tsx
'use client';

import { useState } from 'react';
import ChatBubble from './chatBubble';

type Message = {
  from: 'user' | 'bot';
  text: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
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
    <>
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} from={msg.from} text={msg.text} />
        ))}
        {loading && <ChatBubble from="bot" text="답변 작성 중..." />}
      </div>

      <div className="border-t px-4 py-3 bg-white flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="질문을 입력하세요"
          className="flex-1 border px-3 py-2 rounded-xl text-gray-700"
        />
        <button onClick={sendMessage} className="bg-purple-600 text-white px-4 py-2 rounded-xl">
          전송
        </button>
      </div>
    </>
  );
}

// components/chatBubble.tsx

export default function ChatBubble({ from, text }: { from: 'user' | 'bot'; text: string }) {
  const isBot = from === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-md w-fit whitespace-pre-wrap break-words ${
          isBot ? 'bg-gray-300 text-black' : 'bg-purple-500 text-white'
        }`}
      >
        {text?.trim() ? text : '...'}
      </div>
    </div>
  );
}
