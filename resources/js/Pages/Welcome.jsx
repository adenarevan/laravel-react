import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("Catch me if you can!");
    const [circlePosition, setCirclePosition] = useState({ top: "50%", left: "50%" });

    // Handle the circle click
    const handleCircleClick = () => {
        setScore(score + 1);
        setMessage(`Your score: ${score + 1}`);
        setCirclePosition({
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`
        });
    };

    return (
        <>
            <Head title="Interactive Game Page" />
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

                {/* Navbar */}
                <nav className="fixed w-full top-0 z-50 bg-black bg-opacity-70 backdrop-blur-md shadow-md">
                    <div className="container mx-auto flex justify-between items-center px-6 py-4">
                        <h1 className="text-2xl font-bold">
                            Adena's Fun Page
                        </h1>
                        <div className="flex space-x-6">
                            <a href="#game" className="hover:text-red-400 transition">Game</a>
                            <a href="#about" className="hover:text-red-400 transition">About</a>
                            <a href="#contact" className="hover:text-red-400 transition">Contact</a>
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <header className="flex flex-col justify-center items-center text-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://source.unsplash.com/1920x1080/?technology)' }}>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Welcome to My Interactive Game</h1>
                    <p className="text-lg md:text-xl font-light mb-6">
                        Hi, I'm <span className="text-red-500 font-semibold">Adena</span>. Play the game and have fun!
                    </p>
                    <a href="#game" className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition duration-300">
                        Play Now
                    </a>
                </header>

                {/* Game Section */}
                <section id="game" className="py-20 px-6 md:px-12 bg-gray-900 text-center relative overflow-hidden">
                    <h2 className="text-4xl font-bold text-red-500 mb-6">Catch the Circle</h2>
                    <p className="text-lg font-light mb-8">
                        Click the circle as many times as you can!
                    </p>
                    <div
                        className="absolute w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-red-400 to-yellow-500 rounded-full cursor-pointer shadow-lg"
                        style={{
                            top: circlePosition.top,
                            left: circlePosition.left,
                            transform: "translate(-50%, -50%)",
                            position: "absolute",
                        }}
                        onClick={handleCircleClick}
                    ></div>
                    <p className="text-2xl font-bold mt-6">{message}</p>
                    <p className="text-lg mt-2">Total Score: <span className="text-yellow-400">{score}</span></p>
                </section>

                {/* About Section */}
                <section id="about" className="py-20 px-6 md:px-12 bg-gray-800">
                    <h2 className="text-4xl font-bold text-center mb-8 text-red-500">About This Page</h2>
                    <p className="text-center max-w-3xl mx-auto text-lg leading-relaxed">
                        This page is designed to showcase creativity and fun in web development. The game you’re playing
                        is an example of interactive web design built using React and Laravel Inertia.
                    </p>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-20 px-6 md:px-12 bg-gray-900">
                    <h2 className="text-4xl font-bold text-center mb-8">Get In Touch</h2>
                    <form className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg text-black">
                        <div className="mb-4">
                            <label className="block font-semibold mb-2" htmlFor="name">Name</label>
                            <input id="name" type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Your Name" />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold mb-2" htmlFor="email">Email</label>
                            <input id="email" type="email" className="w-full p-2 border border-gray-300 rounded" placeholder="Your Email" />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold mb-2" htmlFor="message">Message</label>
                            <textarea id="message" rows="5" className="w-full p-2 border border-gray-300 rounded" placeholder="Your Message"></textarea>
                        </div>
                        <button type="submit" className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full">
                            Send Message
                        </button>
                    </form>
                </section>

                {/* Footer */}
                <footer className="py-6 text-center bg-black">
                    <p className="text-gray-500">© 2025 Adena Revan. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}
