"use client"

import { motion } from "framer-motion"

export function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Primary cyan glow - subtle */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[180px]"
        animate={{
          x: [0, 60, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 14,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Secondary deep blue orb */}
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-900/8 blur-[150px]"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Subtle white accent */}
      <motion.div
        className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-white/[0.02] blur-[100px]"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 16,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Grid pattern overlay - very subtle cyan tint */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(34,211,238,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.2) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Data flow lines - icy cyan theme */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
          style={{
            top: `${18 + i * 16}%`,
            left: 0,
            right: 0,
          }}
          animate={{
            opacity: [0.03, 0.25, 0.03],
            scaleX: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 7 + i * 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Horizontal white accent lines */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`white-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
          style={{
            top: `${35 + i * 30}%`,
            left: 0,
            right: 0,
          }}
          animate={{
            opacity: [0.05, 0.15, 0.05],
            scaleX: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 1 + 3,
          }}
        />
      ))}
    </div>
  )
}
