// src/components/ChatBubble.tsx
import React from 'react';
import { cn } from '@/lib/utils'; // 辅助函数，用于条件类名

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser }) => {
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
          'max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow-md',
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'
        )}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatBubble;