'use client'

import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/service/supabase'
import Main from '@/app/components'
import { Login } from '@/app/components/auth/login'

const App: FC = ({ params }: any) => {
  const [session, setSession] = useState<Session | null>(null)

  // セッションを取得して状態を更新
  useEffect(() => {
    const updateSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
    }

    updateSession()

    // 認証状態の変化を監視し、変化があればセッションを再取得
    const { data: authListener } = supabase.auth.onAuthStateChange((event, __session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT')
        updateSession()
    })
    // クリーンアップ
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  // ログインしていない場合はLoginコンポーネントを表示
  if (!session)
    return <Login />

  // ログインしている場合はMainコンポーネントを表示
  return <Main params={params} />
}

export default React.memo(App)
