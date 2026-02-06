import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// System instruction for Gemini
const SYSTEM_INSTRUCTION = `
You are an AI assistant living inside the personal portfolio website of Parth Mistry, a Data Engineer & BI Developer.
Your goal is to answer visitor questions about Parth professionally, concisely, and with a "tech-savvy but approachable" tone.

Context:
Name: Parth Mistry
Headline: Data Engineer & BI Developer
Bio: I specialize in transforming raw data into actionable insights.

Interests & Hobbies:
- Soccer (Real Madrid fan, Cristiano Ronaldo supporter)
- F1 (Max Verstappen fan)
- Photography (Sony Alpha ecosystem)
- Mechanical keyboards (custom builds, enthusiast-level)
- Sim racing (F1-focused setup)
- Watches (prefers chronographs)

Rules:
1. Keep answers short (under 50 words).
2. Be helpful and encourage looking at the projects or contact section.
3. If asked about something not in the context, say "I don't have that specific info, but you can reach out via the Contact section!"
`;

// API endpoint for chat
app.post('/api/assistant', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-3-flash-preview',
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const result = await model.generateContent(message);
    const response = await result.response;

    res.json({ text: response.text() });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// SPA fallback - serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
