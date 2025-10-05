"use client";

import React from 'react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import pokeball from "../../Icon/pokeball.png"
import Image from 'next/image';
import login from "../../Icon/login.png"



export default function Header() {
    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://pokeapi.co" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src={pokeball} className="h-8" alt="Flowbite Logo" width={30} height={20} />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Pokemon</span>
                </a>
                <div  id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <Link href="/" className=''>
                        Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className=''>
                        About Us
                        </Link>
                    </li>
                    <li>
                        <Link href="/pokemonsCards" className=''>
                        Pokemon
                        </Link>
                    </li>
                    </ul>
                </div>
                <div className='block'>
                    <div>
                        <Image src={login} alt="Flowbite Logo" width={60} height={60}/>
                    </div>
                    <div>Register/ Sigen in </div>
                </div>
                </div>
            </nav>
        </div>
    )
}
