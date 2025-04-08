'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Capture the token from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            // Store the token in localStorage
            localStorage.setItem('token', token);

            // Simulate fetching user data (replace this with an API call if needed)
            setUser({
                name: 'Adityaraj Singha',
                email: 'minecraftadityarajsingha@gmail.com',
                userType: 'student',
            });

            // Remove the token from the URL
            window.history.replaceState({}, document.title, '/dashboard');
        } else {
            // Redirect to login if no token is found
            router.push('/auth');
        }
    }, [router]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="flex items-center justify-between mb-12">
                    <h1 className="text-4xl font-bold">Welcome, {user.name}!</h1>
                    <button
                        onClick={() => {
                            localStorage.removeItem('token'); // Clear token
                            router.push('/auth'); // Redirect to login
                        }}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Log Out
                    </button>
                </header>

                <section className="bg-white text-indigo-600 rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Your Details</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>User Type:</strong> {user.userType}</p>
                </section>
            </div>
        </div>
    );
}