'use client'
import React, { FC, useState } from 'react'

type Props = {
    
        open: boolean,
        setOpen: any
}

const MobileNav:FC<Props> = ({open,setOpen})=> {
return (
    <div className={`absolute top-0 left-0  w-screen bg-white transform ${open? "-translate-y-0":"-translate-y-full"} transition-transform duration-300 ease-in-out filter`}>
        <div className="flex flex-col justify-center items-center mt-28">
            <a href="#" className="text-2xl text-red-500 font-bold my-4">Home</a>
            <a href="#" className="text-2xl hover:text-red-500 font-bold my-4">About us</a>
            <a href="#" className="text-2xl hover:text-red-500 font-bold my-4">Gallery</a>
            <a href="#" className="text-2xl hover:text-red-500 font-bold my-4">Service</a>
            <a href="#" className="text-2xl hover:text-red-500 font-bold">Contact Us</a>
        </div>
    </div>
)
}

const FullScreenNav = () => {
    const [open, setOpen] = useState(false)
  return (
    <nav>
        <MobileNav open={open} setOpen={setOpen}/>
        <div className='hidden sm:block items-center mt-4' >
            <ul className='flex gap-4 items-center justify-center'>
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Contact</li>
            </ul>
        </div>

        <div className='w-11/12 flex justify-end items-center sm:hidden block '>
                <div className='group z-50  relative w-6 h-6  cursor-pointer flex-col justify-between items-center flex' onClick={()=>{setOpen(!open)}}>
                {/* hamburger  */}
                <span className={`h-1 w-full bg-black  rounded-lg group-hover:text-red-500 cursor-pointer transform transition duration-300 ease-in-out ${open? "rotate-45 translate-y-2.5":""}`}/>
             
                <span className={`h-1 w-full bg-black  rounded-lg group-hover:text-red-500 cursor-pointer transform transition duration-300 ease-in-out ${open? "w-0":"w-full"}`}/>
                
                <span className={`h-1 w-full bg-black  rounded-lg group-hover:text-red-500 cursor-pointer transform transition duration-300 ease-in-out ${open? "-rotate-45 -translate-y-2.5":""}`}/>
                </div>
        </div>
    </nav>
  )
}

export default FullScreenNav
