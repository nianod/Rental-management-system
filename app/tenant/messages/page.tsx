// "use client";
// import { useState, useEffect, useRef } from "react";
// import {
//   FaSignOutAlt,
//   FaGoogle,
//   FaUsers,
//   FaArrowRight,
//   FaCog,
//   FaSmile,
//   FaPaperclip,
//   FaPaperPlane,
// } from "react-icons/fa";

// const Message = () => {
//   const [newMessage, setNewMessage] = useState("");
//   const [session, setSession] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const [emoji, setEmoji] = useState(false);
//   const messagesEndRef = useRef(null);

//   const left = () => {
//     alert("Clear all the messages?");
//     window.location.reload();
//   };

//   const send = () => {};

//   return (
//     <div className="bg-gray-900 p-4 md:p-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
//           <div className="bg-gray-900/80 p-4 border-b border-gray-700">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-400 text-sm mt-1">
//                   You are texting landlord now
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="h-[300px] md:h-[300px] p-4 overflow-y-auto bg-gradient-to-b from-gray-900/30 to-gray-800/30">
//             <div className="space-y-4">
//               {/* {messages.map((msg, index) => {
//                     const isMyMessage = msg?.user_id === session?.user?.id;

//                     return (
//                       <div
//                         key={index}
//                         className={`flex items-start gap-3 ${
//                           isMyMessage ? "flex-row-reverse" : ""
//                         }`}
//                       >
//                         {!isMyMessage && (
//                           <img
//                             src={msg.avatar}
//                             alt="avatar"
//                             className="w-10 h-10 rounded-full border-2 border-blue-500 flex-shrink-0"
//                           />
//                         )}

//                         <div
//                           className={`max-w-[70%] ${
//                             isMyMessage ? "items-end" : "items-start"
//                           }`}
//                         >
//                           {!isMyMessage && (
//                             <p className="text-gray-300 text-sm mb-1 ml-1">
//                               {msg.user_name}
//                             </p>
//                           )}
//                           <div
//                             className={`rounded-2xl p-3 ${
//                               isMyMessage
//                                 ? "bg-gradient-to-r from-blue-600 to-blue-600 rounded-br-none"
//                                 : "bg-gray-700/80 rounded-bl-none"
//                             }`}
//                           >
//                             <p className="text-white">{msg.message}</p>
//                           </div>
//                           <span className="text-xs text-gray-500 mt-1 px-1">
//                             {msg.timestamp}
//                           </span>
//                         </div>
//                       </div>
//                     );
//                   })} */}
//               <div ref={messagesEndRef} />
//             </div>
//           </div>

//           <div className="p-4 border-t border-gray-700 bg-gray-900/50">
//             <form onSubmit={send} className="flex items-center gap-3">
//               <button
//                 type="button"
//                 title="media"
//                 className="text-gray-400 cursor-not-allowed hover:text-white p-3 rounded-xl hover:bg-gray-700/50 transition-colors"
//               >
//                 <FaPaperclip className="text-xl" />
//               </button>

//               <div className="flex-1 relative">
//                 <input
//                   type="text"
//                   className="w-full bg-gray-800/70 border border-gray-600 rounded-xl py-3 px-4 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
//                   placeholder="Type your message here..."
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   onFocus={() => setIsTyping(true)}
//                   onBlur={() => setIsTyping(false)}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setEmoji((prev) => !prev)}
//                   title="emoji"
//                   className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
//                 >
//                   <FaSmile className="text-xl" />
//                 </button>
//               </div>

//               <button
//                 type="submit"
//                 disabled={!newMessage.trim()}
//                 className={`p-3 rounded-xl flex items-center cursor-pointer justify-center transition-all duration-300 transform hover:scale-105 ${
//                   newMessage.trim()
//                     ? "bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700"
//                     : "bg-gray-700 cursor-not-allowed"
//                 }`}
//               >
//                 <FaPaperPlane className="text-white text-xl" />
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Message;

// app/dashboard/messages/page.tsx - WhatsApp-style chat with Landlord
'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  MoreVertical, 
  Search, 
  Paperclip, 
  Smile, 
  Send,
  Phone,
  Video,
  Info,
  Check,
  CheckCheck,
  Clock
} from 'lucide-react';
import Link from 'next/link';

type Message = {
  id: number;
  text: string;
  sender: 'tenant' | 'landlord';
  timestamp: string;
  read: boolean;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hi, I have an issue with my bathroom tap', sender: 'tenant', timestamp: '10:30 AM', read: true },
    { id: 2, text: 'Hello! What seems to be the problem?', sender: 'landlord', timestamp: '10:32 AM', read: true },
    { id: 3, text: 'The tap is leaking constantly', sender: 'tenant', timestamp: '10:33 AM', read: true },
    { id: 4, text: 'I\'ll send a plumber tomorrow morning', sender: 'landlord', timestamp: '10:35 AM', read: true },
    { id: 5, text: 'Thank you! Around what time?', sender: 'tenant', timestamp: '10:36 AM', read: true },
    { id: 6, text: 'Between 9-11 AM. I\'ll let you know if there are any changes', sender: 'landlord', timestamp: '10:38 AM', read: false },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [landlordTyping, setLandlordTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'tenant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');

    // Simulate landlord typing and reply
    setTimeout(() => {
      setLandlordTyping(true);
    }, 1000);

    setTimeout(() => {
      const landlordReply: Message = {
        id: messages.length + 2,
        text: 'Got it. I\'ll look into this.',
        sender: 'landlord',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      };
      setMessages(prev => [...prev, landlordReply]);
      setLandlordTyping(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#060219] text-white">
      {/* Chat Header */}
      <div className="sticky top-0 bg-gradient-to-r from-[#060219] to-[#0a0429] border-b border-gray-800 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard"
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">L</span>
                </div>
                <div>
                  <h1 className="font-bold">Landlord</h1>
                  <p className="text-gray-400 text-sm">Online now</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {/* Date separator */}
            <div className="text-center">
              <span className="px-4 py-1 bg-gray-800/50 text-gray-400 text-sm rounded-full">
                Today
              </span>
            </div>

            {/* Messages */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'tenant' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl p-4 ${
                    message.sender === 'tenant'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 rounded-br-none'
                      : 'bg-gray-800/50 rounded-bl-none'
                  }`}
                >
                  <p className="text-white">{message.text}</p>
                  <div className={`flex items-center gap-2 mt-2 ${message.sender === 'tenant' ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-gray-400 text-xs">{message.timestamp}</span>
                    {message.sender === 'tenant' && (
                      <span className="text-blue-300">
                        {message.read ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Landlord typing indicator */}
            {landlordTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800/50 rounded-2xl rounded-bl-none p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="text-gray-400 text-sm">Landlord is typing...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-gradient-to-t from-[#060219] to-transparent pt-6">
        <div className="container mx-auto px-4 pb-6">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
              <button
                type="button"
                className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-colors"
              >
                <Paperclip className="w-5 h-5 text-gray-400" />
              </button>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 px-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Smile className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className={`p-3 rounded-xl transition-colors ${
                  newMessage.trim()
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                    : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            
            <p className="text-gray-500 text-xs text-center mt-3">
              Chat directly with your landlord for personal matters
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}