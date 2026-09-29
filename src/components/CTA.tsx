import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative z-10 py-32 px-6 md:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl glass px-8 py-20 md:px-20 md:py-28 text-center"
        >
          {/* glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37,99,235,0.15), transparent 70%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(124,58,237,0.1), transparent 70%)',
            }}
          />
          {/* animated border */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl shimmer" style={{ borderRadius: 24 }} />

          <div className="relative">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Have a product in mind?
            </span>
            <h2 className="section-title mx-auto mt-6 max-w-2xl text-4xl md:text-6xl text-gradient leading-[1.1]">
              Let&apos;s Engineer What&apos;s Next.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-white/50 leading-relaxed">
              Tell us what you&apos;re trying to achieve. We&apos;ll help shape
              the right product, technology, and path to production.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#contact"
                className="group relative flex items-center rounded-full px-8 py-4 text-sm font-medium text-white will-change-transform transition-transform duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.9), rgba(124,58,237,0.9))',
                  boxShadow: '0 8px 32px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                }}
              >
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
