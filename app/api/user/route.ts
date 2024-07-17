// this file and the api directory it sits in as a whole,
// was created just following the 'getting started' for kv databases.

import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function GET() {
  const user = await kv.hgetall('user:me')
  return NextResponse.json(user)
}
