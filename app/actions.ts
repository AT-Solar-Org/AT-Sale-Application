'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(prevState: unknown, formData: FormData): Promise<{error?: string; success?: boolean; email?: string}> {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    if (error.message.includes("Email not confirmed")) {
        return { error: "Please verify your email before logging in." }
    }
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  // The middleware will handle routing to /pending or /dashboard based on the profile
  redirect('/dashboard')
}

export async function signup(prevState: unknown, formData: FormData): Promise<{error?: string; success?: boolean; email?: string}> {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // NOTE: Next.js Server Actions don't support returning complex error objects
  const { error: signUpError } = await supabase.auth.signUp(data)

  if (signUpError) {
    return { error: signUpError.message }
  }

  // We need to return the email so we can redirect via client route for the pending profile data if needed
  return { success: true, email: data.email }
}
