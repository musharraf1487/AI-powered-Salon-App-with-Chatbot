// src/ai/flows/personalize-service-recommendations.ts
'use server';

/**
 * @fileOverview Provides personalized service recommendations based on client history.
 *
 * - `getPersonalizedRecommendations` - A function that returns personalized service recommendations.
 * - `PersonalizedRecommendationsInput` - The input type for the `getPersonalizedRecommendations` function.
 * - `PersonalizedRecommendationsOutput` - The return type for the `getPersonalizedRecommendations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  clientId: z.string().describe('The unique identifier for the client.'),
  serviceHistory: z.array(z.string()).describe('List of services previously used by the client.'),
  preferences: z.string().describe('The stated preferences of the client.'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of personalized service recommendations.'),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizeServiceRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeServiceRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI assistant at a hair and beauty salon.

You will receive client information and preferences, and you will respond with service recommendations.

Client ID: {{{clientId}}}
Service History: {{#if serviceHistory}}{{#each serviceHistory}}- {{{this}}}{{/each}}{{else}}No past services{{/if}}
Preferences: {{{preferences}}}

Based on this information, what services would you recommend? Return the recommendations as a list.

Output format: { \"recommendations\": [\"recommendation 1\", \"recommendation 2\", ...]}
`,
});

const personalizeServiceRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizeServiceRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
