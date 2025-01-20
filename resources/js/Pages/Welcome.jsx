import React, { useState, useRef, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { gsap } from "gsap";
import { Link } from "@inertiajs/react";

export default function Welcome({ auth, articles }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("Catch me if you can!");
    const [circlePosition, setCirclePosition] = useState({ top: "50%", left: "50%" });
    const carouselRef = useRef(null);

    const modalRef = useRef(null);
    const heroTextRef = useRef(null);
    const heroSubTextRef = useRef(null);
    const heroButtonRef = useRef(null);
    const circleRef = useRef(null);


    useEffect(() => {
        if (carouselRef.current) {
            const totalWidth = carouselRef.current.scrollWidth; // Total lebar konten

            gsap.fromTo(
                carouselRef.current,
                { x: "0px" }, // Mulai dari kiri pojok
                {
                    x: `-${totalWidth}px`, // Geser ke kiri penuh
                    duration: 25, // Lebih smooth
                    ease: "linear",
                    repeat: -1, // Loop tanpa henti
                    modifiers: {
                        x: (x) => {
                            const val = parseFloat(x) % totalWidth; // Reset posisi saat looping
                            return `${val}px`;
                        },
                    },
                }
            );
        }
    }, [articles]);
    


    useEffect(() => {
        gsap.fromTo(
            heroTextRef.current,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
        gsap.fromTo(
            heroSubTextRef.current,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.5 }
        );
        gsap.fromTo(
            heroButtonRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)", delay: 1 }
        );
    }, []);

    const handleCircleClick = () => {
        setScore(score + 1);
        setMessage(`Your score: ${score + 1}`);
        const newTop = `${Math.random() * 80 + 10}%`;
        const newLeft = `${Math.random() * 80 + 10}%`;

        gsap.to(circleRef.current, {
            top: newTop,
            left: newLeft,
            duration: 0.5,
            ease: "power3.out",
        });

        setCirclePosition({ top: newTop, left: newLeft });
    };

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        console.log(articles); // Debugging untuk memastikan data artikel dan user
      }, [articles]);

    return (
        <>
             <Head>
                <title>Adena Revan Portfolio</title>
                <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/847/847969.png" type="image/png" />
            </Head>
            <div className={isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}>
                {/* Navbar */}
                <nav
                    className={`fixed w-full top-0 z-50 backdrop-blur-md shadow-md ${
                        isDarkMode ? "bg-gray-800" : "bg-white"
                    }`}
                    style={{ borderBottomLeftRadius: "50%", borderBottomRightRadius: "50%" }}
                >
                    <div className="container mx-auto flex justify-between items-center px-6 py-4">
                        <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            Adena Page
                        </h1>
                        <div className="flex space-x-4">
                            <div className="relative">
                                <div
                                    className="cursor-pointer flex flex-col justify-center items-center space-y-1 w-8 h-8"
                                    onClick={() => setMenuOpen(!menuOpen)}
                                >
                                    <div
                                        className={`w-full h-1 rounded transition-transform duration-300 ${
                                            isDarkMode ? "bg-white" : "bg-gray-900"
                                        } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
                                    ></div>
                                    <div
                                        className={`w-full h-1 rounded transition-opacity duration-300 ${
                                            isDarkMode ? "bg-white" : "bg-gray-900"
                                        } ${menuOpen ? "opacity-0" : "opacity-100"}`}
                                    ></div>
                                    <div
                                        className={`w-full h-1 rounded transition-transform duration-300 ${
                                            isDarkMode ? "bg-white" : "bg-gray-900"
                                        } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                                    ></div>
                                </div>
                            </div>
                            <label className="relative inline-block w-12 h-6">
                                <input
                                    type="checkbox"
                                    className="opacity-0 w-0 h-0"
                                    checked={isDarkMode}
                                    onChange={toggleDarkMode}
                                />
                                <span
                                    className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition duration-300"
                                    style={{
                                        backgroundColor: isDarkMode ? "#374151" : "#fbbf24",
                                    }}
                                ></span>
                                <span
                                    className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 transform"
                                    style={{
                                        transform: isDarkMode ? "translateX(24px)" : "translateX(0)",
                                    }}
                                ></span>
                            </label>
                        </div>
                    </div>
                </nav>

                {/* Menu Modal */}
                {menuOpen && (
                    <div
                        ref={modalRef}
                        className="fixed inset-0 flex flex-col justify-center items-center z-50 bg-gray-900 bg-opacity-75"
                    >
                        <button
                            onClick={closeMenu}
                            className="absolute top-6 right-6 px-4 py-2 rounded-lg text-lg font-bold bg-red-500 text-white hover:bg-red-600"
                        >
                            Close
                        </button>
                        <div className="flex flex-col items-center space-y-6">
                            <a
                                href="#game"
                                onClick={closeMenu}
                                className="text-4xl font-bold text-white hover:text-yellow-400 transition duration-300"
                            >
                                Game
                            </a>
                            <a
                                href="#about"
                                onClick={closeMenu}
                                className="text-4xl font-bold text-white hover:text-yellow-400 transition duration-300"
                            >
                                About
                            </a>
                            <a
                                href="/login"
                                onClick={closeMenu}
                                className="text-4xl font-bold text-white hover:text-yellow-400 transition duration-300"
                            >
                                Login
                            </a>
                            <a
                                href="/register"
                                onClick={closeMenu}
                                className="text-4xl font-bold text-white hover:text-yellow-400 transition duration-300"
                            >
                                Register
                            </a>
                        </div>
                    </div>
                )}

                {/* Hero Section */}
                <header
                    className={`relative flex flex-col justify-center items-center text-center h-screen bg-cover bg-center ${
                        isDarkMode ? "bg-gray-800" : "bg-gray-100"
                    }`}
                    style={{
                        backgroundImage: isDarkMode
                            ? "url(https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080)"
                            : "url(https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080)",
                    }}
                >
                    <div className="relative z-10">
                        <h1 ref={heroTextRef} className="text-5xl md:text-6xl font-extrabold mb-4">
                            Hallo Guys Welcome to My Page 
                        </h1>
                        <p
                            ref={heroSubTextRef}
                            className="text-lg md:text-xl font-light mb-6"
                        >
                            Hi, I'm <span className="text-yellow-300 font-semibold">Adena</span>. Play the game and have fun!
                        </p>
                        <a
                        ref={heroButtonRef}
                        href="#game"
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-teal-500 hover:from-teal-500 hover:to-purple-500 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-110"
                    >
                        Play Now
                    </a>

                    </div>
                </header>

                {/* Catch the Circle */}
                <section
                    id="game"
                    className={`py-20 px-6 md:px-12 text-center relative overflow-hidden min-h-screen flex flex-col justify-center items-center ${
                        isDarkMode
                            ? "bg-gray-900"
                            : "bg-gray-100"
                    }`}
                    style={{
                        borderTopLeftRadius: "30%",
                        borderTopRightRadius: "70%",
                        borderBottom: isDarkMode ? "10px dashed #fff" : "10px dashed #333",
                    }}
                >
                    <h2 className={`text-5xl font-extrabold mb-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        Catch the Circle
                    </h2>
                    <div
                        ref={circleRef}
                        className={`absolute w-24 h-24 md:w-32 md:h-32 rounded-full cursor-pointer shadow-lg transition-transform transform hover:scale-125 ${
                            isDarkMode
                                ? "bg-gradient-to-br from-gray-800 to-black"
                                : "bg-gradient-to-br from-gray-300 to-gray-500"
                        }`}
                        style={{
                            top: circlePosition.top,
                            left: circlePosition.left,
                            transform: "translate(-50%, -50%)",
                            position: "absolute",
                        }}
                        onClick={handleCircleClick}
                    ></div>
                    <p className={`text-3xl font-bold mt-8 transition-transform transform ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {message}
                    </p>
                    <p
                        className={`text-2xl mt-4 font-semibold ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                        style={{
                            animation: "pulse 1s infinite",
                            animationPlayState: score > 0 ? "running" : "paused",
                        }}
                    >
                        Total Score: <span className="text-yellow-300 font-extrabold">{score}</span>
                    </p>
                </section>

                {/* About Section */}
                <section
                    id="about"
                    className={`py-20 px-6 md:px-12 text-center ${
                        isDarkMode
                            ? "bg-gray-800 text-white"
                            : "bg-gray-200 text-gray-900"
                    }`}
                    style={{
                        borderBottomLeftRadius: "60%",
                        borderBottomRightRadius: "40%",
                    }}
                >
                    <h2 className="text-5xl font-bold mb-6">About This Page</h2>
                    <p className="max-w-3xl mx-auto text-lg leading-relaxed">
                        This page showcases creativity in web development with React and Laravel Inertia. Explore the interactive features, including games and dynamic content, designed to provide an engaging user experience.
                    </p>
                </section>




                <section
            id="articles"
            className={`py-20 px-6 md:px-12 relative overflow-hidden ${
                isDarkMode ? "bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white" : 
                             "bg-gradient-to-r from-gray-200 via-gray-100 to-white text-gray-900"
            }`}
        >
            <h2 className="text-5xl font-bold text-center mb-10">Artikel Terbaru</h2>

            {/* Efek gradient di sisi kiri & kanan */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none"></div>

            {/* Container Carousel */}
            <div className="relative w-full overflow-hidden">
                <div ref={carouselRef} className="flex space-x-8 w-max">
                    {articles.map((article) => (
                        <div
                            key={article.id}
                            className="bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden w-80 flex-shrink-0 transform hover:scale-105 transition-transform duration-500 hover:shadow-2xl"
                            style={{ minWidth: "320px" }}
                        >
                            {/* Gambar Artikel */}
                            {article.image && (
                                <img
                                    src={`/storage/${article.image}`}
                                    alt={article.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            )}
                            <div className="p-5">
                                <h3 className="text-xl font-bold mb-3 hover:text-blue-500 transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2" dangerouslySetInnerHTML={{
                                    __html: article.content.slice(0, 100).replace(/<p>/g, "").replace(/<\/p>/g, "") + "..."
                                }}></p>

                                <p className="text-xs text-gray-500 mb-4">
                                    By {article.user?.name || "Unknown User"}
                                </p>
                                <Link href={route("article.detail", { id: article.id })} className="text-blue-500 font-semibold hover:underline">
                                        Baca Selengkapnya
                                    </Link>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>


                {/* Footer */}
                <footer className="py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-center text-white">
                    <div className="container mx-auto flex flex-col items-center">
                        <p className="text-lg font-semibold">Follow Us</p>
                        <div className="flex space-x-6 mt-4">
                 <a
                    href="https://instagram.com/adenarevan"
                    className="text-2xl text-pink-500 hover:text-pink-400"
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a
                                href="https://facebook.com"
                                className="text-2xl text-blue-500 hover:text-blue-400"
                            >
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a
                                href="https://youtube.com"
                                className="text-2xl text-red-500 hover:text-red-400"
                            >
                                <i className="fab fa-youtube"></i>
                            </a>
                            <a
                                href="https://wa.me/6289612142465"
                                className="text-2xl text-green-500 hover:text-green-400"
                            >
                                <i className="fab fa-whatsapp"></i>
                            </a>
                        </div>
                        <p className="mt-4">© 2025 adenarevan. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
