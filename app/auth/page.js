"use client"

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import Link from 'next/link'

export default function AuthPage() {
  const supabase = createClientComponentClient()
  return (
    <>
      <div
        id='Authpage'
        className='w-full min-h-screen bg-white'
      >
        <div className='w-full flex items-center justify-center p-5 border-b-gray-300'>
          <Link
            href='/'
            className='min-w-[170px]'
          >
            <img
              width='170'
              src='/images/logo.svg'
            />
          </Link>
        </div>
        <div className='w-full flex items-center justify-between p-5 borer-b-gray-300'>
          Login / Register
        </div>
        <div className='max-w-[400] mx-auto px-2'>
          <Auth
            onlyThirdPartyProviders
            redirectTo={`${window.location.origin}/auth/callback`}
            supabaseClient={supabase}
            providers={['google']}
            appearance={{ theme: ThemeSupa }}
          />
        </div>
      </div>
    </>
  )
}