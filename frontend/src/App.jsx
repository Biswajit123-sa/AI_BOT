import { useState, useRef, useEffect, useCallback } from 'react'
import Header from './components/Header'
import ChatContainer from './components/ChatContainer'
import ChatInput from './components/ChatInput'
import './App.css'

const API_BASE_URL = 'https://ai-bot-fjez.onrender.com'

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 I'm ChatAI, your intelligent assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const chatEndRef = useRef(null)
  const recognitionRef = useRef(null)
  const handleSendMessageRef = useRef(null)

  // Initialize Speech Recognition API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.onresult = (event) => {
        let transcript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript
        }
        if (event.results[event.results.length - 1].isFinal) {
          if (transcript.trim()) {
            // Call handleSendMessage directly
            if (handleSendMessageRef.current) {
              handleSendMessageRef.current(transcript.trim())
            }
          }
        }
      }

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }
  }, [])

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessageToBackend = async (prompt) => {
    try {
      const response = await fetch(`${API_BASE_URL}/gemini`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API error: ${response.status} - ${errorText}`)
        
        if (response.status === 429) {
          return "I'm being rate limited. Please wait a moment and try again."
        } else if (response.status === 401) {
          return "There's an issue with the API configuration. Please check the backend setup."
        } else if (response.status === 400) {
          return "Invalid request format. Please try again."
        } else {
          return `Server error: ${errorText || response.status}`
        }
      }

      const text = await response.text()
      if (!text || text.trim() === '') {
        return "I received an empty response. Please try again."
      }
      
      try {
        const jsonResponse = JSON.parse(text)
        return jsonResponse.message || text
      } catch (e) {
        return text
      }
    } catch (error) {
      console.error('Error calling backend:', error)
      
      if (error.message === 'Failed to fetch') {
        return "Cannot connect to the backend server. Make sure it's running on https://ai-bot-fjez.onrender.com/"
      }
      
      return `Error: ${error.message || 'Unknown error occurred'}`
    }
  }

  const handleSendMessage = useCallback(async (text) => {
    if (!text.trim()) return

    // Add user message using functional update
    let userMessageId = 1
    setMessages((prev) => {
      userMessageId = prev.length + 1
      return [...prev, {
        id: userMessageId,
        text: text,
        sender: 'user',
        timestamp: new Date(),
      }]
    })
    setIsLoading(true)

    try {
      // Get AI response from backend
      const aiResponse = await sendMessageToBackend(text)

      setMessages((prev) => {
        const aiMessageId = prev.length + 1
        return [...prev, {
          id: aiMessageId,
          text: aiResponse,
          sender: 'ai',
          timestamp: new Date(),
        }]
      })
    } catch (error) {
      console.error('Error:', error)
      setMessages((prev) => {
        const errorMessageId = prev.length + 1
        return [...prev, {
          id: errorMessageId,
          text: "I apologize, but I'm currently unable to respond. Please try again later.",
          sender: 'ai',
          timestamp: new Date(),
        }]
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Update ref whenever handleSendMessage changes
  useEffect(() => {
    handleSendMessageRef.current = handleSendMessage
  }, [handleSendMessage])

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported in your browser')
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
    }
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! 👋 I'm ChatAI, your intelligent assistant. How can I help you today?",
        sender: 'ai',
        timestamp: new Date(),
      },
    ])
  }

  return (
    <div className={`flex flex-col h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <Header onThemeToggle={toggleTheme} isDark={isDark} onClearChat={clearChat} />
      <ChatContainer messages={messages} isLoading={isLoading} isDark={isDark} ref={chatEndRef} />
      <ChatInput 
        onSendMessage={handleSendMessage} 
        isDark={isDark} 
        onVoiceInput={handleVoiceInput}
        isListening={isListening}
      />
    </div>
  )
}

export default App
