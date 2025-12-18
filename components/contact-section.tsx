"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { GlassCard } from "@/components/glass-card"
import { SectionWrapper } from "@/components/section-wrapper"
import { Github, Linkedin, Mail, Phone, Twitter, FileText, ArrowUpRight } from "lucide-react"

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/VinhPham25", color: "hover:text-white hover:border-white/30" },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/vinh-t-pham/",
    color: "hover:text-blue-400 hover:border-blue-400/30",
  }
]

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.3, margin: "-50px" })

  return (
    <SectionWrapper id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Connect</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-balance">
            Let&apos;s Work{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">Together</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            I&apos;m always open to discussing new opportunities, interesting projects, or ways to collaborate. Feel
            free to reach out!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <GlassCard hover className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Get in Touch</h3>
                <p className="text-gray-400">
                  Visit my GitHub or LinkedIn to learn more about my work, or send me an email directly.
                </p>

                <div className="space-y-4">
                  <a
                    href="vinh.pham2529@gmail.com"
                    className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span>vinh.pham2529@gmail.com</span>
                  </a>
                </div>

                {/* Resume Link - updated to cyan gradient */}
                <motion.a
                  href="/Vinh Pham - Resume.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full font-medium text-[#0a1628] hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 mt-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="w-5 h-5" />
                  Download Resume
                  <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </div>

              {/* Social Links */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Connect Online</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 text-gray-400 ${link.color} hover:bg-white/10 transition-all duration-300 group`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <link.icon className="w-5 h-5" />
                      <span className="font-medium">{link.name}</span>
                      <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Footer - updated border color to cyan */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 pt-8 border-t border-cyan-500/10"
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Portfolio. Built with Next.js, Tailwind CSS & Framer Motion.
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
