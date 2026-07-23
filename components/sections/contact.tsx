'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        if (res.status === 400) {
          const body = await res.json().catch(() => ({}))
          setError(body.error ?? 'Please check the form and try again.')
        } else {
          setError('Something went wrong. Please try again or contact us via WhatsApp.')
        }
        return
      }

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ name: '', email: '', phone: '', program: '', message: '' })
      }, 3000)
    } catch {
      setError('Something went wrong. Please try again or contact us via WhatsApp.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call / WhatsApp',
      details: '03418576000',
      subDetails: 'Quick response guaranteed',
      link: 'tel:+923418576000',
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: 'Faastacademyofficial@gmail.com',
      subDetails: 'We reply within 24 hours',
      link: 'mailto:Faastacademyofficial@gmail.com',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '13-C Ali Tower, Jaranwala Road',
      subDetails: 'Near RCG Plaza, Faisalabad',
      link: 'https://maps.google.com/?q=13-C+Ali+Tower+Jaranwala+Road+Faisalabad',
    },
  ]

  const programs = [
    'Evening Coaching (Matric / Intermediate)',
    'Entry Test Preparation',
    'NET Sessions (NUST)',
    'MDCAT Preparation',
    'NUMS Preparation',
    'FUNG (FAST-NUCES)',
    'NTS Preparation',
    'LUMS Preparation',
    'Other / General Inquiry',
  ]

  return (
    <section id="contact" className="py-20 bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Ready to start your journey? Contact FAAST Education  today and take the first step toward your goals.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <motion.a
                key={index}
                href={info.link}
                target={info.link.startsWith('https://maps') ? '_blank' : undefined}
                rel={info.link.startsWith('https://maps') ? 'noopener noreferrer' : undefined}
                className="bg-background rounded-xl p-8 text-center border border-border hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="inline-block p-4 bg-accent/20 rounded-lg mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon className="w-8 h-8 text-accent" />
                </motion.div>
                <h3 className="text-xl font-bold text-primary mb-2">{info.title}</h3>
                <p className="text-foreground/70 font-medium">{info.details}</p>
                <p className="text-foreground/50 text-sm mt-1">{info.subDetails}</p>
              </motion.a>
            )
          })}
        </div>

        {/* WhatsApp CTA */}
        <motion.a
          href="https://wa.me/923418576000?text=Hi%2C%20I%20am%20interested%20in%20learning%20more%20about%20FAAST%20Education %20programs.%20Please%20share%20details."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white rounded-xl p-5 mb-12 transition-colors shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.01 }}
        >
          <MessageCircle className="w-7 h-7" />
          <div className="text-left">
            <div className="font-bold text-lg">Chat with Us on WhatsApp</div>
            <div className="text-white/80 text-sm">03418576000 — Quick response guaranteed</div>
          </div>
        </motion.a>

        {/* Contact Form */}
        <motion.div
          className="max-w-2xl mx-auto bg-background rounded-xl p-8 border border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-primary mb-6 text-center">Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                  placeholder="Muhammad Ali"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                  placeholder="+92 300 0000000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                placeholder="student@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Course of Interest *</label>
              <select
                name="program"
                value={formData.program}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
              >
                <option value="">— Select a Course —</option>
                {programs.map((prog) => (
                  <option key={prog} value={prog}>{prog}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground resize-none"
                placeholder="Tell us about your current class, which program you are interested in, or any questions..."
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <motion.button
              type="submit"
              className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-bold hover:shadow-lg transition-shadow flex items-center justify-center gap-2 disabled:opacity-70"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={submitted || isSubmitting}
            >
              {submitted ? (
                <span>Message Sent! We will contact you shortly.</span>
              ) : isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Map Embed Hint */}
        <motion.div
          className="mt-12 rounded-xl overflow-hidden border border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-card p-6 flex flex-col md:flex-row items-center gap-4 justify-between">
            <div>
              <h4 className="flex items-center gap-2 font-bold text-primary text-lg mb-1">
                <MapPin className="w-5 h-5" /> Our Location
              </h4>
              <p className="text-foreground/70 text-sm">13-C Ali Tower, Jaranwala Road, Near RCG Plaza, Faisalabad, Punjab, Pakistan</p>
            </div>
            <a
              href="https://maps.google.com/?q=13-C+Ali+Tower+Jaranwala+Road+Faisalabad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
            >
              Open in Google Maps →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
