"use client"

import { useState, useEffect, ReactNode } from 'react'

interface ClientOnlyProps {
  children: ReactNode
}

export default function ClientOnly({ children }: ClientOnlyProps) {

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])


  return (
    <>
      {
        isClient
          ? <div>{children}</div>
          : null
      }
    </>
  )
}