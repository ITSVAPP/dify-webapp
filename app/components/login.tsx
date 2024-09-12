'use client'

import { Heart, Lock, Mail } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { supabase } from '@/service/supabase'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // 簡単なバリデーション
    if (!email || !password) {
      setError('メールアドレスとパスワードは必須です。')
      return
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(`ログインに失敗しました: ${error.message}`)
    }
    else {
      setSuccess('ログインに成功しました。')
      console.log('User logged in:', data.user)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Heart className="h-12 w-12 text-pink-400" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">ようこそ</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-600">
              メールアドレス
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="email"
                placeholder="you@example.com"
                type="email"
                className="pl-10 border-gray-200 focus:ring-2 focus:ring-pink-200 focus:border-pink-300 rounded-full"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-600">
              パスワード
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                className="pl-10 border-gray-200 focus:ring-2 focus:ring-pink-200 focus:border-pink-300 rounded-full"
              />
            </div>
          </div>
          <Button
            type='submit'
            className="w-full bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 text-white font-medium py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
            ログイン
          </Button>
          <div className="min-h-[45px]">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}
