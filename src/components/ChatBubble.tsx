// src/components/ChatBubble.tsx
import React from 'react';
import { cn } from '@/lib/utils'; // 辅助函数，用于条件类名

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  isTyping?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser, isTyping }) => {
  return (
    <div
      className={cn(
        'flex',
        isUser ? 'justify-end' : 'justify-start',
        'my-2'
      )}
    >
      <div
        className={cn(
          'max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow-md backdrop-blur-md',
          isUser
            ? 'bg-blue-500/70 text-white border border-blue-300/50'
            : 'bg-white/40 text-gray-800 border border-white/40'
        )}
      >
        {message}
        {isTyping && (
          <span className="inline-flex ml-2">
            <span className="animate-bounce delay-0 text-lg">·</span>
            <span className="animate-bounce delay-100 text-lg">·</span>
            <span className="animate-bounce delay-200 text-lg">·</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;