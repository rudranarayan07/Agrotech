"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Home() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("login")
  const [userType, setUserType] = useState("farmer")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate credentials here
    router.push(`/dashboard/${userType}`)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would register the user here
    setActiveTab("login")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-4xl font-bold text-green-800">AgroTech</h1>
            <p className="text-xl text-green-700">Connecting Farmers and Dealers for a Sustainable Future</p>
            <div className="relative h-64 w-full md:h-96">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Agriculture illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md">
          <Card className="border-green-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-green-800">Welcome to AgroTech</CardTitle>
              <CardDescription className="text-center">Manage your agricultural business efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input id="login-email" type="email" placeholder="email@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input id="login-password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-user-type">I am a</Label>
                      <select
                        id="login-user-type"
                        className="w-full p-2 border rounded-md"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                      >
                        <option value="farmer">Farmer</option>
                        <option value="dealer">Dealer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                      Login
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Full Name</Label>
                      <Input id="register-name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input id="register-email" type="email" placeholder="email@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input id="register-password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password">Confirm Password</Label>
                      <Input id="register-confirm-password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-user-type">Register as</Label>
                      <select
                        id="register-user-type"
                        className="w-full p-2 border rounded-md"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                      >
                        <option value="farmer">Farmer</option>
                        <option value="dealer">Dealer</option>
                      </select>
                    </div>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                      Register
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
