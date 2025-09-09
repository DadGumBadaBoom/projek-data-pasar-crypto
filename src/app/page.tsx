
'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Image from 'next/image';

const tokens = [
  { rank: 1, name: 'TROLL', price: '$0.1821', mcap: '$181.90M', change: '+2.57%', changeValue: 2.57, whales: 30, supplyBought: '0.62%' },
  { rank: 2, name: 'SPX', price: '$1.4144', mcap: '$164.30M', change: '+6.25%', changeValue: 6.25, whales: 11, supplyBought: '0.11%' },
  { rank: 3, name: 'GDP', price: '$0.0...1114', mcap: '$111.43K', change: '+1500.49%', changeValue: 1500.49, whales: 17, supplyBought: '13.91%' },
  { rank: 4, name: 'POLYAGENT', price: '$0.0...3280', mcap: '$328.08K', change: '+187.29%', changeValue: 187.29, whales: 16, supplyBought: '6.33%' },
  { rank: 5, name: 'IRYNA', price: '$0.002603', mcap: '$2.60M', change: '-43.90%', changeValue: -43.90, whales: 28, supplyBought: '2.48%' },
  { rank: 6, name: 'FWOG', price: '$0.0415', mcap: '$40.46M', change: '+0.86%', changeValue: 0.86, whales: 12, supplyBought: '0.38%' },
];

const chartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

export default function DashboardPage() {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <h2 className="text-3xl font-bold mb-6">Dasbor Analitik</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Nilai Terkunci</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125.7M</div>
            <p className="text-xs text-green-400">+5.2% dari kemarin</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Volume 24 Jam</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.3M</div>
            <p className="text-xs text-red-400">-10.1% dari kemarin</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paus Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-green-400">+87 paus baru</p>
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
            <CardDescription>Pergerakan nilai aset selama 6 bulan terakhir</CardDescription>
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
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
                            <div className="text-xs text-muted-foreground">{token.price}</div>
                       </div>
                    </div>
                   <div className={`text-sm font-medium ${token.changeValue > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {token.change}
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
                <TableRow key={token.rank} className="hover:bg-secondary/50">
                  <TableCell>{token.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3 font-medium">
                       <Image src={`https://picsum.photos/seed/${token.name}/40`} alt={token.name} width={40} height={40} className="w-10 h-10 rounded-full" data-ai-hint="logo" />
                       {token.name}
                    </div>
                  </TableCell>
                  <TableCell>{token.price}</TableCell>
                  <TableCell>{token.mcap}</TableCell>
                  <TableCell className={token.changeValue > 0 ? 'text-green-400' : 'text-red-400'}>{token.change}</TableCell>
                  <TableCell>{token.whales}</TableCell>
                  <TableCell>{token.supplyBought}</TableCell>
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
