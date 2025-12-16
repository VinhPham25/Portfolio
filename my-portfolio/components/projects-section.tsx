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
    title: "AI-Powered Code Assistant",
    description: "An intelligent code completion and suggestion tool using transformer models.",
    longDescription:
      "A sophisticated AI-powered development tool that leverages large language models to provide context-aware code suggestions, automated documentation generation, and intelligent refactoring recommendations. Built with a focus on developer productivity and code quality.",
    techStack: ["Python", "PyTorch", "FastAPI", "React", "TypeScript"],
    outcome: "Increased developer productivity by 40% in beta testing with 500+ users",
    image: "/project1.jpg",
    github: "https://github.com",
    demo: "https://demo.com",
    screenshots: [
      "/code-editor-with-ai-suggestions-dark.jpg",
      "/ai-documentation-generator-dark-interface.jpg",
      "/code-refactoring-tool-dark-theme.jpg",
    ],
  },
  {
    id: 2,
    title: "Real-time Sentiment Analyzer",
    description: "Live social media sentiment analysis dashboard with ML predictions.",
    longDescription:
      "A comprehensive sentiment analysis platform that processes social media streams in real-time, providing businesses with actionable insights about brand perception and market trends. Features advanced NLP models fine-tuned for various domains.",
    techStack: ["Python", "TensorFlow", "Kafka", "React", "D3.js"],
    outcome: "Processing 10,000+ posts/minute with 94% accuracy",
    image: "/project2.jpg",
    github: "https://github.com",
    demo: "https://demo.com",
    screenshots: ["/sentiment-dashboard-analytics-dark.jpg", "/social-media-monitoring-dark-interface.jpg"],
  },
  {
    id: 3,
    title: "Distributed Task Scheduler",
    description: "Scalable job scheduling system for cloud-native applications.",
    longDescription:
      "A high-performance distributed task scheduling system designed for cloud-native environments. Features intelligent load balancing, automatic failover, and comprehensive monitoring capabilities for enterprise-grade reliability.",
    techStack: ["Go", "Kubernetes", "Redis", "PostgreSQL", "gRPC"],
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
      "An innovative mobile application that applies artistic styles to photos and videos in real-time using optimized neural network models. Features a library of 50+ artistic styles and custom style training capabilities.",
    techStack: ["Swift", "Core ML", "Python", "TensorFlow", "Firebase"],
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
            A showcase of my most impactful work, demonstrating expertise in AI/ML, distributed systems, and full-stack
            development.
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

                  {/* Tech Stack - updated to cyan theme */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech) => (
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