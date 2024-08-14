"use client"
import SubMenu from './includes/SubMenu'
import TopMenu from './includes/TopMenu'
import MainHeader from './includes/MainHeader'
import Footer from './includes/Footer'

export default function MainLayout({ children }) {
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