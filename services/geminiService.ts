
import { GoogleGenAI } from "@google/genai";
import { ContentParams } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODELS = {
  FAST: 'gemini-2.5-flash',
  REASONING: 'gemini-2.5-flash',
};

export const generateGrowthPlan = async (businessContext: string): Promise<string> => {
  const prompt = `
    Act as a senior business strategist. Create a 30-60-90 day growth plan for a business with the following context:
    "${businessContext}"
    
    Format the response with clear headers for Day 30, Day 60, and Day 90. 
    Focus on actionable, high-impact tasks for revenue, operations, and brand visibility.
    Use markdown formatting.
  `;
  const response = await ai.models.generateContent({ model: MODELS.REASONING, contents: prompt });
  return response.text || "Could not generate plan.";
};

export const generateSOP = async (taskName: string, role: string): Promise<string> => {
  const prompt = `
    Create a Standard Operating Procedure (SOP) for the task: "${taskName}".
    Role performing the task: ${role}.
    
    Structure:
    1. Objective
    2. Prerequisites
    3. Step-by-Step Instructions (numbered list)
    4. Quality Checklist
    5. Common Pitfalls to Avoid
    
    Keep it professional, clear, and concise.
  `;
  const response = await ai.models.generateContent({ model: MODELS.FAST, contents: prompt });
  return response.text || "Could not generate SOP.";
};

export const generateBrandContent = async (params: ContentParams): Promise<string> => {
  let instruction = "";
  const platform = params.platform ? `for ${params.platform}` : "";
  
  switch (params.type) {
    case 'story':
      instruction = `Write a compelling 'Founder's Story' or Brand Origin story ${platform}. Focus on the 'Why', the struggle, and the solution.`;
      break;
    case 'hook':
      instruction = `Generate 5 viral hooks/opening lines ${platform}. Make them punchy, curiosity-inducing, and natively formatted for the platform.`;
      break;
    case 'calendar':
      instruction = "Create a 1-week content calendar table. Columns: Day, Theme, Post Idea, Channel, Format.";
      break;
    default:
      instruction = `Write a high-converting social media post ${platform}. Include appropriate emojis, formatting (bullet points if needed), and a set of 15-20 relevant hashtags at the end.`;
      if (params.platform === 'youtube') {
         instruction += " Include Video Title, Description, and Tags.";
      }
      if (params.platform === 'twitter') {
         instruction += " Format as a thread if the content is long.";
      }
  }

  const prompt = `
    Act as a world-class brand strategist and social media expert.
    Task: ${instruction}
    Topic: ${params.topic}
    Context/Audience: ${params.context}
    Tone: ${params.tone}
    Platform: ${params.platform || 'General'}
    
    Output structured markdown.
  `;

  const response = await ai.models.generateContent({ model: MODELS.FAST, contents: prompt });
  return response.text || "Failed to generate content.";
};

export const generateCollabStrategy = async (niche: string): Promise<string> => {
  const prompt = `
    I am in the niche: "${niche}".
    1. List 3 types of influencers/partners I should collaborate with.
    2. Write a warm, personalized cold outreach DM script for each type.
    
    Format clearly with markdown.
  `;
  const response = await ai.models.generateContent({ model: MODELS.FAST, contents: prompt });
  return response.text || "Failed to generate strategy.";
};

export const createMindsetCoach = () => {
  return ai.chats.create({
    model: MODELS.FAST,
    config: {
      systemInstruction: `You are a world-class mindset coach for entrepreneurs. 
      Your goal is to build confidence, reframe negative thoughts, and boost motivation.
      Be empathetic, inspiring, and tough when needed. Keep responses concise and impactful.`,
    }
  });
};
