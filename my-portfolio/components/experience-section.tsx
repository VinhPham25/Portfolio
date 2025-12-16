"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { GlassCard } from "@/components/glass-card"
import { SectionWrapper } from "@/components/section-wrapper"
import { ExperienceModal } from "@/components/experience-modal"
import { Building2, Calendar, ChevronRight } from "lucide-react"

const experiences = [
  {
    role: "Software Engineering Intern",
    company: "Tech Company Inc.",
    period: "Jun 2024 - Present",
    description: [
      "Developed and deployed ML models improving prediction accuracy by 25%",
      "Built RESTful APIs serving 10M+ daily requests with 99.9% uptime",
      "Led a team of 3 interns in redesigning the data pipeline architecture",
      "Implemented automated testing reducing bug rate by 40%",
    ],
    tech: ["Python", "AWS", "Docker", "PostgreSQL"],
  },
  {
    role: "Research Assistant",
    company: "University AI Lab",
    period: "Sep 2023 - May 2024",
    description: [
      "Published research on transformer architectures in top-tier conference",
      "Developed novel attention mechanisms improving model efficiency by 30%",
      "Maintained lab's GPU cluster serving 50+ researchers",
    ],
    tech: ["PyTorch", "CUDA", "Linux", "HPC"],
  },
  {
    role: "Full Stack Developer",
    company: "Startup XYZ",
    period: "Jan 2023 - Aug 2023",
    description: [
      "Built full-stack web application from scratch, reaching 5,000+ users",
      "Implemented real-time features using WebSocket technology",
      "Reduced page load time by 60% through performance optimization",
    ],
    tech: ["React", "Node.js", "MongoDB", "Redis"],
  },
]

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "-50px" })
  const [selectedExperience, setSelectedExperience] = useState<(typeof experiences)[0] | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
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
