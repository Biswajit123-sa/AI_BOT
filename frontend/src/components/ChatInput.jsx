import React, { useState, useRef } from 'react'

export default function ChatInput({ onSendMessage, isDark, onVoiceInput, isListening }) {
  const [input, setInput] = useState('')
  const textAreaRef = useRef(null)

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input)
      setInput('')
      if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInput = (e) => {
    setInput(e.target.value)
    // Auto-resize textarea
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = Math.min(textAreaRef.current.scrollHeight, 120) + 'px'
    }
  }

  const handleVoiceClick = () => {
    onVoiceInput()
  }

  return (
    <div className={`border-t ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div
          className={`flex items-end gap-3 p-4 rounded-2xl transition-all ${
            isDark
              ? 'bg-gray-700 border border-gray-600'
              : 'bg-gray-50 border border-gray-200'
          }`}
        >
          {/* Voice Button */}
          <button
            onClick={handleVoiceClick}
            className={`shrink-0 p-2.5 rounded-full font-medium transition-all ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg scale-110'
                : isDark
                  ? 'bg-gray-600 hover:bg-gray-500 text-gray-300 hover:text-white'
                  : 'bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800 border border-gray-300'
            }`}
            title={isListening ? 'Stop listening' : 'Start voice input'}
          >
            <i className={`fas fa-microphone text-sm ${isListening ? 'animate-pulse' : ''}`}></i>
          </button>

          {/* Input Area */}
          <div className="flex-1 flex flex-col">
            <textarea
              ref={textAreaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Message ChatAI... (or use voice)"
              rows="1"
              className={`w-full resize-none font-sans text-sm placeholder-gray-400 focus:outline-none ${
                isDark
                  ? 'bg-gray-700 text-white placeholder-gray-400'
                  : 'bg-transparent text-gray-800 placeholder-gray-500'
              }`}
              style={{ maxHeight: '120px' }}
            />
            {isListening && (
              <p className={`text-xs mt-1 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                🎤 Listening... Speak now
              </p>
            )}
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`shrink-0 p-2.5 rounded-full font-medium transition-all ${
              input.trim()
                ? 'gradient-button text-white hover:shadow-lg'
                : isDark
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            title="Send message"
          >
            <i className="fas fa-paper-plane text-sm"></i>
          </button>
        </div>

        <p className={`text-xs text-center mt-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          ChatAI can make mistakes. Always verify important information.
        </p>
      </div>
    </div>
  )
}
