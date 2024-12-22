// src/components/QA.tsx
import { useState, useRef, useEffect } from 'react';
import { TbHistory, TbPlus, TbArrowUp } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import ChatBubble from './ChatBubble';
import { useTranslation } from 'react-i18next';
import { Textarea } from "@/components/ui/textarea"

export const QA = () => {
  const { t } = useTranslation();

  const [messages, setMessages] = useState<{ message: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleFocus = () => {
    setKeyboardStatus(true);
    const textarea = textareaRef.current;
    
    if (textarea) {
      // 设置初始透明度为0
      textarea.style.opacity = '0';
      
      // 使用setTimeout将透明度设置回1
      setTimeout(() => {
        textarea.style.opacity = '1';
      }, 10);
    }
  }
  const [height, setHeight] = useState(window.visualViewport?.height ?? window.innerHeight);
  const [initHeight] = useState(window.visualViewport?.height ?? window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.visualViewport?.height ?? window.innerHeight);
    };

    // 监听窗口大小变化
    window.visualViewport?.addEventListener('resize', handleResize);

    // 清理监听器
    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`flex flex-col h-screen bg-red-400 h-[${height}px] overflow-hidden`}>
      <header className="flex justify-between items-center p-4 fixed top-[0] w-full z-10">
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

      {/* 对话区域 - 调整底部边距 */}
      <div className="flex-1 p-4 overflow-y-auto mt-16 mb-24 bg-blue-300"> {/* 增加底部边距，给输入框留空间 */}
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.message} isUser={msg.isUser} />
        ))}
        {height.toString()}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 - 调整位置到 TabBar 上方 */}
      <footer className={`p-4 ${keyboardStatus ? 'static' : 'fixed'} bottom-20 w-full bg-white border-t ${ keyboardStatus ? `bottom-[${initHeight-height}px] transition-all z-[1000]`:'' }`}>
        <div className="relative flex items-center max-w-full">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
            onClick={handleFocus}
            onFocus={handleFocus}
            onBlur={() => setKeyboardStatus(false)}
            // placeholder={t('placeholder_message')}
            className="flex-1 pr-12 rounded-xl bg-gray-100 placeholder:text-gray-700 focus-visible:ring-0"
            style={{ animation: 'pwf 0.01s'}}
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