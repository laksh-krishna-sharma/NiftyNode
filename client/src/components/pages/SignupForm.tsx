"use client"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store"
import { registerUser } from "@/store/slices/auth/signUpSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface SignupFormProps {
  onSwitchToLogin: () => void
}

export function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.signUp)
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(registerUser({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Get started with your free NiftyNode account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : "Create Account"}
            </Button>
          </form>
          
          <Separator className="my-6" />
          
          <div className="text-center flex justify-center items-center gap-2">
            <p className="text-sm text-muted-foreground">
              Already have an account?
            </p>
            <Button
              variant="link"
              onClick={onSwitchToLogin}
              className="p-0 h-auto font-normal"
            >
              Sign in here
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Additional Info Card */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h4 className="font-medium">🔒 Your data is secure</h4>
            <p className="text-xs text-muted-foreground">
              We use industry-standard encryption to protect your information. 
              Your trading strategies and personal data remain completely private.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-medium mb-5.5">Ready to get started?</h3>
            <p className="text-xs text-muted-foreground">
              Join thousands of traders who trust NiftyNode for their algorithmic trading needs.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}