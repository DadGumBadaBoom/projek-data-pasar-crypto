'use client';

import { useState, useTransition, useEffect, useRef } from 'react';
import { analyzeUrl, type AnalysisResult } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, LoaderCircle } from 'lucide-react';
import { AnalysisResults } from '@/components/analysis-results';
import { Logo } from '@/components/logo';

const urlSchema = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState('');
  const resultsRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) {
      const err = 'Please enter a URL to analyze.';
      setError(err);
      toast({ variant: 'destructive', title: 'Invalid Input', description: err });
      return;
    }
    if (!urlSchema.test(url)) {
      const err = 'Please enter a valid URL.';
      setError(err);
      toast({ variant: 'destructive', title: 'Invalid URL', description: err });
      return;
    }

    // Add https:// if missing
    const fullUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    const formData = new FormData();
    formData.append('url', fullUrl);
    
    setError(null);
    setResult(null);

    startTransition(async () => {
      const response = await analyzeUrl(formData);
      if (response.error) {
        setError(response.error);
        toast({ variant: 'destructive', title: 'Analysis Failed', description: response.error });
      } else {
        setResult(response as AnalysisResult);
      }
    });
  };

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [result]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex items-center gap-4">
                <Logo className="w-16 h-16 text-primary" />
                <h1 className="text-4xl font-bold tracking-tighter font-headline sm:text-5xl md:text-6xl lg:text-7xl">
                  ScreenVoyager
                </h1>
              </div>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Unlock insights from any webpage. Our AI-powered tool analyzes content, readability, and more.
              </p>
            </div>
            <div className="mx-auto w-full max-w-2xl mt-12">
              <Card className="shadow-lg">
                <CardContent className="p-4">
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="url"
                        name="url"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="pl-10 h-12 text-base bg-white"
                        disabled={isPending}
                        aria-label="URL to analyze"
                      />
                    </div>
                    <Button type="submit" size="lg" className="h-12" disabled={isPending}>
                      {isPending ? (
                        <>
                          <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        'Analyze'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <div ref={resultsRef}>
          {(isPending || result) && (
             <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                  <AnalysisResults data={result} isLoading={isPending} />
                </div>
              </section>
          )}
        </div>
      </main>
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p className="text-muted-foreground">© {new Date().getFullYear()} ScreenVoyager. All rights reserved.</p>
      </footer>
    </div>
  );
}
