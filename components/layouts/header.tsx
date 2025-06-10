"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

const navItems = [
  { href: "/subjects", label: "Home" },
  { href: "/about", label: "About Project" },
  { href: "/uniqueness", label: "Uniqueness of the Project" },
  {
    href: "https://samskritifoundation.org/about/about-us/",
    label: "About Samskriti Foundation",
    external: true,
  },
  { href: "/subjects", label: "Subjects" },
  { href: "/digital-repository", label: "Digital Repository" },
  { href: "/documents", label: "Search Documents" },
]

const Header = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkIsMobile()

    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) setIsMenuOpen(false)
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div
      className="px-4 md:px-6 lg:px-11 py-4 flex justify-between items-center shadow-lg relative bg-transparent"
      // style={{ backgroundColor: "rgb(209, 255, 255)" }}
    >
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/name-logo.png" alt="ST Logo" width={248} height={48} />
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
          {/* Bharatiya Science & Technology */}
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium transition-colors ${
              pathname === item.href
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            }`}
            // {...(item.external && {
            //   target: "_blank",
            //   rel: "noopener noreferrer",
            // })}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Hamburger Button */}
      {/* <button
        className="lg:hidden flex flex-col justify-center items-center"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-gray-900 transition-transform duration-300 ${
            isMenuOpen ? "transform rotate-45 translate-y-1.5" : "mb-1.5"
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-gray-900 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-0" : "mb-1.5"
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-gray-900 transition-transform duration-300 ${
            isMenuOpen ? "transform -rotate-45 -translate-y-1.5" : ""
          }`}
        ></span>
      </button> */}

      {/* Mobile Navigation Overlay */}
      {isMobile && (
        <div
          className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center space-x-2">
              <Image
                src={"/name-logo.png"}
                alt="ST Logo"
                width="150"
                height="70"
              />

            </div>
            <button
              onClick={toggleMenu}
              className="p-2"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <nav className="flex flex-col p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base py-3 border-b border-gray-100 transition-colors ${
                  pathname === item.href
                    ? "text-gray-900 font-medium"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                // {...(item.external && {
                //   target: "_blank",
                //   rel: "noopener noreferrer",
                // })}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>

    // <>
    //   {/* Top-Left Logo */}

    //   {/* top right 2 buttons */}
    //   {/* ✅ Desktop dashboard Button */}
    //   <div className="absolute top-6 right-48 hidden md:flex items-center bg-sky-300 px-6 py-1.5 rounded-2xl shadow space-x-2 cursor-pointer">
    //     <Link href="/subjects" className="flex items-center space-x-2">
    //       <span className="text-sm font-medium text-black">Home</span>
    //     </Link>
    //   </div>

    //   {/* ✅ Mobile dashboard Button */}
    //   <div className="absolute top-8  right-4 block md:hidden">
    //     <Link href="/subjects">
    //       <div className="flex items-center bg-sky-300 px-2 py-1 rounded-2xl shadow space-x-1">
    //         <span className="text-xs text-black">Home</span>
    //       </div>
    //     </Link>
    //   </div>

    //   {/* ✅ Desktop Search Button */}
    //   <div className="absolute top-6 right-6 hidden md:flex items-center bg-sky-300 px-10 py-1 rounded-2xl shadow space-x-2 cursor-pointer">
    //     <Link href="/documents" className="flex items-center space-x-2">
    //       <Image
    //         src="/search-icon.png"
    //         alt="Search Icon"
    //         width={24}
    //         height={24}
    //       />
    //       <span className="text-sm font-medium text-black">Search</span>
    //     </Link>
    //   </div>

    //   {/* ✅ Mobile Search Button */}
    //   <div className="absolute top-16 right-4 block md:hidden">
    //     <Link href="/documents">
    //       <div className="flex items-center bg-sky-300 px-6 py-0.5 rounded-2xl shadow space-x-1">
    //         <Image
    //           src="/search-icon.png"
    //           alt="Search Icon"
    //           width={20}
    //           height={20}
    //           className="text-left"
    //         />
    //         <span className="text-xs text-black text-end">Search</span>
    //       </div>
    //     </Link>
    //   </div>
    // </>
  )
}

export default Header
