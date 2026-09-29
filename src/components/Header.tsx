import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';

const services = [
  { label: 'Product Engineering', to: '/services#product' },
  { label: 'Web Engineering', to: '/services#web' },
  { label: 'Mobile Engineering', to: '/services#mobile' },
  { label: 'Software Systems', to: '/services#systems' },
  { label: 'Applied AI', to: '/services#ai' },
  { label: 'Intelligent Automation', to: '/services#automation' },
];

const navClass = ({ isActive }: { isActive: boolean }) =>
  `font-display text-[14px] font-medium tracking-tight transition-colors ${
    isActive ? 'text-brand' : 'text-ink hover:text-cobalt'
  }`;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [location]);

  // Close the desktop dropdown on outside click or Escape (tap-friendly)
  useEffect(() => {
    if (!servicesOpen) return;
    const onDown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setServicesOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [servicesOpen]);

  const servicesActive = location.pathname === '/services';

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-line bg-white/90 backdrop-blur-xl' : 'border-b border-transparent bg-fog'
      }`}
    >
      <nav className="mx-auto flex h-[68px] max-w-7xl items-center gap-6 px-5 sm:px-6 md:h-[74px] md:px-10">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <img src="/assets/images/ChatGPT_Image_Aug_10,_2026,_02_27_52_PM.png" alt="Zynocraftx Technology" className="h-8 w-8 object-contain md:h-9 md:w-9" />
          <span className="font-display text-[15px] font-bold tracking-tight text-ink sm:text-[17px]">
            Zynocraftx<span className="hidden text-muted font-medium sm:inline"> Technology</span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-8 lg:flex">
          <NavLink to="/" className={navClass} end>Home</NavLink>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
              className={`inline-flex items-center gap-1 font-display text-[14px] font-medium tracking-tight transition-colors ${servicesActive ? 'text-brand' : 'text-ink hover:text-cobalt'}`}
            >
              Services <ChevronDown size={14} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {servicesOpen && (
              <div role="menu" className="absolute left-1/2 top-full w-[300px] -translate-x-1/2 pt-4">
                <div className="rounded-2xl border border-line bg-white p-3 shadow-[0_24px_60px_rgba(16,24,40,0.14)]">
                  <Link to="/services" className="mb-1 flex items-center justify-between rounded-xl bg-mist px-4 py-2.5 font-display text-[13px] font-semibold text-cobalt">
                    All Services <ArrowRight size={14} />
                  </Link>
                  {services.map((s) => (
                    <Link key={s.label} to={s.to} className="flex items-center justify-between rounded-xl px-4 py-2.5 text-[14px] font-medium text-slate transition-colors hover:bg-mist hover:text-cobalt">
                      {s.label}
                      <ArrowRight size={14} className="text-muted" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <NavLink to="/about" className={navClass}>About</NavLink>
          <NavLink to="/contact" className={navClass}>Contact</NavLink>
          <Link to="/contact" className="btn btn-primary">Talk to Us <ArrowRight size={15} /></Link>
        </div>

        <button className="ml-auto text-ink lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="max-h-[calc(100vh-68px)] overflow-y-auto border-t border-line bg-white px-5 py-5 sm:px-6 lg:hidden">
          <div className="flex flex-col gap-1">
            <NavLink to="/" end className="py-2.5 font-display text-[15px] font-medium text-ink">Home</NavLink>
            <NavLink to="/services" className="py-2.5 font-display text-[15px] font-medium text-ink">Services</NavLink>
            <div className="mb-1 flex flex-col gap-1 border-l-2 border-line pl-4">
              {services.map((s) => (
                <Link key={s.label} to={s.to} className="py-1.5 text-[13.5px] text-muted">{s.label}</Link>
              ))}
            </div>
            <NavLink to="/about" className="py-2.5 font-display text-[15px] font-medium text-ink">About</NavLink>
            <NavLink to="/contact" className="py-2.5 font-display text-[15px] font-medium text-ink">Contact</NavLink>
            <Link to="/contact" className="btn btn-primary mt-3 justify-center">Talk to Us <ArrowRight size={15} /></Link>
          </div>
        </div>
      )}
    </header>
  );
}
