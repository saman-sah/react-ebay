"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Session, User } from "@supabase/supabase-js"

import { useRouter } from "next/navigation"
import { createContext, useState, useEffect, useContext } from "react"

import type { UserContextType, ReactNodeProps } from "../types"

const Context = createContext<UserContextType | null>(null)

const Provider = ({ children }: ReactNodeProps) => {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [id, setId] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [picture, setPicture] = useState<string | null>(null)

  const supabaseClient = createClientComponentClient()

  const getCurrentSession = async (): Promise<Session | null> => {
    const res = await supabaseClient.auth.getSession()
    if (res && res.data.session) {
      return res.data.session
    }

    clearUser()
    return null
  }

  const getCurrentUser = async (): Promise<void> => {
    if (id) return

    const res = await supabaseClient.auth.getUser()
    if (res && res.data.user) {
      const theUser = res.data.user

      setUser(theUser)

      setId(theUser.id)
      setEmail(theUser.email ?? null)
      setName(theUser?.identities[0].identity_data.name ?? null)
      setPicture(theUser?.identities[0].identity_data.picture ?? null)
    }
  }

  useEffect(() => {
    const isUser = async (): Promise<void> => {
      const currentSession = await getCurrentSession()
      if (currentSession) await getCurrentUser()
    }
    isUser()
  }, [])

  const signOut = async () => {
    await supabaseClient.auth.signOut()
    clearUser()
    router.push('/')
  }

  const clearUser = () => {
    setUser(null)
    setId(null)
    setEmail(null)
    setName(null)
    setPicture(null)
  }

  const exposed = {
    user, id, email, name, picture, signOut
  }

  return <Context.Provider value={exposed}>{children}</Context.Provider>

}

export const useUser = (): UserContextType => {
  const context = useContext(Context)

  if (!context) {
    throw new Error("useUser must be used within a Provider")
  }
  return context
}

export default Provider
