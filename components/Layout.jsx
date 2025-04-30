'use client'
import React from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';
const menus =[
  {
    lable:'Home',
    href:'/'
  },
  {
    lable:'Movies',
    href:'/movies'
  },
  {
    lable:'SignIn',
    href:'/sign-in'
  },
  // {
  //   lable:'SignUP',
  //   href:'/signup'
  // },
]

const Layout = ({children}) => {
  const pathname = usePathname()

  const blacklist =[
    "/sign-in",
    "/signup",
   
  ]
  const isBlacklist = blacklist.includes (pathname)
  if (isBlacklist)
    return(
  <div>
{children}
  </div>
  )
  return (
    <div>
              <nav className=" px-[10%] bg-white shadow-lg sticky to-0 left-0 w-full py-6 flex justify-between item-center">
          <Link href="/" className="text-2xl font-bold">MOVIE-HUB</Link>
          <div className="flex gap-16">
            {
              menus.map((item,index)=>(
                  <Link
                   href={item.href}
                   key={index}
                   className={pathname === item.href ? 'text-violet-600' : 'text-black'}>
                  {item.lable}
                  </Link>

              ))
            }
                 <Link
                   href="/signup"
                  
                   className="bg-violet-600 px-12 py-3 rounded text-white">Signup
                  
                  </Link>
              
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
