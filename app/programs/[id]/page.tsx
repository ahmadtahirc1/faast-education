import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  Moon, Target, Cpu, Heart, Code, FileText, GraduationCap, Stethoscope,
  Clock, Users, BookOpen, CheckCircle, Landmark, ChevronRight, Phone, MessageCircle,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { getSiteContent } from '@/lib/site-content'

const iconMap: Record<string, React.ElementType> = {
  Moon, Target, Cpu, Heart, Code, FileText, GraduationCap, Stethoscope,
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const content = await getSiteContent()
  const program = content.programs.find((p) => p.id === id)

  if (!program) return { title: 'Program Not Found — FAAST Education' }

  return {
    title: `${program.name} — FAAST Education Faisalabad`,
    description: program.description,
  }
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const content = await getSiteContent()
  const program = content.programs.find((p) => p.id === id)

  if (!program) notFound()

  const Icon = iconMap[program.icon] ?? Target
  const otherPrograms = content.programs.filter((p) => p.id !== program.id)

  const whatsappHref = `https://wa.me/923418576000?text=${encodeURIComponent(
    `Hi, I am interested in ${program.name} at FAAST Education. Please share details.`,
  )}`

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 sm:pt-[116px]">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-sm text-foreground/60">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <ChevronRight className="w-3.5 h-3.5" />
            <a href="/programs" className="hover:text-primary transition-colors">Programs</a>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">{program.name}</span>
          </div>
        </div>

        {/* Title band */}
        <div className="bg-primary text-primary-foreground">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-lg">
                <Icon className="w-7 h-7" />
              </div>
              {program.badge && (
                <span className={`${program.badgeColor ?? 'bg-accent'} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                  {program.badge}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">{program.name}</h1>
            <p className="text-lg text-primary-foreground/85 max-w-2xl">{program.tagline}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Quick facts */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 text-foreground/50 text-xs font-semibold uppercase tracking-wide mb-1.5">
                <Clock className="w-4 h-4" /> Duration
              </div>
              <div className="font-bold text-primary">{program.duration}</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 text-foreground/50 text-xs font-semibold uppercase tracking-wide mb-1.5">
                <Clock className="w-4 h-4" /> Timing
              </div>
              <div className="font-bold text-primary">{program.timing}</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 text-foreground/50 text-xs font-semibold uppercase tracking-wide mb-1.5">
                <Users className="w-4 h-4" /> Level
              </div>
              <div className="font-bold text-primary">{program.level}</div>
            </div>
            {program.university && (
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 text-foreground/50 text-xs font-semibold uppercase tracking-wide mb-1.5">
                  <Landmark className="w-4 h-4" /> University
                </div>
                <div className="font-bold text-primary text-sm">{program.university}</div>
              </div>
            )}
          </div>

          {/* Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4">Overview</h2>
            <p className="text-foreground/75 leading-relaxed text-lg">{program.description}</p>
          </section>

          {/* Curriculum */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6" /> What's Included
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {program.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2.5 bg-card border border-border rounded-lg p-4">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80">{detail}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <section className="mb-12 bg-primary rounded-2xl p-8 text-center text-primary-foreground">
            <h3 className="text-2xl font-bold mb-2">Ready to enroll in {program.name}?</h3>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              Contact us for batch availability, fee structure, and enrollment details.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-5 h-5" /> Enroll via WhatsApp
              </a>
              <a
                href="tel:+923418576000"
                className="flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5" /> Call 03418576000
              </a>
            </div>
          </section>

          {/* Other programs */}
          {otherPrograms.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Other Programs</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherPrograms.map((other) => {
                  const OtherIcon = iconMap[other.icon] ?? Target
                  return (
                    <a
                      key={other.id}
                      href={`/programs/${other.id}`}
                      className="flex items-center gap-3 bg-card border border-border rounded-xl p-4 hover:border-primary hover:shadow-md transition-all"
                    >
                      <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                        <OtherIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-primary text-sm truncate">{other.name}</div>
                        <div className="text-xs text-foreground/60 truncate">{other.tagline}</div>
                      </div>
                    </a>
                  )
                })}
              </div>
            </section>
          )}
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
