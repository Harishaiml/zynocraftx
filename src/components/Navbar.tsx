import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Technology', href: '#technology' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(5,5,5,0.7)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12 py-4">
          {/* logo */}
          <a href="#" className="flex min-w-0 shrink items-center gap-2.5">
            <img
              src="/assets/images/ChatGPT_Image_Aug_10,_2026,_02_27_52_PM.png"
              alt="Zynocraftx Technology logo"
              className="h-9 w-9 shrink-0 object-contain md:h-10 md:w-10"
            />
            <span className="brand-logo whitespace-nowrap text-[16px] font-semibold tracking-tight sm:text-[18px] lg:text-[20px]">
              Zynocraftx Technology
            </span>
          </a>

          {/* desktop links */}
          <div className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="group relative font-mono text-[13px] uppercase tracking-[0.15em] text-white/55 transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[13px] font-medium uppercase tracking-[0.12em] text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10"
            >
              Start a Project
            </a>
          </div>

          {/* mobile right side */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href="#contact"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-medium text-white"
            >
              Start a Project
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="text-white/70"
              aria-label="Menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 glass mx-4 rounded-2xl p-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-sm uppercase tracking-wider text-white/70"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
