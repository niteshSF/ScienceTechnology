// // import Dashboard from "@/components/Dashboard"
// import Image from "next/image"
// import Link from "next/link"

// const HomePage = () => {
//   return (
//     <div
//       className="flex justify-center items-center min-h-screen w-full relative overflow-hidden"
//       style={{
//         // backgroundImage: "url('/background.png')",
//         backgroundImage: "url('/bg-front.png')",
//         backgroundSize: "100% 100%",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center",
//         width: "100vw",
//         height: "100vh",
//       }}
//     >
//       <div className="flex flex-col items-center w-full px-4 py-8">
//         <div className="w-full flex justify-between mb-8">
//           <a
//             href="https://dst.gov.in/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="absolute top-7 left-7 cursor-pointer"
//           >
//             <Image src="/logo1.png" alt="Logo 1" width={160} height={75} />
//           </a>

//           <a
//             href="https://samskritifoundation.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="absolute top-5 right-7 cursor-pointer"
//           >
//             <Image src="/logo3.png" alt="Logo 3" width={130} height={70} />
//           </a>
//         </div>
//       </div>

//       <div className="absolute bottom-9 right-40">
//         <Link href="/dashboard">
//           <Image
//             src="/enter-front.png"
//             alt="Enter Button"
//             width={170}
//             height={60}
//           />
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default HomePage

// =======================================================================================

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/bg-front-new.png')",
        // backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "center",

        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {isMobile ? (
        // ===================== 📱 MOBILE LAYOUT =====================
        <div className="flex flex-col items-center justify-between w-full h-full px-2 py-6">
          {/* Top Logos */}
          <div className="w-full flex justify-between items-center">
            <a
              href="https://dst.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/logo1.png" alt="Logo 1" width={90} height={60} />
            </a>

            <Image src="/logo2.png" alt="Logo 2" width={40} height={55} />

            <a
              href="https://samskritifoundation.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/logo3.png" alt="Logo 3" width={70} height={55} />
            </a>
          </div>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Column of 4 Images - Slightly Left of Center */}
          <div className="absolute top-36 right-4 flex flex-col items-end gap-0.5">
            {/* Image 1 */}
            <Image
              src="/front-text-1.png"
              alt="Logo 1"
              width={200}
              height={60}
            />

            {/* Image 2 */}
            <Image
              src="/front-text-2.png"
              alt="Logo 2"
              width={600}
              height={55}
            />

            {/* Image 3 */}
            <div>
              <Image
                src="/front-text-3.png"
                alt="Logo 3"
                width={350}
                height={6}
              />
            </div>

            {/* Image 4 */}
            <Image
              src="/front-text-4.png"
              alt="Logo 4"
              width={250}
              height={65}
            />
          </div>

          {/* left bottom image */}
          <div className="absolute -bottom-20 left-0">
            <Image
              src="/front-left-bottom.png"
              alt="Bottom Left Image"
              width={700}
              height={80}
            />
          </div>

          {/* Enter Button */}
          <div className="absolute bottom-64 right-8">
            <Link href="/dashboard">
              <Image
                src="/enter-front.png"
                alt="Enter Button"
                width={120}
                height={50}
              />
            </Link>
          </div>
        </div>
      ) : (
        // ===================== 💻 DESKTOP LAYOUT =====================
        <div className="flex flex-col items-center w-full h-full px-4 py-8">
          {/* Top Logos */}
          <a
            href="https://dst.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-7 left-7"
          >
            <Image src="/logo1.png" alt="Logo 1" width={180} height={75} />
          </a>

          <Image src="/logo2.png" alt="Logo 2" width={60} height={55} />

          <a
            href="https://samskritifoundation.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-5 right-7"
          >
            <Image src="/logo3.png" alt="Logo 3" width={130} height={70} />
          </a>

          {/* Column of 4 Images - Slightly Left of Center */}
          <div className="absolute top-32 right-44 flex flex-col items-end gap-0.5">
            {/* Image 1 */}
            <Image
              src="/front-text-1.png"
              alt="Logo 1"
              width={950}
              height={60}
            />

            {/* Image 2 */}
            <Image
              src="/front-text-2.png"
              alt="Logo 2"
              width={900}
              height={55}
            />

            {/* Image 3 */}
            <div>
              <Image
                src="/front-text-3.png"
                alt="Logo 3"
                width={700}
                height={6}
              />
            </div>

            {/* Image 4 */}
            <Image
              src="/front-text-4.png"
              alt="Logo 4"
              width={600}
              height={65}
            />
          </div>

          {/* left bottom image */}
          <div className="absolute -bottom-36 left-0">
            <Image
              src="/front-left-bottom.png"
              alt="Bottom Left Image"
              width={700}
              height={80}
            />
          </div>

          {/* Enter Button */}
          <div className="absolute bottom-12 right-24">
            <Link href="/dashboard">
              <Image
                src="/enter-front.png"
                alt="Enter Button"
                width={170}
                height={60}
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage
