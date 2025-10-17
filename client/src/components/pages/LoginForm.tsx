"use client"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store"
import { loginUser } from "@/store/slices/auth/loginSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface LoginFormProps {
  onSwitchToSignup: () => void
}

export function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const dispatch = useAppDispatch()
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.login)
  
  const [formData, setFormData] = useState({
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
    dispatch(loginUser({
      email: formData.email,
      password: formData.password,
    }))
  }

  return (
    <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
      <CardHeader>
        <CardTitle>वापसी पर स्वागत है</CardTitle>
        <CardDescription>
          Sign in to your NiftyNode account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
        
        <Separator className="my-6" />
        
        <div className="text-center flex justify-center items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Don't have an account?
          </p>
          <Button
            variant="link"
            onClick={onSwitchToSignup}
            className="p-0 h-auto font-normal"
          >
            Create one here
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}