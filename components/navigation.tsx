"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a1628]/90 backdrop-blur-xl border-b border-cyan-500/10" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="#"
          className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          Vinh Pham
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md rounded-full p-1 border border-cyan-500/10">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="px-4 py-2 text-sm text-gray-300 hover:text-white rounded-full transition-all duration-300 hover:bg-cyan-500/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        <motion.a
          href="#contact"
          className="hidden md:block px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full text-sm font-medium text-[#0a1628] hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Me
        </motion.a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a1628]/95 backdrop-blur-xl border-b border-cyan-500/10"
          >
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-cyan-500/10 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
