import { Link } from 'react-router-dom';
import { ArrowRight, Target, Sparkles, GitBranch, Layers, Eye } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';

const principles = [
  { icon: Target, title: 'Outcome Driven', desc: 'Technology should solve a meaningful problem, not simply add another feature.' },
  { icon: Sparkles, title: 'AI Where It Matters', desc: 'We apply AI where it can improve decisions, automation, or experience.' },
  { icon: GitBranch, title: 'Built to Evolve', desc: 'Architecture designed to support change, growth, and new requirements.' },
  { icon: Layers, title: 'End-to-End Engineering', desc: 'From product direction and design to deployment and improvement.' },
  { icon: Eye, title: 'Transparent Delivery', desc: 'Clear communication, visible progress, and practical decisions.' },
];

const stack: { label: string; items: { name: string; slug?: string }[] }[] = [
  { label: 'Frontend', items: [{ name: 'React', slug: 'react' }, { name: 'Next.js', slug: 'nextdotjs' }, { name: 'TypeScript', slug: 'typescript' }, { name: 'Tailwind CSS', slug: 'tailwindcss' }] },
  { label: 'Backend', items: [{ name: 'Node.js', slug: 'nodedotjs' }, { name: 'Python', slug: 'python' }, { name: 'FastAPI', slug: 'fastapi' }, { name: 'Java', slug: 'openjdk' }, { name: 'Spring Boot', slug: 'springboot' }] },
  { label: 'Mobile', items: [{ name: 'Flutter', slug: 'flutter' }, { name: 'React Native', slug: 'react' }] },
  { label: 'Data', items: [{ name: 'PostgreSQL', slug: 'postgresql' }, { name: 'MySQL', slug: 'mysql' }, { name: 'MongoDB', slug: 'mongodb' }, { name: 'Firebase', slug: 'firebase' }, { name: 'Redis', slug: 'redis' }] },
  { label: 'Cloud', items: [{ name: 'AWS' }, { name: 'Google Cloud', slug: 'googlecloud' }, { name: 'Docker', slug: 'docker' }, { name: 'Kubernetes', slug: 'kubernetes' }, { name: 'Vercel', slug: 'vercel' }, { name: 'Cloudflare', slug: 'cloudflare' }] },
  { label: 'AI', items: [{ name: 'Claude', slug: 'claude' }, { name: 'Gemini', slug: 'googlegemini' }, { name: 'TensorFlow', slug: 'tensorflow' }, { name: 'PyTorch', slug: 'pytorch' }, { name: 'LangChain', slug: 'langchain' }, { name: 'Hugging Face', slug: 'huggingface' }, { name: 'OpenCV', slug: 'opencv' }] },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Zynocraftx"
        title={<>Technology aligned with your ambition.</>}
        subtitle="Zynocraftx Technology combines software engineering, product thinking, and applied AI to create technology that fits the way organizations actually operate."
        image={{ src: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Team collaborating in a modern workspace' }}
      />

      {/* Stat strip */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-6 py-10 md:grid-cols-4 md:px-10">
          {[['12+', 'Products shipped'], ['30+', 'Systems engineered'], ['4.9/5', 'Client satisfaction'], ['100%', 'Delivery ownership']].map(([v, l]) => (
            <div key={l} className="text-center">
              <p className="font-display text-[32px] font-bold tracking-tight text-ink md:text-[38px]">{v}</p>
              <p className="mt-1 text-[13px] text-muted">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-fog py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Our purpose</span>
            <h2 className="mt-4 font-display text-[2rem] font-bold leading-tight tracking-[-0.03em] text-ink md:text-[2.7rem]">
              Technology should make the next decision easier.
            </h2>
            <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-slate">
              We focus on the details that make a product genuinely valuable: understanding real work, designing for people, and building systems ready for change. The strongest products don't simply add features — they remove friction from the work that matters.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-line shadow-[0_30px_70px_rgba(16,24,40,0.12)]">
                <img
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Engineers reviewing work together"
                  loading="lazy"
                  className="h-[340px] w-full object-cover md:h-[420px]"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(150deg, rgba(0,37,52,0.10), rgba(0,37,52,0.55) 90%)' }} />
              </div>
              <div className="absolute -bottom-5 -left-4 hidden rounded-2xl bg-gradient-to-br from-cobalt to-cobalt-dark px-6 py-5 text-white shadow-[0_20px_40px_rgba(0,71,171,0.28)] sm:block">
                <p className="font-display text-[28px] font-bold leading-none">30+</p>
                <p className="mt-1.5 text-[12.5px] text-white/75">Systems engineered</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      {/* Principles */}
      <section className="border-y border-line bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Why Zynocraftx</span>
            <h2 className="mt-4 font-display text-[2rem] font-bold leading-tight tracking-[-0.03em] text-ink md:text-[2.7rem]">Engineering with purpose.</h2>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 0.06}>
                  <div className="h-full rounded-2xl border border-line bg-fog p-6 transition-colors hover:border-cobalt/40">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cobalt to-cobalt-dark text-white shadow-[0_8px_18px_rgba(0,71,171,0.24)]">
                      <Icon size={19} strokeWidth={1.8} />
                    </div>
                    <h3 className="mt-5 font-display text-[15px] font-semibold text-ink">{p.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">{p.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="bg-fog py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Technology</span>
            <h2 className="mt-4 font-display text-[2rem] font-bold leading-tight tracking-[-0.03em] text-ink md:text-[2.7rem]">The stack that powers the product.</h2>
          </Reveal>
          <div className="mt-12 space-y-6">
            {stack.map((group, i) => (
              <Reveal key={group.label} delay={i * 0.04}>
                <div className="flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center">
                  <div className="w-full shrink-0 md:w-48">
                    <span className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">{group.label}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item.name} className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-1.5 text-[13.5px] font-medium text-slate transition-all hover:border-cobalt hover:text-cobalt hover:shadow-[0_4px_12px_rgba(16,24,40,0.06)]">
                        {item.slug ? (
                          <img src={`https://cdn.simpleicons.org/${item.slug}`} alt="" loading="lazy" className="h-4 w-4 object-contain" />
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-cobalt" />
                        )}
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-fog px-6 pb-24 md:px-10">
        <Reveal className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cobalt to-cobalt-dark px-8 py-16 text-center md:px-16 md:py-20">
            <div className="pointer-events-none absolute inset-0" aria-hidden style={{ background: 'radial-gradient(ellipse 50% 60% at 20% 0%, rgba(228,6,2,0.28), transparent 60%)' }} />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-[2rem] font-bold leading-tight tracking-[-0.03em] text-white md:text-[3rem]">Let's build something worth keeping.</h2>
              <p className="mx-auto mt-5 max-w-lg text-[15.5px] leading-relaxed text-white/75">Whether you have a defined brief or an early idea, we'd love to hear what you're solving.</p>
              <Link to="/contact" className="btn mt-9 bg-brand text-white hover:bg-brand-dark">Talk to Us <ArrowRight size={16} /></Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
