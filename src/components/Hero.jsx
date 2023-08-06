import React from 'react'
import { logo } from "../assets";

const Hero = () => {
    return (
        <header className='w-full flex justify-center items-center flex-col'>
            <nav className='flex justify-between items-center w-full mb-10 pt-3'>
                <img src={logo} alt='logo' className='w-56 object-contain' />

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
                Summarize Any Articles with <br className='max-md:hidden' />
                <span className='green_gradient '>OpenAI GPT-4</span>
            </h1>
            <h2 className='desc'>
                Save yourself time with AI Summarizer, an open-source article/website summarizer
                that turns lengthy explanations into short, clear, readable paragraphs.
            </h2>
        </header>
    )
}

export default Hero