// src/components/QA.tsx
import { useState, useRef, useEffect } from 'react';
import { TbHistory, TbPlus, TbArrowUp } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import ChatBubble from './ChatBubble';
import { useTranslation } from 'react-i18next';
import { Textarea } from "@/components/ui/textarea"
import { ChatIntent, ChatRequest, ChatResponse, ChatStatus } from '../../backend/src/types';

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
  const wsRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<{ message: string; isUser: boolean; isTyping?: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [wsUrl, setWsUrl] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const pendingMessageRef = useRef<string>('');
  const isInitialMessageRef = useRef(true);

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

  // Fetch WebSocket URL
  useEffect(() => {
    const fetchWsUrl = async () => {
      try {
        setIsConnecting(true);
        const response = await fetch('/ws-url');
        const data = await response.json();
        if (data.url) {
          setWsUrl(data.url);
        } else {
          throw new Error('No WebSocket URL received');
        }
      } catch (error) {
        console.error('Failed to fetch WebSocket URL:', error);
        setMessages(prev => [...prev, { 
          message: 'Failed to connect to chat service', 
          isUser: false 
        }]);
        setIsConnecting(false);
      }
    };

    fetchWsUrl();
  }, []);

  // WebSocket connection setup
  useEffect(() => {
    if (!wsUrl) return;

    const connectWebSocket = () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) return;
      
      const wsProxyUrl = wsUrl.replace(/^ws:\/\/[^/]+/, '');
      const ws = new WebSocket(wsProxyUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnecting(false);
      };

      ws.onmessage = (event) => {
        try {
          const response: ChatResponse = JSON.parse(event.data);
          
          if (response.status === ChatStatus.ERROR) {
            setMessages(prev => [...prev, { 
              message: response.errorMessage || 'Error occurred', 
              isUser: false 
            }]);
            return;
          }

          if (response.answer) {
            if (isInitialMessageRef.current) {
              // First message in a sequence
              isInitialMessageRef.current = false;
              pendingMessageRef.current = response.answer;
              startTypingAnimation();
            } else {
              // Update existing message immediately without animation
              setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                lastMessage.message = response.answer;
                return newMessages;
              });
            }
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      const startTypingAnimation = () => {
        // Clear any existing timeout
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }

        // Add new message
        setMessages(prev => [...prev, { 
          message: '', 
          isUser: false,
          isTyping: true
        }]);

        let currentIndex = 0;
        const typeNextChar = () => {
          if (currentIndex <= pendingMessageRef.current.length) {
            setMessages(prev => {
              const newMessages = [...prev];
              const lastMessage = newMessages[newMessages.length - 1];
              lastMessage.message = pendingMessageRef.current.slice(0, currentIndex);
              lastMessage.isTyping = currentIndex < pendingMessageRef.current.length;
              return newMessages;
            });

            currentIndex++;
            if (currentIndex <= pendingMessageRef.current.length) {
              typingTimeoutRef.current = setTimeout(typeNextChar, 30);
            } else {
              typingTimeoutRef.current = undefined;
            }
          }
        };

        typeNextChar();
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        wsRef.current = null;
        setIsConnecting(true);
        // Attempt to reconnect after a delay
        setTimeout(connectWebSocket, 3000);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnecting(false);
      };
    };

    connectWebSocket();

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
      pendingMessageRef.current = '';
    };
  }, [wsUrl]);

  const handleSend = () => {
    if (input.trim() === '' || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    // Add user message to chat
    setMessages(prev => [...prev, { message: input, isUser: true }]);

    // Reset initial message flag for new response
    isInitialMessageRef.current = true;

    // Prepare and send request
    const request: ChatRequest = {
      query: input,
      intent: ChatIntent.CHAT
    };

    wsRef.current.send(JSON.stringify(request));
    setInput('');
  };

  const handleNewConversation = () => {
    setMessages([]);
  };

  const handleHistory = () => {
    // 这里可以实现历史记录的查看逻辑
    alert(t('history'));
  };

  return (
    <div 
      id="container" 
      className="flex flex-col h-screen"
      style={{
        backgroundImage: "url('https://www.gcsis.cn/img/index_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <header className="flex justify-between items-center px-4 h-16 z-10 bg-white/30 backdrop-blur-md border-b border-white/40">
        {/* 左侧历史记录按钮 */}
        <div className="w-12">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleHistory} 
            aria-label={t('history')}
            disabled={isConnecting || !wsUrl}
          >
            <TbHistory size={20} />
          </Button>
        </div>

        {/* 中间标题 */}
        <div className="flex-grow text-center">
          <h1 className="text-xl font-semibold">
            {isConnecting ? t('connecting') : t('smart_assistant')}
          </h1>
        </div>

        {/* 右侧新对话按钮 */}
        <div className="w-12">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleNewConversation} 
            aria-label={t('new_conversation')}
            disabled={isConnecting || !wsUrl}
          >
            <TbPlus size={20} />
          </Button>
        </div>
      </header>

      {/* 对话区域 */}
      <div className="flex-1 p-4 overflow-y-auto pb-20">
        {messages.map((msg, index) => (
          <ChatBubble 
            key={index} 
            message={msg.message} 
            isUser={msg.isUser}
            isTyping={msg.isTyping}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <footer className={`p-4 w-full bg-white/50 backdrop-blur-md border-t border-white/40 transition-all z-[1000] ${isKeyboardShow?'':'relative bottom-20'}`}>
        <div className="relative flex items-center max-w-full">
          <Textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t('placeholder_message')}
            className="flex-1 pr-12 rounded-xl bg-white/30 backdrop-blur-sm placeholder:text-gray-700 focus-visible:ring-0 border border-white/40"
            disabled={isConnecting || !wsUrl || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN}
          />
          <Button 
            onClick={handleSend} 
            className="absolute right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0"
            disabled={isConnecting || !wsUrl || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN}
          >
            <TbArrowUp size={18} />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default QA;