
'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Image from 'next/image';

const initialTokens = [
  { rank: 1, name: 'TROLL', price: 0.1821, mcap: 181900000, change: 2.57, whales: 30, supplyBought: 0.62 },
  { rank: 2, name: 'SPX', price: 1.4144, mcap: 164300000, change: 6.25, whales: 11, supplyBought: 0.11 },
  { rank: 3, name: 'GDP', price: 0.0000001114, mcap: 111430, change: 1500.49, whales: 17, supplyBought: 13.91 },
  { rank: 4, name: 'POLYAGENT', price: 0.0000003280, mcap: 328080, change: 187.29, whales: 16, supplyBought: 6.33 },
  { rank: 5, name: 'IRYNA', price: 0.002603, mcap: 2600000, change: -43.90, whales: 28, supplyBought: 2.48 },
  { rank: 6, name: 'FWOG', price: 0.0415, mcap: 40460000, change: 0.86, whales: 12, supplyBought: 0.38 },
];

const initialChartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

const formatCurrency = (value: number) => {
    if (value < 0.001) {
        return `$0.0...${String(value).split('.').pop()?.substring(0, 4) || ''}`;
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4 }).format(value);
}

const formatMarketCap = (value: number) => {
    if (value >= 1000000000) {
        return `$${(value / 1000000000).toFixed(2)}B`;
    }
    if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(2)}M`;
    }
    if (value >= 1000) {
        return `$${(value / 1000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
}


export default function DashboardPage() {
  const [tokens, setTokens] = useState(initialTokens.map(t => ({...t})));
  const [chartData, setChartData] = useState(initialChartData);
  const [summary, setSummary] = useState({
    tvl: 125700000,
    volume: 2300000,
    activeWhales: 1254,
    tvlChange: 5.2,
    volumeChange: -10.1,
    newWhales: 87,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate token data update
      setTokens(prevTokens => 
        prevTokens.map(token => {
          const changePercent = (Math.random() - 0.5) * 5; // -2.5% to +2.5%
          const newPrice = token.price * (1 + changePercent / 100);
          const newMcap = token.mcap * (1 + changePercent / 100);
          const newChange = token.change + changePercent;
          return { ...token, price: newPrice, mcap: newMcap, change: newChange };
        })
      );

      // Simulate chart data update
      setChartData(prevData => {
        const newData = [...prevData];
        const lastPoint = newData[newData.length - 1];
        const newPointValue = lastPoint.value * (1 + (Math.random() - 0.45) * 0.1); // Fluctuate more gently
        newData.push({ name: new Date().toLocaleTimeString('id-ID').split('.')[0], value: Math.max(100, newPointValue) });
        if (newData.length > 10) {
          newData.shift();
        }
        return newData;
      });

      // Simulate summary cards update
      setSummary(prevSummary => {
         const tvlChange = (Math.random() - 0.5) * 2;
         const volumeChange = (Math.random() - 0.5) * 5;
         const newWhalesChange = Math.floor(Math.random() * 5) - 2;
         return {
            tvl: prevSummary.tvl * (1 + tvlChange / 100),
            volume: prevSummary.volume * (1 + volumeChange / 100),
            activeWhales: prevSummary.activeWhales + newWhalesChange,
            tvlChange: prevSummary.tvlChange + tvlChange,
            volumeChange: prevSummary.volumeChange + volumeChange,
            newWhales: prevSummary.newWhales + newWhalesChange,
         }
      })

    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);


  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <h2 className="text-3xl font-bold mb-6">Dasbor Analitik</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Nilai Terkunci</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMarketCap(summary.tvl)}</div>
            <p className={`text-xs ${summary.tvlChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {summary.tvlChange >= 0 ? '+' : ''}{summary.tvlChange.toFixed(1)}% dari kemarin
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Volume 24 Jam</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMarketCap(summary.volume)}</div>
            <p className={`text-xs ${summary.volumeChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {summary.volumeChange >= 0 ? '+' : ''}{summary.volumeChange.toFixed(1)}% dari kemarin
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paus Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Intl.NumberFormat('id-ID').format(summary.activeWhales)}</div>
            <p className="text-xs text-green-400">+{new Intl.NumberFormat('id-ID').format(summary.newWhales)} paus baru</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sentimen Pasar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">Bullish</div>
            <p className="text-xs text-muted-foreground">Indeks: 78/100</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Aktivitas Pasar</CardTitle>
            <CardDescription>Pergerakan nilai aset secara real-time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full p-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                   <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={['dataMin - 100', 'dataMax + 100']} />
                  <Tooltip 
                    contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: 'var(--radius)'
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#colorValue)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Aset Teratas</CardTitle>
            <CardDescription>Token dengan performa terbaik hari ini.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {tokens.slice(0, 4).map(token => (
                <div key={token.rank} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Image src={`https://picsum.photos/seed/${token.name}/32`} alt={token.name} width={32} height={32} className="w-8 h-8 rounded-full" data-ai-hint="logo" />
                       <div>
                            <div className="font-bold">{token.name}</div>
                            <div className="text-xs text-muted-foreground">{formatCurrency(token.price)}</div>
                       </div>
                    </div>
                   <div className={`text-sm font-medium ${token.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {token.change.toFixed(2)}%
                   </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Token Trending</CardTitle>
          <CardDescription>Tinjauan pasar mendalam untuk token yang sedang tren.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>MCap</TableHead>
                <TableHead>Perubahan 24 Jam</TableHead>
                <TableHead>Paus</TableHead>
                <TableHead>Pasokan Dibeli</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.map((token) => (
                <TableRow key={token.rank} className="hover:bg-secondary/50 tabular-nums">
                  <TableCell>{token.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3 font-medium">
                       <Image src={`https://picsum.photos/seed/${token.name}/40`} alt={token.name} width={40} height={40} className="w-10 h-10 rounded-full" data-ai-hint="logo" />
                       {token.name}
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(token.price)}</TableCell>
                  <TableCell>{formatMarketCap(token.mcap)}</TableCell>
                  <TableCell className={token.change > 0 ? 'text-green-400' : 'text-red-400'}>{token.change.toFixed(2)}%</TableCell>
                  <TableCell>{token.whales}</TableCell>
                  <TableCell>{token.supplyBought.toFixed(2)}%</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Lihat</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </main>
  );
}

    