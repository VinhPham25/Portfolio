"use client"

import { useState } from "react"
import { motion, useInView, AnimatePresence, Variants } from "framer-motion"
import { useRef } from "react"
import { GlassCard } from "@/components/glass-card"
import { SectionWrapper } from "@/components/section-wrapper"
import { ProjectModal } from "@/components/project-modal"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Recruit Ready",
    description: "A real-time interview practice software with AI agent-powered feedback on body language and speech.",
    longDescription:
      "Recruit Ready was born from the idea that the most critical interview cues—body language, eye contact, and vocal confidence—are often the hardest to self-evaluate. To bridge this gap, I engineered a high-performance, full-stack platform that acts as a real-time digital mirror for aspiring professionals. The system's backbone is a sophisticated computer vision pipeline built with MediaPipe and OpenCV, which tracks over 33 body landmarks at 30 FPS to analyze posture and iris positioning. Simultaneously, a speech analysis engine utilizes WebRTC and OpenAI's Whisper to process audio, calculating metrics like speaking rate and clarity while detecting silences to gauge user confidence.\n\nThe true \"intelligence\" of the platform emerges through a modular AI feedback architecture powered by Google Gemini 2.0. By deploying specialized, concurrent agents for both visual and auditory data, the system processes raw streams into structured JSON feedback with less than 100ms of latency via Socket.IO. This ensures that as a user finishes a response, they receive immediate, actionable insights rather than waiting for post-session processing. The entire experience is wrapped in a modern Next.js 16 interface that coordinates multi-question sessions, culminating in a comprehensive performance summary that aggregates eye contact percentages, posture stability, and speech pacing into a single, professional scorecard.",
    techStack: {
      ai: ["Google Gemini 2.0", "MediaPipe", "OpenCV", "OpenAI Whisper"],
      backend: ["Python", "FastAPI", "Socket.IO", "WebRTC VAD", "NumPy", "PyAudio"],
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"]
    },
    outcome: "Democratizes professional coaching by providing granular, judgment-free analysis of non-verbal communication metrics that were previously only accessible through expensive private consulting.",
    image: "/project1.jpg",
    github: "https://github.com/VinhPham25/RecruitReady",
    demo: "https://demo.com",
    screenshots: [
      "/code-editor-with-ai-suggestions-dark.jpg",
      "/ai-documentation-generator-dark-interface.jpg",
      "/code-refactoring-tool-dark-theme.jpg",
    ],
  },
  {
    id: 2,
    title: "SmartPath AI",
    description: "An adaptive learning platform that uses RAG and Neo4j knowledge graphs to transform static PDFs into interactive, personalized study paths.",
    longDescription:
      "Designed to revolutionize how students interact with complex academic material, SmartPath AI transforms static PDFs into dynamic, interactive knowledge graphs. I architected a custom RAG (Retrieval-Augmented Generation) pipeline that goes beyond simple text retrieval; it classifies document contents via high-dimensional embeddings to auto-generate subject-specific nodes and relationships. This creates a visual map of a student’s curriculum, turning a linear textbook into an interconnected web of concepts that mirrors how the human brain actually retains information.\n\n At the core of the SmartPath AI experience is an adaptive intelligence system built on Neo4j. By implementing confidence tracking and temporal decay algorithms, the platform identifies which topics a student has mastered and which are fading from memory. This data feeds into a dynamic topic prioritization engine that serves personalized quizzes, ensuring that study sessions are always focused on the user's highest-need areas. To complete the ecosystem, I developed a RAG-powered chatbot that pulls direct context from the knowledge graph to provide tailored explanations, essentially offering every student a 24/7 personal tutor that understands the specific nuances of their own study materials.",
    techStack: {
      ai: ["OpenAI", "LangChain", "RAG Pipelines", "Neo4j"],
      backend: ["Python", "FastAPI", "MongoDB", "Node.js", "Express.js"],
      frontend: ["React", "TypeScript", "CSS"]
    },
    outcome: "Enables personalized, high-efficiency learning paths for a student body of over 20,000 (expected), utilizing spaced repetition and confidence-based adaptation to significantly reduce study time while increasing long-term retention.",
    image: "/project2.jpg",
    github: "https://github.com/VinhPham25/Smart-Path-AI",
    demo: "https://demo.com",
    screenshots: ["/sentiment-dashboard-analytics-dark.jpg", "/social-media-monitoring-dark-interface.jpg"],
  },
  {
    id: 3,
    title: "Distributed Task Scheduler",
    description: "Scalable job scheduling system for cloud-native applications.",
    longDescription:
      "A high-performance distributed task scheduling system designed for cloud-native environments. Features intelligent load balancing, automatic failover, and comprehensive monitoring capabilities for enterprise-grade reliability.\n\nBuilt with Go for maximum performance and deployed on Kubernetes for orchestration, this system handles millions of scheduled tasks daily with sub-second precision and automatic recovery from node failures.",
    techStack: {
      ai: [],
      backend: ["Go", "Kubernetes", "Redis", "PostgreSQL", "gRPC", "Prometheus"],
      frontend: ["React", "TypeScript", "Grafana"]
    },
    outcome: "Handling 1M+ scheduled tasks daily with 99.99% uptime",
    image: "/project3.jpg",
    github: "https://github.com",
    demo: "https://demo.com",
    screenshots: ["/task-scheduler-dashboard-dark-theme.jpg", "/kubernetes-monitoring-dark-interface.jpg"],
  },
  {
    id: 4,
    title: "Neural Style Transfer App",
    description: "Mobile app for real-time artistic style transfer using neural networks.",
    longDescription:
      "An innovative mobile application that applies artistic styles to photos and videos in real-time using optimized neural network models. Features a library of 50+ artistic styles and custom style training capabilities.\n\nThe app leverages Core ML for on-device inference, ensuring privacy and low latency. Users can even train custom styles by providing their own reference images, with the training process handled in the cloud using TensorFlow.",
    techStack: {
      ai: ["Core ML", "TensorFlow", "PyTorch", "Neural Style Transfer"],
      backend: ["Python", "FastAPI", "Firebase", "Cloud Functions"],
      frontend: ["Swift", "SwiftUI", "UIKit"]
    },
    outcome: "50,000+ downloads with 4.8 star rating",
    image: "/project4.jpg",
    github: "https://github.com",
    demo: "https://demo.com",
    screenshots: ["/style-transfer-mobile-app-dark.jpg", "/artistic-filter-gallery-dark-theme.jpg"],
  },
]

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.2, margin: "-50px" })
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  // Helper function to get all tech from all categories
  const getAllTech = (techStack: { ai: string[], backend: string[], frontend: string[] }) => {
    return [...techStack.ai, ...techStack.backend, ...techStack.frontend]
  }

  return (
    <SectionWrapper id="projects" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-balance">
            Featured{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A showcase of my personal and club projects integrating AI/ML and full-stack development.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <GlassCard
                hover
                className="group cursor-pointer overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent opacity-70" />

                  <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      className="bg-white/10 backdrop-blur-md rounded-full p-4 border border-cyan-400/30 shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <ArrowUpRight className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>

                  {/* Tech Stack - show first 4 items from combined list */}
                  <div className="flex flex-wrap gap-2">
                    {getAllTech(project.techStack).slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-mono bg-white/5 rounded-full text-cyan-400 border border-cyan-500/20 transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-500/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-2">
                    <a
                      href={project.github}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </SectionWrapper>
  )
}