import React, { forwardRef } from 'react'
import ChatBubble from './ChatBubble'
import TypingIndicator from './TypingIndicator'

const ChatContainer = forwardRef(({ messages, isLoading, isDark }, ref) => {
  return (
    <div className={`flex-1 overflow-y-auto ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-sparkles text-3xl text-purple-500"></i>
              </div>
              <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Start a conversation
              </h2>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Ask me anything and I'll do my best to help
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} isDark={isDark} />
            ))}
            {isLoading && <TypingIndicator isDark={isDark} />}
            <div ref={ref} />
          </>
        )}
      </div>
    </div>
  )
})

ChatContainer.displayName = 'ChatContainer'

export default ChatContainer
