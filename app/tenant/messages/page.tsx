'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Smile, Send, Phone, Video, Info, Check, CheckCheck, MessageSquare   } from 'lucide-react';
import Link from 'next/link';
import swal from 'sweetalert2';

type Message = {
  id: number;
  text: string;
  sender: 'tenant' | 'landlord';
  timestamp: string;
  read: boolean;
};

//dummy bro haha lol
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
   const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const prank = () => {
    alert("Not currently supported")
  }
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      text: newMessage,
      sender: 'tenant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');

   
    setTimeout(() => {
      const landlordReply: Message = {
        id: Date.now() + 1,
        text: 'Got it. I\'ll look into this.',
        sender: 'landlord',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      };
      setMessages(prev => [...prev, landlordReply]);
     }, 3000);
  };

  const lert = () => {
    swal.fire({
      title: "Inactive",
      text: "This feature is currently inactive",
      icon: "warning",
      confirmButtonText: 'okay',
      background: '#1f2937',
      color: 'white',
      confirmButtonColor: '#ef4444'
    })
  }

  return (
    <div className="min-h-screen bg-[#060219] text-white flex flex-col">
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
              <button
                onClick={lert}
                className="p-2 cursor-pointer hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
              </button>
              <button
                onClick={lert}
                className="p-2 cursor-pointer hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Video className="w-5 h-5" />
              </button>
              <button
                onClick={lert}
                className="p-2 cursor-pointer hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div ref={chatContainerRef} className="flex-1 overflow-y-auto min-h-0">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <MessageSquare className="w-20 h-20 text-gray-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-400 mb-2">
                  No messages yet
                </h3>
                <p className="text-gray-500 max-w-md">
                  Start a conversation with your landlord. Send a message about
                  any concerns or questions you may have.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <span className="px-4 py-1 bg-gray-800/50 text-gray-400 text-sm rounded-full">
                    Today
                  </span>
                </div>

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "tenant" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl p-4 ${
                        message.sender === "tenant"
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 rounded-br-none"
                          : "bg-gray-800/50 rounded-bl-none"
                      }`}
                    >
                      <p className="text-white">{message.text}</p>
                      <div
                        className={`flex items-center gap-2 mt-2 ${message.sender === "tenant" ? "justify-end" : "justify-start"}`}
                      >
                        <span className="text-gray-400 text-xs">
                          {message.timestamp}
                        </span>
                        {message.sender === "tenant" && (
                          <span className="text-blue-300">
                            {message.read ? (
                              <CheckCheck className="w-3 h-3" />
                            ) : (
                              <Check className="w-3 h-3" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-gradient-to-t from-[#060219] to-transparent pt-6 border-t border-gray-800/50">
        <div className="container mx-auto px-4 pb-6">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-3"
            >
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 px-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={prank}
                  type="button"
                  className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Smile className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <button
                type="submit"
                disabled={!newMessage.trim()}
                className={`p-3 rounded-xl cursor-pointer transition-colors ${
                  newMessage.trim()
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    : "bg-gray-800/50 text-gray-500 cursor-not-allowed"
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