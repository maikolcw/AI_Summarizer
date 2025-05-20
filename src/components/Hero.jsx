import React, { useEffect, useState } from "react";
import { logo } from "../assets";

const Hero = () => {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className='w-full flex justify-center items-center flex-col'>
            <nav className={`flex justify-center items-center w-full mb-10 px-10 fixed top-0 
            z-20 ${scrolled ? "bg_green_gradient cursor-pointer" : "bg-white"
                }`} onClick={() => {
                    window.scrollTo(0, 0);
                }}>
                <img src={logo} alt='logo' className={`w-56 object-contain ${scrolled ? "cursor-pointer" : "cursor-default"
                }`} />

                {/* <button
                    type='button'
                    onClick={() =>
                        window.open("https://github.com/maikolcw/ai_summarizer", "_blank")
                    }
                    className='black_btn'
                >
                    GitHub
                </button> */}
            </nav>

            <h1 className='head_text green_gradient_reverse'>
                Summarize Websites with <br className='max-md:hidden' />
                <div className="mt-4">
                    <span className='green_gradient'>the latest in AI</span>
                </div>

            </h1>
            <h2 className='desc'>
                Save yourself time with AI Summarizer, an easy-to-use website summarizer
                that turns lengthy texts into a clear, digestable format.
            </h2>
        </header>
    )
}

export default Hero