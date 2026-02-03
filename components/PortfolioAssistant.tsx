import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

interface PortfolioAssistantProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const PortfolioAssistant: React.FC<PortfolioAssistantProps> = ({
  isOpen: externalIsOpen,
  setIsOpen: externalSetIsOpen
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Use external state if provided, otherwise use internal
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalSetIsOpen || setInternalIsOpen;

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "GREETINGS. I AM THE AI SYSTEM. QUERY ME." }
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

      setMessages(prev => [...prev, { role: 'model', text: responseText.toUpperCase() }]);

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "SYSTEM ERROR. CONNECTION FAILED.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-neoGreen border-4 border-neoBlack dark:border-neoWhite text-neoBlack p-4 shadow-neo dark:shadow-neo-dark hover:shadow-neo-lg dark:hover:shadow-neo-dark-lg transition-all"
        whileHover={{ scale: 1.1, rotate: 10 }}
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
            className="fixed bottom-24 right-6 z-50 w-full max-w-sm bg-neoWhite dark:bg-neoBlack border-4 border-neoBlack dark:border-neoWhite shadow-neo-lg dark:shadow-neo-dark-lg flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-neoBlack dark:bg-neoWhite p-3 border-b-4 border-neoBlack dark:border-neoWhite flex justify-between items-center cursor-move">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full border border-white dark:border-neoBlack"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full border border-white dark:border-neoBlack"></div>
                <span className="font-mono font-bold text-white dark:text-neoBlack ml-2">AI_TERMINAL_V1.0</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white dark:text-neoBlack hover:text-neoRed transition-colors">
                <X size={20} strokeWidth={3} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100 dark:bg-gray-900 font-mono">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] p-4 border-2 border-neoBlack dark:border-neoWhite text-sm font-bold shadow-neo-sm dark:shadow-neo-dark-sm ${
                      msg.role === 'user'
                        ? 'bg-neoBlue text-white'
                        : msg.isError
                          ? 'bg-neoRed text-white'
                          : 'bg-white dark:bg-neoBlack text-neoBlack dark:text-neoWhite'
                    }`}
                  >
                    <span className="block text-[10px] opacity-70 mb-1 border-b border-current pb-1">
                      {msg.role === 'user' ? '> USER' : '> SYSTEM'}
                    </span>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-neoBlack border-2 border-neoBlack dark:border-neoWhite p-3 shadow-neo-sm dark:shadow-neo-dark-sm">
                    <span className="animate-pulse font-black text-neoBlack dark:text-neoWhite">PROCESSING...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-neoWhite dark:bg-neoBlack border-t-4 border-neoBlack dark:border-neoWhite">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="ENTER COMMAND..."
                  className="w-full bg-white dark:bg-gray-900 border-4 border-neoBlack dark:border-neoWhite py-3 pl-4 pr-12 font-mono font-bold text-neoBlack dark:text-neoWhite focus:outline-none focus:bg-neoYellow dark:focus:bg-neoPurple transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 p-2 bg-neoBlack dark:bg-neoWhite text-white dark:text-neoBlack hover:bg-neoGreen hover:text-neoBlack border-2 border-transparent hover:border-neoBlack dark:hover:border-neoWhite transition-colors disabled:opacity-50"
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
