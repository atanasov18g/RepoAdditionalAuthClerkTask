'use client';

import React from 'react'
import { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {

    const { isLoaded, signUp, setActive } = useSignUp();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState('');
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefaul();
        if (!isLoaded) {
            return;
        }

        try {
            await signUp.create({
                username,
                email_address: email,
                password,

            })
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            setPendingVerification(true);
        } catch (error) {
            console.log(error);
        }
    }
    const onPressVerify = async (e) => {
        e.preventDefaul();
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({ code, })
            if (completeSignUp.status !== 'complete') {
                console.log(JSON.stringify(completeSignUp, null, 2))
            }
            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push('/')
            }
        } catch (error) {
            console.log(JSON.stringify(error, null, 2));
        }
    }

    return (
        <>
            <div className="border p-5 rounded" style={{ width: '500px' }}>

                <h1 className="text-2xl mb-4">Register</h1>
                {!pendingVerification && (
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="username"
                                className='block mb-2 text-sm font-medium text-gray-900'
                            >
                                Username
                            </label>
                            <input type="text"
                                name='username'
                                id='username'
                                onChange={(e) => setUsername(e.target.value)}
                                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
                                required={true}
                            />
                        </div>
                        <div>
                            <label htmlFor="email"
                                className='block mb-2 text-sm font-medium text-gray-900'
                            >
                                Email
                            </label>
                            <input type="text"
                                name='email'
                                id='email'
                                onChange={(e) => setEmail(e.target.value)}
                                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
                                required={true}
                            />
                        </div>
                        <div>
                            <label htmlFor="password"
                                className='block mb-2 text-sm font-medium text-gray-900'
                            >
                                Password
                            </label>
                            <input type="text"
                                name='password'
                                id='password'
                                onChange={(e) => setPassword(e.target.value)}
                                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
                                required={true}
                            />
                        </div>
                        <button
                            type='submit'
                            className='w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                        >
                            Create Account
                        </button>
                    </form>
                )}

                {pendingVerification && (
                    <div>
                        <form className='space-y-4 md:space-y-6'>
                            <input value={code}
                                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounder-lg block w-full p-2.5'
                                placeholder='Enter Vefication Code...'
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <button type='submit'
                                onClick={onPressVerify}
                                className='w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                            >
                                Verify Email
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}

export default RegisterPage