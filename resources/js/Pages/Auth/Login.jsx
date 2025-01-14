import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { toast } from 'react-toastify'; // Tambahkan import Toastify di file Login

export default function Login({ status, canResetPassword }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState(null);
    const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
    const [forgotPasswordError, setForgotPasswordError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({ email, password, remember }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Login failed:', errorData);

                // Notifikasi biru cerah untuk error
                toast.error('Login gagal! Silakan coba lagi atau periksa password dan email.', {
                    className: 'bg-blue-500 text-white font-bold text-center',
                    progressClassName: 'bg-blue-300',
                    autoClose: 3000,
                });
            } else {
                const data = await response.json();
                console.log('Login successful:', data);

                // Redirect ke dashboard
                window.location.href = '/dashboard';
            }
        } catch (error) {
            console.error('Error during login:', error);

            // Notifikasi biru cerah jika terjadi error server
            toast.error('Terjadi kesalahan pada server.', {
                className: 'bg-blue-500 text-white font-bold text-center',
                progressClassName: 'bg-blue-300',
                autoClose: 3000,
            });
        }
    };
    const handleForgotPassword = async () => {
        if (!forgotPasswordEmail || !forgotPasswordEmail.includes('@')) {
            setForgotPasswordError('Please enter a valid email address.');
            return;
        }
    
        try {
            // Ambil CSRF token dari meta tag
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    
            const response = await fetch('/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken, // Kirim CSRF token di header
                },
                body: JSON.stringify({ email: forgotPasswordEmail }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setForgotPasswordMessage('Password reset link sent to your email.');
                setForgotPasswordError('');
                toast.success('Link reset password berhasil dikirim!');
            } else {
                setForgotPasswordMessage('');
                setForgotPasswordError(data.message || 'Failed to send reset link.');
                toast.error(data.message || 'Gagal mengirim link reset password.');
            }
        } catch (error) {
            setForgotPasswordMessage('');
            setForgotPasswordError('An error occurred. Please try again.');
            toast.error('Terjadi kesalahan saat mengirim link reset password.');
        }
    };
    
    

    const handleGoogleLogin = () => {
        // Redirect to Google login route
        window.location.href = '/auth/google';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center">
            <Head title="Login" />

            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
                <div className="flex flex-col items-center justify-center mt-10 space-y-4 animate-fade-in">
                    <h1 className="text-6xl font-extrabold text-gradient bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent text-center">
                        Selamat Datang
                    </h1>
                    <p className="text-lg font-medium text-gray-600 text-center max-w-2xl">
                        Portofolio Website Adena
                    </p>
                </div>
                {status && (
                    <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                        {status}
                    </div>
                )}
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        {canResetPassword && (
                            <button
                                type="button"
                                className="text-sm font-medium text-pink-600 hover:text-pink-500"
                                onClick={() => setForgotPasswordOpen(true)}
                            >
                                Forgot your password?
                            </button>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        >
                            Sign In
                        </button>
                    </div>

                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="/register" className="text-pink-600 hover:text-pink-500">
                        Register here
                    </a>
                </p>

                                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">Or continue with</p>
                    <div className="flex space-x-4 justify-center mt-4">
                        <button
                            onClick={handleGoogleLogin}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                        >
                            Google
                        </button>
                        <a
                            href="/auth/facebook"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                        >
                            Facebook
                        </a>
                    </div>
                </div>
            </div>


 {/* Modal Forgot Password */}
 {isForgotPasswordOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 shadow-xl w-96">
                        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Enter your email address to receive a password reset link.
                        </p>

                        {forgotPasswordMessage && (
                            <p className="text-green-600 text-sm mb-4">{forgotPasswordMessage}</p>
                        )}

                        {forgotPasswordError && (
                            <p className="text-red-600 text-sm mb-4">{forgotPasswordError}</p>
                        )}

                        <input
                            type="email"
                            value={forgotPasswordEmail}
                            onChange={(e) => setForgotPasswordEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full p-2 border rounded mb-4"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded"
                                onClick={() => setForgotPasswordOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-pink-600 text-white rounded"
                                onClick={handleForgotPassword}
                            >
                                Send Link
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}