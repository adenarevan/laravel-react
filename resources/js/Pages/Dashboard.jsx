import React from 'react';
import { Head } from '@inertiajs/react';
import { toast } from 'react-toastify'; // Import fungsi toast


export default function Dashboard({ auth }) {
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-600 text-white flex flex-col">
                <div className="p-4 text-center font-bold text-2xl">My Dashboard</div>
                <nav className="flex flex-col space-y-2 p-4">
                    <a href="/dashboard" className="p-2 hover:bg-blue-500 rounded">
                        Dashboard
                    </a>
                    <a href="/profile" className="p-2 hover:bg-blue-500 rounded">
                        Profile
                    </a>
                    <a href="/settings" className="p-2 hover:bg-blue-500 rounded">
                        Settings
                    </a>
                </nav>
                <div className="mt-auto p-4">
                 <div className="mt-auto p-4">
                        <button
                            onClick={handleLogout}
                            className="block p-2 w-full text-center bg-red-500 hover:bg-red-600 rounded"
                        >
                            Logout
                        </button>
                    </div>

                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-gray-800">Welcome, {auth.user.name}</h1>
                    <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Notifications
                    </button>
                </header>

                {/* Content */}
                <main className="p-6">
                    <Head title="Dashboard" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-white shadow rounded-lg p-4">
                            <h2 className="text-lg font-bold text-gray-700">Total Users</h2>
                            <p className="text-3xl font-semibold text-blue-600">1,234</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white shadow rounded-lg p-4">
                            <h2 className="text-lg font-bold text-gray-700">Monthly Revenue</h2>
                            <p className="text-3xl font-semibold text-green-600">$5,678</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white shadow rounded-lg p-4">
                            <h2 className="text-lg font-bold text-gray-700">Active Projects</h2>
                            <p className="text-3xl font-semibold text-purple-600">42</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
                        <div className="bg-white p-4 shadow rounded-lg">
                            <p className="text-gray-600">You don't have any recent activities yet.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}


const handleLogout = async () => {
    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        const response = await fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
        });

        if (response.ok) {
            toast.success('Logout berhasil!'); // Notifikasi sukses
            setTimeout(() => {
                window.location.href = '/login'; // Redirect setelah logout
            }, 2000);
        } else {
            toast.error('Logout gagal. Silakan coba lagi.'); // Notifikasi error
        }
    } catch (error) {
        console.error('Error during logout:', error);
        toast.error('Terjadi kesalahan saat logout.'); // Notifikasi error
    }
};