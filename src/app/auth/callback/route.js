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

      // Check if user has an application
      const application = await prisma.tutorApplication.findFirst({
        where: { email }
      })

      // If tutor login was selected but user has no tutor profile AND no application
      if (role === 'tutor' && !tutor && !application) {
        return NextResponse.redirect(`${origin}/login?error=no_tutor_app`)
      }

      if (!tutor) {
        // Ensure student profile for student login flow
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
