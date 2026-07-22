'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Courses', href: '/programs' },
    { label: 'Facilities', href: '/facilities' },
    { label: 'Founder', href: '/founder' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Utility bar */}
      <div className="hidden sm:block bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center justify-end gap-6 text-sm font-medium">
          <a href="tel:+923418576000" className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Phone className="w-3.5 h-3.5" />
            03418576000
          </a>
          <a
            href="https://wa.me/923418576000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-background border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-28">
            <a href="/" className="flex items-center gap-4">
              <Image
                src="/faast logo.jpeg"
                alt="FAAST Education logo"
                width={72}
                height={72}
                priority
                className="object-contain rounded-md"
              />
              <span
                className="text-3xl md:text-4xl tracking-tight text-primary [text-shadow:1px_1px_0_rgba(0,0,0,0.12)]"
                style={{ fontFamily: "'Algerian', 'Impact', 'Arial Black', sans-serif" }}
              >
                FAAST
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-foreground font-medium hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <ThemeToggle />
              <a
                href="/contact"
                className="bg-accent text-accent-foreground px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Enroll Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-primary"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4 space-y-1 border-t border-border pt-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/contact"
                className="block w-full bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold text-center mt-2"
                onClick={() => setIsOpen(false)}
              >
                Enroll Now
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
