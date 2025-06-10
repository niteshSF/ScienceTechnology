/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useGetSubjectsQuery } from "@/api/subjects.api"
import TotalCount from "@/components/TotalCount"

export default function FrontPageView() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const subjectId = searchParams.get("subject_id")

  const { data: subjects, isLoading, error } = useGetSubjectsQuery()

  const selectedSubject = subjects?.find(
    (s) => s.id === parseInt(subjectId || "")
  )

  // State to detect if device is phone
  const [isPhone, setIsPhone] = useState(false)

  useEffect(() => {
    function handleResize() {
      setIsPhone(window.innerWidth <= 768) // breakpoint for phone, adjust if needed
    }

    handleResize() // initial check

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center text-white bg-black">
        Loading subject image...
      </div>
    )

  if (error || !selectedSubject)
    return (
      <div className="flex h-screen items-center justify-center text-white bg-black">
        Error loading subject or Subject not found.
      </div>
    )

  // Separate components/layouts for phone and desktop bottom buttons
  const BottomButtonsDesktop = () => (
    <>
      <div className="absolute top-0 left-0 w-full bg-blue-300 h-10 z-0"></div>

      {/* Top-right buttons */}
      <div className="absolute top-1.5 right-16 flex gap-5 z-10">
        {/* Home Button */}
        <button onClick={() => router.push("/subjects")}>
          <img
            src="/subject-images/home-btn.png"
            alt="Home"
            className="w-24 mb-1 h-5.5 hover:scale-110 transition-transform"
          />
        </button>

        {/* Back Button with parent query */}
        <button
          onClick={() => {
            if (selectedSubject?.parent_id) {
              router.push(`/subjects?parent=${selectedSubject.parent_id}`)
            } else {
              router.push("/subjects")
            }
          }}
        >
          <img
            src="/subject-images/back-btn.png"
            alt="Back"
            className="w-20 h-6 hover:scale-110 transition-transform"
          />
        </button>
      </div>

      {/* ======================================================= */}

      {/* heading of all */}
      <div className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
        <img
          src={`/subject-images/${selectedSubject.id}-header.png`}
          onError={(e) => {
            e.currentTarget.style.display = "none"
          }}
          alt={`Content for Subject ${selectedSubject.name}`}
          className="max-w-96 h-auto object-contain pointer-events-none -translate-y-52"
        />
      </div>

      {/* image contents */}
      <img
        src={`/subject-images/${selectedSubject.id}-content.png`}
        onError={(e) => {
          e.currentTarget.style.display = "none"
        }}
        alt={`Content for Subject ${selectedSubject.name}`}
        className="absolute top-48 right-24 max-w-2xl h-auto object-contain z-10 pointer-events-none"
      />

      {/* ===================================================== */}

      {/* Bottom 3 buttons */}
      <div className="absolute bottom-4 right-20 flex gap-6 z-10">
        {/* Manuscripts */}
        <button
          onClick={() =>
            router.push(
              `/front-pages/manuscripts?subject_id=${selectedSubject.id}`
            )
          }
        >
          <div className="flex flex-col gap-1 hover:scale-110 transition-transform text-center justify-center">
            <img
              src="manuscript-icon.png"
              alt="Manuscript"
              className="w-32 h-24"
            />
            <div className="bg-purple-900 bg-opacity-50 rounded-lg px-2 py-1.5 shadow-md w-32 text-center justify-center">
              <h4 className="text-sm font-semibold text-white">Manuscript</h4>
            </div>
            <div className="bg-purple-400 bg-opacity-40 rounded-lg px-2 h-7 shadow-md w-24 text-center flex items-center justify-center mx-auto">
              <p className="text-lg font-bold text-white">
                <TotalCount type="manuscript" />
              </p>
            </div>
          </div>
        </button>

        {/* Books */}
        <button
          onClick={() =>
            router.push(`/front-pages/books?subject_id=${selectedSubject.id}`)
          }
        >
          <div className="flex flex-col gap-1 hover:scale-110 transition-transform text-center">
            <img src="/book-icon.png" alt="Book" className="w-24 h-24" />
            <div className="bg-purple-900 bg-opacity-50 rounded-lg px-2 py-1.5 shadow-md w-24 text-center">
              <h4 className="text-sm font-semibold text-white">Books</h4>
            </div>
            <div className="bg-purple-400 bg-opacity-40 rounded-lg px-2 h-7 shadow-md w-24 text-center flex items-center justify-center">
              <p className="text-lg font-bold text-white">
                <TotalCount type="book" />
              </p>
            </div>
          </div>
        </button>

        {/* Articles */}
        <button
          onClick={() =>
            router.push(
              `/front-pages/articles?subject_id=${selectedSubject.id}`
            )
          }
        >
          <div className="flex flex-col gap-1 hover:scale-110 transition-transform text-center">
            <img src="/article-icon.png" alt="Article" className="w-20 h-24" />
            <div className="bg-purple-900 bg-opacity-50 rounded-lg px-2 py-1.5 shadow-md w-24 text-center">
              <h4 className="text-sm font-semibold text-white">Articles</h4>
            </div>
            <div className="bg-purple-400 bg-opacity-40 rounded-lg px-2 h-7 shadow-md w-24 text-center flex items-center justify-center">
              <p className="text-lg font-bold text-white">
                <TotalCount type="article" />
              </p>
            </div>
          </div>
        </button>
      </div>
    </>
  )

  const BottomButtonsPhone = () => (
    <>
      <div className="absolute top-0 left-0 w-full bg-blue-300 h-10 z-0"></div>
      {/* Top-right buttons */}
      <div className="absolute top-2 right-3 flex gap-5 z-10">
        {/* <div className="absolute top-2 left-0 w-full bg-sky-400 h-10 z-10 flex items-center justify-end pr-4 gap-5 shadow-sm"> */}

        {/* Home Button */}
        <button onClick={() => router.push("/subjects")}>
          <img
            src="/subject-images/home-btn.png"
            alt="Home"
            className="w-24 mb-1 h-5.5 hover:scale-110 transition-transform"
          />
        </button>

        {/* Back Button with parent query */}
        <button
          onClick={() => {
            if (selectedSubject?.parent_id) {
              router.push(`/subjects?parent=${selectedSubject.parent_id}`)
            } else {
              router.push("/subjects") // Fallback
            }
          }}
        >
          <img
            src="/subject-images/back-btn.png"
            alt="Back"
            className="w-20 h-6 hover:scale-110 transition-transform"
          />
        </button>
      </div>

      {/* header of all */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-24 p-1 z-30">
        <img
          src={`/subject-images/${selectedSubject.id}-header.png`}
          onError={(e) => {
            e.currentTarget.style.display = "none"
          }}
          alt={`Content for Subject ${selectedSubject.name}`}
          className="max-w-64 h-20 object-fill"
        />
      </div>

      {/* <img
        src={`/subject-images/${selectedSubject.id}-content.png`}
        onError={(e) => {
          e.currentTarget.style.display = "none"
        }}
        alt={`Content for Subject ${selectedSubject.name}`}
        className="absolute top-3 left-1 max-w-6xl h-full object-contain z-10 pointer-events-none"
      /> */}

      {/* Image Contents */}
      <div className="absolute top-96 left-3 right-4 bg-black bg-opacity-10 p-3 z-30 h-32">
        <img
          src={`/subject-images/${selectedSubject.id}-content.png`}
          onError={(e) => {
            e.currentTarget.style.display = "none"
          }}
          alt={`Content for Subject ${selectedSubject.name}`}
          className="w-auto  min-h-52 object-fill"
        />
      </div>

      <div className="fixed bottom-2 right-2 flex flex-row gap-3 px-3 py-3 z-10">
        {/* Manuscripts */}
        <button
          onClick={() =>
            router.push(
              `/front-pages/manuscripts?subject_id=${selectedSubject.id}`
            )
          }
        >
          <div className="flex flex-col items-center gap-1 hover:scale-110 transition-transform">
            <img
              src="manuscript-icon.png"
              alt="Manuscript"
              className="w-16 h-14"
            />
            <h4 className="text-white text-sm font-semibold bg-purple-500 bg-opacity-30 rounded-lg px-2 py-1 shadow-md w-24 text-center ">
              Manuscript
            </h4>
            <p className="text-white text-base font-bold bg-purple-400 bg-opacity-60 rounded-lg px-2 h-6 shadow-md w-20 text-center flex items-center justify-center ">
              <TotalCount type="manuscript" />
            </p>
          </div>
        </button>

        {/* Books */}
        <button
          onClick={() =>
            router.push(`/front-pages/books?subject_id=${selectedSubject.id}`)
          }
        >
          <div className="flex flex-col items-center gap-1 hover:scale-110 transition-transform">
            <img src="/book-icon.png" alt="Book" className="w-14 h-14" />
            <h4 className="text-white text-sm font-semibold bg-purple-500 bg-opacity-30 rounded-lg px-2 py-1 shadow-md w-20 text-center ">
              Books
            </h4>
            <p className="text-white text-base font-bold bg-purple-400 bg-opacity-60 rounded-lg px-2 h-6 shadow-md w-20 text-center flex items-center justify-center ">
              <TotalCount type="book" />
            </p>
          </div>
        </button>

        {/* Articles */}
        <button
          onClick={() =>
            router.push(
              `/front-pages/articles?subject_id=${selectedSubject.id}`
            )
          }
        >
          <div className="flex flex-col items-center gap-1 hover:scale-110 transition-transform">
            <img src="/article-icon.png" alt="Article" className="w-14 h-14" />
            <h4 className="text-white text-sm font-semibold bg-purple-500 bg-opacity-30 rounded-lg px-2 py-1 shadow-md w-20 text-center">
              Articles
            </h4>
            <p className="text-white text-base font-bold bg-purple-400 bg-opacity-60 rounded-lg px-2 h-6 shadow-md w-20 text-center flex items-center justify-center ">
              <TotalCount type="article" />
            </p>
          </div>
        </button>
      </div>
    </>
  )

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* Background Subject Image */}
      <div className="w-full h-full relative">
        {/* Content Image (Text) */}

        {/* Main Subject Image */}
        <img
          src={`/subject-images/${selectedSubject.id}.png`}
          onError={(e) => {
            e.currentTarget.src = "/subject-images/default.png"
          }}
          alt={`Subject ${selectedSubject.name}`}
          className="w-full h-full object-fill-contain"
        />
      </div>

      {/* Conditional rendering of bottom buttons */}
      {isPhone ? <BottomButtonsPhone /> : <BottomButtonsDesktop />}
    </div>
  )
}
