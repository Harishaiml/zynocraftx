import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, Boxes, Globe, Smartphone, Layers,
  BrainCircuit, Workflow, Star, Quote,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const stats = [
  ['12+', 'Products shipped'],
  ['30+', 'Systems engineered'],
  ['4.9/5', 'Client satisfaction'],
  ['100%', 'Delivery ownership'],
];

const services = [
  { icon: Boxes, no: '01', title: 'Product Engineering', desc: 'Digital products engineered from concept through production.', to: '/services#product' },
  { icon: Globe, no: '02', title: 'Web Engineering', desc: 'High-performance web experiences built for speed and scale.', to: '/services#web' },
  { icon: Smartphone, no: '03', title: 'Mobile Engineering', desc: 'Reliable mobile apps designed for real-world users.', to: '/services#mobile' },
  { icon: Layers, no: '04', title: 'Software Systems', desc: 'Custom platforms engineered around complex workflows.', to: '/services#systems' },
  { icon: BrainCircuit, no: '05', title: 'Applied AI', desc: 'ML, computer vision, and generative AI applied to real problems.', to: '/services#ai' },
  { icon: Workflow, no: '06', title: 'Intelligent Automation', desc: 'Automated workflows that remove repetitive operational work.', to: '/services#automation' },
];

const marquee = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'AWS', 'PostgreSQL', 'Supabase', 'Docker', 'Kubernetes', 'OpenAI', 'TensorFlow', 'Flutter'];

const work = [
  { title: 'Operational software', type: 'Systems designed around real work', image: 'https://images.pexels.com/photos/34803994/pexels-photo-34803994.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Team working in an engineering workspace' },
  { title: 'Intelligent platforms', type: 'AI, workflow & decision support', image: 'https://images.pexels.com/photos/27141316/pexels-photo-27141316.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Technology and data visualisation workspace' },
  { title: 'Applied AI systems', type: 'Vision, automation & generative AI', image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Artificial intelligence concept' },
];

const testimonials = [
  { quote: 'Zynocraftx turned a tangled internal process into a product our team actually enjoys using. Clear thinking, dependable delivery.', name: 'Operations Lead', role: 'Logistics platform', avatar: 'https://i.pravatar.cc/120?img=12' },
  { quote: 'They found the right place for AI in our workflow and shipped it responsibly. Measurable impact within the first quarter.', name: 'Founder', role: 'B2B SaaS', avatar: 'https://i.pravatar.cc/120?img=32' },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-fog">
        <div className="pointer-events-none absolute inset-0" aria-hidden style={{
          background: 'radial-gradient(ellipse 40% 50% at 88% 8%, rgba(0,71,171,0.10), transparent 60%), radial-gradient(ellipse 34% 42% at 96% 40%, rgba(228,6,2,0.07), transparent 62%)',
        }} />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 md:px-10 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 font-display text-[12px] font-semibold tracking-tight text-cobalt">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Software Engineering &amp; AI Studio
            </span>
            <h1 className="mt-6 font-display text-[2rem] font-bold leading-[1.06] tracking-[-0.03em] text-ink sm:text-[2.6rem] md:text-[3.6rem]">
              Build the technology your business can <span className="text-brand">grow on.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-slate md:text-[17px]">
              Zynocraftx helps companies turn complex challenges into useful software, intelligent systems, and digital products that create measurable value.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link to="/contact" className="btn btn-primary">Talk to Us <ArrowRight size={16} /></Link>
              <Link to="/services" className="btn btn-outline">Explore Services <ArrowRight size={16} /></Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-line shadow-[0_30px_70px_rgba(16,24,40,0.14)]">
              <img
                src="https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Engineer building software at a multi-screen workstation"
                className="h-[360px] w-full object-cover sm:h-[440px]"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(0,37,52,0.15), rgba(0,37,52,0.72) 88%)' }} />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70">Engineering in practice</p>
                <p className="mt-2 max-w-xs font-display text-[19px] font-semibold leading-snug text-white">Technology is only useful when it works in the real world.</p>
              </div>
            </div>
            <div className="absolute -top-5 -right-4 hidden rounded-2xl border border-line bg-white px-5 py-4 shadow-[0_20px_40px_rgba(16,24,40,0.18)] lg:block">
              <div className="flex items-center gap-1 text-brand">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill="currentColor" />)}</div>
              <p className="mt-1.5 font-display text-[20px] font-bold text-ink">4.9/5</p>
              <p className="text-[12px] text-muted">Client satisfaction</p>
            </div>
            <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-line bg-white px-5 py-4 shadow-[0_20px_40px_rgba(16,24,40,0.18)] sm:block">
              <p className="font-display text-[22px] font-bold text-cobalt">12+</p>
              <p className="text-[12px] text-muted">Products shipped</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-6 py-10 md:grid-cols-4 md:px-10">
          {stats.map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="font-display text-[32px] font-bold tracking-tight text-ink md:text-[38px]">{value}</p>
              <p className="mt-1 text-[13px] text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust marquee */}
      <section className="bg-fog py-10">
        <p className="mb-6 text-center font-display text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">
          Built with a modern, production-grade stack
        </p>
        <div className="marquee">
          <div className="marquee-track gap-3">
            {[...marquee, ...marquee].map((t, i) => (
              <span key={i} className="rounded-full border border-line bg-white px-5 py-2 font-display text-[14px] font-medium text-slate">{t}</span>
            ))}
          </div>
        </div>
      </section>
      {/* Services overview */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">What we do</span>
            <h2 className="mt-4 font-display text-[2.1rem] font-bold leading-tight tracking-[-0.03em] text-ink md:text-[3rem]">
              One partner across product, software &amp; AI.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.no} delay={i * 0.05}>
                  <Link to={s.to} className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cobalt/40 hover:shadow-[0_18px_40px_rgba(16,24,40,0.08)]">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-[0_8px_20px_rgba(228,6,2,0.28)]">
                        <Icon size={21} strokeWidth={1.8} />
                      </div>
                      <span className="font-display text-[12px] font-semibold text-muted">{s.no}</span>
                    </div>
                    <h3 className="mt-5 font-display text-[19px] font-semibold tracking-tight text-ink">{s.title}</h3>
                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted">{s.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-display text-[13.5px] font-semibold text-cobalt">
                      Learn more <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="bg-mist py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Selected work</span>
            <h2 className="mt-4 font-display text-[2.1rem] font-bold leading-tight tracking-[-0.03em] text-ink md:text-[3rem]">
              Technology applied to real problems.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {work.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.07}>
                <article className="group overflow-hidden rounded-2xl border border-line bg-white">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={w.image} alt={w.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,37,52,0.55), transparent 60%)' }} />
                  </div>
                  <div className="p-6">
                    <p className="font-display text-[11.5px] font-semibold uppercase tracking-[0.16em] text-brand">{w.type}</p>
                    <h3 className="mt-2 font-display text-[19px] font-semibold tracking-tight text-ink">{w.title}</h3>
                    <Link to="/contact" className="link-arrow mt-4">Discuss a similar project <ArrowUpRight size={15} /></Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach split */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Our practice</span>
            <h2 className="mt-4 font-display text-[2rem] font-bold leading-tight tracking-[-0.03em] text-ink md:text-[2.7rem]">
              Strategy, design, and engineering in the same room.
            </h2>
            <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-slate">
              Better products happen when business context isn't handed off between disconnected specialists. We work through the whole picture together — from the first question to what comes next.
            </p>
            <Link to="/about" className="link-arrow mt-7">How we work <ArrowRight size={15} /></Link>
          </Reveal>
          <div className="grid gap-4">
            {[
              ['Outcome driven', 'Technology should solve a meaningful problem, not just add another feature.'],
              ['Built to evolve', 'Architecture designed to support change, growth, and new requirements.'],
              ['Transparent delivery', 'Clear communication, visible progress, and practical technical decisions.'],
            ].map(([title, desc], i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="rounded-2xl border border-line bg-white p-6">
                  <h3 className="font-display text-[17px] font-semibold text-ink">{title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-fog py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="flex items-center gap-2">
            <div className="flex text-brand">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
            <span className="font-display text-[13px] font-semibold text-ink">Trusted by the teams we build with</span>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-8">
                  <Quote size={26} className="text-cobalt/40" />
                  <blockquote className="mt-4 flex-1 text-[16px] leading-relaxed text-slate">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <img src={t.avatar} alt="" loading="lazy" className="h-11 w-11 rounded-full object-cover ring-2 ring-line" />
                    <div>
                      <p className="font-display text-[14px] font-semibold text-ink">{t.name}</p>
                      <p className="text-[13px] text-muted">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-fog px-6 pb-24 md:px-10">
        <Reveal className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cobalt to-cobalt-dark px-8 py-16 text-center md:px-16 md:py-20">
            <div className="pointer-events-none absolute inset-0" aria-hidden style={{ background: 'radial-gradient(ellipse 50% 60% at 80% 0%, rgba(228,6,2,0.28), transparent 60%)' }} />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-[2rem] font-bold leading-tight tracking-[-0.03em] text-white md:text-[3rem]">
                Let's engineer what's next.
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-[15.5px] leading-relaxed text-white/75">
                Tell us what you're trying to achieve. We'll help shape the right product, technology, and path to production.
              </p>
              <Link to="/contact" className="btn mt-9 bg-brand text-white hover:bg-brand-dark">Start a Project <ArrowRight size={16} /></Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
