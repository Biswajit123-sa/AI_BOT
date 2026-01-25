import React from 'react'

export default function ChatBubble({ message, isDark }) {
  const isUser = message.sender === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      {!isUser && (
        <div className="mr-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center text-white text-sm font-semibold shadow-md">
            <i className="fas fa-brain"></i>
          </div>
        </div>
      )}

      <div
        className={`${
          isUser
            ? 'chat-bubble-user'
            : isDark
              ? 'mr-auto bg-gray-800 border border-gray-700 text-white rounded-3xl rounded-tl-lg px-5 py-3 max-w-xs lg:max-w-md shadow-sm'
              : 'chat-bubble-ai'
        }`}
      >
        <p className="text-sm sm:text-base leading-relaxed wrap-break-word whitespace-pre-wrap">{message.text}</p>
        <span className={`text-xs mt-2 block ${isUser ? 'text-purple-600' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>

      {isUser && (
        <div className="ml-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center text-white text-sm font-semibold shadow-md">
            <i className="fas fa-user"></i>
          </div>
        </div>
      )}
    </div>
  )
}
