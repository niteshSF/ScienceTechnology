/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useState, useEffect, useRef, use } from "react"
import { useRouter } from "next/navigation"
import { useGetSubjectsQuery } from "@/api/subjects.api"
import Image from "next/image"
import Header from "@/components/layouts/header"
import Link from "next/link"

// TypeScript interfaces
interface Subject {
  id: number
  name: string
  parent_id: number | null
}

interface PositionedSubject extends Subject {
  x: number
  y: number
}

type PageProps = {
  searchParams: Promise<{ parent: string }>
}

export default function ScienceBranchesVisualization(props: PageProps) {
  // Hooks from Next.js 15
  const searchParams = use(props.searchParams)
  const router = useRouter()
  const parentId = searchParams.parent || "1" // Default to root (Sciences)
  const containerRef = useRef<HTMLDivElement>(null)

  // Animation state
  const [isAnimating, setIsAnimating] = useState(false)
  const [previousParentId, setPreviousParentId] = useState<string | null>(null)
  const [previousNodes, setPreviousNodes] = useState<PositionedSubject[]>([])

  // Fetch subjects data from API
  const { data: subjects, isLoading, error } = useGetSubjectsQuery()

  // Position nodes and update when window resizes
  const [positionedNodes, setPositionedNodes] = useState<PositionedSubject[]>(
    []
  )

  // Check if a node has children
  const hasChildren = (nodeId: number): boolean => {
    if (!subjects) return false
    return subjects.some((s) => s.parent_id === nodeId)
  }

  // Handle node click
  const handleNodeClick = (node: Subject): void => {
    // Save current state for animation
    setPreviousParentId(parentId)
    setPreviousNodes([...positionedNodes])
    setIsAnimating(true)

    // If node has no children, redirect to documents view

    if (!hasChildren(node.id)) {
      router.push(`/front-pages/?subject_id=${node.id}`)
    } else {
      // Otherwise navigate to it as parent
      router.push(`?parent=${node.id}`)
    }
  }

  // Function to position circles in a radial pattern
  const positionCircles = (): PositionedSubject[] => {
    if (!containerRef.current || !subjects) return []

    const container = containerRef.current
    const containerWidth = container.offsetWidth || 600
    const containerHeight = container.offsetHeight || 600
    const radius = Math.min(containerWidth, containerHeight) / 2 - 100 //
    const centerX = containerWidth / 2
    const centerY = containerHeight / 2

    // Get child nodes of the current parent
    const childNodes = subjects.filter(
      (s) => s.parent_id === parseInt(parentId)
    )
    const totalNodes = childNodes.length

    // Calculate positions
    return childNodes.map((node, index) => {
      const angle = index * ((2 * Math.PI) / totalNodes)
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      return { ...node, x, y }
    })
  }

  useEffect(() => {
    const updatePositions = (): void => {
      setPositionedNodes(positionCircles())
    }

    if (!isLoading && subjects) {
      updatePositions()
      window.addEventListener("resize", updatePositions)
    }

    return () => {
      window.removeEventListener("resize", updatePositions)
    }
  }, [subjects, parentId, isLoading])

  // Animation effect when parentId changes
  useEffect(() => {
    if (previousParentId && previousParentId !== parentId) {
      // Start animation
      setIsAnimating(true)

      // End animation after transition completes
      const timer = setTimeout(() => {
        setIsAnimating(false)
        setPreviousNodes([])
      }, 500) // Match this with CSS transition duration

      return () => clearTimeout(timer)
    }
  }, [parentId, previousParentId])

  // Get the current parent node
  const parentNode = subjects?.find((s) => s.id === parseInt(parentId)) || {
    id: 1,
    name: "Branches of Sciences",
    parent_id: null,
  }

  // Get the previous parent node
  const prevParentNode =
    (previousParentId &&
      subjects?.find((s) => s.id === parseInt(previousParentId))) ||
    null

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading subjects...
      </div>
    )
  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Error loading subjects: {(error as Error).message}
      </div>
    )
  if (!subjects)
    return (
      <div className="flex h-screen items-center justify-center text-white">
        No subjects available
      </div>
    )

  return (
    <>
      <div>{/* <Header /> */}</div>

      <div
        className="flex h-screen justify-center items-center relative overflow-hidden"
        style={{
          // backgroundImage: "url('/background.png')",   // old background
          backgroundImage: "url('/bg-new.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {/* Top-Left Logo */}
        {/* ✅ Desktop Logo (hidden on mobile) */}
        <div className="absolute top-6 left-4 hidden md:block">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/name-logo.png"
              alt="Desktop Logo"
              width={350}
              height={48}
            />
          </Link>
        </div>

        {/* ✅ Mobile Logo (only visible on small screens) */}
        <div className="absolute top-7 left-4 block md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/name-logo.png"
              alt="Mobile Logo"
              width={180}
              height={40}
            />
          </Link>
        </div>

        {/* top right 2 buttons */}
        {/* ✅ Desktop dashboard Button */}
        <div className="absolute top-6 right-48 hidden md:flex items-center bg-sky-300 px-6 py-1.5 rounded-2xl shadow space-x-2 cursor-pointer">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-sm font-medium text-black">Dashboard</span>
          </Link>
        </div>

        {/* ✅ Mobile dashboard Button */}
        <div className="absolute top-8  right-4 block md:hidden">
          <Link href="/dashboard">
            <div className="flex items-center bg-sky-300 px-2 py-1 rounded-2xl shadow space-x-1">
              <span className="text-xs text-black">Dashboard</span>
            </div>
          </Link>
        </div>

        {/* ✅ Desktop Search Button */}
        <div className="absolute top-6 right-6 hidden md:flex items-center bg-sky-300 px-10 py-1 rounded-2xl shadow space-x-2 cursor-pointer">
          <Link href="/documents" className="flex items-center space-x-2">
            <Image
              src="/search-icon.png"
              alt="Search Icon"
              width={24}
              height={24}
            />
            <span className="text-sm font-medium text-black">Search</span>
          </Link>
        </div>

        {/* ✅ Mobile Search Button */}
        <div className="absolute top-16 right-4 block md:hidden">
          <Link href="/documents">
            <div className="flex items-center bg-sky-300 px-6 py-0.5 rounded-2xl shadow space-x-1">
              <Image
                src="/search-icon.png"
                alt="Search Icon"
                width={20}
                height={20}
                className="text-left"
              />
              <span className="text-xs text-black text-end">Search</span>
            </div>
          </Link>
        </div>

        {/* ✅ Desktop home Button */}
        <div className="absolute top-6 right-80 hidden md:flex items-center bg-sky-300 px-6 py-1.5 rounded-2xl shadow space-x-2 cursor-pointer">
          <Link href="/subjects" className="flex items-center space-x-2">
            <span className="text-sm font-medium text-black">Home</span>
          </Link>
        </div>

        {/* ✅ Mobile home Button */}
        <div className="absolute top-8  right-4 block md:hidden">
          <Link href="/subjects">
            <div className="flex items-center bg-sky-300 px-2 py-1 rounded-2xl shadow space-x-1">
              <span className="text-xs text-black">Home</span>
            </div>
          </Link>
        </div>

        <div ref={containerRef} className="relative w-[600px] h-[600px] top-8">
          {/* Previous Parent Node (for animation) */}
          {isAnimating && prevParentNode && (
            <div
              className="absolute top-1/2 left-1/2 w-44 h-44 rounded-full flex flex-col items-center justify-center text-center transform -translate-x-1/2 -translate-y-1/2 z-5 opacity-0 scale-75 transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, #ff8c00, #fd5e1d)",
                boxShadow: "0 0 30px rgba(255, 140, 0, 0.5)",
              }}
            >
              {/* <h3 className="text-base font-bold text-white"> */}
              <h3 className="text-center font-bold text-white relative z-10 drop-shadow-lg w-20">
                {prevParentNode.name}
              </h3>
            </div>
          )}

          {/* Parent Node - Now using image instead of gradient background */}
          <div
            className={`absolute top-1/2 left-1/2 w-48 h-48 rounded-full flex flex-col items-center justify-center text-center transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-xl transition-all duration-500 ${
              isAnimating ? "scale-100 opacity-100" : ""
            }`}
            style={{
              boxShadow: "0 0 30px rgba(255, 140, 0, 0.5)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Image as background */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/center-circle.png"
                alt="Center circle"
                fill
                sizes="(max-width: 640px) 100vw, 192px"
                className="rounded-full"
                priority
              />
            </div>

            {/* Text overlay */}
            <h3 className="text-center font-bold text-amber-950 relative z-10 drop-shadow-xl w-28">
              {parentNode.name}
            </h3>
          </div>

          {/* Previous Child Nodes (for exit animation) */}
          {isAnimating &&
            previousNodes.map((node) => (
              <div
                key={`prev-${node.id}`}
                className="absolute flex flex-col items-center justify-center text-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 opacity-0"
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: "140px",
                  height: "140px",
                  transform: "translate(-50%, -50%) scale(0.8)",
                }}
              >
                {/* Circle with image background (for animation) */}
                <div
                  className="relative w-full h-full rounded-full overflow-hidden"
                  style={{
                    boxShadow: "0 0 15px rgba(66, 245, 242, 0.5)",
                  }}
                >
                  {/* Image background */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src="/child-circle.png"
                      alt="Child node"
                      width={140}
                      height={140}
                      className="rounded-full opacity-30"
                    />
                  </div>

                  {/* Subtle outer ring */}
                  <div className="absolute inset-0 rounded-full border border-white opacity-30"></div>

                  {/* Text overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-sm font-semibold text-white drop-shadow-md px-2 opacity-30">
                      {node.name}
                    </div>
                    {/* <LogoPage nodes={positionedNodes} /> */}
                  </div>
                </div>
              </div>
            ))}

          {/* Current Child Nodes */}
          {positionedNodes.map((node) => (
            <div
              key={node.id}
              className={`absolute flex flex-col items-center justify-center text-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 hover:scale-110 cursor-pointer z-20 ${
                isAnimating ? "animate-fade-in-scale" : ""
              }`}
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                width: "140px",
                height: "140px",
              }}
              onClick={() => handleNodeClick(node)}
            >
              {/* Circle with image background */}
              <div
                className="relative w-full h-full rounded-full overflow-hidden"
                style={{
                  boxShadow: "0 0 15px rgba(66, 245, 242, 0.5)",
                }}
              >
                {/* Image background */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/child-circle.png"
                    alt="Child node"
                    width={140}
                    height={140}
                    className="rounded-full"
                  />
                </div>

                {/* Subtle outer ring */}
                <div className="absolute inset-0 rounded-full border border-white opacity-30"></div>

                <div className="absolute inset-6 flex flex-col items-center justify-center">
                  {/* Text overlay */}
                  <div className="text-sm items-center font-semibold drop-shadow-md px-2">
                    {node.name}
                  </div>
                  {/* <LogoPage nodes={positionedNodes} /> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add animatioglobal styles */}
        <style jsx global>{`
          @keyframes fadeInScale {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.8);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }

          .animate-fade-in-scale {
            animation: fadeInScale 500ms ease forwards;
            animation-delay: 100ms;
          }
        `}</style>
      </div>
    </>
  )
}
