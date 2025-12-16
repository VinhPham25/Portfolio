"use client"

import { motion } from "framer-motion"
import { X, Building2, Calendar } from "lucide-react"
import { GlassCard } from "@/components/glass-card"

interface Experience {
  role: string
  company: string
  period: string
  description: string[]
  tech: string[]
}

interface ExperienceModalProps {
  experience: Experience
  onClose: () => void
}

export function ExperienceModal({ experience, onClose }: ExperienceModalProps) {
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
        className="w-full max-w-2xl max-h-[90vh] overflow-hidden"
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

            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{experience.role}</h2>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span>{experience.company}</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm">
                  <Calendar className="w-4 h-4" />
                  {experience.period}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {/* Responsibilities */}
            <div className="mb-6">
              <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-4">
                Key Responsibilities & Achievements
              </h3>
              <ul className="space-y-3">
                {experience.description.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/90">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {experience.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-sm font-mono bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20"
                  >
                    {tech}
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
