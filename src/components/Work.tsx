import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    name: 'AI Business Management Platform',
    category: 'AI • Web • Automation',
    desc: 'An intelligent platform designed to streamline operations, connect workflows, and support faster decision-making.',
    image: 'https://images.pexels.com/photos/27141316/pexels-photo-27141316.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export default function Work() {
  return (
    <section id="work" className="relative z-10 py-32 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-2xl"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Selected Work
          </span>
          <h2 className="section-title mt-4 text-4xl md:text-5xl text-gradient">
            Technology Applied to Real Problems.
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <motion.a
              key={p.name}
              href="#"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-white/8"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover opacity-50 transition-all duration-700 group-hover:scale-105 group-hover:opacity-70"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(5,5,5,0.95), rgba(5,5,5,0.3) 50%, transparent)',
                  }}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {p.category}
                </span>
                <h3 className="mt-3 text-xl font-medium text-white md:text-2xl">{p.name}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/50">
                  {p.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors group-hover:text-white">
                  View Project
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
                </span>
              </div>
            </motion.a>
          ))}

          {/* placeholder card inviting inquiry */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.01] p-12 text-center"
          >
            <p className="text-sm text-white/40">Your project could be here.</p>
            <a
              href="#contact"
              className="mt-4 text-sm font-medium text-white underline-offset-4 hover:underline"
            >
              Start a Project
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
