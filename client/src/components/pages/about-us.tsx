"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Shield, Zap, Users } from "lucide-react"

const features = [
  {
    icon: TrendingUp,
    title: "Advanced Trading Analytics",
    description: "Leverage powerful MCP server technology to analyze market trends and make informed trading decisions with real-time data processing."
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Built with enterprise-grade security protocols and robust infrastructure to ensure your trading data and transactions are always protected."
  },
  {
    icon: Zap,
    title: "Lightning Fast Execution",
    description: "Experience ultra-low latency trading with our optimized MCP server architecture, designed for high-frequency trading environments."
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join a thriving community of traders and developers building the future of algorithmic trading on the Zerodha platform."
  }
]

export function AboutUs() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 dark:from-white/5 dark:to-white/2 dark:border-white/10">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary dark:text-white">
            Welcome to NiftyNode
          </CardTitle>
          <CardDescription className="text-base lg:text-lg mt-4 max-w-2xl mx-auto">
            Revolutionizing algorithmic trading through cutting-edge MCP server technology. 
            Built for traders, by traders, on the trusted Zerodha platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm lg:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            NiftyNode bridges the gap between traditional trading and modern technology, 
            offering a comprehensive MCP (Model Context Protocol) server solution that empowers 
            traders with advanced analytics, real-time data processing, and seamless integration 
            with Zerodha's robust trading infrastructure.
          </p>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-white/10 dark:bg-black/30">
                    <Icon className="h-6 w-6 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Mission Statement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground text-lg leading-relaxed max-w-4xl mx-auto">
            To democratize algorithmic trading by providing accessible, powerful, and reliable 
            MCP server solutions that enable both novice and expert traders to harness the full 
            potential of automated trading strategies on the Zerodha platform. We believe in 
            transparency, innovation, and community-driven development.
          </p>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary dark:text-white">10,000+</div>
            <p className="text-muted-foreground">Active Traders</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary dark:text-white">99.9%</div>
            <p className="text-muted-foreground">Uptime Guarantee</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary dark:text-white">24/7</div>
            <p className="text-muted-foreground">Support Available</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}