'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import { AlertCircle, ShieldAlert, RefreshCcw } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [roleMode, setRoleMode] = useState<'USER' | 'LISTER' | 'ADMIN'>('USER')
  const [initError, setInitError] = useState<string | null>(null)

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
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Identity Sequence Authorized.");
        router.refresh();
        // The redirection will be handled by middleware
        router.push('/');
      }
    } catch (error: any) {
      console.error("Auth Exception:", error);
      toast.error('Login failed due to a server response collision.')
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="p-8 mx-auto w-full max-w-[450px]">
        <Card className="border-none shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-[40px] overflow-hidden">
          <CardHeader className="space-y-1 pt-10 px-10 text-center">
            <CardTitle className="text-4xl font-black tracking-tight">Identity Hub</CardTitle>
            <CardDescription className="font-medium">
              Access your Roommitra operational perimeter.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 p-10">
            <Tabs value={roleMode} onValueChange={(v) => setRoleMode(v as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-2xl">
                <TabsTrigger className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold text-[10px] uppercase tracking-widest" value="USER">Seeker</TabsTrigger>
                <TabsTrigger className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold text-[10px] uppercase tracking-widest" value="LISTER">Lister</TabsTrigger>
                <TabsTrigger className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold text-[10px] uppercase tracking-widest" value="ADMIN">Admin</TabsTrigger>
              </TabsList>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1" htmlFor="email">Credential Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="matrix-id@roommitra.in"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-0 focus-visible:ring-2 focus-visible:ring-indigo-600 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pl-1">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400" htmlFor="password">Security Matrix</Label>
                      <Button variant="link" className="p-0 h-auto font-black text-[10px] uppercase tracking-widest text-indigo-600 hover:text-indigo-700">
                        Reset Token
                      </Button>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-0 focus-visible:ring-2 focus-visible:ring-indigo-600 font-bold"
                    />
                  </div>
                  <Button type="submit" className="w-full h-16 mt-4 text-[10px] font-black uppercase tracking-[0.2em] bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl shadow-xl shadow-indigo-600/20 active:scale-[0.98] transition-all" disabled={isLoading}>
                    {isLoading ? 'Decrypting Access...' : 'Execute Handshake'}
                  </Button>
                </div>
              </form>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pb-10 px-10">
            <div className="text-[10px] font-black text-center text-slate-400 uppercase tracking-widest">
              Unregistered Identity?{' '}
              <Button variant="link" onClick={() => router.push('/register')} className="p-0 h-auto font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest text-[10px]">
                Create Profile
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
