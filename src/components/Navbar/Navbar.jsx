import logo from "../../assets/Logo2.png"
import { IoMdSearch } from "react-icons/io"
import { useState , useEffect} from "react"
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi"
import { BsMoon, BsSun } from "react-icons/bs"
import { useSelector , useDispatch } from "react-redux"
import { toggleTheme } from "../../features/themeSlice"
import {Link, useNavigate} from 'react-router-dom'
import { logout } from '../../features/authSlice';
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const [query, setQuery] = useState("");
    const theme = useSelector((state) => state.theme.mode)
    const isDark = theme === "dark";
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && query.trim()) {
        navigate(`/search?query=${encodeURIComponent(query.trim())}`);
        setQuery(""); // Clear after search
        }
    };

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
            document.body.classList.remove("bg-gray-400/20", "text-black")
            document.body.classList.add("bg-[#12102a]", "text-white")
        } else {
            document.documentElement.classList.remove("dark")
            document.body.classList.remove("bg-[#12102a]", "text-white")
            document.body.classList.add("bg-gray-400/20", "text-black")
        }
    }, [theme])

    return (
        <>
        <div className={`${theme === "dark" 
        ? "bg-[#12102a] text-white border-b border-gray-700 shadow-md" 
        : "bg-gray-300/50 text-black border-b border-gray-200 shadow-md"} py-3 px-6`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <a href="/" className="flex items-center">
                        <img
                            src={logo}
                            alt="LOGO"
                            className="w-40 sm:w-20 object-contain"
                        />
                        </a>

                        <div className="md:flex gap-6 items-center">
                            <ul className="hidden md:flex gap-6 items-center">
                                <li>
                                    <Link 
                                        href="/" 
                                        onClick={() => {
                                            const section = document.getElementById("trending");
                                            section?.scrollIntoView({ behavior: "smooth" });
                                        }}
                                        className="hover:text-purple-400 dark:hover:text-purple-700 duration-150 cursor-pointer">Explore</Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/" 
                                        onClick={() => {
                                            const section = document.getElementById("whatsnew");
                                            section?.scrollIntoView({ behavior: "smooth" });
                                        }}
                                        className="hover:text-purple-400 dark:hover:text-purple-700 duration-150 cursor-pointer">Releases</Link>
                                </li>
                            </ul>

                        <div className="relative">
                            <input
                                type="search"
                                name="search"
                                id="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search games ..."
                                className={`${
                                theme === "dark"
                                    ? "bg-gray-700/50 text-white placeholder-white/50"
                                    : "bg-gray-100 text-black placeholder-black/50"
                                } px-4 py-1.5 pr-10 rounded-2xl focus:outline-none`}
                            />
                            <IoMdSearch
                                className={`absolute top-3 -translate-y-0.5 right-3 cursor-pointer ${
                                theme === "dark" ? "text-gray-300" : "text-gray-600"
                                }`}
                                onClick={() => {
                                if (query.trim()) {
                                    navigate(`/search?query=${encodeURIComponent(query.trim())}`);
                                    setQuery("");
                                }
                                }}
                            />
                            </div>
                    </div>
                </div>
                <ul className="hidden md:flex gap-4 items-center">
                    <li>
                        <button onClick={() => dispatch(toggleTheme())} className="text-white dark:text-black bg-gray-700 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-400 px-3 py-2 rounded-4xl cursor-pointer">
                            {theme === "dark" ? <BsSun /> : <BsMoon />}
                        </button>
                    </li>
                    {isAuthenticated ? (
                        <li>
                        <FaUserCircle
                            size={30}
                            className={`cursor-pointer ${isDark ? "text-white" : "text-black"}`}
                            title="Profile"
                        />
                        </li>
                    ) : (
                        <>
                                <li>
                                    <button
                                    onClick={() => navigate("/login")}
                                    className={`text-center ${
                                        isDark
                                        ? "bg-gray-300 text-black hover:bg-gray-400"
                                        : "bg-gray-700 text-white hover:bg-gray-600"
                                    } px-4 py-2.5 rounded-2xl font-medium shadow-md transition duration-200`}
                                    >
                                    Log In
                                    </button>
                                </li>
                                <li>
                                    <button
                                    onClick={() => navigate("/signup")}
                                    className="text-center bg-gradient-to-r from-purple-700 to-blue-600 hover:from-purple-600 hover:to-blue-500 text-white px-4 py-2.5 rounded-2xl font-medium shadow-md transition duration-200"
                                    >
                                    Sign Up
                                    </button>
                                </li>
                                </>
                            )}
                </ul>
                <div className="md:hidden ml-2 flex items-center">
                    <button onClick={() => dispatch(toggleTheme())} className="text-white dark:text-black bg-gray-700 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-400 mr-5 px-3 py-2 rounded-4xl">
                        {theme === "dark" ? <BsSun /> : <BsMoon />}
                    </button>
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <HiOutlineX className={`${theme === "dark" ? "text-white" : "text-black"} cursor-pointer w-6 h-6`} /> : <HiOutlineMenuAlt3 className={`${theme === "dark" ? "text-white" : "text-black"} w-6 h-6`} />}
                    </button>
                </div>
            </div>
        </div>
        {isOpen && (
            <div className="md:hidden mt-4 space-y-4 border-t border-white/20 dark:border-black/10 pt-4">
                <Link href="#" 
                onClick={() => {
                    const section = document.getElementById("trending");
                    section?.scrollIntoView({ behavior: "smooth" });
                }} 
                className="block py-2 border-b border-white/20 dark:border-black/10 hover:text-blue-400 dark:hover:text-blue-600 transition duration-200">Explore</Link>
                <Link 
                    href="#" 
                    onClick={() => {
                        const section = document.getElementById("whatsnew");
                        section?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="block py-2 border-b border-white/20 dark:border-black/10 hover:text-blue-400 dark:hover:text-blue-600 transition duration-200">Releases</Link>
                <a href="#" onClick={() => navigate("/login")} className="block py-2 border-b border-white/20 dark:border-black/10 hover:text-blue-400 dark:hover:text-blue-600 transition duration-200">Log In</a>
                <a href="#" onClick={() => navigate("/signup")} className="block py-2 border-b border-white/20 dark:border-black/10 hover:text-blue-400 dark:hover:text-blue-600 transition duration-200">Sign Up</a>
            </div>
        )}
    </div>
    </>
    )
}

export default Navbar
