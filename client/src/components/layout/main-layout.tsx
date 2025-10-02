"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { MobileHeader } from "@/components/layout/mobile-header"
import { AnimatedBackground } from "@/components/layout/animated-background"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const getActiveItem = () => {
    if (pathname === "/about") return "about"
    if (pathname === "/join") return "join"
    if (pathname === "/help") return "help"
    return "about" // default
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      
      {/* Mobile Header */}
      <MobileHeader onMenuClick={openMobileMenu} />
      
      <div className="flex lg:h-screen">
        {/* Desktop Sidebar */}
        <Sidebar activeItem={getActiveItem()} />
        
        {/* Mobile Sidebar */}
        <Sidebar 
          activeItem={getActiveItem()} 
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          isMobile={true}
        />
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto min-h-[calc(100vh-64px)] lg:min-h-screen">
          <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-6xl relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}