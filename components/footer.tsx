'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, MessageCircle, Heart } from 'lucide-react'

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: FacebookIcon,
      href: 'https://www.facebook.com/p/FAAST-Education-100064106918760/',
      label: 'Facebook',
      color: 'hover:bg-blue-600',
    },
    {
      icon: MessageCircle,
      href: 'https://wa.me/923418576000',
      label: 'WhatsApp',
      color: 'hover:bg-green-500',
    },
  ]

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Courses', href: '/programs' },
    { name: 'Facilities', href: '/facilities' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ]

  const programs = [
    { name: 'Evening Coaching', href: '/programs' },
    { name: 'MDCAT Preparation', href: '/programs' },
    { name: 'NUST NET Sessions', href: '/programs' },
    { name: 'NUMS Preparation', href: '/programs' },
    { name: 'FUNG (FAST-NUCES)', href: '/programs' },
    { name: 'NTS Preparation', href: '/programs' },
    { name: 'LUMS Preparation', href: '/programs' },
    { name: 'Entry Test Prep', href: '/programs' },
  ]

  return (
    <footer className="bg-primary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 ring-1 ring-white/20">
                <Image
                  src="/faast logo.jpeg"
                  alt="FAAST Education logo"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold">FAAST Education</span>
            </div>
            <p className="text-white/70 mb-2 italic text-sm">&ldquo;Each one Teach one&rdquo;</p>
            <p className="text-white/60 mb-6 text-sm leading-relaxed">
              Faisalabad&apos;s premier coaching institute for academic excellence and university entry test preparation.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 bg-white/10 rounded-lg ${social.color} transition-colors`}
                    whileHover={{ scale: 1.1 }}
                    title={social.label}
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white/70 hover:text-accent transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="font-bold text-lg mb-4">Our Courses</h3>
            <ul className="space-y-2">
              {programs.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white/70 hover:text-accent transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+923418576000" className="flex items-start gap-3 hover:text-accent transition-colors group">
                  <Phone size={18} className="text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white/70 group-hover:text-accent text-sm block">03418576000</span>
                    <span className="text-white/70 group-hover:text-accent text-sm block">03418576000</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:Faastacademyofficial@gmail.com" className="flex items-start gap-3 hover:text-accent transition-colors group">
                  <Mail size={18} className="text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-white/70 group-hover:text-accent text-sm">Faastacademyofficial@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=13-C+Ali+Tower+Jaranwala+Road+Faisalabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-accent transition-colors group"
                >
                  <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-white/70 group-hover:text-accent text-sm">
                    13-C Ali Tower, Jaranwala Road, Near RCG Plaza, Faisalabad, Pakistan
                  </span>
                </a>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/923418576000?text=Hi%2C%20I%20am%20interested%20in%20FAAST%20Education."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </motion.a>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} FAAST Education, Faisalabad. All rights reserved.
            </p>
            <p className="text-white/40 text-xs flex items-center gap-1">
              Made with <Heart size={12} className="text-red-400" /> for FAAST Education students
            </p>
            <div className="flex gap-6 text-white/60">
              <a href="#" className="hover:text-accent transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="hover:text-accent transition-colors text-sm">Terms of Service</a>
            </div>
          </div>

          <div className="mt-4 text-center text-white/60 text-xs md:text-sm">
            Developed by{' '}
            <a
              href="https://v0-modernportfolio-ebon.vercel.app/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAb21jcASiT-pleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAafK0USJ4U01Vl4d9GElUxFyZMoX6twfDSWMo3BYPvvAwN74D9EmOM9pHWHLyw_aem_91C3ngfw_UY623Uj1YLWCw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline font-semibold"
            >
              Muhammad Ahmad
            </a>
            {' '}| 03117019326
          </div>
        </div>
      </div>
    </footer>
  )
}
