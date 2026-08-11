import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Boxes,
  Globe,
  Layers,
  Smartphone,
  BrainCircuit,
  Workflow,
  ArrowUpRight,
} from 'lucide-react';

type Capability = {
  icon: typeof Boxes;
  no: string;
  title: string;
  desc: string;
};

const capabilities: Capability[] = [
  { icon: Boxes, no: '01', title: 'Product Engineering', desc: 'Digital products engineered from concept through production.' },
  { icon: Globe, no: '02', title: 'Web Engineering', desc: 'High-performance web experiences designed for usability, speed, and scale.' },
  { icon: Layers, no: '03', title: 'Software Systems', desc: 'Custom software engineered around complex workflows and operational requirements.' },
  { icon: Smartphone, no: '04', title: 'Mobile Engineering', desc: 'Reliable mobile applications designed for real-world users and business needs.' },
  { icon: BrainCircuit, no: '05', title: 'Applied AI', desc: 'Machine learning, computer vision, and generative AI applied to practical problems.' },
  { icon: Workflow, no: '06', title: 'Intelligent Automation', desc: 'Automated workflows that reduce repetitive work and improve operational efficiency.' },
];

const cardVariants = {
  hidden: { y: 40, opacity: 0, filter: 'blur(8px)' },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function CapCard({ cap, index }: { cap: Capability; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 3, y: px * 3 });
  };

  const Icon = cap.icon;

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-colors duration-300 will-change-transform hover:border-white/15"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(400px circle at 50% 0%, rgba(37,99,235,0.06), transparent 70%)',
        }}
      />
      <div className="relative flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <Icon className="h-5 w-5 text-accent transition-transform duration-500 group-hover:rotate-12" strokeWidth={1.5} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">{cap.no}</span>
            <ArrowUpRight className="h-4 w-4 text-white/20 transition-all duration-300 group-hover:text-white/50" strokeWidth={1.5} />
          </div>
        </div>
      </div>
      <h3 className="relative mt-5 text-lg font-medium text-white">{cap.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-white/55">{cap.desc}</p>
    </motion.div>
  );
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative z-10 py-24 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-2xl"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Capabilities
          </span>
          <h2 className="section-title mt-4 text-gradient">
            Engineering Across Product, Software &amp; AI.
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <CapCard key={c.no} cap={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
