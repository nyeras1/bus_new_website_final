"use client"

import { type ReactNode, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Menu, X } from "lucide-react"

interface DashboardLayoutProps {
  children: ReactNode
  sidebarItems: { title: string; href: string }[]
}

export function DashboardLayout({ children, sidebarItems }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 bg-gray-100">
        <button
          className="fixed left-4 top-4 z-40 rounded-md bg-primary p-2 text-primary-foreground lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white p-6 shadow-md transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="space-y-4">
            {sidebarItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setSidebarOpen(false)}>
                  {item.title}
                </Button>
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 overflow-auto p-6 ">{children}</main>

      </div>
      <Footer />
    </div>
  )
}

