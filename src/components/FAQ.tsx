import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: 'What does Zynocraftx Technology specialize in?',
    a: 'Zynocraftx Technology specializes in software engineering, digital product development, AI systems, automation, mobile applications, and custom software platforms.',
  },
  {
    q: 'Can you develop software around our workflow?',
    a: 'Yes. We engineer custom systems around your processes, requirements, users, and operational goals.',
  },
  {
    q: 'What types of AI systems do you develop?',
    a: 'We develop AI assistants, intelligent automation, computer vision systems, predictive applications, and generative AI products.',
  },
  {
    q: 'Can you work with an existing application?',
    a: 'Yes. We can modernize, extend, integrate, optimize, or redesign existing applications while preserving valuable functionality.',
  },
  {
    q: 'Do you support products after launch?',
    a: 'Yes. We can provide ongoing maintenance, monitoring, improvements, integrations, and technical support.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative z-10 py-32 px-6 md:px-12">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="section-title mb-12 text-center text-4xl md:text-5xl text-gradient"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="overflow-hidden rounded-xl border border-white/8 bg-white/[0.02]"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-white/[0.01]"
              >
                <span className="text-[16px] font-medium text-white md:text-[18px]">{f.q}</span>
                {open === i ? (
                  <ChevronUp className="h-4 w-4 shrink-0 text-accent transition-transform duration-300" strokeWidth={1.5} />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-white/40 transition-transform duration-300" strokeWidth={1.5} />
                )}
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="px-6 pb-5 text-[15px] leading-relaxed text-white/55 md:text-[16px]">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
