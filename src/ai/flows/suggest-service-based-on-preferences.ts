'use server';
/**
 * @fileOverview A service suggestion AI agent.
 *
 * - suggestService - A function that suggests services based on user preferences.
 * - SuggestServiceInput - The input type for the suggestService function.
 * - SuggestServiceOutput - The return type for the suggestService function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestServiceInputSchema = z.object({
  hairType: z.string().optional().describe('The type of hair the user has.'),
  skinType: z.string().optional().describe('The type of skin the user has.'),
  preferences: z.string().describe('The preferences of the user.'),
});
export type SuggestServiceInput = z.infer<typeof SuggestServiceInputSchema>;

const SuggestServiceOutputSchema = z.object({
  suggestedServices: z
    .array(z.string())
    .describe('The list of suggested services based on the user input.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the service suggestions.'),
});
export type SuggestServiceOutput = z.infer<typeof SuggestServiceOutputSchema>;

export async function suggestService(input: SuggestServiceInput): Promise<SuggestServiceOutput> {
  return suggestServiceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestServicePrompt',
  input: {schema: SuggestServiceInputSchema},
  output: {schema: SuggestServiceOutputSchema},
  prompt: `You are an AI chatbot for GlamBot, a premium hair and beauty salon in Canada. Your purpose is to suggest salon services to users based on their hair type, skin type, and preferences.

Given the following information about the user:

Hair Type: {{#if hairType}}{{{hairType}}}{{else}}Not specified{{/if}}
Skin Type: {{#if skinType}}{{{skinType}}}{{else}}Not specified{{/if}}
Preferences: {{{preferences}}}

Suggest a list of services that would be most suitable for them. Also, provide a brief reasoning for why you are suggesting these services.

Output the services as a JSON array of strings, and the reasoning as a plain text string.

Example:
{
  "suggestedServices": ["Haircut", "Facial"],
  "reasoning": "Haircut is a good option for all hair types. Facial is a great option for improving the skin condition."
}

Make sure the suggested services are always a valid service that GlamBot offers, which include: Haircuts, Facials, Manicures, Bridal Makeup, Massage, Threading, Waxing, Skin Treatments.
`,
});

const suggestServiceFlow = ai.defineFlow(
  {
    name: 'suggestServiceFlow',
    inputSchema: SuggestServiceInputSchema,
    outputSchema: SuggestServiceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
