import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Terminal } from 'lucide-react'; // Removed Sparkles as it wasn't used
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const PortfolioAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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

    // 1. Add User Message
    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 2. Call API
      const response = await sendMessageToGemini(userMessage.text);
      
      // 3. FIX: Safely extract text. 
      // The service returns an object { text: "..." }, not a direct string.
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

      // 4. Update State
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
        className="fixed bottom-6 right-6 z-50 bg-neoGreen border-4 border-neoBlack text-neoBlack p-4 shadow-neo hover:shadow-neo-lg transition-all"
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
            className="fixed bottom-24 right-6 z-50 w-full max-w-sm bg-neoWhite border-4 border-neoBlack shadow-neo-lg flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-neoBlack p-3 border-b-4 border-neoBlack flex justify-between items-center cursor-move">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full border border-white"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full border border-white"></div>
                <span className="font-mono font-bold text-white ml-2">AI_TERMINAL_V1.0</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-neoRed">
                <X size={20} strokeWidth={3} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100 font-mono">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] p-4 border-2 border-neoBlack text-sm font-bold shadow-neo-sm ${
                      msg.role === 'user' 
                        ? 'bg-neoBlue text-white' 
                        : msg.isError 
                          ? 'bg-neoRed text-white'
                          : 'bg-white text-neoBlack'
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
                  <div className="bg-white border-2 border-neoBlack p-3 shadow-neo-sm">
                    <span className="animate-pulse font-black">PROCESSING...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-neoWhite border-t-4 border-neoBlack">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="ENTER COMMAND..."
                  className="w-full bg-white border-4 border-neoBlack py-3 pl-4 pr-12 font-mono font-bold focus:outline-none focus:bg-neoYellow transition-colors placeholder:text-gray-400"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 p-2 bg-neoBlack text-white hover:bg-neoGreen hover:text-neoBlack border-2 border-transparent hover:border-neoBlack transition-colors disabled:opacity-50"
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