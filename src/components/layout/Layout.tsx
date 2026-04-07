import { type ReactNode } from 'react'
import { Navbar } from './Navbar'
import { BottomNav } from './BottomNav'

interface LayoutProps {
  children?: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-surface-900 text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 pt-4 pb-24">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
