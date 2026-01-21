'use server';
/**
 * @fileOverview A conversational AI assistant for the Inspira website.
 *
 * - chat - A function that handles the conversation with the AI.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { ChatMessageSchema, type ChatMessage } from '@/ai/types';

export async function chat(history: ChatMessage[]): Promise<ChatMessage> {
  const result = await chatFlow({ history });
  return result;
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: z.object({ history: z.array(ChatMessageSchema) }),
    outputSchema: ChatMessageSchema,
  },
  async ({ history }) => {
    const systemPrompt = `You are Inspira, a friendly and expert AI assistant for a creator marketing agency also named Inspira. Your goal is to help visitors, brands, and creators.

Your personality is:
- Helpful and encouraging
- Knowledgeable about influencer and creator marketing
- Helpful and encouraging
- Knowledgeable about influencer and creator marketing
- Professional, yet approachable and slightly informal
- You always keep your answers concise and to the point.
- Professional, yet approachable and slightly informal
- You always keep your answers concise and to the point.

The website you are on connects brands with vetted content creators.
- For Brands: We offer access to a curated network of creators, strategic matching, and managed campaigns.
- For Creators: We offer partnerships with respectful brands, fair compensation, and we handle the business logistics so they can focus on creating.

Based on the conversation history, provide a helpful and relevant response to the user's latest message.`;
    
    // Convert our ChatMessage array to the format expected by ai.generate
    const generateHistory = history.map(msg => ({
        text: msg.content,
        role: msg.role
    }));

    const response = await ai.generate({
      prompt: [
        { text: systemPrompt },
        ...generateHistory,
      ],
    });

    return {
        role: 'model',
        content: response.text,
    };
  }
);
