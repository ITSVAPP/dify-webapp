'use client'

import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import type { Session } from '@supabase/supabase-js'
import Spinner from '@/app/components/base/spinner'
import { supabase } from '@/service/supabase'
import Main from '@/app/components'
import { Login } from '@/app/components/auth/login'

const App: FC = ({ params }: any) => {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // セッションを取得して状態を更新
  useEffect(() => {
    const updateSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
      }
      catch (err) {
        setError('セッションの取得に失敗しました。')
      }
      finally {
        setLoading(false)
      }
    }

    updateSession()

    // 認証状態の変化を監視し、変化があればセッションを再取得
    const { data: authListener } = supabase.auth.onAuthStateChange((event, _session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        setLoading(true) // 状態変化時に再度ローディングを開始
        updateSession()
      }
    })
    // クリーンアップ
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner />
      </div>
    )
  }

  if (error)
    return <div className="error">{error}</div>

  // ログインしていない場合はLoginコンポーネントを表示
  if (!session)
    return <Login />

  // ログインしている場合はMainコンポーネントを表示
  return <Main params={params} />
}

export default React.memo(App)
