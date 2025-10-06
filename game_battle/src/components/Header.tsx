"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import pokeball from "../../Icon/pokeball.png";
import Image from 'next/image';
import login from "../../Icon/login.png";
import { useRouter } from "next/navigation";



export default function Header() {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  // Get username from localStorage
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("username");
  //   setUsername(storedUser);
  // }, []);
 useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("username");
      setUsername(storedUser);
    };

    loadUser();

    // Listen for changes from other tabs or code
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    router.push("/"); // back to login
  };

  // Utility for disabled links
  const linkClass = (isActive: boolean) =>
    `px-2 py-1 ${
      isActive
        ? "text-blue-500 hover:underline"
        : "text-gray-400 cursor-not-allowed opacity-60"
    }`;

    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a
          href="https://pokeapi.co"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src={pokeball}
            className="h-8"
            alt="Pokeball"
            width={30}
            height={20}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Pokemon
          </span>
        </a>

        {/* Navigation links */}
        <div id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link href="/" className={linkClass(true)}>
                Home
              </Link>
            </li>
            <li>
              {username ? (
                <Link href="/about" className={linkClass(true)}>
                  About Us
                </Link>
              ) : (
                <span className={linkClass(false)}>About Us</span>
              )}
            </li>
            <li>
              {username ? (
                <Link href="/pokemonsCards" className={linkClass(true)}>
                  Pokemon
                </Link>
              ) : (
                <span className={linkClass(false)}>Pokemon</span>
              )}
            </li>
          </ul>
        </div>

        {/* Right side: Login / Logout */}
        <div className="flex items-center gap-3">
          <Image src={login} alt="Login" width={40} height={40} />
          {username ? (
            <div className="flex flex-col items-start">
              <span className="text-sm text-gray-700 dark:text-gray-200">
                {username}
              </span>
              <button
                onClick={handleLogout}
                className="text-xs text-red-500 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => router.push("/user")}
              className="text-sm text-blue-500 hover:underline"
            >
              Register / Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
        </div>
    )
}
