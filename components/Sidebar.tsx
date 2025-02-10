'use client'

import Link from "next/link"
import {  Package } from "lucide-react"
import { usePathname } from "next/navigation"


const navLinks = [
    {
        title:"Dashboard",
        link:"/"
    },
    {
         title:"Refund Orders",
        link:"/refunds"
    }
]

export function Sidebar() {
    const pathname = usePathname();
    
  return (
    <div className="max-lg:w-fit lg:w-64 bg-gray-100 h-full p-4 hidden md:block">
      <nav className="space-y-2">
        {
            navLinks?.map(item=>{
                const isActive = pathname === item.link 
                
                return (
                    <Link key={item?.title} href={item?.link} className={`flex items-center space-x-2 p-2 hover:bg-gray-200 rounded ${isActive && 'bg-gray-400'}`}>
          <Package size={20} />
          <span className="max-lg:hidden">{item?.title}</span>
        </Link>
                )
            })
        }
      </nav>
    </div>
  )
}

