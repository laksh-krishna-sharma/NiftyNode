"use client"

import { useTheme } from "@/hooks/use-theme"
import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const { resolvedTheme, mounted } = useTheme()
  const [forceRender, setForceRender] = useState(0)

  useEffect(() => {
    // Force re-render when theme changes
    if (mounted) {
      setForceRender(prev => prev + 1)
    }
  }, [resolvedTheme, mounted])

  if (!mounted || resolvedTheme !== "dark") return null

  return (
    <div key={forceRender} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Moving Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`${forceRender}-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, white 1px, transparent 0)
          `,
          backgroundSize: '20px 20px',
          animation: 'moveGrid 20s linear infinite',
        }}
      />
      
      <style jsx>{`
        @keyframes moveGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(20px, 20px); }
        }
      `}</style>
    </div>
  )
}