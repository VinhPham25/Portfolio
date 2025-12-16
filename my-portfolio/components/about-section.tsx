"use client"

import { motion, Variants } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { GlassCard } from "@/components/glass-card"
import { SectionWrapper } from "@/components/section-wrapper"
import { MapPin, Calendar, Clock, Code } from "lucide-react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.3, margin: "-50px" })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <SectionWrapper id="about" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-balance">
            Passionate Developer &{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
              Problem Solver
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Photo Section */}
          <motion.div variants={itemVariants}>
            <GlassCard hover className="p-2 max-w-md mx-auto">
              <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-blue-900/20 relative">
                <img
                  src="/professional-headshot.jpg"
                  alt="Professional headshot"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-transparent" />
              </div>
            </GlassCard>
          </motion.div>

          {/* Bio Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              I&apos;m a Computer Science student with a deep passion for artificial intelligence and machine learning.
              My journey in tech began with curiosity about how things work, and has evolved into a mission to build
              software that makes a meaningful impact.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              When I&apos;m not coding, you&apos;ll find me exploring the latest research papers, contributing to
              open-source projects, or mentoring fellow students. I believe in the power of technology to solve
              real-world problems and am constantly seeking new challenges that push my boundaries.
            </p>

            {/* Quick Info Cards - updated to cyan theme with enhanced hover */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {[
                { icon: MapPin, label: "Location", value: "Austin, TX & Atlanta, GA" },
                { icon: Calendar, label: "Experience", value: "2+ Years" },
                { icon: Clock, label: "Hobbies", value: "Chess & Football" },
                { icon: Code, label: "Lines of Code", value: "100k+" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <GlassCard className="p-4 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-500/10">
                        <item.icon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">{item.label}</div>
                        <div className="text-sm font-medium text-white">{item.value}</div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}