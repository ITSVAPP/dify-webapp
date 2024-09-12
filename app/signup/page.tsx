'use client'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { supabase } from '@/service/supabase'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // 簡単なバリデーション
    if (!email || !password) {
      setError('Email and password are required.')
      return
    }

    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
    }
    else {
      setSuccess('User signed up successfully.')
      console.log('User signed up:', data.user)
    }
  }

  return (
    <form onSubmit={handleSignUp}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        autoComplete=""
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  )
}

export default SignUp
