"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Book, Mail, Phone, Clock, Users } from "lucide-react"

const helpCategories = [
  {
    icon: Book,
    title: "Documentation",
    description: "Comprehensive guides and API documentation",
    action: "Browse Docs"
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant help from our support team",
    action: "Start Chat"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us detailed questions via email",
    action: "Send Email"
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our technical experts",
    action: "Call Now"
  }
]

const faqs = [
  {
    question: "How do I get started with NiftyNode?",
    answer: "Simply create an account, connect your Zerodha credentials, and start exploring our MCP server features. Our onboarding guide will walk you through the process step by step."
  },
  {
    question: "Is my trading data secure?",
    answer: "Absolutely. We use bank-level encryption and security protocols. Your data is never shared with third parties and all communications are encrypted end-to-end."
  },
  {
    question: "What trading strategies are supported?",
    answer: "NiftyNode supports a wide range of algorithmic trading strategies including momentum trading, mean reversion, arbitrage, and custom strategies built with our MCP server framework."
  },
  {
    question: "How much does NiftyNode cost?",
    answer: "We offer flexible pricing plans starting with a free tier for beginners. Premium plans include advanced features, higher API limits, and priority support."
  }
]

export function Help() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 dark:from-white/5 dark:to-white/2 dark:border-white/10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl lg:text-3xl font-bold">How can we help you?</CardTitle>
          <CardDescription className="text-base lg:text-lg">
            Find answers, get support, and learn how to make the most of NiftyNode
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Support Options */}
      <div>
        <h2 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6">Get Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {helpCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-white/10 dark:bg-black/30">
                      <Icon className="h-6 w-6 text-primary dark:text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    {category.action}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <Clock className="h-8 w-8 text-primary dark:text-white mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Support Hours</h3>
            <p className="text-sm text-muted-foreground">
              Monday - Friday<br />
              9:00 AM - 6:00 PM IST
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <Users className="h-8 w-8 text-primary dark:text-white mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Community</h3>
            <p className="text-sm text-muted-foreground">
              Join our Discord<br />
              Connect with other traders
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <Mail className="h-8 w-8 text-primary dark:text-white mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Email Us</h3>
            <p className="text-sm text-muted-foreground">
              support@niftynode.com<br />
              We'll respond within 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Contact */}
      <Card className="bg-red-50 dark:bg-black/30 border-red-200 dark:border-gray-600">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-white">Emergency Support</CardTitle>
          <CardDescription>
            For critical trading issues or system outages, contact our emergency support line
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">24/7 Emergency Hotline</p>
              <p className="text-sm text-muted-foreground">Available for critical issues only</p>
            </div>
            <Button variant="destructive">
              Call Emergency Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}