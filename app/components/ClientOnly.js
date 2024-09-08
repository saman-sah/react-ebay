"use client"

import { useState, useEffect } from 'react'

export default function ClientOnly({ children }) {

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