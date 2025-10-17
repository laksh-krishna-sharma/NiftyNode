"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "./LoginForm"
import { SignupForm } from "./SignupForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, TrendingUp, Shield, Zap } from "lucide-react"
import { useAppSelector } from "@/store"

export function JoinUs() {
  const [isLogin, setIsLogin] = useState(false)
  const { isAuthenticated } = useAppSelector((state) => state.login)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard")
    }
  }, [isAuthenticated, router])

  const benefits = [
    {
      icon: Rocket,
      title: "Get Started in Minutes",
      description: "Quick and easy account setup with instant access to our MCP server platform."
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Access real-time market data and sophisticated trading algorithms."
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your data and trades are protected with enterprise-grade security."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Ultra-low latency execution for time-sensitive trading strategies."
    }
  ]

  if (isLogin) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="text-center mb-8 max-w-md">
          <h1 className="text-5xl font-bold mb-4 text-primary dark:text-white">
            Welcome Back
          </h1>
        </div>
        <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {/* Left Column - Information */}
      <div className="space-y-4 lg:space-y-6 order-2 lg:order-1">
        <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 dark:from-white/5 dark:to-white/2 dark:border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl">Join the Trading Revolution</CardTitle>
            <CardDescription className="text-base">
              Start your journey with NiftyNode and unlock the power of algorithmic trading
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Create your account today and gain access to our cutting-edge MCP server platform. 
              Whether you're a seasoned trader or just starting out, NiftyNode provides the tools 
              and infrastructure you need to succeed in today's fast-paced markets.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-white/10 dark:bg-black/30 flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary dark:text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Right Column - Forms */}
      <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
    </div>
  )
}