"use client"

import { useRouter } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileHeaderProps {
  onMenuClick: () => void
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  const router = useRouter()

  const handleLogoClick = () => {
    router.push("/about")
  }

  return (
    <header className="lg:hidden bg-background border-b border-border p-4 flex items-center justify-between sticky top-0 z-30 backdrop-blur-lg">
      <button 
        onClick={handleLogoClick}
        className="text-left hover:opacity-80 transition-opacity"
      >
        <h1 className="text-xl font-bold text-primary dark:text-white">NiftyNode</h1>
        <p className="text-xs text-muted-foreground">MCP Server Platform</p>
      </button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        className="h-10 w-10"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </header>
  )
}