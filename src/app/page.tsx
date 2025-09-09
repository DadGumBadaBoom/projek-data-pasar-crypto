
import { Sidebar, SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { SidebarHeader, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Compass, Wallet, LineChart, Star, Gift, Users, FileText, HelpCircle, Settings, Bell } from 'lucide-react';

const tokens = [
  { rank: 1, name: 'TROLL', price: '$0.1821', mcap: '$181.90M', change: '+2.57%', whales: 30, whaleTrades: 147, buys: 80, tokensBought: '6.24M', sells: 67, tokensSold: '3.44M', netFlow: '2.80M', supplyBought: '0.62%' },
  { rank: 2, name: 'SPX', price: '$1.4144', mcap: '$164.30M', change: '+6.25%', whales: 11, whaleTrades: 72, buys: 56, tokensBought: '126.24K', sells: 16, tokensSold: '5.41K', netFlow: '120.83K', supplyBought: '0.11%' },
  { rank: 3, name: 'GDP', price: '$0.0,1114', mcap: '$111.43K', change: '+1,500.49%', whales: 17, whaleTrades: 83, buys: 42, tokensBought: '139.08M', sells: 41, tokensSold: '50.89M', netFlow: '88.19M', supplyBought: '13.91%' },
  { rank: 4, name: 'POLYAGENT', price: '$0.0,3280', mcap: '$328.08K', change: '+187.29%', whales: 16, whaleTrades: 91, buys: 62, tokensBought: '63.33M', sells: 29, tokensSold: '31.69M', netFlow: '31.64M', supplyBought: '6.33%' },
  { rank: 5, name: 'IRYNA', price: '$0.002603', mcap: '$2.60M', change: '-43.90%', whales: 28, whaleTrades: 95, buys: 45, tokensBought: '24.84M', sells: 50, tokensSold: '28.62M', netFlow: '-3.77M', supplyBought: '2.48%' },
  { rank: 6, name: 'FWOG', price: '$0.0415', mcap: '$40.46M', change: '+0.86%', whales: 12, whaleTrades: 196, buys: 175, tokensBought: '3.72M', sells: 21, tokensSold: '1.09M', netFlow: '2.64M', supplyBought: '0.38%' },
  { rank: 7, name: 'AURA', price: '$0.1009', mcap: '$97.23M', change: '+11.47%', whales: 23, whaleTrades: 107, buys: 24, tokensBought: '504.46K', sells: 83, tokensSold: '2.76M', netFlow: '-2.26M', supplyBought: '0.05%' },
];

const TrendingBar = () => (
  <div className="bg-gray-800/50 text-white p-2 overflow-hidden whitespace-nowrap">
    <div className="flex animate-marquee">
      <div className="flex items-center space-x-4 px-4">
        <span>#3 GDP <span className="text-green-400">449.2%</span></span>
        <span>#4 IRYNA <span className="text-red-400">-46.89%</span></span>
        <span>#5 POLYAGENT <span className="text-green-400">381.9%</span></span>
        <span>#6 aura <span className="text-red-400">-11.23%</span></span>
        <span>#7 FWOG <span className="text-green-400">0.32%</span></span>
        <span>#8 ZDLT <span className="text-green-400">3.82%</span></span>
        <span>#9 CLIPPY <span className="text-red-400">-7.07%</span></span>
        <span>#10 Bert <span className="text-red-400">-8.05%</span></span>
      </div>
       <div className="flex items-center space-x-4 px-4">
        <span>#3 GDP <span className="text-green-400">449.2%</span></span>
        <span>#4 IRYNA <span className="text-red-400">-46.89%</span></span>
        <span>#5 POLYAGENT <span className="text-green-400">381.9%</span></span>
        <span>#6 aura <span className="text-red-400">-11.23%</span></span>
        <span>#7 FWOG <span className="text-green-400">0.32%</span></span>
        <span>#8 ZDLT <span className="text-green-400">3.82%</span></span>
        <span>#9 CLIPPY <span className="text-red-400">-7.07%</span></span>
        <span>#10 Bert <span className="text-red-400">-8.05%</span></span>
      </div>
    </div>
  </div>
);

export default function DashboardPage() {
  return (
    <SidebarProvider>
    <div className="bg-gray-900 text-gray-200 min-h-screen font-body">
      <TrendingBar />
      <div className="flex">
        <Sidebar className="w-64 bg-gray-900 border-r border-gray-700/50">
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-cyan-400"
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
              <h2 className="text-xl font-bold">MobyScreener</h2>
            </div>
            <div className="relative p-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input placeholder="Cari" className="bg-gray-800 border-gray-700/50 pl-10" />
            </div>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive><Compass /> Moby Screener</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton><Wallet /> Pengawasan Paus</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton><LineChart /> Portofolio</SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton>
                  <span className="flex-1">Prediksi</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400">Baru</Badge>
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton><Gift /> Referensi & Dapatkan</SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton><Users /> KOLs</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton><FileText /> $MOBY Whitepaper</SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton><HelpCircle /> Mengapa Kami?</SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton><Settings /> Dapatkan Dukungan</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <div className="mt-4">
              <h3 className="px-4 text-sm font-semibold text-gray-400">Daftar Pantau</h3>
              <div className="p-4 text-center text-gray-500 text-sm">Belum ada koin yang ditambahkan.</div>
            </div>
          </SidebarContent>
           <div className="p-4 border-t border-gray-700/50">
            <div className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Online 8,527
            </div>
            <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">Hubungkan Dompet</Button>
            <div className="flex justify-between items-center mt-4 text-sm">
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Beli 0.1</Button>
                    <span>◎ SOL</span>
                </div>
                <span>$217.37</span>
            </div>
          </div>
        </Sidebar>
        <SidebarInset>
          <main className="flex-1 p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Button variant="secondary" className="bg-gray-700/50">Trending 24 jam</Button>
                    <Button variant="ghost">24 jam terakhir</Button>
                    <Button variant="ghost">Semua</Button>
                    <Button variant="ghost">Launchpads</Button>
                    <Button variant="ghost">Koin Baru</Button>
                    <Button variant="ghost">Pro</Button>
                    <Button variant="destructive" className="bg-pink-500/20 text-pink-400 border-pink-500/50">Mode Degen</Button>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="border-gray-700/50"><Star className="w-4 h-4 mr-2"/> Daftar Pantau (0)</Button>
                    <Button variant="outline" className="border-gray-700/50"><Settings className="w-4 h-4 mr-2"/> Kustomisasi</Button>
                </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-gray-700/50">
                    <TableHead>#</TableHead>
                    <TableHead>Trending</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>MCap</TableHead>
                    <TableHead>Perubahan 24 jam</TableHead>
                    <TableHead>Paus</TableHead>
                    <TableHead>Perdagangan Paus</TableHead>
                    <TableHead># Pembelian</TableHead>
                    <TableHead>Token Dibeli</TableHead>
                    <TableHead># Penjualan</TableHead>
                    <TableHead>Token Dijual</TableHead>
                    <TableHead>Aliran Bersih</TableHead>
                    <TableHead>Pasokan Dibeli</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokens.map((token) => (
                    <TableRow key={token.rank} className="border-b-gray-800 hover:bg-gray-800/50">
                      <TableCell>{token.rank}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                           <img src={`https://picsum.photos/seed/${token.name}/32`} alt={token.name} className="w-8 h-8 rounded-full" />
                           <span className="font-medium">{token.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{token.price}</TableCell>
                      <TableCell>{token.mcap}</TableCell>
                      <TableCell className={token.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>{token.change}</TableCell>
                      <TableCell>{token.whales}</TableCell>
                      <TableCell>{token.whaleTrades}</TableCell>
                      <TableCell>{token.buys}</TableCell>
                      <TableCell>{token.tokensBought}</TableCell>
                      <TableCell>{token.sells}</TableCell>
                      <TableCell>{token.tokensSold}</TableCell>
                      <TableCell className={token.netFlow.startsWith('-') ? 'text-red-400' : 'text-green-400'}>{token.netFlow}</TableCell>
                      <TableCell>{token.supplyBought}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </main>
        </SidebarInset>
      </div>
    </div>
    </SidebarProvider>
  );
}

