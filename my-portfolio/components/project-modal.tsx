"use client"

import { motion } from "framer-motion"
import { X, Github, ExternalLink } from "lucide-react"
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
  // Split the long description by double newlines to get paragraphs
  const paragraphs = project.longDescription.split('\n\n')

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
              className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 transition-colors"
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

              {/* Backend & Real-Time */}
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

              {/* Frontend */}
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
            </div>

            {/* Outcome - cyan gradient */}
            <div className="mb-8">
              <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-3">Impact & Outcome</h3>
              <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-900/10 rounded-xl border border-cyan-500/20">
                <p className="text-white font-medium">{project.outcome}</p>
              </div>
            </div>

            {/* Screenshots */}
            <div className="mb-8">
              <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-3">Screenshots</h3>
              <div className="grid grid-cols-2 gap-4">
                {project.screenshots.map((screenshot, index) => (
                  <div key={index} className="rounded-xl overflow-hidden border border-white/10">
                    <img
                      src={screenshot || "/placeholder.svg"}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

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