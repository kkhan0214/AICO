type Props = {
  from: 'bot' | 'user'; // string 대신 정확한 리터럴 타입으로 제한
  text: string;
};

const ChatBubble = ({ from, text }: Props) => {
  const isBot = from === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`
          px-4 py-2 rounded-xl max-w-md w-fit
          whitespace-pre-wrap break-words
          ${isBot ? 'bg-gray-300 text-black' : 'bg-purple-500 text-white'}
        `}
        style={{
          maxHeight: '300px',         // ✅ 너무 길면 말풍선 안에 스크롤 생김
          overflowY: 'auto',          // ✅ 말풍선 내부 스크롤 활성화
          wordBreak: 'break-word'     // ✅ 단어 단위 줄바꿈
        }}
      >
        {text?.trim() ? text : '...'}
      </div>
    </div>
  );
};

export default ChatBubble;
