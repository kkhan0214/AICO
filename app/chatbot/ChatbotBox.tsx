'use client';

import Chat from '@/components/Chat';

type Props = {
  onClose: () => void;
};

export default function ChatbotBox({ onClose }: Props) {
  return (
    <div className="fixed bottom-6 right-6 w-[360px] h-[600px] bg-[rgba(255,255,255,0.95)] rounded-2xl border shadow-xl flex flex-col z-[1000]">
      <div className="relative pt-4 px-4 flex-shrink-0 border-b pb-2">
        <p className="text-center text-gray-700 font-semibold">AIco 튜터봇</p>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-sm bg-red-400 text-white px-2.5 py-1 rounded-full hover:bg-red-500 transition"
        >
          닫기
        </button>
      </div>

      {/* 채팅 영역 */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Chat />
      </div>
    </div>
  );
}
