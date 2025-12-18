"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { type HTMLAttributes, forwardRef } from "react"
import { motion } from "framer-motion"

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, hover = false, ...props }, ref) => {
    const CardComponent = hover ? motion.div : "div"

    return (
      <CardComponent
        ref={ref}
        className={cn(
          "relative bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-cyan-500/10",
          "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-cyan-500/[0.05] before:to-transparent before:pointer-events-none",
          "after:absolute after:inset-0 after:rounded-2xl after:opacity-0 after:transition-opacity after:duration-300",
          "after:shadow-[0_0_30px_rgba(34,211,238,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] after:pointer-events-none",
          hover && "cursor-pointer hover:after:opacity-100",
          className,
        )}
        {...(hover
          ? {
              whileHover: {
                scale: 1.02,
                transition: { duration: 0.2, ease: "easeOut" },
              },
              whileTap: { scale: 0.98 },
              initial: {
                backgroundColor: "rgba(255,255,255,0.02)",
                borderColor: "rgba(34,211,238,0.1)",
              },
              transition: { duration: 0.2 },
            }
          : {})}
        style={
          hover
            ? {
                transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
              }
            : undefined
        }
        onMouseEnter={
          hover
            ? (e: React.MouseEvent<HTMLDivElement>) => {
                const target = e.currentTarget
                target.style.backgroundColor = "rgba(255,255,255,0.04)"
                target.style.borderColor = "rgba(34,211,238,0.4)"
                target.style.boxShadow = "0 0 40px rgba(34,211,238,0.12), 0 20px 40px rgba(0,0,0,0.3)"
              }
            : undefined
        }
        onMouseLeave={
          hover
            ? (e: React.MouseEvent<HTMLDivElement>) => {
                const target = e.currentTarget
                target.style.backgroundColor = "rgba(255,255,255,0.02)"
                target.style.borderColor = "rgba(34,211,238,0.1)"
                target.style.boxShadow = "none"
              }
            : undefined
        }
        {...props}
      >
        <div className="relative z-10">{children}</div>
      </CardComponent>
    )
  },
)
GlassCard.displayName = "GlassCard"
