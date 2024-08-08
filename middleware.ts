// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { API_DOMAIN } from '@/config'

export function middleware(request: NextRequest) {
  // CORS設定(本番環境時に修正が必要)
  const headers = new Headers(request.headers)
  headers.set('Access-Control-Allow-Origin', API_DOMAIN)
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // OPTIONSリクエストの場合、早期にレスポンスを返す
  if (request.method === 'OPTIONS')
    return new NextResponse(null, { headers, status: 204 })

  // 通常のリクエストにヘッダーを追加してレスポンスを返す
  const response = NextResponse.next()
  response.headers.set('Access-Control-Allow-Origin', API_DOMAIN)
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

// ミドルウェアを適用するパスの設定（例：apiフォルダ以下）
export const config = {
  matcher: '/api/:path*',
}
