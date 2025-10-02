"use client"

import * as React from "react"

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({ 
  children, 
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false 
}: ThemeProviderProps) {
  React.useEffect(() => {
    // Initialize theme on mount
    const savedTheme = localStorage.getItem("theme") || defaultTheme
    const root = document.documentElement
    
    if (savedTheme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(savedTheme)
    }
  }, [defaultTheme, enableSystem])

  return <>{children}</>
}