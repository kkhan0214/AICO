type Props = {
  from: string; // 'bot' or 'user'
  text: string;
};

const ChatBubble = ({ from, text }: Props) => {
  const isBot = from === 'bot';
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-md whitespace-pre-wrap break-words ${
          isBot ? 'bg-gray-300 text-black' : 'bg-purple-500 text-white'
        }`}
      >
        {text?.trim() ? text : '...'} {/* 응답 없으면 '...' 표시 */}
      </div>
    </div>
  );
};

export default ChatBubble;
