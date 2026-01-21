"use client";

import { useState, useRef, useEffect } from "react";
import { useTenants } from "@/app/context/TenantsContext";
import { TenantsProvider } from "@/app/context/TenantsContext";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Paperclip,
  Smile,
  Send,
  Info,
  Check,
  CheckCheck,
  Shield,
  Volume2,
  VolumeX,
} from "lucide-react";

type GroupMember = {
  id: string;
  name: string;
  room: string;
  online: boolean;
};

type GroupMessage = {
  id: number;
  userId: string;
  userName: string;
  userRoom: string;
  text: string;
  timestamp: string;
  read: boolean;
  isMe: boolean;
};

export default function DiscussionsPage() {
  const [messages, setMessages] = useState<GroupMessage[]>([
    {
      id: 1,
      userId: "101",
      userName: "Sarah",
      userRoom: "Room 101",
      text: "Anyone else having water pressure issues?",
      timestamp: "10:30 AM",
      read: true,
      isMe: false,
    },
    {
      id: 2,
      userId: "205",
      userName: "Mike",
      userRoom: "Room 205",
      text: "Yes, my kitchen tap is also weak",
      timestamp: "10:32 AM",
      read: true,
      isMe: false,
    },
    {
      id: 3,
      userId: "312",
      userName: "Emma",
      userRoom: "Room 312",
      text: "Mine is fine. Maybe just your floor?",
      timestamp: "10:35 AM",
      read: true,
      isMe: false,
    },
    {
      id: 4,
      userId: "me",
      userName: "You",
      userRoom: "Room 408",
      text: "I'll report it to the landlord",
      timestamp: "10:36 AM",
      read: true,
      isMe: true,
    },
    {
      id: 5,
      userId: "502",
      userName: "David",
      userRoom: "Room 502",
      text: "Thanks! Let us know what they say",
      timestamp: "10:38 AM",
      read: true,
      isMe: false,
    },
    {
      id: 6,
      userId: "101",
      userName: "Sarah",
      userRoom: "Room 101",
      text: "The WiFi in the common area is slow today",
      timestamp: "2:15 PM",
      read: true,
      isMe: false,
    },
    {
      id: 7,
      userId: "312",
      userName: "Emma",
      userRoom: "Room 312",
      text: "I noticed that too. Streaming keeps buffering",
      timestamp: "2:20 PM",
      read: true,
      isMe: false,
    },
    {
      id: 8,
      userId: "me",
      userName: "You",
      userRoom: "Room 408",
      text: "Found a set of keys near the elevator. Anyone missing keys?",
      timestamp: "4:45 PM",
      read: false,
      isMe: true,
    },
    {
      id: 9,
      userId: "205",
      userName: "Mike",
      userRoom: "Room 205",
      text: "Not mine. Try posting in the main lobby",
      timestamp: "4:50 PM",
      read: false,
      isMe: false,
    },
    {
      id: 10,
      userId: "101",
      userName: "Sarah",
      userRoom: "Room 101",
      text: "Reminder: Building cleaning tomorrow 8 AM. Please move your vehicles",
      timestamp: "7:30 PM",
      read: false,
      isMe: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [groupMembers] = useState<GroupMember[]>([
    { id: "101", name: "Sarah", room: "Room 101", online: true },
    { id: "205", name: "Mike", room: "Room 205", online: true },
    { id: "312", name: "Emma", room: "Room 312", online: false },
    { id: "408", name: "You", room: "Room 408", online: true },
    { id: "502", name: "David", room: "Room 502", online: true },
    { id: "601", name: "Lisa", room: "Room 601", online: false },
  ]);

  const [muted, setMuted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg: GroupMessage = {
      id: messages.length + 1,
      userId: "me",
      userName: "You",
      userRoom: "Room 408",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: false,
      isMe: true,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

    // Simulate other tenant replies
    setTimeout(() => {
      const replies = [
        { id: "101", name: "Sarah", room: "Room 101", text: "Good point!" },
        { id: "205", name: "Mike", room: "Room 205", text: "Agreed" },
        {
          id: "502",
          name: "David",
          room: "Room 502",
          text: "Thanks for sharing",
        },
      ];

      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const tenantReply: GroupMessage = {
        id: messages.length + 2,
        userId: randomReply.id,
        userName: randomReply.name,
        userRoom: randomReply.room,
        text: randomReply.text,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        read: false,
        isMe: false,
      };

      setMessages((prev) => [...prev, tenantReply]);
    }, 2000);
  };

  const { tenants } = useTenants();
  const onlineMembers = groupMembers.filter((member) => member.online).length;

  return (
    <TenantsProvider>
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
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="font-bold">Tenants Group</h1>
                  <p className="text-gray-400 text-sm">
                    {tenants.length} members
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMuted(!muted)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                {muted ? (
                  <VolumeX className="w-5 h-5 text-gray-400" />
                ) : (
                  <Volume2 className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Group Info Banner */}
      <div className="container mx-auto px-4 py-3">
        <div className="max-w-3xl mx-auto">
          <div className="p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-blue-400" />
                <p className="text-sm text-gray-300">
                  Group chat with all tenants. Be respectful and helpful.
                </p>
              </div>
              <button className="text-blue-400 hover:text-blue-300 text-sm">
                Guidelines
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages - WhatsApp-style scrollable container */}
      <div className="container mx-auto px-4 py-2">
        <div className="max-w-3xl mx-auto">
          <div
            ref={chatContainerRef}
            className="h-[calc(100vh-280px)] overflow-y-auto bg-gradient-to-b from-[#060219]/20 to-[#0a0429]/20 rounded-xl"
          >
            <div className="p-4 space-y-4">
              {/* Date separator */}
              <div className="text-center">
                <span className="px-4 py-1.5 bg-gray-800/50 text-gray-400 text-sm rounded-full">
                  Today
                </span>
              </div>

              {/* Messages */}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[80%]">
                    {!message.isMe && (
                      <div className="flex items-center gap-2 mb-1 ml-1">
                        <div
                          className={`w-2 h-2 rounded-full ${groupMembers.find((m) => m.id === message.userId)?.online ? "bg-green-500" : "bg-gray-500"}`}
                        ></div>
                        <span className="text-gray-300 text-sm font-medium">
                          {message.userName} • {message.userRoom}
                        </span>
                      </div>
                    )}

                    <div
                      className={`rounded-2xl p-3 ${
                        message.isMe
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 rounded-br-none"
                          : "bg-gray-800/70 rounded-bl-none"
                      }`}
                    >
                      <p className="text-white">{message.text}</p>
                      <div
                        className={`flex items-center gap-2 mt-2 ${message.isMe ? "justify-end" : "justify-start"}`}
                      >
                        <span className="text-gray-400 text-xs">
                          {message.timestamp}
                        </span>
                        {message.isMe && (
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
                </div>
              ))}

              {/* Online status indicator */}
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/30 rounded-full">
                  <div className="flex -space-x-2">
                    {groupMembers
                      .filter((member) => member.online)
                      .slice(0, 3)
                      .map((member, index) => (
                        <div
                          key={member.id}
                          className="w-6 h-6 bg-gradient-to-br from-green-600 to-green-700 rounded-full border-2 border-[#060219] flex items-center justify-center"
                          style={{ zIndex: 3 - index }}
                        >
                          <span className="text-xs font-bold">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      ))}
                  </div>
                  <span className="text-gray-400 text-sm">
                    {onlineMembers} tenants online
                  </span>
                </div>
              </div>

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-gradient-to-t from-[#060219] to-transparent pt-4">
        <div className="container mx-auto px-4 pb-6">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-3"
            >
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
                  placeholder="Message in Tenants Group..."
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
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    : "bg-gray-800/50 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </form>

            <div className="flex items-center justify-between mt-3">
              <p className="text-gray-500 text-xs">
                Messages are visible to all tenants in the building
              </p>
              <button className="text-gray-500 hover:text-gray-400 text-xs flex items-center gap-1">
                <Users className="w-3 h-3" />
                {groupMembers.length} members
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </TenantsProvider>
  );
}
