// src/app/actions.ts
'use server';

import { answerSalonQuestions } from '@/ai/flows/answer-salon-questions-with-gemini';
import { suggestService } from '@/ai/flows/suggest-service-based-on-preferences';
import { getPersonalizedRecommendations } from '@/ai/flows/personalize-service-recommendations';
import { users, type User, addUser, validateUser } from '@/lib/auth';

// This simulates a logged-in user's data for personalization.
// In a real app, you would fetch this from your database based on the authenticated user.
const simulatedUserData = {
  clientId: 'client-456',
  serviceHistory: ['Haircut', 'Massage'],
  preferences: 'I prefer relaxing treatments and low-maintenance hairstyles.',
};

export async function getBotResponse(message: string): Promise<string> {
  const lowerCaseMessage = message.toLowerCase();

  try {
    // Basic intent detection based on keywords
    if (lowerCaseMessage.includes('for me') || lowerCaseMessage.includes('personal') || lowerCaseMessage.includes('last time')) {
      // Trigger personalization flow
      const result = await getPersonalizedRecommendations(simulatedUserData);
      const recommendations = result.recommendations.join(', ');
      return `Welcome back! Based on your history, I thought you might like these services: ${recommendations}. Would you like to book one?`;
    } else if (lowerCaseMessage.includes('suggest') || lowerCaseMessage.includes('recommend') || lowerCaseMessage.includes('what should i get')) {
      // Trigger suggestion flow
      const result = await suggestService({ preferences: message });
      const suggestions = result.suggestedServices.join(', ');
      return `${result.reasoning} With that in mind, I suggest the following: ${suggestions}.`;
    } else {
      // Default to general Q&A
      const result = await answerSalonQuestions({ question: message });
      return result.answer;
    }
  } catch (error) {
    console.error('AI Flow Error:', error);
    return "I'm sorry, I'm having a little trouble connecting to my knowledge base. Please ask again in a moment.";
  }
}

export async function signupUser(user: Omit<User, 'id'>): Promise<{ success: boolean; message: string }> {
  try {
    addUser(user);
    return { success: true, message: 'Signup successful!' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function loginUser(credentials: Omit<User, 'id' | 'name'>): Promise<{ success: boolean; message: string }> {
    const user = validateUser(credentials);
    if (user) {
        return { success: true, message: 'Login successful!' };
    } else {
        return { success: false, message: 'Invalid email or password.' };
    }
}
