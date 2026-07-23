"use client"

import { motion, useInView, AnimatePresence, Variants} from "framer-motion"
import { useRef, useState } from "react"
import { GlassCard } from "@/components/glass-card"
import { SectionWrapper } from "@/components/section-wrapper"
import { ExperienceModal } from "@/components/experience-modal"
import { Building2, Calendar, ChevronRight } from "lucide-react"

const experiences = [
  {
    role: "Software Engineer Intern",
    company: "Cox Automotive",
    period: "May 2026 - Present",
    description: [
      "Building a RAG-powered Slack agent with AWS AgentCore that answers engineer and support ticket queries from an auto-synced, multi-sourced knowledge base–achieving 97% answer accuracy and deflecting ~40% of 8 hrs/wk/engineer support overhead",
      "Led end-to-end modernization of the Overwatch platform's architecture and CI/CD, designing a parallelized two-pass search-tree retrieval pipeline with Redis caching, reducing latency of database query and bulk edit of 122,000+ client subscriptions by 85%+",
    ],
    tech: ["Python", "C#", "Terraform", "AWS", "SQL", "Docker", "Redis"],
  },
  {
    role: "Undergraduate Researcher",
    company: "Mind, Brain, Education (MBE) Lab - Georgia Institute of Technology",
    period: "January 2026 - Present",
    description: [
      "Engineering and optimizing an fNIRS preprocessing pipeline for the ASTaUND dataset that utilizes attention-based LSTM autoencoders to identify neural biomarkers of motor skill acquisition and improve surgical expertise classification accuracy",
      "Developing a novel multivariate delay symbolic transfer entropy (TE) framework to quantify non-linear information flow and establish a robust connectivity model used to design data-driven GT BME curricula and adaptive surgical training protocols",
    ],
    tech: ["Python", "PyTorch", "fNIRS", "LSTM", "Autoencoders", "Transfer Entropy"],
  },
  {
    role: "Full Stack Software Engineer Intern",
    company: "Cortado Group",
    period: "January 2026 - May 2026",
    description: [
      "Architected a PostgreSQL-backed Django project to convert transcripts into GTM growth insights for PE portfolio firms",
      "Developed a dual-path AI scoring engine and Slack-synced agents to automate bottleneck detection for C-suite-led deployment",
    ],
    tech: ["Python", "Django", "React", "PostgreSQL"],
  },
  {
    role: "Undergraduate Researcher",
    company: "Applied Research Laboratories (ARL) - University of Texas at Austin",
    period: "June 2025 - August 2025",
    description: [
      "Designed an experimental study for evaluating dynamic variability in 180+ additively manufactured beams and automated laser Doppler vibrometer tuning via MATLAB to achieve 95%+ precision – a 30% improvement over previous research methods",
      "Optimized regression algorithm runtime by 50%, accelerating statistical analysis to drive research conclusions and publication",
    ],
    tech: ["MATLAB", "Python", "SciPy", "Matplotlib", "CAD", "COMSOL Multiphysics"],
  },
  {
    role: "Software Engineer Intern",
    company: "Dell Technologies",
    period: "February 2025 - May 2025",
    description: [
      "Developed an AI-powered robot that translates speech into Mermaid diagrams, facilitating concept visualization and discussion",
      "Engineered dual-LLM prompts to automate diagram generation and consistent G-code syntax for precise, reliable motor control",
      "Designed a multithreaded-RAG pipeline to optimize runtime by 80% and enable real-time deployment for Dell executives",
    ],
    tech: ["Python", "C", "OpenAI", "Whisper"],
  },
  {
    role: "Founder",
    company: "Project 1600",
    period: "May 2023 - January 2026",
    description: [
      "Established a multi-district SAT mentorship program and curriculum, elevating the mean scores of 15+ students by 160+ points",
      "Designed an automated website for enrollment management, curriculum planning, and tutor recruitment, generating 320+ visits",
    ],
    tech: ["Web Development", "Curriculum Design", "Mentorship"],
  },
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
