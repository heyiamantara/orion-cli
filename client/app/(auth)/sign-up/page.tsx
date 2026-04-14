"use client"
import { RegisterForm } from '@/components/register-form'
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react'

const Page = () => {
    const { data, isPending } = authClient.useSession();
    const router = useRouter();

    React.useEffect(() => {
        if (!isPending && data?.session && data?.user) {
            router.push("/dashboard")
        }
    }, [data, isPending, router]);

    if (isPending) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-background">
                <Spinner />
            </div>
        )
    }
    
    return (
        <RegisterForm />
    )
}

export default Page
