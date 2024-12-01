import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';


async function AuthLayout({children}: {children: React.ReactNode}) {

    const session = await auth()

    if (session?.user) {
        redirect('/dashboard')
    }

    return (
        <div>
            <div className='w-full px-20 flex justify-between items-center py-3  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-200 to-pink-100 shadow-md'>
                <div className='text-lg font-bold text-gray-800'>
                    <Link href='/'>Praxis</Link>
                </div>
                <div>
                    <Button variant='outline' size='default' asChild className='mr-4'>
                        <Link href={'/auth/login'}>Login</Link>
                    </Button>
                    <Button variant='outline' size='default' asChild className='mr-4 transition-all'>
                        <Link href={'/auth/register'}>Register</Link>
                    </Button>
                </div>
            </div>
        <div className='min-h-[94vh] flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-300 to-pink-700'>
            {children}
        </div>

        </div>
    );
}

export default AuthLayout;