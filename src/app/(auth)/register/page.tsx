'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import ImageUpload from '@/components/ImageUpload'
import dynamic from 'next/dynamic'
const DocumentUpload = dynamic(() => import('@/components/DocumentUpload'), { ssr: false })
import { toast } from 'sonner'
import { createClient } from '@/utils/supabase/client'
import { RegisterProfile } from '@/app/actions/auth'

import { Suspense } from 'react'

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState<'USER' | 'LISTER'>('USER')

  // Set initial role from query param
  useEffect(() => {
    const roleParam = searchParams.get('role')?.toUpperCase();
    if (roleParam === 'LISTER') {
      setRole('LISTER');
    } else {
      setRole('USER');
    }
  }, [searchParams]);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    businessName: '',
    documentUrl: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleUpload = (url: string) => {
    setFormData({ ...formData, documentUrl: url })
    if (url) {
      toast.success('Document uploaded successfully!')
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 1. Supabase Auth Sign Up
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            role: role,
          },
        },
      })

      if (error) throw error

      if (data.user) {
        // 2. Insert into Prisma Profile table via Server Action
        const result = await RegisterProfile({
          supabaseId: data.user.id,
          email: formData.email,
          name: formData.name,
          mobile: formData.phone,
          role: role,
          businessName: formData.businessName,
          documentUrl: formData.documentUrl,
        })

        if (!result.success) throw new Error(result.error)

        toast.success(`Account created! Please check your email for verification.`)
        
        // Wait a bit and redirect
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    } catch (error: any) {
      toast.error(error.message || 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-none shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold tracking-tight text-center">Join Roommitra</CardTitle>
        <CardDescription className="text-center">
          Find your next home or list your property today.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Tabs value={role} onValueChange={(v) => setRole(v as 'USER' | 'LISTER')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="USER">As Seeker</TabsTrigger>
            <TabsTrigger value="LISTER">As Lister</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleRegister}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-slate-50 dark:bg-slate-800"
                />
              </div>
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
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 9999999999"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-slate-50 dark:bg-slate-800"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
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

              {role === 'LISTER' && (
                <div className="grid gap-4 mt-2 animate-in fade-in slide-in-from-top-2">
                  <div className="grid gap-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      placeholder="My Property Rentals"
                      required={role === 'LISTER'}
                      value={formData.businessName}
                      onChange={handleChange}
                      className="bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>ID Proof (Aadhar/PAN)</Label>
                    <DocumentUpload 
                      value={formData.documentUrl} 
                      onUpload={(url: string) => handleUpload(url)} 
                    />
                    <p className="text-xs text-muted-foreground pt-1">Upload a clear photo of your ID for verification.</p>
                  </div>
                </div>
              )}
              
              <Button type="submit" className="w-full mt-4 h-11 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </div>
          </form>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{' '}
          <Button variant="link" onClick={() => router.push('/login')} className="p-0 h-auto font-semibold text-indigo-600">
            Login
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function RegisterPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="p-8 mx-auto w-full max-w-[500px]">
        <Suspense fallback={<div>Loading authorization grid...</div>}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  )
}
