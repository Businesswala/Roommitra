'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { createClient } from '@/utils/supabase/client'
import { GetProfileBySupabaseId } from '@/app/actions/auth'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [roleMode, setRoleMode] = useState<'USER' | 'LISTER' | 'ADMIN'>('USER')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error

      if (data.user) {
        // Fetch profile to verify role and redirect
        const profile = await GetProfileBySupabaseId(data.user.id)
        
        if (!profile) {
          toast.error("Profile not found. Please contact support.")
          return
        }

        toast.success(`Welcome back, ${profile.name}!`)

        // Role-Based Routing
        if (profile.role === 'ADMIN') {
          router.push('/admin/dashboard')
        } else if (profile.role === 'LISTER') {
          router.push('/lister/dashboard')
        } else {
          router.push('/user/dashboard')
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="p-8 mx-auto w-full max-w-[450px]">
        <Card className="border-none shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Login to your Roommitra account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Tabs defaultValue="USER" onValueChange={(v) => setRoleMode(v as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="USER">User</TabsTrigger>
                <TabsTrigger value="LISTER">Lister</TabsTrigger>
                <TabsTrigger value="ADMIN">Admin</TabsTrigger>
              </TabsList>

              <form onSubmit={handleLogin}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button variant="link" className="px-0 font-normal text-xs text-indigo-600">
                        Forgot password?
                      </Button>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                  <Button type="submit" className="w-full mt-2 h-11 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </div>
              </form>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-sm text-center text-muted-foreground">
              Don't have an account?{' '}
              <Button variant="link" onClick={() => router.push('/register')} className="p-0 h-auto font-semibold text-indigo-600">
                Register
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
