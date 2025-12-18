"use client"

import { motion, useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
}

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "-50px" })

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.section>
  )
}
