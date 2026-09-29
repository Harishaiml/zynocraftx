import { motion } from 'framer-motion';

const groups = [
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Python', 'FastAPI', 'Java', 'Spring Boot'],
  },
  {
    label: 'Mobile',
    items: ['Flutter', 'React Native'],
  },
  {
    label: 'Data',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Supabase', 'Redis'],
  },
  {
    label: 'Cloud & Infrastructure',
    items: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Cloudflare', 'Vercel'],
  },
  {
    label: 'AI',
    items: ['OpenAI', 'Gemini', 'Claude', 'TensorFlow', 'PyTorch', 'LangChain', 'LlamaIndex', 'Hugging Face', 'OpenCV', 'YOLO', 'Whisper'],
  },
  {
    label: 'Engineering',
    items: ['Git', 'GitHub', 'Postman', 'Figma'],
  },
];

export default function Technology() {
  return (
    <section id="technology" className="relative z-10 py-32 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-2xl"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Technology
          </span>
          <h2 className="section-title mt-4 text-4xl md:text-5xl text-gradient">
            Technology That Powers the Product.
          </h2>
        </motion.div>

        <div className="space-y-8">
          {groups.map((g, gi) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: gi * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 border-t border-white/8 pt-6 md:flex-row md:items-center"
            >
              <div className="w-full md:w-48 shrink-0">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                  {g.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-1.5 text-sm text-white/60 transition-colors duration-200 hover:border-white/15 hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
