type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  image?: { src: string; alt: string };
};

/** Shared inner-page hero band, optionally with a photo on the right. */
export default function PageHero({ eyebrow, title, subtitle, image }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden style={{
        background: 'radial-gradient(ellipse 32% 60% at 92% 0%, rgba(0,71,171,0.09), transparent 60%), radial-gradient(ellipse 26% 40% at 100% 60%, rgba(228,6,2,0.06), transparent 62%)',
      }} />
      <div className={`relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:px-10 md:py-24 ${image ? 'lg:grid-cols-[1.1fr_0.9fr]' : ''}`}>
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-4 max-w-3xl font-display text-[2.2rem] font-bold leading-[1.06] tracking-[-0.03em] text-ink sm:text-[2.7rem] md:text-[3.4rem]">
            {title}
          </h1>
          {subtitle && <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-slate md:text-[17px]">{subtitle}</p>}
        </div>
        {image && (
          <div className="relative overflow-hidden rounded-3xl border border-line shadow-[0_30px_70px_rgba(16,24,40,0.12)]">
            <img src={image.src} alt={image.alt} loading="lazy" className="h-[280px] w-full object-cover md:h-[360px]" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(130deg, rgba(0,37,52,0.35), transparent 55%)' }} />
          </div>
        )}
      </div>
    </section>
  );
}
