"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";

function navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white py-5 sticky top-0 border-b justify-between px-10 border-gray-100">
      <div className="container lg:px-12 flex items-center justify-between">
        <div className="text-black text-2xl font-bold flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              width={90}
              height={90}
              alt="logo"
              priority
            ></Image>
          </Link>
        </div>
        <div className="hidden md:flex space-x-5">
          <Link href="/" className="link">
            Home
          </Link>
          <Link href="/dietary" className="link">
            Patient Dietary
          </Link>
          {/* <Link href="/report" className="link">
            Report
          </Link> */}
          <Link href="/about" className="link">
            About
          </Link>
        </div>
        <div className="md:hidden items-center mt-5 ml-auto">
          <button
            className="text-green-600 focus:outline-none transition duration-200 hover:scale-110"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <IoCloseSharp className="text-green-600 rounded w-8 h-8" />
            ) : (
              <FiMenu className="text-green-600 rounded w-8 h-8" />
            )}
          </button>
        </div>
      </div>
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } transition-transform transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex flex-col bg-white  p-4 space-y-2">
          <Link href="/" className="link">
            Home
          </Link>
          <Link href="/dietary" className="link">
            Patient Dietary
          </Link>
          {/* <Link href="/report" className="link">
            Report
          </Link> */}
          <Link href="/about" className="link">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default navbar;
