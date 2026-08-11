import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="relative z-10 py-32 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              About Zynocraftx Technology
            </span>
            <h2 className="section-title mt-4 text-4xl md:text-5xl text-gradient">
              Technology Aligned With Your Ambition.
            </h2>
            <p className="mt-6 max-w-lg text-white/50 leading-relaxed">
              Zynocraftx Technology combines software engineering, product thinking, and
              applied AI to create technology that fits the way organizations
              actually operate.
            </p>
            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors"
            >
              Meet Zynocraftx Technology
              <span className="h-px w-6 bg-accent transition-all duration-300 group-hover:w-10" />
            </a>
          </motion.div>

          {/* visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/8"
          >
            <img
              src="https://images.pexels.com/photos/34803994/pexels-photo-34803994.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Engineering workspace"
              className="h-full w-full object-cover opacity-60"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(5,5,5,0.6), rgba(5,5,5,0.2) 50%, rgba(37,99,235,0.15))',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
