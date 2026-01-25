import React from 'react'

export default function Header({ onThemeToggle, isDark, onClearChat }) {
  return (
    <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border-b backdrop-blur-md sticky top-0 z-50`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center text-white font-bold shadow-lg">
              <i className="fas fa-brain"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">ChatAI</h1>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>AI Assistant</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* New Chat Button */}
            <button
              onClick={onClearChat}
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
              title="Start new chat"
            >
              <i className="fas fa-plus text-sm"></i>
              <span className="text-sm">New Chat</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className={`p-2.5 rounded-lg font-medium transition-all ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              <i className={`fas fa-${isDark ? 'sun' : 'moon'} text-sm`}></i>
            </button>

            {/* Menu */}
            <button
              className={`p-2.5 rounded-lg font-medium transition-all ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
              title="Menu"
            >
              <i className="fas fa-ellipsis-vertical text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
