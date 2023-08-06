import React, { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick, submit } from "../assets";

const Summary = () => {

    return (
        <section className='mt-16 w-full max-w-xl'>
            <div className='flex flex-col w-full gap-2'>
                <form
                    className='relative flex justify-center items-center'
                    onSubmit={() => { }}
                >
                    <img
                        src={linkIcon}
                        alt='link-icon'
                        className='absolute left-0 my-2 ml-3 w-5'
                    />

                    <input
                        type='url'
                        placeholder='Please enter article link'
                        value=""
                        onChange={(e) => { }}
                        onKeyDown={(e) => { }}
                        required
                        className='url_input peer'
                    />
                    <button
                        type='submit'
                        className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'
                    >
                        <img
                            src={submit}
                            alt='>'
                            className='w-5'
                        />
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Summary