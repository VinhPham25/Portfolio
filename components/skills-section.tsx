"use client"

import { motion, useInView, Variants } from "framer-motion"
import { useRef } from "react"
import { GlassCard } from "@/components/glass-card"
import { SectionWrapper } from "@/components/section-wrapper"
import Image from "next/image"

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "Python", proficiency: 90, logo: "/Skills/python-logo.png" },
      { name: "Java", proficiency: 85, logo: "/Skills/javalogo.png" },
      { name: "Javascript", proficiency: 70, logo: "/Skills/javascript-logo.png" },
      { name: "C", proficiency: 50, logo: "/Skills/c-logo.png" },
      { name: "MATLAB", proficiency: 50, logo: "/Skills/matlab-logo.png" }
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "NumPy", proficiency: 85, logo: "/Skills/numpy-logo.jpg" },
      { name: "Pandas", proficiency: 85, logo: "/Skills/pandas-logo.jpg" },
      { name: "PyTorch", proficiency: 80, logo: "/Skills/pytorch-logo.png" },
      { name: "Tensorflow", proficiency: 75, logo: "/Skills/tensorflow-logo.webp" },
      { name: "OpenCV", proficiency: 85, logo: "/Skills/opencv-logo.png" },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", proficiency: 90, logo: "/Skills/git-logo.png" },
      { name: "VS Code", proficiency: 95, logo: "/Skills/vscode-logo.png" },
      { name: "MongoDB", proficiency: 60, logo: "/Skills/mongodb-logo.svg" },
      { name: "Linux", proficiency: 50, logo: "/Skills/linux-logo.png" }
    ],
  },
]

function SkillBar({ skill, delay }: { skill: { name: string; proficiency: number; logo: string }; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5 })

  return (
    <motion.div ref={ref} className="space-y-2" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-white/5 p-0.5 flex items-center justify-center">
            <Image
              src={skill.logo || "/placeholder.svg"}
              alt={`${skill.name} logo`}
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <span className="font-mono text-sm text-white">{skill.name}</span>
        </div>
        <span className="font-mono text-sm text-cyan-400">{skill.proficiency}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.proficiency}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.2, margin: "-50px" })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <SectionWrapper id="skills" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-balance">
            Technical{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">Proficiency</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            An overview of my technical skills and proficiency levels, developed and refined through
            hands-on projects, professional experience, and curiosity.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div key={category.title} variants={cardVariants}>
              <GlassCard hover className="p-6 h-full">
                <h3 className="text-lg font-semibold text-white mb-6 pb-4 border-b border-white/10">
                  {category.title}
                </h3>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar key={skill.name} skill={skill} delay={categoryIndex * 0.1 + skillIndex * 0.1} />
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}