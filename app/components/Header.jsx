import React from 'react'
import Link from 'next/link'
import { auth } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';

function Header() {

    const { userId } = auth();


    return (
        <>
            <nav className="bg-grey-700 py-4 px-6 flex items-center justify-between mb-5">
                <div className="flex items-center">
                    <Link href="/">
                        <div className="text-lg-uppercase font-bold text-black">
                            Clerk Authentication App
                        </div>
                    </Link>
                </div>
                <div className="text-white flex items-center">
                    {!userId && (
                        <>
                            <Link href='login' className='text-black hover:text-white mr-4'>
                                Login
                            </Link>
                            <Link href='sign-up' className='text-black hover:text-white mr-4'>
                                Sign Up
                            </Link>
                        </>
                    )}
                    {userId && (
                        <Link href="dashboard" className='text-black hover:text-white mr-4'>
                            Dashboard
                        </Link>
                    )}
                    {userId && (
                        <Link href="profile" className='text-black hover:text-white mr-4'>
                            Profile
                        </Link>
                    )}
                    
                    <div className="ml-auto">
                        <UserButton afterSignOutUrl='/' />
                    </div>

                </div>
            </nav>
        </>
    )
}

export default Header