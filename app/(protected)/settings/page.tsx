"use client";

import { auth } from "@/auth";
import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
    const router = useRouter();
  

    const handleLogout = async () => {
        await signOut({ redirect: false });
        // Clear any client-side session data if necessary
        // For example, you might want to clear localStorage or cookies
        localStorage.removeItem('user');
        // Redirect to login page
        router.push('/login');
    };

    return (
        <div>
          
            <button onClick={handleLogout}>Sign out</button>
        </div>
    );
}
