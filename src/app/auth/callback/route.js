import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/lib/prisma'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'
  const role = searchParams.get('role')

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data?.user) {
      const email = data.user.email
      const name = data.user.user_metadata?.full_name || data.user.user_metadata?.name || email.split('@')[0]

      // Check if user is in Tutor table
      const tutor = await prisma.tutor.findUnique({
        where: { email }
      })

      if (!tutor) {
        // If not tutor, ensure they have a Student profile
        const student = await prisma.student.findUnique({
          where: { email }
        })
        if (!student) {
          await prisma.student.create({
            data: { email, name }
          })
        }
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`)
}
