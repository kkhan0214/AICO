type Props = {
  from: string; // 'bot' or 'user'
  text: string;
};

const ChatBubble = ({ from, text }: Props) => {
  const isBot = from === 'bot';
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`px-4 py-2 rounded-xl max-w-xs ${isBot ? 'bg-gray-300' : 'bg-purple-400 text-white'}`}>
        {text}
      </div>
    </div>
  );
};

export default ChatBubble;
