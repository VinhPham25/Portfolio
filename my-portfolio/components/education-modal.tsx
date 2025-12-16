"use client"

import { motion } from "framer-motion"
import { X, GraduationCap, Award, BookOpen, Calendar } from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import Image from "next/image"


interface Education {
  school: string
  degree: string
  graduation: string
  gpa: string
  honors: string[]
  relevantCourses: string[]
}

interface EducationModalProps {
  education: Education
  onClose: () => void
}

export function EducationModal({ education, onClose }: EducationModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-3xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <GlassCard className="overflow-hidden">
          {/* Header */}
          <div className="relative p-6 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-900/10">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-900/20 border border-cyan-500/20">
                <Image
                  src="/gt-logo.png"
                  alt="Georgia Tech logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{education.school}</h2>
                <p className="text-lg text-gray-300">{education.degree}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm">
                    <Calendar className="w-4 h-4" />
                    {education.graduation}
                  </div>
                  <span className="text-sm font-mono text-white">GPA: {education.gpa}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {/* Honors */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm text-gray-400 uppercase tracking-widest">Honors & Awards</h3>
              </div>
              <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-900/10 rounded-xl border border-cyan-500/20">
                <ul className="space-y-3">
                  {education.honors.map((honor, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/90">
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400" />
                      {honor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Relevant Courses */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm text-gray-400 uppercase tracking-widest">Relevant Coursework</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {education.relevantCourses.map((course) => (
                  <span
                    key={course}
                    className="px-4 py-2 text-sm font-mono bg-white/5 rounded-lg text-gray-300 border border-white/10"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}
