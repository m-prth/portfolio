import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useTheme } from '../hooks/useTheme';

interface PortfolioAssistantProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const PortfolioAssistant: React.FC<PortfolioAssistantProps> = ({
  isOpen: externalIsOpen,
  setIsOpen: externalSetIsOpen
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const { designSystem } = useTheme();

  // Use external state if provided, otherwise use internal
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalSetIsOpen || setInternalIsOpen;

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: designSystem === 'neo-brutalist' ? "GREETINGS. I AM THE AI SYSTEM. QUERY ME." : "Hello! I'm here to help. Ask me anything about Parth's experience." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(userMessage.text);

      let responseText = "";

      if (typeof response === 'string') {
        responseText = response;
      } else if (response && typeof response === 'object' && 'text' in response) {
        responseText = response.text;
      } else if (response && typeof response === 'object' && 'error' in response) {
        throw new Error(response.error);
      } else {
        responseText = "Output unclear.";
      }

      setMessages(prev => [...prev, { role: 'model', text: designSystem === 'neo-brutalist' ? responseText.toUpperCase() : responseText }]);

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: designSystem === 'neo-brutalist' ? "SYSTEM ERROR. CONNECTION FAILED." : "Sorry, something went wrong. Please try again.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  // Theme-specific styles
  const getTriggerButtonStyles = () => {
    switch (designSystem) {
      case 'neo-brutalist':
        return 'bg-neoGreen border-4 border-neoBlack dark:border-neoWhite text-neoBlack p-4 shadow-neo dark:shadow-neo-dark hover:shadow-neo-lg dark:hover:shadow-neo-dark-lg';
      case 'dark-minimal':
        return 'bg-zinc-900 border border-white/10 text-white p-3 rounded-full hover:bg-zinc-800';
      case 'aurora':
        return 'bg-gradient-to-r from-auroraViolet to-auroraSky text-white p-4 rounded-full shadow-aurora hover:shadow-aurora-glow';
      default:
        return '';
    }
  };

  const getModalStyles = () => {
    switch (designSystem) {
      case 'neo-brutalist':
        return 'bg-neoWhite dark:bg-neoBlack border-4 border-neoBlack dark:border-neoWhite shadow-neo-lg dark:shadow-neo-dark-lg';
      case 'dark-minimal':
        return 'bg-zinc-900 border border-white/10 rounded-xl';
      case 'aurora':
        return 'glass-card';
      default:
        return '';
    }
  };

  const getHeaderStyles = () => {
    switch (designSystem) {
      case 'neo-brutalist':
        return 'bg-neoBlack dark:bg-neoWhite p-3 border-b-4 border-neoBlack dark:border-neoWhite';
      case 'dark-minimal':
        return 'p-4 border-b border-white/10';
      case 'aurora':
        return 'p-4 border-b border-white/10';
      default:
        return '';
    }
  };

  const getHeaderTitleStyles = () => {
    switch (designSystem) {
      case 'neo-brutalist':
        return 'font-mono font-bold text-white dark:text-neoBlack';
      case 'dark-minimal':
        return 'font-medium text-white text-sm';
      case 'aurora':
        return 'font-medium text-zinc-900 dark:text-white text-sm';
      default:
        return '';
    }
  };

  const getCloseButtonStyles = () => {
    switch (designSystem) {
      case 'neo-brutalist':
        return 'text-white dark:text-neoBlack hover:text-neoRed';
      case 'dark-minimal':
        return 'text-zinc-500 hover:text-white';
      case 'aurora':
        return 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-white';
      default:
        return '';
    }
  };

  const getMessagesContainerStyles = () => {
    switch (designSystem) {
      case 'neo-brutalist':
        return 'bg-gray-100 dark:bg-gray-900 font-mono';
      case 'dark-minimal':
        return 'bg-black';
      case 'aurora':
        return 'bg-white/30 dark:bg-black/30';
      default:
        return '';
    }
  };

  const getUserMessageStyles = () => {
    switch (designSystem) {
      case 'neo-brutalist':
        return 'bg-neoBlue text-white border-2 border-neoBlack dark:border-neoWhite shadow-neo-sm dark:shadow-neo-dark-sm';
      case 'dark-minimal':
        return 'bg-white text-black rounded-2xl rounded-br-md';
      case 'aurora':
        return 'bg-gradient-to-r from-auroraViolet to-auroraSky text-white rounded-2xl rounded-br-md';
      default:
        return '';
    }
  };

  const getModelMessageStyles = (isError?: boolean) => {
    switch (designSystem) {
      case 'neo-brutalist':
        return isError
          ? 'bg-neoRed text-white border-2 border-neoBlack dark:border-neoWhite shadow-neo-sm dark:shadow-neo-dark-sm'
          : 'bg-white dark:bg-neoBlack text-neoBlack dark:text-neoWhite border-2 border-neoBlack dark:border-neoWhite shadow-neo-sm dark:shadow-neo-dark-sm';
      case 'dark-minimal':
        return isError
          ? 'bg-red-500/20 text-red-400 rounded-2xl rounded-bl-md'
          : 'bg-zinc-800 text-zinc-300 rounded-2xl rounded-bl-md';
      case 'aurora':
        return isError
          ? 'bg-auroraRose/20 text-auroraRose rounded-2xl rounded-bl-md'
          : 'bg-white/60 dark:bg-white/10 backdrop-blur-sm text-zinc-900 dark:text-white rounded-2xl rounded-bl-md border border-white/20';
      default:
        return '';
    }
  };

  const getInputContainerStyles = () => {
    switch (designSystem) {
      case 'neo-brutalist':
        return 'p-4 bg-neoWhite dark:bg-neoBlack border-t-4 border-neoBlack dark:border-neoWhite';
      case 'dark-minimal':
        return 'p-4 border-t border-white/10';
      case 'aurora':
        return 'p-4 border-t border-white/10';
      default:
        return '';
    }
  };

  const getInputStyles = () => {
    switch (designSystem) {
      case 'neo-brutalist':
        return 'bg-white dark:bg-gray-900 border-4 border-neoBlack dark:border-neoWhite font-mono font-bold text-neoBlack dark:text-neoWhite focus:bg-neoYellow dark:focus:bg-darkAccent placeholder:text-gray-400 dark:placeholder:text-gray-500';
      case 'dark-minimal':
        return 'bg-zinc-800 border border-white/10 rounded-lg text-white font-medium focus:border-white/30 placeholder:text-zinc-500';
      case 'aurora':
        return 'bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-zinc-900 dark:text-white focus:border-auroraViolet/50 placeholder:text-zinc-400';
      default:
        return '';
    }
  };

  const getSendButtonStyles = () => {
    switch (designSystem) {
      case 'neo-brutalist':
        return 'bg-neoBlack dark:bg-neoWhite text-white dark:text-neoBlack hover:bg-neoGreen hover:text-neoBlack border-2 border-transparent hover:border-neoBlack dark:hover:border-neoWhite';
      case 'dark-minimal':
        return 'bg-white text-black rounded-lg hover:bg-zinc-200';
      case 'aurora':
        return 'bg-gradient-to-r from-auroraViolet to-auroraSky text-white rounded-lg hover:shadow-aurora-glow';
      default:
        return '';
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        className={`fixed bottom-6 right-6 z-50 transition-all ${getTriggerButtonStyles()}`}
        whileHover={designSystem === 'neo-brutalist' ? { scale: 1.1, rotate: 10 } : { scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <Terminal className="w-8 h-8" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className={`fixed bottom-24 right-6 z-50 w-full max-w-sm flex flex-col h-[500px] ${getModalStyles()}`}
          >
            {/* Header */}
            <div className={`flex justify-between items-center cursor-move ${getHeaderStyles()}`}>
              <div className="flex items-center gap-2">
                {designSystem === 'neo-brutalist' && (
                  <>
                    <div className="w-3 h-3 bg-red-500 rounded-full border border-white dark:border-neoBlack"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full border border-white dark:border-neoBlack"></div>
                  </>
                )}
                <span className={`ml-2 ${getHeaderTitleStyles()}`}>
                  {designSystem === 'neo-brutalist' ? 'AI_TERMINAL_V1.0' : 'AI Assistant'}
                </span>
              </div>
              <button onClick={() => setIsOpen(false)} className={`transition-colors ${getCloseButtonStyles()}`}>
                <X size={20} strokeWidth={designSystem === 'neo-brutalist' ? 3 : 2} />
              </button>
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${getMessagesContainerStyles()}`}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] p-4 text-sm font-bold ${
                      msg.role === 'user'
                        ? getUserMessageStyles()
                        : getModelMessageStyles(msg.isError)
                    }`}
                  >
                    {designSystem === 'neo-brutalist' && (
                      <span className="block text-[10px] opacity-70 mb-1 border-b border-current pb-1">
                        {msg.role === 'user' ? '> USER' : '> SYSTEM'}
                      </span>
                    )}
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className={`p-3 ${designSystem === 'neo-brutalist' ? 'bg-white dark:bg-neoBlack border-2 border-neoBlack dark:border-neoWhite shadow-neo-sm dark:shadow-neo-dark-sm' : designSystem === 'dark-minimal' ? 'bg-zinc-800 rounded-2xl' : 'bg-white/60 dark:bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20'}`}>
                    <span className={`animate-pulse font-black ${designSystem === 'neo-brutalist' ? 'text-neoBlack dark:text-neoWhite' : 'text-zinc-400'}`}>
                      {designSystem === 'neo-brutalist' ? 'PROCESSING...' : 'Thinking...'}
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={getInputContainerStyles()}>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={designSystem === 'neo-brutalist' ? 'ENTER COMMAND...' : 'Type a message...'}
                  className={`w-full py-3 pl-4 pr-12 focus:outline-none transition-colors ${getInputStyles()}`}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className={`absolute right-2 p-2 transition-colors disabled:opacity-50 ${getSendButtonStyles()}`}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioAssistant;
