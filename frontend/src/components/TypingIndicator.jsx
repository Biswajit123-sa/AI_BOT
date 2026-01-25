import React from 'react'

export default function TypingIndicator({ isDark }) {
  return (
    <div className="flex items-end gap-3">
      <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center text-white text-sm font-semibold shadow-md shrink-0">
        <i className="fas fa-brain"></i>
      </div>

      <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} rounded-3xl rounded-tl-lg px-5 py-3 shadow-sm`}>
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}
