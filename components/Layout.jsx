'use client'
import React from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';
const menus = [
  {
    lable: 'Home',
    href: '/'
  },
  {
    lable: 'Movies',
    href: '/movies'
  },
  {
    lable: 'webserise',
    href: '/movies'
  },
  {
    lable: 'contuct us',
    href: '/sign-in'
  },
 
  // {
  //   lable:'CONTUCT US',
  //   href:'/signup'
  // },
]

const Layout = ({ children }) => {
  const pathname = usePathname()

  const blacklist = [
    "/sign-in",
    "/signup",

  ]
  const isBlacklist = blacklist.includes(pathname)
  if (isBlacklist)
    return (
      <div>
        {children}
      </div>
    )
  return (
    <div className='text-center'>
      
      <nav className=" navbar bg-linear-to-t from-sky-500 to-indigo-500 ">
        <Link href="/" className="text-3xl  font-bold ">starxmovies.com</Link>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 text-1xl">
          {
            menus.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className={pathname === item.href ? 'text-orange-600 font-bold underline' : 'text-black font-bold'}>
                {item.lable}
              </Link>

            ))
          }
         

        </div>
      </nav>
     
      <section className="px-[10%] py-16">{children}</section>
      <footer className="bg-gray-950 h-[450px] flex items-center justify-center text-white text-3xl">
        <h1>hello footer</h1>
      </footer>
    </div>
  )
}

export default Layout
