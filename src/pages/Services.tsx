import { Link } from 'react-router-dom';
import { ArrowRight, Boxes, Globe, Smartphone, Layers, BrainCircuit, Workflow } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';

const capabilities = [
  { id: 'product', icon: Boxes, title: 'Product Engineering', desc: 'We take validated ideas from concept to launch-ready digital products — shaping scope, experience, architecture, and delivery into one focused plan.', points: ['Product strategy & scoping', 'UX and interface design', 'Full-stack development', 'Launch & iteration'] },
  { id: 'web', icon: Globe, title: 'Web Engineering', desc: 'High-performance web experiences and platforms engineered for usability, speed, and scale across every device.', points: ['Marketing & product sites', 'Web applications & dashboards', 'Performance & SEO', 'Design systems'] },
  { id: 'mobile', icon: Smartphone, title: 'Mobile Engineering', desc: 'Reliable, native-feeling mobile applications designed around real users and real business needs.', points: ['iOS & Android', 'React Native & Flutter', 'Offline-first patterns', 'App store delivery'] },
  { id: 'systems', icon: Layers, title: 'Software Systems', desc: 'Custom software engineered around complex workflows and operational requirements — built to fit how your team actually works.', points: ['Operational platforms', 'Integrations & APIs', 'Data modeling', 'Reliability & observability'] },
  { id: 'ai', icon: BrainCircuit, title: 'Applied AI', desc: 'Machine learning, computer vision, and generative AI applied to practical problems — governed, useful, and measurable.', points: ['AI assistants & agents', 'Computer vision', 'Predictive models', 'LLM & RAG systems'] },
  { id: 'automation', icon: Workflow, title: 'Intelligent Automation', desc: 'Connected systems and automated workflows that remove repetitive work and unblock teams.', points: ['Workflow automation', 'System integration', 'Document & data processing', 'Human-in-the-loop design'] },
];

const process = [
  ['01', 'Discover', 'Understand the problem, users, requirements, and desired outcome.'],
  ['02', 'Design', 'Define the product experience, architecture, and technical direction.'],
  ['03', 'Engineer', 'Develop, integrate, test, and refine in small, visible releases.'],
  ['04', 'Launch & Evolve', 'Deploy, monitor, improve, and support the product over time.'],
];

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>Engineering across product, software &amp; AI.</>}
        subtitle="We bring product thinking and serious engineering together, so useful ideas become dependable products. Choose the capability closest to what you need."
        image={{ src: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Engineering team collaborating on a project' }}
      />
      {/* Capabilities */}
      <section className="bg-fog py-20 md:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 md:px-10">
          {capabilities.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.id} delay={(i % 2) * 0.05}>
                <article id={c.id} className="scroll-mt-28 rounded-3xl border border-line bg-white p-8 md:p-10">
                  <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${i % 2 === 0 ? 'bg-gradient-to-br from-brand to-brand-dark shadow-[0_8px_20px_rgba(228,6,2,0.28)]' : 'bg-gradient-to-br from-cobalt to-cobalt-dark shadow-[0_8px_20px_rgba(0,71,171,0.26)]'}`}>
                          <Icon size={22} strokeWidth={1.8} />
                        </div>
                        <span className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">
                          0{i + 1}
                        </span>
                      </div>
                      <h2 className="mt-5 font-display text-[1.7rem] font-bold tracking-[-0.02em] text-ink md:text-[2.1rem]">{c.title}</h2>
                      <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate">{c.desc}</p>
                    </div>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {c.points.map((p) => (
                        <li key={p} className="flex items-center gap-2.5 rounded-xl border border-line bg-mist px-4 py-3 text-[14px] font-medium text-slate">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-line bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">How we work</span>
            <h2 className="mt-4 font-display text-[2rem] font-bold leading-tight tracking-[-0.03em] text-ink md:text-[2.7rem]">From concept to production.</h2>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-4">
            {process.map(([no, title, desc], i) => (
              <Reveal key={no} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-fog p-6">
                  <span className="font-display text-[13px] font-bold text-cobalt">{no}</span>
                  <h3 className="mt-4 font-display text-[18px] font-semibold text-ink">{title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-fog px-6 py-24 md:px-10">
        <Reveal className="mx-auto flex max-w-7xl flex-col items-center gap-6 rounded-3xl border border-line bg-white px-8 py-16 text-center md:py-20">
          <h2 className="max-w-2xl font-display text-[1.9rem] font-bold leading-tight tracking-[-0.03em] text-ink md:text-[2.6rem]">
            Not sure which service fits? Start with the problem.
          </h2>
          <p className="max-w-lg text-[15.5px] leading-relaxed text-slate">You don't need a perfect brief — just the challenge in front of you. We'll suggest a useful first step.</p>
          <Link to="/contact" className="btn btn-primary">Talk to Us <ArrowRight size={16} /></Link>
        </Reveal>
      </section>
    </>
  );
}
