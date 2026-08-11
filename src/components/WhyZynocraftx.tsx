import { motion } from 'framer-motion';
import { Target, Sparkles, GitBranch, Layers, Eye } from 'lucide-react';

const principles = [
  { icon: Target, title: 'Outcome Driven', desc: 'Technology should solve a meaningful problem, not simply add another feature.' },
  { icon: Sparkles, title: 'AI Where It Matters', desc: 'We apply AI where it can improve decisions, automation, or user experience.' },
  { icon: GitBranch, title: 'Built to Evolve', desc: 'Architecture is designed to support change, growth, and new requirements.' },
  { icon: Layers, title: 'End-to-End Engineering', desc: 'From product direction and design to deployment and continued improvement.' },
  { icon: Eye, title: 'Transparent Delivery', desc: 'Clear communication, visible progress, and practical technical decisions.' },
];

export default function WhyZynocraftx() {
  return (
    <section className="relative z-10 py-32 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-2xl"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Why Zynocraftx Technology
          </span>
          <h2 className="section-title mt-4 text-4xl md:text-5xl text-gradient">
            Engineering With Purpose.
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/15"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Icon className="h-4.5 w-4.5 text-accent transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-sm font-medium text-white">{p.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/45">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
