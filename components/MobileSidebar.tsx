'use client';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu, Package } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";


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

const MobileSidebar = () => {
    const pathname = usePathname();
  return (
    <Sheet>
  <SheetTrigger>
    <Menu/>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Dashboard Refund App</SheetTitle>
      <SheetDescription>
        
      </SheetDescription>
      <nav className="space-y-2">
        {
            navLinks?.map(item=>{
                const isActive = pathname === item?.link;
                return (
                    <Link key={item?.title} href={item?.link} className={`flex items-center space-x-2 p-2 hover:bg-gray-200 rounded ${isActive && 'bg-gray-400'}`}>
          <Package size={20} />
          <span className="">{item?.title}</span>
        </Link>
                )
            })
        }
      </nav>
    </SheetHeader>
    
  </SheetContent>
</Sheet>
  )
}

export default MobileSidebar