"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef } from "react"
import { GlassCard } from "@/components/glass-card"
import { SectionWrapper } from "@/components/section-wrapper"
import { ProjectModal } from "@/components/project-modal"
import { ExternalLink, Github, ArrowUpRight, Search, Filter, X } from "lucide-react"

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
    image: "/RecruitReady/RR-main-ui.png",
    github: "https://github.com/VinhPham25/RecruitReady",
    demo: "https://www.youtube.com/watch?v=3HmfwErIRE4",
    screenshots: [
      "/RecruitReady/RR-main-ui.png",
      "/RecruitReady/RR-main-dashboard.png",
      "/RecruitReady/RR-camera2.png",
      "/RecruitReady/RR-camera.png",
    ],
    category: "past",
    tags: ["AI"]
  },
  {
    id: 2,
    title: "SmartPath AI (In Development)",
    description: "An adaptive learning platform that uses RAG and Neo4j knowledge graphs to transform static PDFs into interactive, personalized study paths.",
    longDescription:
      "Designed to revolutionize how students interact with complex academic material, SmartPath AI transforms static PDFs into dynamic, interactive knowledge graphs. I architected a custom RAG (Retrieval-Augmented Generation) pipeline that goes beyond simple text retrieval; it classifies document contents via high-dimensional embeddings to auto-generate subject-specific nodes and relationships. This creates a visual map of a student's curriculum, turning a linear textbook into an interconnected web of concepts that mirrors how the human brain actually retains information.\n\n At the core of the SmartPath AI experience is an adaptive intelligence system built on Neo4j. By implementing confidence tracking and temporal decay algorithms, the platform identifies which topics a student has mastered and which are fading from memory. This data feeds into a dynamic topic prioritization engine that serves personalized quizzes, ensuring that study sessions are always focused on the user's highest-need areas. To complete the ecosystem, I developed a RAG-powered chatbot that pulls direct context from the knowledge graph to provide tailored explanations, essentially offering every student a 24/7 personal tutor that understands the specific nuances of their own study materials.",
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
    category: "current",
    tags: ["AI"]
  },
  {
    id: 3,
    title: "AI-Powered Prosthetic Arm (In Development)",
    description: "A bionic control system that uses unsupervised autoencoders and computer vision to translate raw EMG muscle signals into natural, 6-degree-of-freedom hand gestures.",
    longDescription:
      "Traditional prosthetics often rely on rigid, pre-programmed commands that feel unnatural to the user. To solve this, I helped develop an autonomous prosthetic system that utilizes unsupervised learning to bridge the gap between human intent and robotic execution. Under Team Limbo of Georgia Tech's Medical Robotics organization, I architected an end-to-end autoencoder pipeline designed to ingest raw 2-channel EMG signals and map them into high-dimensional 6D gesture vectors. This approach allows the system to recognize the subtle nuances of muscle contractions and translate them into five distinct finger curls and a variable thumb angle, creating a more fluid and intuitive range of motion.\n\n To overcome the challenge of data labeling in bionics, I built a custom \"ground truth\" generation system. By leveraging OpenCV and MediaPipe, I captured real-time hand movements through a camera and synchronized them with the user's EMG signals to train the model. To ensure the accuracy of these translations, I developed an interactive 3D visualization interface using Plotly Dash. This dashboard allows for real-time validation of EMG-to-gesture predictions, providing a visual feedback loop that ensures the machine learning model is accurately interpreting the user's intended gestures before they are sent to the hardware.",
    techStack: {
      ai: ["Tensorflow", "Unsupervised Learning", "OpenCV", "MediaPiepe"],
      backend: ["Python", "NumPy", "EMG Signal Analysis"],
      frontend: ["Plotly Dash"]
    },
    outcome: "Handling 1M+ scheduled tasks daily with 99.99% uptime",
    image: "/project3.jpg",
    github: "https://github.com",
    demo: "https://demo.com",
    screenshots: ["/task-scheduler-dashboard-dark-theme.jpg", "/kubernetes-monitoring-dark-interface.jpg"],
    category: "current",
    tags: ["AI"]
  },
  {
    id: 4,
    title: "Brain-Computer Interface System",
    description: "A Brain-Computer Interface (BCI) system that translates SSVEP EEG signals into real-time mouse cursor commands using frequency-domain machine learning.",
    longDescription:
      "Developed in collaboration with the SynapseX research team at Georgia Tech, this BCI is an ambitious effort to redefine how individuals with severe motor impairments interact with the digital world. The project focuses on creating a seamless bridge between human neural activity and computer input, specifically enabling hands-free cursor control through brainwaves. I am spearheading the development of an ML-driven system that utilizes Steady-State Visually Evoked Potentials (SSVEP). By exposing the user to visual stimuli flashing at specific frequencies, the system triggers distinct neural signatures that my model then captures and interprets as directional commands.\n\n Technically, the project involves a complex signal-processing pipeline designed to filter the high \"noise\" environment of the human brain. I designed a feature extraction engine using Fast Fourier Transform (FFT) and Canonical Correlation Analysis (CCA) to isolate frequency-domain patterns from raw EEG data. These features are then fed into LDA and SVM classification models that I've optimized to predict user intent—translating specific frequencies into \"Up,\" \"Down,\" \"Left,\" or \"Right\" with high precision. To accelerate development and model training, I also built a synthetic EEG data generator that simulates realistic noise patterns, ensuring the system remains robust even before being deployed on live hardware.",
    techStack: {
      ai: ["Scikit-learn (LDA/SVM)", "Signal Processing (FFT/CCA)", "SciPy", "NumPy"],
      backend: ["Python", "FastAPI"],
      frontend: []
    },
    outcome: "Provides a foundation for fully autonomous computer navigation for those with limited mobility, converting physiological signals into digital independence and closing the gap between human thought and machine action.",
    image: "/project4.jpg",
    github: "https://github.com",
    demo: "https://demo.com",
    screenshots: ["/style-transfer-mobile-app-dark.jpg", "/artistic-filter-gallery-dark-theme.jpg"],
    category: "current",
    tags: ["AI"]
  },
  {
    id: 5,
    title: "PreVizAI",
    description: "An AI-powered pre-appointment patient intake system that streamlines medical check-ins with voice-first EMR integration.",
    longDescription:
      "PreVizAI was engineered to transform the inefficient, static nature of traditional medical intake into a dynamic, voice-first diagnostic experience. At its core is a history-aware AI chatbot that bridges the gap between a patient's medical background and their current concerns by integrating directly with Electronic Medical Records (EMR). This integration allows the system to move beyond generic questioning; for instance, identifying a patient's history of asthma enables the AI to proactively screen for specific respiratory complications, such as acute shortness of breath or dizziness, in a way that resembles a human practitioner's intuition. By utilizing OpenAI Whisper for seamless voice automation, PreVizAI creates a frictionless \"smart check-in\" that replaces tedious paperwork with an intuitive conversation, ensuring that the data captured is both natural and contextually rich.\n\n For healthcare providers, this conversational data is distilled into a centralized dashboard that tracks intake status and generates a sophisticated, three-layered Intelligent Clinical Report. The platform first provides a high-level summary of chief complaints and suggested next steps, which is then augmented by an EMR Insights layer that cross-references real-time symptoms with existing medical history, medications, and allergies. To provide total diagnostic clarity, the platform visualizes these complex connections through a Neo4j-powered knowledge graph, mapping the causal relationships between triggers, symptoms, and treatments. Architected with a HIPAA-regulated framework and a transparent AI opt-out system, PreVizAI ensures that patient privacy remains paramount while delivering the deep, actionable insights necessary for practitioners to make faster and more informed clinical decisions.",
    techStack: {
      ai: ["OpenAI GPT-4", "Whisper", "Cedar OS SDK", "Neo4j"],
      backend: ["Python", "Flask API"],
      frontend: ["Next.js", "TypeScript", "Tailwind CSS", "Cedar UI"]
    },
    outcome: "Transforms the intake process from a passive data collection task into a proactive clinical tool, reducing physician administrative load while providing high-fidelity, history-aware insights that improve diagnostic accuracy.",
    image: "/PreVizAI/main-ui.png", 
    github: "https://github.com/VinhPham25/PreVizAI",
    demo: "https://demo.com",
    screenshots: [
      "/PreVizAI/main-ui.png", 
      "/PreVizAI/doctor-dashboard.png", 
      "/PreVizAI/summary.png", 
      "/PreVizAI/knowledge-graph-report.png", 
      "/PreVizAI/emr-report.png", 
      "/PreVizAI/patient-intake.png"],
    category: "past",
    tags: ["AI"]
  },
]

export function ProjectsSection() {
  const ref = useRef(null)
  const filterDropdownRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.2, margin: "-50px" })
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<"all" | "current" | "past" | "ai">("all")
  const [selectedTechFilters, setSelectedTechFilters] = useState<string[]>([])
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false)
      }
    }

    if (showFilterDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showFilterDropdown])

  // Get all unique tech stack items
  const allTechItems = useMemo(() => {
    const techSet = new Set<string>()
    projects.forEach(project => {
      [...project.techStack.ai, ...project.techStack.backend, ...project.techStack.frontend].forEach(tech => techSet.add(tech))
    })
    return Array.from(techSet).sort()
  }, [])

  // Filter projects based on search, category, and tech filters
  const filteredProjects = useMemo(() => {
    let filtered = projects

    // Apply search filter
    if (searchTerm.trim() !== "") {
      const searchLower = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower)
      )
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(project => {
        if (selectedCategory === "ai") {
          return project.tags?.includes("AI") ?? false
        }
        return project.category === selectedCategory
      })
    }

    // Apply tech stack filter
    if (selectedTechFilters.length > 0) {
      filtered = filtered.filter(project => {
        const projectTech = [
          ...project.techStack.ai, 
          ...project.techStack.backend, 
          ...project.techStack.frontend
        ]
        return selectedTechFilters.some(filter => projectTech.includes(filter))
      })
    }

    return filtered
  }, [searchTerm, selectedCategory, selectedTechFilters])

  const toggleTechFilter = (tech: string) => {
    setSelectedTechFilters(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    )
  }

  const clearTechFilters = () => {
    setSelectedTechFilters([])
  }

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

        {/* Search and Filter Section */}
        <div className="mb-12 space-y-6">
          {/* Search Bar with Filter Button */}
          <div className="flex gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className={`p-3 rounded-full border transition-all ${
                  selectedTechFilters.length > 0
                    ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-cyan-500/30"
                }`}
              >
                <Filter className="w-5 h-5" />
              </button>
              {selectedTechFilters.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {selectedTechFilters.length}
                </span>
              )}

              {/* Filter Dropdown */}
              <AnimatePresence>
                {showFilterDropdown && (
                  <motion.div
                    ref={filterDropdownRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-72 bg-[#0a1628] border border-white/10 rounded-xl shadow-xl overflow-hidden z-20"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-white">Filter by Tech Stack</h3>
                        {selectedTechFilters.length > 0 && (
                          <button
                            onClick={clearTechFilters}
                            className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            Clear all
                          </button>
                        )}
                      </div>
                      <div className="max-h-64 overflow-y-auto custom-scrollbar space-y-2">
                        {allTechItems.map((tech) => (
                          <label
                            key={tech}
                            className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={selectedTechFilters.includes(tech)}
                              onChange={() => toggleTechFilter(tech)}
                              className="w-4 h-4 rounded border-gray-400 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                            />
                            <span className="text-sm text-gray-300">{tech}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { id: "all", label: "All Projects" },
              { id: "current", label: "Current" },
              { id: "past", label: "Past" },
              { id: "ai", label: "AI" }
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as any)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-cyan-500 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                    : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 hover:text-cyan-400"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Active Filters Display */}
          {selectedTechFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedTechFilters.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm"
                >
                  {tech}
                  <button
                    onClick={() => toggleTechFilter(tech)}
                    className="hover:text-cyan-300 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: isInView ? index * 0.1 : 0
                  }}
                >
                  <GlassCard
                    hover
                    className="group cursor-pointer overflow-hidden"
                    onClick={() => setSelectedProject(project)}
                  >
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

                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>

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
              ))
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-2 text-center py-16"
              >
                <p className="text-gray-400 text-lg">No projects found matching your filters.</p>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                    clearTechFilters()
                  }}
                  className="mt-4 px-6 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 hover:bg-cyan-500/30 transition-all"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </SectionWrapper>
  )
}