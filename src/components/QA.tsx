// src/components/QA.tsx
import React, { useState, useRef, useEffect } from 'react';
import { TbHistory, TbPlus, TbSend2 } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import ChatBubble from './ChatBubble';
import { cn } from '@/lib/utils';
import { Input } from "@/components/ui/input";
import { useTranslation } from 'react-i18next';

export const QA = () => {
  const { t } = useTranslation();

  const [messages, setMessages] = useState<{ message: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;

    // 添加用户消息
    setMessages(prev => [...prev, { message: input, isUser: true }]);
    setInput('');

    // 模拟 LLM 回复（实际应用中应调用API）
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { message: `回应: ${input}`, isUser: false },
      ]);
    }, 1000);
  };

  const handleNewConversation = () => {
    setMessages([]);
  };

  const handleHistory = () => {
    // 这里可以实现历史记录的查看逻辑
    alert(t('history'));
  };

  return (
    <div className="flex flex-col flex-1 bg-white pb-16"> {/* 添加 pb-16 确保内容不被底部标签栏遮挡 */}
      {/* 顶部栏 */}
      <header className="flex justify-between items-center p-4 bg-gray-100">
        {/* 左侧历史记录按钮 */}
        <div className="w-12">
          <Button variant="ghost" size="icon" onClick={handleHistory} aria-label={t('history')}>
            <TbHistory size={20} />
          </Button>
        </div>

        {/* 中间标题 */}
        <div className="flex-grow text-center">
          <h1 className="text-xl font-semibold">{t('smart_assistant')}</h1>
        </div>

        {/* 右侧保留空白或其他图标（如果需要） */}
        <div className="w-12">
          <Button variant="ghost" size="icon" onClick={handleNewConversation} aria-label={t('new_conversation')}>
            <TbPlus size={20} />
          </Button>
          </div> {/* 占位，保持左侧按钮和中间标题的对齐 */}
      </header>

      {/* 对话区域 */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.message} isUser={msg.isUser} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <footer className="mb-4 p-4 flex items-center space-x-2 fixed bottom-16 w-full bg-opacity-90">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
          placeholder={t('placeholder_message')}
          className="flex-1 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-0 focus:outline-none"
        />
        <Button onClick={handleSend} className="ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full">
        <TbSend2 size={20} />
        </Button>
      </footer>
    </div>
  );
};

export default QA;