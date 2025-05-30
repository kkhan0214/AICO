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
