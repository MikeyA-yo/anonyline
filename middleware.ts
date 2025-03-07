import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSafeUser } from './components/getUser'

export async function middleware(request: NextRequest) {
  const authCookie = await getSafeUser()
  // const { pathname } = request.nextUrl

  if (!authCookie){
    console.log(authCookie)
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/chat/:path*',
  ]
}