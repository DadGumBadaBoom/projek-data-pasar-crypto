'use server';
/**
 * @fileOverview Extracts relevant keywords from a webpage's content for SEO optimization.
 *
 * - extractKeywordsForSEO - A function that takes webpage content and returns keywords.
 * - ExtractKeywordsForSEOInput - The input type for the extractKeywordsForSEO function.
 * - ExtractKeywordsForSEOOutput - The return type for the extractKeywordsForSEO function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractKeywordsForSEOInputSchema = z.object({
  webpageContent: z
    .string()
    .describe('The content of the webpage to extract keywords from.'),
});
export type ExtractKeywordsForSEOInput = z.infer<typeof ExtractKeywordsForSEOInputSchema>;

const ExtractKeywordsForSEOOutputSchema = z.object({
  keywords: z
    .array(z.string())
    .describe('The extracted keywords relevant for SEO.'),
});
export type ExtractKeywordsForSEOOutput = z.infer<typeof ExtractKeywordsForSEOOutputSchema>;

export async function extractKeywordsForSEO(input: ExtractKeywordsForSEOInput): Promise<ExtractKeywordsForSEOOutput> {
  return extractKeywordsForSEOFlow(input);
}

const extractKeywordsPrompt = ai.definePrompt({
  name: 'extractKeywordsPrompt',
  input: {schema: ExtractKeywordsForSEOInputSchema},
  output: {schema: ExtractKeywordsForSEOOutputSchema},
  prompt: `You are an SEO expert. Extract the most relevant keywords from the following webpage content for search engine optimization. Return a list of keywords only.\n\nWebpage Content: {{{webpageContent}}}`,
});

const extractKeywordsForSEOFlow = ai.defineFlow(
  {
    name: 'extractKeywordsForSEOFlow',
    inputSchema: ExtractKeywordsForSEOInputSchema,
    outputSchema: ExtractKeywordsForSEOOutputSchema,
  },
  async input => {
    const {output} = await extractKeywordsPrompt(input);
    return output!;
  }
);
