"use client"
import { useState, useEffect, useRef } from 'react'
import { FaSignOutAlt,FaGoogle, FaUsers, FaArrowRight, FaCog, FaSmile, FaPaperclip } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
 
const Discussions = () => {
    const [newMessage, setNewMessage] = useState('')
    const [session, setSession] = useState(null)
    const [usersOnline, setUsersOnline] = useState([])
    const [messages, setMessages] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [emoji, setEmoji] = useState(false)
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)

  const send = () => {

  }
 
   

     
    
 

    return (
      <div className="min-h-screen bg-gray-900 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-800/70 backdrop-blur-xl rounded-2xl p-4 md:p-2 mb-6 border border-gray-700 shadow-xl">
            <p>Everyone can see your messages and reply to them</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
            <div className="bg-gray-900/80 p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                    Titans Chat Forum
                  </h1>
                  <p className="text-gray-400 text-sm mt-1">
                    Real-time messaging with everyone online
                  </p>
                </div>
                <button
                   className="text-gray-400 cursor-pointer hover:text-white p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <FaCog className="text-xl" />
                </button>
              </div>
            </div>

            <div className="h-[500px] md:h-[550px] p-4 overflow-y-auto bg-gradient-to-b from-gray-900/30 to-gray-800/30">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <div className="w-24 h-24 rounded-full bg-gray-800/50 flex items-center justify-center mb-4">
                    <FiSend className="text-4xl text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    No Discussions yet
                  </h3>
                  <p className="text-center">Be the first to send a message!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* {messages.map((msg, index) => {
                    const isMyMessage = msg?.user_id === session?.user?.id;

                    return (
                      <div
                        key={index}
                        className={`flex items-start gap-3 ${
                          isMyMessage ? "flex-row-reverse" : ""
                        }`}
                      >
                        {!isMyMessage && (
                          <img
                            src={msg.avatar}
                            alt="avatar"
                            className="w-10 h-10 rounded-full border-2 border-blue-500 flex-shrink-0"
                          />
                        )}

                        <div
                          className={`max-w-[70%] ${
                            isMyMessage ? "items-end" : "items-start"
                          }`}
                        >
                          {!isMyMessage && (
                            <p className="text-gray-300 text-sm mb-1 ml-1">
                              {msg.user_name}
                            </p>
                          )}
                          <div
                            className={`rounded-2xl p-3 ${
                              isMyMessage
                                ? "bg-gradient-to-r from-blue-600 to-blue-600 rounded-br-none"
                                : "bg-gray-700/80 rounded-bl-none"
                            }`}
                          >
                            <p className="text-white">{msg.message}</p>
                          </div>
                          <span className="text-xs text-gray-500 mt-1 px-1">
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    );
                  })} */}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-700 bg-gray-900/50">
              <form onSubmit={send} className="flex items-center gap-3">
                <button
                  type="button"
                  title="media"
                  className="text-gray-400 cursor-not-allowed hover:text-white p-3 rounded-xl hover:bg-gray-700/50 transition-colors"
                >
                  <FaPaperclip className="text-xl" />
                </button>

                <div className="flex-1 relative">
                  <input
                     type="text"
                    className="w-full bg-gray-800/70 border border-gray-600 rounded-xl py-3 px-4 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Type your message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onFocus={() => setIsTyping(true)}
                    onBlur={() => setIsTyping(false)}
                  />
                  <button
                    type="button"
                    onClick={() => setEmoji((prev) => !prev)}
                    title="emoji"
                    className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <FaSmile className="text-xl" />
                  </button>
                   
                </div>

                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className={`p-3 rounded-xl flex items-center cursor-pointer justify-center transition-all duration-300 transform hover:scale-105 ${
                    newMessage.trim()
                      ? "bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700"
                      : "bg-gray-700 cursor-not-allowed"
                  }`}
                >
                  <FiSend className="text-white text-xl" />
                </button>
              </form>

              {isTyping && (
                <div className="mt-2 ml-2">
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <span className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                      <span
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></span>
                    </span>
                    typing...
                  </span>
                </div>
              )}
            </div>
          </div>

           
        </div>
      </div>
    );
}

export default Discussions