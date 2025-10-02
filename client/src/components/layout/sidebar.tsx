"use client"

import { useMemo } from "react"
import { useTheme } from "@/hooks/use-theme"
import { useRouter, usePathname } from "next/navigation"
import { Moon, Sun, Users, UserPlus, HelpCircle, X, LayoutDashboard, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/store"
import { logout as logoutAction } from "@/store/slices/auth/loginSlice"

interface SidebarProps {
  activeItem: string
  isOpen?: boolean
  onClose?: () => void
  isMobile?: boolean
}

export function Sidebar({ activeItem, isOpen = true, onClose, isMobile = false }: SidebarProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated } = useAppSelector((state) => state.login)
  const dispatch = useAppDispatch()

  const menuItems = useMemo(() => {
    if (isAuthenticated) {
      return [
        { id: "about", label: "About Us", icon: Users, href: "/about" },
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { id: "help", label: "Help", icon: HelpCircle, href: "/help" },
      ]
    }

    return [
      { id: "about", label: "About Us", icon: Users, href: "/about" },
      { id: "join", label: "Join Us", icon: UserPlus, href: "/join" },
      { id: "help", label: "Help", icon: HelpCircle, href: "/help" },
    ]
  }, [isAuthenticated])

  const handleNavigation = (href: string) => {
    router.push(href)
    if (isMobile && onClose) {
      onClose()
    }
  }

  const handleLogout = () => {
    dispatch(logoutAction())
    router.push("/join")
    if (isMobile && onClose) {
      onClose()
    }
  }

  const handleLogoClick = () => {
    router.push("/about")
    if (isMobile && onClose) {
      onClose()
    }
  }

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
        
        {/* Mobile Sidebar */}
        <div className={cn(
          "fixed top-0 left-0 h-full w-80 bg-background border-r border-border flex flex-col z-50 transform transition-transform duration-300 lg:hidden backdrop-blur-lg",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {/* Mobile Header with Close Button */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <button 
              onClick={handleLogoClick}
              className="text-left hover:opacity-80 transition-opacity"
            >
              <h1 className="text-xl font-bold text-primary dark:text-white">NiftyNode</h1>
              <p className="text-xs text-muted-foreground mt-1">MCP Server Platform</p>
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-12 cursor-pointer",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => handleNavigation(item.href)}
                >
                  <Icon className={cn("h-5 w-5", isActive ? "!text-primary-foreground" : "")} />
                  {item.label}
                </Button>
              )
            })}
          </nav>

          {/* Mobile Theme Switcher */}
          <div className="p-4 border-t border-border space-y-3">
            {isAuthenticated && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
                className="w-full gap-2 cursor-pointer"
              >
                <LogOut className="h-4 w-4 !text-destructive-foreground" />
                Logout
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
              className="w-full gap-2 cursor-pointer"
            >
              {resolvedTheme === "light" ? (
                <>
                  <Moon className="h-4 w-4" />
                  Dark Mode
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4" />
                  Light Mode
                </>
              )}
            </Button>
          </div>
        </div>
      </>
    )
  }

  // Desktop Sidebar
  return (
    <div className="w-64 h-screen bg-background border-r border-border flex flex-col lg:flex backdrop-blur-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <button 
          onClick={handleLogoClick}
          className="text-left hover:opacity-80 transition-opacity"
        >
          <h1 className="text-2xl font-bold text-primary dark:text-white">NiftyNode</h1>
          <p className="text-sm text-muted-foreground mt-1">MCP Server Platform</p>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-12 cursor-pointer",
                isActive && "bg-primary text-primary-foreground"
              )}
              onClick={() => handleNavigation(item.href)}
            >
              <Icon className={cn("h-5 w-5", isActive ? "!text-primary-foreground" : "")} />
              {item.label}
            </Button>
          )
        })}
      </nav>

      {/* Theme Switcher */}
          <div className="p-4 border-t border-border space-y-3">
            {isAuthenticated && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
                className="w-full gap-2 cursor-pointer"
              >
                <LogOut className="h-4 w-4 !text-destructive-foreground" />
                Logout
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
              className="w-full gap-2 cursor-pointer"
            >
              {resolvedTheme === "light" ? (
                <>
                  <Moon className="h-4 w-4" />
                  Dark Mode
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4" />
                  Light Mode
                </>
              )}
            </Button>
          </div>
    </div>
  )
}