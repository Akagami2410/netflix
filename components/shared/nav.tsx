"use client";

import { navLinks } from "@/constants";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  const [clicked, setClicked] = useState(false);
  // useEffect(() => {

  // }, [clicked]);

  return (
    <nav className="flex items-center justify-between ">
      <div className="border-2 border-solid border-red-500 flex items-center  gap-6">
        <Link href="/">
          <Image
            src="/images/Netflix-Logo.svg"
            width={150}
            height={100}
            alt="logo"
            className="border-2 border-solid border-white"
          />
        </Link>
        {navLinks.map((link) => {
          return (
            <Link key={link.label} href={link.route}>
              {link.label}
            </Link>
          );
        })}
      </div>
      <div className="flex gap-2">
        <div className="flex border-2 border-red-600 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="none"
            viewBox="0 0 24 24"
            className="cursor-pointer"
            onClick={() => setClicked(!clicked)}
          >
            <circle cx="11" cy="11" r="6" stroke="white" stroke-width="2" />
            <line
              x1="16.5"
              y1="16.5"
              x2="22"
              y2="22"
              stroke="white"
              strokeWidth="2"
            />
          </svg>

          <input
            type="text"
            id="search"
            placeholder="search anyting"
            className={`search-input ${clicked ? "expanded" : ""}`}
          />
        </div>
        <div className="flex gap-1 items-center cursor-pointer group">
          <img src="/images/Netflix-avatar.png" width="30px" height="auto" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            className="transition-transform duration-300 group-hover:rotate-180"
          >
            <path d="M7 10l5 5 5-5z"></path>
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
