// src/components/QA.tsx
import { useState, useRef, useEffect } from 'react';
import { TbHistory, TbPlus, TbArrowUp } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import ChatBubble from './ChatBubble';
import { useTranslation } from 'react-i18next';
import { Textarea } from "@/components/ui/textarea"

const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

const watchKeyBoard = (callback: (isShow: boolean) => void) => {
  if (isIOS()) {
    document.body.addEventListener('focusin', () => {
      callback(true);
    });
    document.body.addEventListener('focusout', () => {
      callback(false);
    });
  } else {
    const originalHeight = window.innerHeight;
    window.addEventListener('resize', () => {
      const resizeHeight = window.innerHeight;
      if (resizeHeight < originalHeight) {
        callback(true);
      } else {
        callback(false);
      }
    });
  }
};

export const QA = () => {
  const { t } = useTranslation();

  const [messages, setMessages] = useState<{ message: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  
  // 滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    watchKeyBoard(handleKeyboardChange);
  }, [messages]);

  const handleKeyboardChange = (status: boolean) => {
    setIsKeyboardShow(status); // 更新键盘状态
    setTimeout(() => {
      const container = document.getElementById('container');
      if (status) {
        const viewportHeight = window.visualViewport?.height || window.innerHeight;
        if (container) {
          container.style.height = `${viewportHeight}px`;
        }
        window.scrollTo(0, 0);
        // 禁用全局滚动
        document.body.style.overflow = 'hidden';
      } else {
        if (container) {
          container.style.height = `100vh`;
        }
        // 启用全局滚动
        document.body.style.overflow = 'auto';
      }
    }, 100);
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    // 添加用户消息
    setMessages(prev => [...prev, { message: input, isUser: true }]);
    setTimeout(() => {
      setInput('');
    }, 100);

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
    <div id="container" className="flex flex-col h-screen">
      <header className="flex justify-between items-center px-4 h-16 z-10">
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

        {/* 右侧保留空白或其他图标 */}
        <div className="w-12">
          <Button variant="ghost" size="icon" onClick={handleNewConversation} aria-label={t('new_conversation')}>
            <TbPlus size={20} />
          </Button>
        </div>
      </header>

      {/* 对话区域 */}
      <div className="flex-1 p-4 overflow-y-auto pb-20">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.message} isUser={msg.isUser} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <footer className={`p-4 w-full bg-white border-t transition-all z-[1000] ${isKeyboardShow?'':'relative bottom-20'}`}>
        <div className="relative flex items-center max-w-full">
          <Textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t('placeholder_message')}
            className="flex-1 pr-12 rounded-xl bg-gray-100 placeholder:text-gray-700 focus-visible:ring-0"
          />
          <Button 
            onClick={handleSend} 
            className="absolute right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0"
          >
            <TbArrowUp size={18} />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default QA;