'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Wallet, LineChart, Users, Settings, Bell, Menu, TrendingUp, Compass, Sun, Moon, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const navItems = [
    { href: '/', icon: Compass, label: 'Screener' },
    { href: '/dompet', icon: Wallet, label: 'Dompet' },
    { href: '/portofolio', icon: LineChart, label: 'Portofolio' },
    { href: '/kols', icon: Users, label: 'KOLs' },
    { href: '/prediksi', icon: TrendingUp, label: 'Prediksi', new: true },
];

const SidebarContent = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="flex items-center justify-start gap-2 mb-10 w-full p-4">
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
          <h1 className="text-xl font-bold">MobyScreener</h1>
        </div>
        <nav className="flex flex-col gap-2 w-full px-4">
            {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                    <Button variant="ghost" className={cn("justify-start gap-3", pathname === item.href ? "bg-secondary" : "")} asChild>
                        <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                            {item.new && <Badge variant="secondary" className="bg-accent/20 text-accent ml-auto">Baru</Badge>}
                        </Link>
                    </Button>
                </SheetClose>
            ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 w-full p-4">
          <Button variant="ghost" className="justify-start gap-3">
            <Settings />
            <span>Pengaturan</span>
          </Button>
           <Button variant="ghost" className="justify-start gap-3">
            <Sun className="dark:hidden" /> <Moon className="hidden dark:block" />
            <span>Mode</span>
          </Button>
        </div>
    </>
  );
}

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="bg-background text-foreground min-h-screen flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-64 bg-card p-4 flex-col items-start transition-all duration-300">
        <div className="flex items-center justify-start gap-2 mb-10 w-full">
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
          <h1 className="text-xl font-bold">MobyScreener</h1>
        </div>
        <nav className="flex flex-col gap-4 w-full">
            {navItems.map((item) => (
                <Button key={item.href} variant="ghost" className={cn("justify-start gap-3", pathname === item.href ? "bg-secondary" : "")} asChild>
                    <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                        {item.new && <Badge variant="secondary" className="bg-accent/20 text-accent ml-auto">Baru</Badge>}
                    </Link>
                </Button>
            ))}
        </nav>
        <div className="mt-auto flex flex-col gap-4 w-full">
          <Button variant="ghost" className="justify-start gap-3">
            <Settings />
            <span>Pengaturan</span>
          </Button>
           <Button variant="ghost" className="justify-start gap-3">
            <Sun className="dark:hidden" /> <Moon className="hidden dark:block" />
            <span>Mode</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-4 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-4">
             <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-card w-72 p-0">
                    <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
                    <SidebarContent />
                </SheetContent>
            </Sheet>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input placeholder="Cari token atau dompet..." className="bg-secondary border-none rounded-lg pl-10 pr-4 py-2 w-full text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell />
                   <span className="sr-only">Notifikasi</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>TROLL naik 5% dalam 1 jam terakhir.</DropdownMenuItem>
                <DropdownMenuItem>Paus baru terdeteksi untuk SPX.</DropdownMenuItem>
                <DropdownMenuItem>Peringatan: FWOG turun 15%.</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">Hubungkan Dompet</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Hubungkan Dompet Anda</DialogTitle>
                  <DialogDescription>
                    Pilih salah satu penyedia dompet di bawah ini untuk melanjutkan.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button variant="outline" className="justify-start gap-4">
                     <Wallet /> MobyWallet
                  </Button>
                   <Button variant="outline" className="justify-start gap-4">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1-.9-2-2-2Z"/></svg>
                    Coinbase Wallet
                  </Button>
                   <Button variant="outline" className="justify-start gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M20 12V8H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h12v-4"/><path d="m18 12 1.5-2.5L21 12l-1.5 2.5L18 12Z"/><path d="m12 12 1.5-2.5L15 12l-1.5 2.5L12 12Z"/></svg>
                    MetaMask
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <div className="cursor-pointer w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <span className="font-bold">G</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Pengaturan</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </header>

        {children}

      </div>
    </div>
  );
}

export default AppLayout;
