'use client';

import type { AnalysisResult } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, GaugeCircle, Tags, Accessibility, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalysisResultsProps {
  data: AnalysisResult | null;
  isLoading: boolean;
}

const getReadabilityInfo = (score: number) => {
  if (score >= 90) return { text: 'Very Easy', color: 'bg-green-500', description: 'Easily understood by an average 11-year-old student.' };
  if (score >= 80) return { text: 'Easy', color: 'bg-green-400', description: 'Fairly easy to read.' };
  if (score >= 70) return { text: 'Fairly Easy', color: 'bg-lime-400', description: 'Plain English. Easily understood by 13- to 15-year-old students.' };
  if (score >= 60) return { text: 'Standard', color: 'bg-yellow-400', description: 'Easily understood by 15- to 17-year-old students.' };
  if (score >= 50) return { text: 'Fairly Difficult', color: 'bg-orange-400', description: 'Best understood by college graduates.' };
  if (score >= 30) return { text: 'Difficult', color: 'bg-orange-500', description: 'Best understood by university graduates.' };
  return { text: 'Very Confusing', color: 'bg-red-500', description: 'Best understood by university graduates.' };
};

export function AnalysisResults({ data, isLoading }: AnalysisResultsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const readabilityInfo = getReadabilityInfo(data.readabilityScore);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="col-span-1 md:col-span-2 animate-in fade-in-50 duration-500">
        <CardHeader>
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl font-headline">Content Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed">{data.summary}</p>
        </CardContent>
      </Card>

      <Card className="animate-in fade-in-50 duration-700">
        <CardHeader>
          <div className="flex items-center gap-3">
            <GaugeCircle className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl font-headline">Readability</CardTitle>
          </div>
          <CardDescription>{readabilityInfo.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold">{data.readabilityScore.toFixed(0)}</span>
            <div className="flex-1">
              <span className="font-semibold">{readabilityInfo.text}</span>
              <Progress value={data.readabilityScore} indicatorClassName={readabilityInfo.color} className="h-3 mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="animate-in fade-in-50 duration-1000">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Accessibility className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl font-headline">Accessibility</CardTitle>
          </div>
           <CardDescription>
            Basic check for missing image alternative text.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex items-center gap-4">
            {data.accessibility.missingAltTags === 0 ? (
                <div className="flex items-center gap-2 text-green-600">
                    <Accessibility className="w-8 h-8"/>
                    <p className="font-semibold text-lg">Great! All images have alt text.</p>
                </div>
            ) : (
                <div className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="w-8 h-8"/>
                    <p className="font-semibold text-lg">{data.accessibility.missingAltTags} image(s) are missing alt text.</p>
                </div>
            )}
           </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2 animate-in fade-in-50 duration-1000">
        <CardHeader>
           <div className="flex items-center gap-3">
            <Tags className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl font-headline">Extracted Keywords</CardTitle>
          </div>
          <CardDescription>Relevant keywords for SEO and content analysis.</CardDescription>
        </CardHeader>
        <CardContent>
          {data.keywords && data.keywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.keywords.map((keyword) => (
                <Badge key={keyword} variant="secondary" className="text-sm px-3 py-1">{keyword}</Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No keywords were extracted.</p>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
