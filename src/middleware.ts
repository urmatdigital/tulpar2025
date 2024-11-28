import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Список публичных путей, доступных без авторизации
  const publicPaths = ['/', '/login', '/register', '/forgot-password']
  const isPublicPath = publicPaths.includes(req.nextUrl.pathname)

  // Защищенные пути, требующие авторизации
  const protectedPaths = ['/dashboard', '/profile']
  const isProtectedPath = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))

  if (!session && isProtectedPath) {
    // Если пользователь не авторизован и пытается получить доступ к защищенному пути
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (session && isPublicPath && req.nextUrl.pathname !== '/') {
    // Если пользователь авторизован и пытается получить доступ к странице входа/регистрации
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
