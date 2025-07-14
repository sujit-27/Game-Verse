import React from 'react'
import { useSelector } from 'react-redux'
import HeroImg from "../../assets/Hero_bg.jpg"
import SquadImg from "../../assets/squad1.png"
import { FaArrowRight } from "react-icons/fa"

const Hero = () => {
    const theme = useSelector((state) => state.theme.mode)

    const bgImage = {
        backgroundImage: `url(${HeroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100%",
        width: "100%",
    }

    return (
        <div style={bgImage} className='min-h-[662px] relative'>
            <div className={`absolute inset-0 transition-colors duration-300 ${theme === "dark" ? "bg-[#12102a]/80" : "bg-gray/5"}`} />
                <div className='relative z-10 flex items-center min-h-[662px]'>
                    <div className='max-w-7xl mx-auto'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 items-center'>
                            <div className="space-y-3">
                                <p className="text-sm font-semibold text-blue-700 dark:text-blue-500 tracking-wide">
                                    Your Gateway to the Gaming World
                                </p>
                                <h1 className={`text-5xl font-extrabold text-white leading-tight  ${theme === 'dark' ? 'text-white/90' : 'text-black/70'}`}>
                                    Discover, Explore & Stay Ahead with Your Favorite Games
                                </h1>
                                <button 
                                onClick={() => {
                                    const section = document.getElementById("trending");
                                    section?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className={`cursor-pointer mt-8 inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-2xl transition-all 
                                ${theme === "dark" 
                                ? "bg-gradient-to-r from-blue-300 to-blue-700 text-black"
                                : "bg-gradient-to-r from-blue-500 to-blue-900 text-white"}`}>
                                Start Exploring <FaArrowRight />
                                </button>
                            </div>
                        <div>
                            <img src={SquadImg} className={`w-[200%] ${theme === "dark" ? "opacity-80" : "opacity-90"}`} alt="Gaming Squad" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
