"use client"

import { useState, useEffect } from 'react'

import SubMenu from './includes/SubMenu'
import TopMenu from './includes/TopMenu'
import MainHeader from './includes/MainHeader'
import Footer from './includes/Footer'

export default function MainLayout({ children }) {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    window.addEventListener('storage', function () {
      let res = localStorage.getItem('isLoading')
      res === 'false' ? setIsLoading(false) : setIsLoading(true)
    })
  }, [])


  return (
    <>
      <div
        id="MainLayout"
        className="min-w-[150px] max-w-[1300px] mx-auto"
      >
        <div>
          <TopMenu />
          <MainHeader />
          <SubMenu />

          {children}

          <Footer />
        </div>
      </div>
    </>
  )
}