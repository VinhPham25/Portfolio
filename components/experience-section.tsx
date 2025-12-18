"use client"

import { motion, useInView, AnimatePresence, Variants} from "framer-motion"
import { useRef, useState } from "react"
import { GlassCard } from "@/components/glass-card"
import { SectionWrapper } from "@/components/section-wrapper"
import { ExperienceModal } from "@/components/experience-modal"
import { Building2, Calendar, ChevronRight } from "lucide-react"

const experiences = [
  {
    role: "Incoming Software Engineering Intern",
    company: "Cox Automotives",
    period: "May 2026 - August 2026",
    description: [
      "Incoming software engineering intern for summer 2026 specializing in AI and machine learning applications within automotive solutions.",
    ],
    tech: [],
  },
  {
    role: "Software Engineering Intern",
    company: "Dell Technologies",
    period: "February 2025 - May 2025",
    description: [
      "Engineered an LLM-powered robot that converts speech into Mermaid diagrams, facilitating subject visualization and discussion",
      "Developed LLM prompts to automate diagram generation and ensure consistent G-code syntax for precise, reliable motor control",
      "Optimized dual-LLM processing with RAG, reducing runtime by 80% to enable real-time demonstrations for Dell executives",
    ],
    tech: ["Python", "RAG", "LLM APIs", "Prompt Engineering", "Git"],
  },
  {
    role: "Research Assistant",
    company: "Applied Research Laboratories - University of Texas at Austin",
    period: "June 2025 - August 2025",
    description: [
      "Designed an experimental study to evaluate dynamic variability in 180+ additively manufactured beams under Dr. Christina Naify",
      "Hypertuned laser Doppler vibrometer using MATLAB to achieve 95%+ testing precision, a 30% improvement over prior methods",
      "Enhanced curve-fitting optimization runtime by 50%, accelerating statistical analysis to drive research conclusions and publication",
    ],
    tech: ["Python", "SciPy", "Matplotlib", "Pands", "MATLAB", "CAD", "COMSOL Multiphysics"],
  },
  {
    role: "AI Consultant",
    company: "GameRun AI",
    period: "December 2024 - February 2025",
    description: [
      "Directed UI/UX enhancements by researching 20+ AI video analysis companies to create customer-centric data visualizations",
      "Refined LLM with AI agents to reduce hallucinations and improve automated coaching feedback for sports motion analysis",
    ],
    tech: ["AI Agents", "LLM", "UI/UX Design", "Competitor Analysis"],
  },
  {
    role: "Product Development Team Lead",
    company: "SportzMate",
    period: "May 2024 - August 2024",
    description: [
      "Led a team of 6 interns on integrating AI capabilities into the company’s new “Player Performance Tracking” in-app product",
      "Supervised Figma prototyping and redesign of 50+ screens, improving UI/UX for feature validation and initial consumer testing",
    ],
    tech: ["Figma", "UI/UX Design", "Product Development"]
  }
]

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "-50px" })
  const [selectedExperience, setSelectedExperience] = useState<(typeof experiences)[0] | null>(null)

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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <SectionWrapper id="experience" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Career</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-balance">
            Work{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/60 via-cyan-400/40 to-transparent hidden md:block" />

          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {experiences.map((exp, index) => (
              <motion.div key={index} variants={itemVariants} className="relative pl-0 md:pl-20">
                {/* Timeline Dot */}
                <motion.div
                  className="absolute left-6 top-8 w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 border-4 border-[#0a1628] hidden md:block shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.3, duration: 0.4, type: "spring" }}
                />

                <GlassCard hover className="p-6 cursor-pointer group" onClick={() => setSelectedExperience(exp)}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-300 mt-1">
                        <Building2 className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-cyan-400 font-mono">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.description.slice(0, 2).map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                    {exp.description.length > 2 && (
                      <li className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
                        <ChevronRight className="w-4 h-4" />
                        Click to see {exp.description.length - 2} more...
                      </li>
                    )}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-mono bg-white/5 rounded-full text-cyan-400 border border-cyan-500/20 transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-500/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Experience Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <ExperienceModal experience={selectedExperience} onClose={() => setSelectedExperience(null)} />
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
