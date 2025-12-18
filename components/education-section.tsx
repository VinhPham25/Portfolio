"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { GlassCard } from "@/components/glass-card"
import { SectionWrapper } from "@/components/section-wrapper"
import { EducationModal } from "@/components/education-modal"
import { GraduationCap, Award, BookOpen, ChevronRight } from "lucide-react"
import Image from "next/image"


const education = {
  school: "Georgia Institute of Technology",
  degree: "B.S. Computer Science",
  graduation: "Expected May 2028",
  gpa: "4.0/4.0",
  honors: ["Honors Program", "National Merit Scholar", "Dean's List"],
  relevantCourses: [
    "Data Structures and Algorithms",
    "Design and Analysis of Algorithms",
    "Perception and Robotics",
    "Computer Organization and Programming",
    "Linear Algebra",
    "Discrete Math",
    "Object Oriented Programming",
    "Objects and Design"
  ],
}

export function EducationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3, margin: "-50px" })
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <SectionWrapper id="education" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Academic</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-balance">
            Education &{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">Achievements</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <GlassCard hover className="p-8 cursor-pointer group" onClick={() => setIsModalOpen(true)}>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Info */}
              <div className="flex-1 space-y-6">
                <div className="flex items-start gap-4">
                  <motion.div
                    className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-900/20 border border-cyan-500/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src="/Skills/gt-logo.png"
                      alt="Georgia Tech logo"
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {education.school}
                    </h3>
                    <p className="text-lg text-gray-200">{education.degree}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm font-mono text-cyan-400">{education.graduation}</span>
                      <span className="text-sm font-mono text-white">GPA: {education.gpa}</span>
                    </div>
                  </div>
                </div>

                {/* Honors Preview */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-cyan-400" />
                    <h4 className="font-semibold text-white">Honors & Awards</h4>
                  </div>
                  <ul className="space-y-2">
                    {education.honors.slice(0, 2).map((honor, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-3 text-white/80"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400" />
                        {honor}
                      </motion.li>
                    ))}
                    {education.honors.length > 2 && (
                      <li className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
                        <ChevronRight className="w-4 h-4" />
                        Click to see more...
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Relevant Courses Preview */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  <h4 className="font-semibold text-white">Relevant Coursework</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {education.relevantCourses.slice(0, 6).map((course, index) => (
                    <motion.span
                      key={course}
                      className="px-4 py-2 text-sm font-mono bg-white/5 rounded-lg text-gray-200 border border-white/10 cursor-default transition-all duration-300 hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-cyan-500/5 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {course}
                    </motion.span>
                  ))}
                  {education.relevantCourses.length > 6 && (
                    <span className="px-4 py-2 text-sm font-mono text-cyan-400 flex items-center gap-1">
                      <ChevronRight className="w-4 h-4" />+{education.relevantCourses.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Education Modal */}
      <AnimatePresence>
        {isModalOpen && <EducationModal education={education} onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </SectionWrapper>
  )
}
