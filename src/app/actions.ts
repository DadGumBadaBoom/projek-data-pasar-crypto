'use server';

import { JSDOM } from 'jsdom';
import { summarizeWebpageContent } from '@/ai/flows/summarize-webpage-content';
import { determineContentReadability } from '@/ai/flows/determine-content-readability';
import { extractKeywordsForSEO } from '@/ai/flows/extract-keywords-for-seo';

export type AnalysisResult = {
  summary: string;
  readabilityScore: number;
  keywords: string[];
  accessibility: {
    missingAltTags: number;
    imagesWithoutAlt: { src: string; alt: string }[];
  };
  error?: string;
};

export async function analyzeUrl(formData: FormData): Promise<AnalysisResult | { error: string }> {
  const url = formData.get('url') as string;

  if (!url) {
    return { error: 'URL is required.' };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch URL. Status: ${response.status} ${response.statusText}`);
    }
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    document.querySelectorAll('script, style, noscript, svg, header, footer, nav, aside').forEach((el) => el.remove());
    const webpageContent = document.body?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
    
    if (!webpageContent) {
      return { error: 'Could not extract any text content from the webpage.' };
    }

    const images = Array.from(document.querySelectorAll('img'));
    const imagesWithoutAlt = images
      .filter((img) => !img.alt?.trim())
      .map((img) => ({ src: img.src, alt: img.alt }))
      .slice(0, 5);

    const [summaryResult, readabilityResult, keywordsResult] = await Promise.all([
      summarizeWebpageContent({ url }),
      determineContentReadability(webpageContent),
      extractKeywordsForSEO({ webpageContent }),
    ]);

    return {
      summary: summaryResult.summary,
      readabilityScore: readabilityResult > 0 ? readabilityResult : 0,
      keywords: keywordsResult.keywords,
      accessibility: {
        missingAltTags: images.filter((img) => !img.alt?.trim()).length,
        imagesWithoutAlt,
      },
    };
  } catch (e: any) {
    console.error('Analysis error:', e);
    let errorMessage = 'An unexpected error occurred during analysis.';
    if (e.name === 'AbortError') {
      errorMessage = 'The request timed out. The target website might be too slow to respond.';
    } else if (e.message) {
      errorMessage = e.message;
    }
    return { error: errorMessage };
  }
}
