"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function DashboardPage() {
  const { user, isAuthenticated } = useAppSelector((state) => state.login)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/join")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <h1 className="text-2xl font-semibold">Redirecting…</h1>
        <p className="text-muted-foreground">Please sign in to access your dashboard.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Welcome back, {user.fullName.split(" ")[0]}!</h1>
        <p className="text-muted-foreground mt-2">Here\'s a quick snapshot of your NiftyNode account.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="text-lg font-medium">{user.fullName}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-lg font-medium">{user.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Membership</p>
              <p className="text-lg font-medium">Active Trader</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Next Steps</p>
              <p className="text-lg font-medium">Connect your Zerodha credentials to start automating trades.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Verify your email and secure your account.</li>
            <li>Configure your first trading strategy in the toolkit.</li>
            <li>Explore the help center for best practices.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
