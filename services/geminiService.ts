
import { GoogleGenAI, Type } from "@google/genai";
import { WritingFormat, GradeLevel, WritingRequest, WritingResponse } from "../types";

const getSystemInstruction = () => `
You are a highly experienced English Educator in an Indian school with over 20 years of experience teaching CBSE and ICSE boards.
Your mastery includes Essay writing, Paragraph writing, Report writing, and Notice writing.
Your writing style is:
1. Simple, clear, and easy-to-understand English.
2. Grammatically impeccable but avoiding overly complex vocabulary.
3. Culturally relevant to the Indian context (e.g., mentioning Indian schools, festivals, social issues).
4. Strictly following standard board formats:
   - NOTICE: Box format, School Name, NOTICE, Date, Heading, Body, Name/Designation.
   - REPORT: Headline, Byline (By [Name]), Date & Place, three paragraphs (Intro, Details, Conclusion).
   - ESSAY: Clear Introduction, 2-3 body paragraphs, and a strong Conclusion.
   - PARAGRAPH: A single cohesive block of text focusing on one idea.

Return the response in JSON format.
`;

export const generateWritingContent = async (request: WritingRequest): Promise<WritingResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Write a ${request.format} on the topic: "${request.topic}".
    The target audience is students of ${request.grade} level.
    Keep the language simple and follow the standard Indian school board format for ${request.format}.
    Also provide 3 specific 'Teacher Tips' to help the student improve this piece of writing.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(),
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            content: {
              type: Type.STRING,
              description: "The formatted writing piece."
            },
            teacherTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 helpful tips from an Indian teacher's perspective."
            }
          },
          required: ["content", "teacherTips"]
        }
      }
    });

    const data = JSON.parse(response.text);
    return data as WritingResponse;
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate content. Please try again.");
  }
};
