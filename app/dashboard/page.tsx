"use client"

import { useEffect, useState } from "react"
import Dashboard from "@/components/Dashboard"
import Image from "next/image"
import Link from "next/link"

const SecondPage = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen w-full relative overflow-hidden"
        style={{
          backgroundImage: "url('/bg-second.png')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div className="flex flex-col items-center w-full px-4 py-8">
          <div className="w-full max-w-6xl mx-2">
            <Dashboard />
          </div>
        </div>

        {/* Desktop Buttons */}
        {!isMobile && (
          <>
            {/* enter button */}
            <div className="absolute bottom-9 right-40">
              <Link href="/subjects">
                <Image
                  src="/enter-front.png"
                  alt="Enter Button"
                  width={170}
                  height={60}
                />
              </Link>
            </div>

            {/* name logo */}
            <div className="absolute top-8 left-12">
              <Link href="/">
                <Image
                  src="/name-logo.png"
                  alt="Enter Button"
                  width={430}
                  height={60}
                />
              </Link>
            </div>
          </>
        )}

        {/* Mobile Buttons */}
        {isMobile && (
          <>
            {/* enter button */}
            <div className="fixed bottom-10 right-6 z-50">
              <Link href="/subjects">
                <Image
                  src="/enter-front.png"
                  alt="Enter Button"
                  width={100}
                  height={40}
                />
              </Link>
            </div>

            {/* name logo */}
            <div className="fixed top-8 left-4 z-50">
              <Link href="/" className="cursor-pointer">
                <Image
                  src="/name-logo.png"
                  alt="Enter Button"
                  width={150}
                  height={600}
                />
              </Link>
            </div>

            {/* Logos top-right*/}
            {/* <div className="fixed top-8 right-3 flex space-x-2 z-50">
              <Link href="/about" className="cursor-pointer">
                <Image
                  src="/contact.png"
                  alt="About Project Logo"
                  width={50}
                  height={30}
                />
              </Link>
              <Link href="/about" className="cursor-pointer">
                <Image
                  src="/about-the-project.png"
                  alt="About Project Logo"
                  width={80}
                  height={30}
                />
              </Link>
              <Link href="/about" className="cursor-pointer">
                <Image
                  src="/credits.png"
                  alt="Credits Logo"
                  width={50}
                  height={40}
                />
              </Link>
            </div> */}

            {/* Logos top-right*/}
            <div className="fixed top-8 right-3 flex flex-col space-y-2 z-50">
              <Link href="/about" className="cursor-pointer">
                <Image
                  src="/contact.png"
                  alt="Contact Logo"
                  width={50}
                  height={30}
                />
              </Link>

              <Link href="/about" className="cursor-pointer">
                <Image
                  src="/about-the-project.png"
                  alt="About Project Logo"
                  width={80}
                  height={30}
                />
              </Link>

              <Link href="/about" className="cursor-pointer">
                <Image
                  src="/credits.png"
                  alt="Credits Logo"
                  width={50}
                  height={40}
                />
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default SecondPage
