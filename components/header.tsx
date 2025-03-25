"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            SRGEC Transportation Portal
          </Link>
          <button className="rounded p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <nav className={`${menuOpen ? "block" : "hidden"} lg:block`}>
            <ul className="flex flex-col space-y-2 lg:flex-row lg:space-x-4 lg:space-y-0">
              <li>
                <Button variant="ghost">Home</Button>
              </li>
              <li>
              <Link href="/">
                  <Button variant="ghost">Logout</Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

