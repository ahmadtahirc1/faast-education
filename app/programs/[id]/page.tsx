import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  Moon, Target, Cpu, Heart, Code, FileText, GraduationCap, Stethoscope,
  Clock, Users, BookOpen, CheckCircle, Landmark, ChevronRight, Phone, MessageCircle, ArrowRight,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { CourseBannerImage } from '@/components/course-banner-image'
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

  if (!program) return { title: 'Course Not Found — FAAST Education' }

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

  const quickFacts = [
    { icon: Clock, label: 'Duration', value: program.duration },
    { icon: Clock, label: 'Timing', value: program.timing },
    { icon: Users, label: 'Level', value: program.level },
    ...(program.university ? [{ icon: Landmark, label: 'University', value: program.university }] : []),
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-28 sm:pt-[156px]">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-sm text-foreground/60">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <ChevronRight className="w-3.5 h-3.5" />
            <a href="/programs" className="hover:text-primary transition-colors">Courses</a>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">{program.name}</span>
          </div>
        </div>

        {/* Title band */}
        <div className={`relative bg-primary text-primary-foreground overflow-hidden ${program.image ? 'min-h-[360px] sm:min-h-[440px] flex items-center' : ''}`}>
          {program.image && (
            <div className="absolute inset-0">
              <CourseBannerImage src={program.image} alt={program.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
          )}
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 bg-white/20 backdrop-blur-sm">
                <Icon className="w-7 h-7 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" />
              </div>
              {program.badge && (
                <span className={`${program.badgeColor ?? 'bg-accent'} text-white text-xs font-bold px-2.5 py-1`}>
                  {program.badge}
                </span>
              )}
            </div>
            <h1 className="text-h1 font-bold mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">{program.name}</h1>
            <p className="text-lg text-primary-foreground/85 max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">{program.tagline}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Quick facts */}
          <div className="grid border-y-2 border-primary/15 sm:grid-cols-2 lg:grid-cols-4">
            {quickFacts.map((fact) => {
              const FactIcon = fact.icon
              return (
                <div
                  key={fact.label}
                  className="border-b-2 border-primary/15 py-5 pr-4 sm:border-b-0 lg:border-l-2 first:lg:border-l-0 lg:pl-6"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground/50 mb-1.5">
                    <FactIcon className="w-4 h-4" /> {fact.label}
                  </div>
                  <div className="font-bold text-primary">{fact.value}</div>
                </div>
              )
            })}
          </div>

          {/* Overview */}
          <section className="mt-14">
            <h2 className="text-h2 font-bold text-primary mb-4">Overview</h2>
            <p className="text-foreground/75 leading-relaxed text-lg">{program.description}</p>
          </section>

          {/* Curriculum */}
          <section className="mt-14">
            <h2 className="text-h2 font-bold text-primary mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6" /> What&apos;s Included
            </h2>
            <ul className="grid border-t-2 border-primary/15 sm:grid-cols-2">
              {program.details.map((detail, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 border-b-2 border-primary/15 py-4 pr-4 [&:nth-child(odd)]:sm:pr-8 [&:nth-child(even)]:sm:pl-8"
                >
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80">{detail}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Batches Offered */}
          {program.subCourses && program.subCourses.length > 0 && (
            <section className="mt-14">
              <h2 className="text-h2 font-bold text-primary mb-6 flex items-center gap-2">
                <Users className="w-6 h-6" /> Batches Offered
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {program.subCourses.map((sub, i) => (
                  <div key={i} className="border-l-2 border-accent pl-4">
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <h3 className="font-bold text-primary">{sub.name}</h3>
                      <span className="text-xs text-foreground/60 flex-shrink-0">{sub.duration}</span>
                    </div>
                    <p className="text-sm text-foreground/75 leading-relaxed">{sub.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="mt-14 bg-brand-navy p-10 text-center text-brand-navy-foreground sm:p-14">
            <h3 className="text-h2 font-bold mb-2">Ready to enroll in {program.name}?</h3>
            <p className="text-brand-navy-foreground/80 mb-8 max-w-xl mx-auto">
              Contact us for batch availability, fee structure, and enrollment details.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 font-bold hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-5 h-5" /> Apply Now
              </a>
              <a
                href="tel:+923418576000"
                className="flex items-center gap-2 border-2 border-brand-navy-foreground text-brand-navy-foreground px-6 py-3 font-bold hover:bg-brand-navy-foreground/10 transition-colors"
              >
                <Phone className="w-5 h-5" /> Call 03418576000
              </a>
            </div>
          </section>

          {/* Other programs */}
          {otherPrograms.length > 0 && (
            <section className="mt-14">
              <h2 className="text-h2 font-bold text-primary mb-6">Other Courses</h2>
              <div className="border-t-2 border-primary/15">
                {otherPrograms.map((other, i) => {
                  const OtherIcon = iconMap[other.icon] ?? Target
                  return (
                    <a
                      key={other.id}
                      href={`/programs/${other.id}`}
                      className="group flex items-center gap-4 border-b-2 border-primary/15 py-4 transition-colors hover:border-accent-ink"
                    >
                      <span className="text-sm font-bold text-accent-ink">{String(i + 1).padStart(2, '0')}</span>
                      <OtherIcon className="h-5 w-5 flex-shrink-0 text-primary" />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-primary text-sm truncate">{other.name}</div>
                        <div className="text-xs text-foreground/60 truncate">{other.tagline}</div>
                      </div>
                      <ArrowRight className="h-4 w-4 flex-shrink-0 text-primary/40 transition-transform group-hover:translate-x-1 group-hover:text-accent-ink" />
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
