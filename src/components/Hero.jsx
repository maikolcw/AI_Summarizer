import React, { useEffect, useState } from "react";
import { logo } from "../assets";

const Hero = () => {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 50) {
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
            <nav className={`flex justify-between items-center w-full mb-10 pt-3 px-10 fixed top-0 
            z-20 ${scrolled ? "bg_green_gradient" : "bg-white"
                }`}>
                <img src={logo} onClick={() => {
                    window.scrollTo(0, 0);
                }} alt='logo' className='w-56 object-contain cursor-pointer' />

                <button
                    type='button'
                    onClick={() =>
                        window.open("https://github.com/maikolcw/ai_summarizer", "_blank")
                    }
                    className='black_btn'
                >
                    GitHub
                </button>
            </nav>

            <h1 className='head_text'>
                Summarize Any Article with <br className='max-md:hidden' />
                <div className="mt-4">
                    <span className='green_gradient'>OpenAI GPT-4</span>
                </div>

            </h1>
            <h2 className='desc'>
                Save yourself time with AI Summarizer, an easy-to-use article/website summarizer
                that turns lengthy explanations into a short, clear, readable paragraph.
            </h2>
        </header>
    )
}

export default Hero