'use server';
/**
 * @fileOverview This file defines a Genkit flow for summarizing the content of a webpage.
 *
 * The flow takes a URL as input, scrapes the content, and returns a concise summary.
 * It exports the SummarizeWebpageContent function, SummarizeWebpageContentInput type, and SummarizeWebpageContentOutput type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { JSDOM } from 'jsdom';

const SummarizeWebpageContentInputSchema = z.object({
  url: z.string().url().describe('The URL of the webpage to summarize.'),
});
export type SummarizeWebpageContentInput = z.infer<typeof SummarizeWebpageContentInputSchema>;

const SummarizeWebpageContentOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the webpage content.'),
});
export type SummarizeWebpageContentOutput = z.infer<typeof SummarizeWebpageContentOutputSchema>;

export async function summarizeWebpageContent(input: SummarizeWebpageContentInput): Promise<SummarizeWebpageContentOutput> {
  return summarizeWebpageContentFlow(input);
}

async function scrapeWebpageContent(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract all text content from the body
    const textContent = document.body ? document.body.textContent : '';

    // Remove extra whitespace and newlines
    const cleanedText = textContent!.replace(/\s+/g, ' ').trim();

    return cleanedText;
  } catch (error) {
    console.error('Error scraping webpage:', error);
    return 'Failed to scrape webpage content.';
  }
}

const summarizeWebpageContentPrompt = ai.definePrompt({
  name: 'summarizeWebpageContentPrompt',
  input: {schema: SummarizeWebpageContentInputSchema},
  output: {schema: SummarizeWebpageContentOutputSchema},
  prompt: `Summarize the following webpage content in a concise manner:\n\n{{{content}}}`,
});

const summarizeWebpageContentFlow = ai.defineFlow(
  {
    name: 'summarizeWebpageContentFlow',
    inputSchema: SummarizeWebpageContentInputSchema,
    outputSchema: SummarizeWebpageContentOutputSchema,
  },
  async input => {
    const content = await scrapeWebpageContent(input.url);
    const {output} = await summarizeWebpageContentPrompt({content});
    return output!;
  }
);
