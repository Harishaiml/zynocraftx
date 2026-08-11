import { Hexagon } from 'lucide-react';

const navLinks = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Technology', href: '#technology' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8 px-6 md:px-12 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row">
          {/* brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center">
                <Hexagon className="h-9 w-9 text-accent" strokeWidth={1} />
                <span className="brand-logo absolute text-sm font-bold text-white">Z</span>
              </div>
              <span className="brand-logo text-lg font-semibold tracking-tight">
                Zyno<span className="text-accent-gradient">CraftX</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm text-white/40">
              Software Engineering • AI • Digital Products
            </p>
          </div>

          {/* nav */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* cta */}
          <a
            href="#contact"
            className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          >
            Start a Project
          </a>
        </div>

        <div className="mt-12 border-t border-white/8 pt-8">
          <p className="font-mono text-xs text-white/30">
            © 2026 Zynocraftx. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
