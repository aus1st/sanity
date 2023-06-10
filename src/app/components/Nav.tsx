'use client'
import { Popover,Transition } from '@headlessui/react'
import Link from 'next/link'
import React, {Fragment} from 'react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/solid'

const Nav = () => {
  return (
    <Popover className='mx-auto flex items-center border-b-2 px-6 py-2 h-20' >
      
    <h1 className="font-bold">Ahmed Siddiqui</h1>
    <div className="grow">
        <div className="hidden sm:flex items-center justify-center gap-2 md:gap-8">
            <Link href="#">Home</Link>
            <Link href="#">Blog</Link>
            <Link href="#">Shop</Link>
            <Link href="#">About</Link>
            <Link href="#">Contact</Link>
        </div>
    </div>

<div className='flex grow items-center justify-end sm:hidden'>
    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
        <span className='sr-only'>Open Menu</span>
    <Bars3Icon className='h-6 w-6 aria-hidden="true"'></Bars3Icon>
    </Popover.Button>

</div>
<Transition as={Fragment} enter='duration-200 ease-out'
enterFrom='opacity-0-scale-95'

enterTo='opacity-100-scale-100'
leave='duration-100 ease-in'
leaveFrom='opacity-100-scale-100'
leaveTo='opacity-0-scale-95'>


<Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
<div className='rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50'>

<div className='px-5 pt-5 pb-6'>
<div className='flex items-center justify-between'>

<h1 className="font-bold">Ahmed Siddiqui</h1>

<Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
        <span className='sr-only'>Close Menu</span>
    <XMarkIcon className='h-6 w-6 aria-hidden="true"'></XMarkIcon>
    </Popover.Button>
</div>
</div>

<div className='mt-6'>
    <nav className='grid gap-y-8'>
    
    <Link className='focus:outline-none focus:ring-2 focus:ring-inset focus-ring-gray-500 px-2' href="#">Home</Link>
            <Link className='focus:outline-none focus:ring-2 focus:ring-inset focus-ring-gray-500 px-2' href="#">Blog</Link>
            <Link className='focus:outline-none focus:ring-2 focus:ring-inset focus-ring-gray-500 px-2' href="#">Shop</Link>
            <Link className='focus:outline-none focus:ring-2 focus:ring-inset focus-ring-gray-500 px-2' href="#">About</Link>
            <Link className='focus:outline-none focus:ring-2 focus:ring-inset focus-ring-gray-500 px-2' href="#">Contact</Link>
    </nav>
</div>

<div className='flex flex-col items-center mt-6 gap-2'>
        <Link className='rounded-md bg-white px-4 py-2 text-sm font-medium text-black md:text-xl w-full border -2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 ' href={"#"}>Signup</Link>
        <Link className='rounded-md bg-white px-4 py-2 text-sm font-medium text-black md:text-xl w-full border -2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500' href={"#"}>Login</Link>
</div>

</div>

</Popover.Panel>
</Transition>

    <div className='hidden sm:block'>
    <div className='mr-2 font-bold space-x-2'>
        <Link href={"#"}>Signup</Link>
        <Link href={"#"}>Login</Link>
    </div>
    </div>

    </Popover>
    
  )
}

export default Nav
