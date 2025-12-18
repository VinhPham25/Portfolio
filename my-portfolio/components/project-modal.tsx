"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { GlassCard } from "@/components/glass-card"

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  techStack: {
    ai: string[]
    backend: string[]
    frontend: string[]
  }
  outcome: string
  image: string
  github: string
  demo: string
  screenshots: string[]
}

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // Split the long description by double newlines to get paragraphs
  const paragraphs = project.longDescription.split('\n\n')

  const nextImage = () => {
    setDirection(1)
    setCurrentImageIndex((prev) => (prev + 1) % project.screenshots.length)
  }

  const prevImage = () => {
    setDirection(-1)
    setCurrentImageIndex((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

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
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <GlassCard className="overflow-hidden">
          {/* Header */}
          <div className="relative">
            <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8 max-h-[50vh] overflow-y-auto custom-scrollbar">
            <h2 className="text-3xl font-bold mb-4">{project.title}</h2>

            {/* Description with paragraph spacing */}
            <div className="space-y-4 mb-6">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tech Stack - organized by category */}
            <div className="mb-6">
              <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-4">Tech Stack</h3>
              
              {/* AI & Computer Vision */}
              {project.techStack.ai.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs text-cyan-400 font-semibold mb-2">AI & Computer Vision</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.ai.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 text-sm font-mono bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Backend & Real-Time */}
              {project.techStack.backend.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs text-cyan-400 font-semibold mb-2">Backend & Real-Time</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.backend.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 text-sm font-mono bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Frontend */}
              {project.techStack.frontend.length > 0 && (
                <div>
                  <h4 className="text-xs text-cyan-400 font-semibold mb-2">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.frontend.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 text-sm font-mono bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Outcome - cyan gradient */}
            <div className="mb-8">
              <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-3">Impact & Outcome</h3>
              <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-900/10 rounded-xl border border-cyan-500/20">
                <p className="text-white font-medium">{project.outcome}</p>
              </div>
            </div>

            {/* Screenshots Gallery */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-3">Screenshots</h3>
                <div className="relative bg-black/30 rounded-xl overflow-hidden border border-white/10">
                  {/* Image Container */}
                  <div className="relative w-full h-[400px] flex items-center justify-center">
                    <AnimatePresence initial={false} custom={direction}>
                      <motion.img
                        key={currentImageIndex}
                        src={project.screenshots[currentImageIndex] || "/placeholder.svg"}
                        alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                        className="absolute inset-0 w-full h-full object-contain p-4"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 }
                        }}
                      />
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/70 backdrop-blur-md rounded-full border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all z-10 group"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/70 backdrop-blur-md rounded-full border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all z-10 group"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/70 backdrop-blur-md rounded-full border border-cyan-500/30 z-10">
                      <span className="text-cyan-400 text-sm font-mono font-semibold">
                        {currentImageIndex + 1} / {project.screenshots.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Links - cyan theme */}
            <div className="flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
              >
                <Github className="w-5 h-5" />
                View Source
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full font-medium text-[#0a1628] hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                <ExternalLink className="w-5 h-5" />
                Live Demo
              </a>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}