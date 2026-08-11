import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, PenTool, Cpu, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Search,
    no: '01',
    title: 'Discover',
    desc: 'Understand the problem, users, requirements, and desired outcome.',
  },
  {
    icon: PenTool,
    no: '02',
    title: 'Design',
    desc: 'Define the product experience, architecture, and technical direction.',
  },
  {
    icon: Cpu,
    no: '03',
    title: 'Engineer',
    desc: 'Develop, integrate, test, and refine the product.',
  },
  {
    icon: Rocket,
    no: '04',
    title: 'Launch & Evolve',
    desc: 'Deploy, monitor, improve, and support the product over time.',
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section id="process" ref={ref} className="relative z-10 py-32 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 max-w-2xl"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            How We Work
          </span>
          <h2 className="section-title mt-4 text-4xl md:text-5xl text-gradient">
            From Concept to Production.
          </h2>
        </motion.div>

        <div className="relative">
          {/* progress line */}
          <div className="absolute left-0 top-0 h-full w-px bg-white/8 md:left-1/2">
            <motion.div
              style={{ scaleY: lineScale, transformOrigin: 'top' }}
              className="h-full w-px bg-gradient-to-b from-accent via-purple to-transparent"
            />
          </div>

          <div className="space-y-20">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={s.no}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex items-center gap-8 md:gap-16 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* node */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full border border-accent bg-[#050505]">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    </div>
                  </div>

                  {/* content */}
                  <div className={`ml-10 flex-1 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className={`flex items-center gap-4 ${isLeft ? 'md:justify-end' : ''}`}>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                        <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                      </div>
                      <span className="font-mono text-sm text-white/30">{s.no}</span>
                    </div>
                    <h3 className="section-title mt-5 text-2xl text-white">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/50">{s.desc}</p>
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
