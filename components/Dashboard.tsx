/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useState, useEffect } from "react"
import { useGetDashboardCounts } from "@/api/dashboard.api"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import Link from "next/link"

const Dashboard = () => {
  const { data, isLoading, error } = useGetDashboardCounts()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // const checkMobile = () => setIsMobile(window.innerWidth < 640) // Tailwind 'sm' breakpoint

    const checkMobile = () => setIsMobile(window.innerWidth <= 768)

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-lg font-semibold text-red-500 mb-2">
          Error loading dashboard
        </h3>
        <p className="text-muted-foreground">
          Please try again later or contact support.
        </p>
      </div>
    )
  }

  const counts = data || {
    total: 0,
    articles: 0,
    books: 0,
    manuscripts: 0,
  }

  // Mobile layout
  if (isMobile) {
    return (
      <div className="min-h-fit p-4 bg-transparent relative">
        <div className="flex flex-col items-center space-y-6">
          {/* Total Documents */}
          <div className="flex flex-col items-center">
            <img
              src="/total-doc-icon.png"
              alt="total document Icon"
              className="w-28 h-20 mx-auto"
            />
            <div className="bg-purple-500 bg-opacity-30 rounded-xl px-3 py-1 shadow-md w-36 text-center mt-2">
              <h3 className="text-lg font-semibold text-white">
                Total Documents
              </h3>
              <p className="text-2xl font-bold text-white mt-1">
                {counts.total}
              </p>
            </div>
          </div>

          {/* Blocks in 2 columns grid */}
          <div className="grid grid-cols-3 gap-x-1 gap-y-8 w-full max-w-xs mx-auto">
            {/* Manuscripts Block */}
            <div className="flex flex-col items-center space-y-1">
              <img
                src="/manuscript-icon.png"
                alt="Manuscript Icon"
                className="w-20 h-16"
              />
              <div className="bg-purple-500 bg-opacity-30 rounded-xl px-2 py-1 shadow-md w-28 text-center">
                <h4 className="text-sm font-semibold text-white">
                  Manuscripts
                </h4>
              </div>
              <div className="bg-purple-400 bg-opacity-60 rounded-xl px-2 h-6 shadow-md w-20 text-center flex items-center justify-center">
                <p className="text-lg font-bold text-white">
                  {counts.manuscripts}
                </p>
              </div>
            </div>

            {/* Books Block */}
            <div className="flex flex-col items-center space-y-1">
              <img src="/book-icon.png" alt="Book Icon" className="w-20 h-16" />
              <div className="bg-purple-500 bg-opacity-30 rounded-xl px-2 py-1 shadow-md w-20 text-center">
                <h4 className="text-sm font-semibold text-white">Books</h4>
              </div>
              <div className="bg-purple-400 bg-opacity-60 rounded-xl px-2 h-6 shadow-md w-20 text-center flex items-center justify-center">
                <p className="text-lg font-bold text-white">{counts.books}</p>
              </div>
            </div>

            {/* Articles Block */}
            <div className="flex flex-col items-center space-y-1">
              <img
                src="/article-icon.png"
                alt="Article Icon"
                className="w-20 h-16"
              />
              <div className="bg-purple-500 bg-opacity-30 rounded-xl px-2 py-1 shadow-md w-20 text-center">
                <h4 className="text-sm font-semibold text-white">Articles</h4>
              </div>
              <div className="bg-purple-400 bg-opacity-60 rounded-xl px-2 h-6 shadow-md w-20 text-center flex items-center justify-center">
                <p className="text-lg font-bold text-white">
                  {counts.articles}
                </p>
              </div>
            </div>

            {/* Empty placeholder for grid balance */}
            <div />
          </div>
        </div>
      </div>
    )
  }

  // Desktop layout
  return (
    <div className="min-h-screen relative bg-transparent">
      <div className="absolute bottom-28 left-8 right-0 py-1">
        <img
          src="/total-doc-icon.png"
          alt="total document Icon"
          className="w-96 h-64 mb-0 ml-[-70px]"
        />
        {/* Title total */}
        <div className="bg-purple-500 bg-opacity-30 rounded-xl px-6 py-0 shadow-md w-72 ml-2 text-center">
          <h3 className="text-3xl font-semibold text-white">Total Documents</h3>
        </div>

        {/* total Number */}
        <div className="bg-purple-400 bg-opacity-60  rounded-xl px-6 py-0 shadow-md w-72 ml-2 text-center mt-1">
          <p className="text-4xl font-bold text-white">{counts.total}</p>
        </div>
      </div>

      <div className="absolute bottom-52 left-64 right-0 px-6 py-3">
        <div className="grid grid-cols-1 ml-52 sm:grid-cols-3 py-0 gap-24">
          {/* Manuscripts Block */}
          <div className="flex flex-col items-center space-y-1">
            <img
              src="/manuscript-icon.png"
              alt="Manuscript Icon"
              className="max-w-80 h-44 mb-1"
            />
            <div className="bg-purple-500 bg-opacity-30 rounded-xl px-4 py-1 shadow-md w-48 text-center">
              <h4 className="text-xl font-semibold text-white">Manuscripts</h4>
            </div>
            <div className="bg-purple-400 bg-opacity-60 rounded-xl px-4 h-9 shadow-md w-40 text-center flex items-center justify-center">
              <p className="text-3xl font-bold text-white">
                {counts.manuscripts}
              </p>
            </div>
          </div>

          {/* Books Block */}
          <div className="flex flex-col items-center space-y-1 -ml-6">
            <img
              src="/book-icon.png"
              alt="Book Icon"
              className="w-40 h-44 mb-1"
            />
            <div className="bg-purple-500 bg-opacity-30 rounded-xl px-4 py-1 shadow-md w-40 text-center">
              <h4 className="text-xl font-semibold text-white">Books</h4>
            </div>
            <div className="bg-purple-400 bg-opacity-60 rounded-xl px-4 h-9 shadow-md w-40 text-center flex items-center justify-center">
              <p className="text-3xl font-bold text-white">{counts.books}</p>
            </div>
          </div>

          {/* Articles Block */}
          <div className="flex flex-col items-center space-y-1 -ml-20">
            <img
              src="/article-icon.png"
              alt="Article Icon"
              className="w-40 h-44 mb-1"
            />
            <div className="bg-purple-500 bg-opacity-30 rounded-xl px-4 py-1 shadow-md w-40 text-center">
              <h4 className="text-xl font-semibold text-white">Articles</h4>
            </div>
            <div className="bg-purple-400 bg-opacity-60 rounded-xl px-4 h-9 shadow-md w-40 text-center flex items-center justify-center">
              <p className="text-3xl font-bold text-white">{counts.articles}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================== */}

      <div className="flex flex-col items-center w-full px-3 py-8">
        <div className="w-full flex justify-between mb-8">

          <Link
            href="/about"
            className="absolute top-7 right-60 cursor-pointer"
          >
            <Image src="/contact.png" alt="Logo 1" width={90} height={75} />
          </Link>

          <Link
            href="/about"
            className="absolute top-7 -right-16 cursor-pointer"
          >
            <Image src="/credits.png" alt="Logo 3" width={90} height={75} />
          </Link>

          <Link
            href="/about"
            className="absolute top-7 right-12 cursor-pointer"
          >
            <Image
              src="/about-the-project.png"
              alt="Logo 2"
              width={160}
              height={70}
            />
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
