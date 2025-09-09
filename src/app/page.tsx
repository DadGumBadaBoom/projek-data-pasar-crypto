
'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Wallet, LineChart, Users, Settings, Bell, Menu, TrendingUp, Compass, Sun, Moon } from 'lucide-react';
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
    <div className="bg-background text-foreground min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-card p-4 flex flex-col items-center lg:items-start transition-all duration-300">
        <div className="flex items-center justify-center lg:justify-start gap-2 mb-10 w-full">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-primary"
            >
              <path
                d="M2 17C2 14.1667 2.00001 12.0625 3.5 10.5625C4.95833 9.02083 7.08333 9 10 9H14C16.9167 9 19.0417 9.02083 20.5 10.5625C22 12.0625 22 14.1667 22 17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M9 13L15 7L13.5 13L11 14L9 13Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          <h1 className="text-xl font-bold hidden lg:block">MobyScreener</h1>
        </div>
        <nav className="flex flex-col gap-4 w-full">
          <Button variant="ghost" className="justify-center lg:justify-start gap-3 bg-secondary">
            <Compass />
            <span className="hidden lg:inline">Screener</span>
          </Button>
          <Button variant="ghost" className="justify-center lg:justify-start gap-3">
            <Wallet />
            <span className="hidden lg:inline">Dompet</span>
          </Button>
          <Button variant="ghost" className="justify-center lg:justify-start gap-3">
            <LineChart />
            <span className="hidden lg:inline">Portofolio</span>
          </Button>
          <Button variant="ghost" className="justify-center lg:justify-start gap-3">
            <Users />
            <span className="hidden lg:inline">KOLs</span>
          </Button>
          <Button variant="ghost" className="justify-center lg:justify-start gap-3">
            <TrendingUp />
            <span className="hidden lg:inline">Prediksi</span>
            <Badge variant="secondary" className="bg-accent/20 text-accent hidden lg:inline">Baru</Badge>
          </Button>
        </nav>
        <div className="mt-auto flex flex-col gap-4 w-full">
          <Button variant="ghost" className="justify-center lg:justify-start gap-3">
            <Settings />
            <span className="hidden lg:inline">Pengaturan</span>
          </Button>
           <Button variant="ghost" className="justify-center lg:justify-start gap-3">
            <Sun className="dark:hidden" /> <Moon className="hidden dark:block" />
            <span className="hidden lg:inline">Mode</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-4 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu />
            </Button>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input placeholder="Cari token atau dompet..." className="bg-secondary border-none rounded-lg pl-10 pr-4 py-2 w-full text-sm" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell />
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">Hubungkan Dompet</Button>
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <span className="font-bold">G</span>
            </div>
          </div>
        </header>

        {/* Dashboard */}
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
      </div>
    </div>
  );
}
