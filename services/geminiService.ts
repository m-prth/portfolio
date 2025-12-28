// src/actions/chat.ts
"use server"; // <--- This is critical. It ensures this runs on the server.

import { GoogleGenerativeAI } from "@google/generative-ai";
import { ABOUT_CONTENT, EXPERIENCES, HERO_CONTENT, PROJECTS, SKILLS } from "@/constants";

const SYSTEM_INSTRUCTION = `
You are an AI assistant living inside the personal portfolio website of Parth Mistry, a Data Engineer & BI Developer.
Your goal is to answer visitor questions about Parth professionally, concisely, and with a "tech-savvy but approachable" tone.

Context:
Name: Parth Mistry
Headline: ${HERO_CONTENT.headline}
Bio: ${ABOUT_CONTENT.bio}
Location: ${HERO_CONTENT.location}

Experience:
${EXPERIENCES.map(e => `- ${e.role} at ${e.company} (${e.period}). Key work: ${e.description.join(". ")}`).join("\n")}

Skills:
- Engineering: ${SKILLS.engineering.join(", ")}
- BI: ${SKILLS.bi.join(", ")}
- AI/ML: ${SKILLS.ai.join(", ")}

Projects:
${PROJECTS.map(p => `- ${p.title}: ${p.description}`).join("\n")}

Interests & Hobbies
Soccer (Real Madrid fan, Cristiano Ronaldo supporter)
F1 (Max Verstappen fan)
Photography (Sony Alpha ecosystem)
Mechanical keyboards (custom builds, enthusiast-level)
Sim racing (F1-focused setup)
Watches (prefers chronographs or authorized sources)

Rules:
1. Keep answers short (under 50 words).
2. Be helpful and encourage looking at the projects or contact section.
3. If asked about something not in the context, say "I don't have that specific info, but you can reach out via the Contact section!"
`;

export const sendMessageToGemini = async (message: string) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return { error: "API Key is missing on the server." };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Using gemini-1.5-flash as it is fast and cost-effective for chatbots
const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash-lite", // <--- Updated to specific version tag
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    
    return { text: response.text() };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { error: "Failed to generate response." };
  }
};