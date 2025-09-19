'use server';

/**
 * @fileOverview An AI assistant for the contact form that predicts the user's intent and suggests relevant services.
 *
 * - contactFormAICompletion - A function that handles the intent prediction and service suggestion process.
 * - ContactFormAICompletionInput - The input type for the contactFormAICompletion function.
 * - ContactFormAICompletionOutput - The return type for the contactFormAICompletion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContactFormAICompletionInputSchema = z.object({
  message: z
    .string()
    .describe('The user message from the contact form.'),
});
export type ContactFormAICompletionInput = z.infer<typeof ContactFormAICompletionInputSchema>;

const ContactFormAICompletionOutputSchema = z.object({
  predictedIntent: z.string().describe('The predicted intent of the user message.'),
  suggestedServices: z.array(z.string()).describe('The suggested services based on the predicted intent.'),
});
export type ContactFormAICompletionOutput = z.infer<typeof ContactFormAICompletionOutputSchema>;

export async function contactFormAICompletion(input: ContactFormAICompletionInput): Promise<ContactFormAICompletionOutput> {
  return contactFormAICompletionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contactFormAICompletionPrompt',
  input: {schema: ContactFormAICompletionInputSchema},
  output: {schema: ContactFormAICompletionOutputSchema},
  prompt: `You are an AI assistant helping users fill out a contact form. Your task is to predict the intent of the user's message and suggest relevant services.

User Message: {{{message}}}

Based on the user message, predict their intent and suggest relevant services. The intent should be a short phrase. The suggested services should be an array of strings.

Format your response as a JSON object with "predictedIntent" and "suggestedServices" fields. Make sure the suggestedServices field is a JSON array of strings.
`, 
});

const contactFormAICompletionFlow = ai.defineFlow(
  {
    name: 'contactFormAICompletionFlow',
    inputSchema: ContactFormAICompletionInputSchema,
    outputSchema: ContactFormAICompletionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
