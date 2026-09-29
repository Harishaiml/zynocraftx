import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import HeroScene from './HeroScene';

const headlineLines = [
  ['Engineering'],
  ['Digital', 'Products'],
  ['That', 'Drive'],
  ['Progress.'],
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
};
const wordAnim = {
  hidden: { y: 30, opacity: 0, filter: 'blur(6px)' },
  show: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden">
      {/* SINGLE continuous background — black → dark navy → indigo with soft blue/purple atmospheric glow on the right. No separate left/right panels. */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 55% 75% at 76% 50%, rgba(37,99,235,0.08), transparent 65%)',
            'radial-gradient(ellipse 42% 58% at 84% 44%, rgba(124,58,237,0.06), transparent 60%)',
            'radial-gradient(ellipse 70% 50% at 70% 55%, rgba(30,64,175,0.04), transparent 70%)',
            'linear-gradient(90deg, #050505 0%, #060608 28%, #07080f 48%, #090c1c 68%, #0c1028 85%, #0e1132 100%)',
          ].join(', '),
        }}
      />

      {/* 3D canvas — FULL WIDTH so particles, bloom, and glow extend seamlessly across the entire hero. Camera offset keeps the object visually on the right. */}
      <div className="absolute inset-0 z-[1]">
        <Canvas
          camera={{ position: [-1.2, 0, 6.8], fov: 48 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <HeroScene />
            <EffectComposer>
              <Bloom
                intensity={0.38}
                luminanceThreshold={0.25}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
              <Vignette eskil={false} offset={0.3} darkness={0.6} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {/* Gradual left darkening for text readability — spread across the full width, no hard vertical edge */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(5,5,5,0.90) 0%, rgba(5,5,5,0.80) 14%, rgba(5,5,5,0.62) 28%, rgba(5,5,5,0.42) 42%, rgba(5,5,5,0.22) 56%, rgba(5,5,5,0.08) 70%, transparent 84%)',
        }}
      />
      {/* mobile bottom gradient so text is readable over canvas */}
      <div
        className="absolute inset-x-0 bottom-0 top-1/2 z-10 pointer-events-none md:hidden"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(5,5,5,0.88) 45%)',
        }}
      />

      {/* content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 flex min-h-screen items-center pt-20 pb-16 md:pt-0"
      >
        <div className="w-full max-w-2xl px-6 md:px-12 lg:px-20">
          {/* eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
              Software Engineering • AI • Digital Products
            </span>
          </motion.div>

          {/* headline line-by-line */}
          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="hero-title text-gradient"
          >
            {headlineLines.map((line, li) => (
              <span key={li} className="block">
                {line.map((word, wi) => (
                  <motion.span key={wi} variants={wordAnim} className="mr-[0.25em] inline-block">
                    {word}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[560px] text-[16px] md:text-[19px] leading-[1.6]"
            style={{ color: 'rgba(255,255,255,0.72)' }}
          >
            We design and engineer software, AI systems, and digital products that
            solve real operational challenges and create measurable value.
          </motion.p>

          {/* buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <MagneticButton primary>
              Start a Project
              <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
            </MagneticButton>
            <MagneticButton>
              <Play className="mr-2 h-3.5 w-3.5" strokeWidth={1.5} />
              View Our Work
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
          Scroll
        </span>
        <div className="h-10 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}

function MagneticButton({
  children,
  primary = false,
}: {
  children: React.ReactNode;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
  };

  const handleLeave = () => {
    const btn = ref.current;
    if (btn) btn.style.transform = 'translate(0,0) scale(1)';
  };

  return (
    <a
      ref={ref}
      href={primary ? '#contact' : '#work'}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative flex items-center rounded-full px-7 py-3 md:px-8 md:py-3.5 text-[15px] font-medium transition-shadow duration-300 will-change-transform ${
        primary ? 'text-white' : 'text-white/80'
      }`}
      style={{
        background: primary
          ? 'linear-gradient(135deg, rgba(37,99,235,0.9), rgba(124,58,237,0.9))'
          : 'rgba(255,255,255,0.04)',
        border: primary ? 'none' : '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        boxShadow: primary
          ? '0 8px 32px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.2)'
          : '0 0 0 rgba(0,0,0,0)',
      }}
    >
      {primary && (
        <span
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: '0 8px 40px rgba(37,99,235,0.6)' }}
        />
      )}
      <span className="relative flex items-center">{children}</span>
    </a>
  );
}
