const express=require('express')
const cors=require('cors')
require('dotenv').config();
const {GoogleGenerativeAI}= require('@google/generative-ai');

let app=express();
app.use(cors());
app.use(express.json());

let model = null
let useMock = false

// Function to clean markdown formatting from text
const cleanMarkdown = (text) => {
  return text
    .replace(/\*\*/g, '') // Remove bold **text**
    .replace(/\*/g, '')   // Remove italics *text*
    .replace(/##/g, '')   // Remove headers ##
    .replace(/\n+/g, ' ') // Replace newlines with space
    .trim()
}

if (!process.env.KEY) {
  console.warn('WARNING: No API key provided (process.env.KEY). Backend will run in mock mode.');
  useMock = true
} else {
  try {
    const genAi = new GoogleGenerativeAI(process.env.KEY);
    model = genAi.getGenerativeModel({ model: 'gemini-2.5-flash' })
  } catch (err) {
    console.error('failed to initialize generative model SDK:', err.message)
    useMock = true
  }
}

app.post('/ask', async (req, res) => {
  try {
    const { question } = req.body
    if (!question) return res.status(400).send({ _status: false, _message: 'question is required' })
    let text
    if (useMock) {
      text = `Mock reply: I received your question: "${question}"`;
    } else {
      const result = await model.generateContent(question)
      const response = await result.response
      text = response.text()
    }

    return res.send({
      _status: true,
      _message: 'content generated',
      _finalData: text
    })
  } catch (err) {
    console.error('error generating content', err)
    return res.status(500).send({ _status: false, _message: 'internal server error', _error: err.message })
  }
})

app.post('/gemini', async (req, res) => {
  try {
    const { prompt } = req.body
    if (!prompt) return res.status(400).send({ success: false, message: 'prompt is required' })
    let text
    if (useMock) {
      text = `Mock reply: I received your prompt: "${prompt}"`;
    } else {
      const result = await model.generateContent(prompt)
      const response = await result.response
      text = cleanMarkdown(response.text())
    }

    return res.send({
      success: true,
      message: text
    })
  } catch (err) {
    console.error('error generating content', err)

    return res.status(500).send({ success: false, message: 'internal server error', error: err.message })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`)
})
app.get('/', (req, res) => {
  return res.send({ _status: true, _message: 'ok' })
})