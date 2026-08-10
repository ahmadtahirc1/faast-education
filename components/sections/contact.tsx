'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageCircle, ArrowRight } from 'lucide-react'
import { defaultTransition, fadeUp, viewportOnce } from '@/lib/motion'
import { RevealHeading } from '@/components/reveal-heading'

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

  const inputClass =
    'w-full border-b-2 border-primary/15 bg-transparent px-0 py-3 text-foreground placeholder:text-foreground/40 focus:border-accent-ink focus:outline-none'

  return (
    <section id="contact" className="bg-card py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={defaultTransition}
          className="mb-16"
        >
          <span className="text-eyebrow font-bold uppercase text-accent-ink">Contact</span>
          <RevealHeading text="Get in touch" as="h2" className="text-h1 mt-2 text-primary" />
        </motion.div>

        {/* Info strip */}
        <div className="grid border-t-2 border-primary/15 sm:grid-cols-3">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <motion.a
                key={index}
                href={info.link}
                target={info.link.startsWith('https://maps') ? '_blank' : undefined}
                rel={info.link.startsWith('https://maps') ? 'noopener noreferrer' : undefined}
                className="group border-b-2 border-primary/15 py-8 pr-6 transition-colors sm:border-b-0 sm:border-l-2 sm:pl-8 first:sm:border-l-0 first:sm:pl-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Icon className="h-7 w-7 text-accent-ink" />
                <h3 className="mt-4 text-lg font-bold text-primary transition-colors group-hover:text-accent-ink">
                  {info.title}
                </h3>
                <p className="mt-1 font-medium text-foreground/80">{info.details}</p>
                <p className="mt-1 text-sm text-foreground/50">{info.subDetails}</p>
              </motion.a>
            )
          })}
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <h3 className="mb-8 text-h2 font-bold text-primary">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-primary">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="Muhammad Ali"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-primary">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="+92 300 0000000"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-primary">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="student@example.com"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-primary">Course of Interest *</label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">— Select a Course —</option>
                  {programs.map((prog) => (
                    <option key={prog} value={prog}>{prog}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-primary">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us about your current class, which program you are interested in, or any questions..."
                />
              </div>

              {error && (
                <div className="border-l-2 border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                  {error}
                </div>
              )}

              <motion.button
                type="submit"
                className="flex w-full items-center justify-center gap-2 bg-accent py-4 font-bold text-accent-foreground transition-shadow hover:shadow-lg disabled:opacity-70 sm:w-auto sm:px-10"
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

          {/* WhatsApp + map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 lg:col-span-5"
          >
            <motion.a
              href="https://wa.me/923418576000?text=Hi%2C%20I%20am%20interested%20in%20learning%20more%20about%20FAAST%20Education %20programs.%20Please%20share%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 bg-green-500 p-6 text-white transition-colors hover:bg-green-600"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="h-7 w-7 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-lg font-bold">Chat with Us on WhatsApp</div>
                  <div className="text-sm text-white/80">03418576000 — Quick response guaranteed</div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 flex-shrink-0" />
            </motion.a>

            <div className="bg-brand-navy p-6 text-brand-navy-foreground">
              <h4 className="flex items-center gap-2 text-lg font-bold">
                <MapPin className="h-5 w-5 flex-shrink-0" /> Our Location
              </h4>
              <p className="mt-2 text-sm text-brand-navy-foreground/80">
                13-C Ali Tower, Jaranwala Road, Near RCG Plaza, Faisalabad, Punjab, Pakistan
              </p>
              <a
                href="https://maps.google.com/?q=13-C+Ali+Tower+Jaranwala+Road+Faisalabad"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
              >
                Open in Google Maps
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
