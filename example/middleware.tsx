import { NextResponse } from 'next/server'
import { postbuildConfig } from '@nimpl/config/postbuild-config'
 
export function middleware() {
  return NextResponse.json(postbuildConfig)
}

export const config = {
  matcher: '/postbuild',
}