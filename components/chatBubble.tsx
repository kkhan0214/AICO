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
