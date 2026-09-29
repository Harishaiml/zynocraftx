import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';

const columns = [
  {
    title: 'Services',
    links: [
      ['Product Engineering', '/services#product'],
      ['Web Engineering', '/services#web'],
      ['Software Systems', '/services#systems'],
      ['Applied AI', '/services#ai'],
      ['Intelligent Automation', '/services#automation'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['Home', '/'],
      ['Services', '/services'],
      ['About', '/about'],
      ['Contact', '/contact'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:px-10">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/assets/images/ChatGPT_Image_Aug_10,_2026,_02_27_52_PM.png" alt="Zynocraftx Technology" className="h-9 w-9 object-contain" />
            <span className="font-display text-[16px] font-bold tracking-tight text-ink">Zynocraftx Technology</span>
          </div>
          <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-muted">
            We design and engineer software, AI systems, and digital products that solve real operational challenges and create measurable value.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ink">{col.title}</h4>
            <ul className="mt-5 space-y-3">
              {col.links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-[14px] text-muted transition-colors hover:text-cobalt">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ink">Get in touch</h4>
          <a href="mailto:hello@zynocraftx.com" className="mt-5 inline-flex items-center gap-2 text-[14px] text-slate transition-colors hover:text-cobalt">
            <Mail size={16} /> hello@zynocraftx.com
          </a>
          <div className="mt-6 flex gap-3">
            {[['LinkedIn', 'https://www.linkedin.com'], ['Instagram', 'https://www.instagram.com']].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className="flex h-9 items-center gap-1.5 rounded-full border border-line px-3.5 text-[12.5px] font-medium text-slate transition-colors hover:border-cobalt hover:text-cobalt">
                {label} <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-[13px] text-muted md:flex-row md:items-center md:justify-between md:px-10">
          <p>© 2026 Zynocraftx Technology. All rights reserved.</p>
          <p className="font-display tracking-tight">Software Engineering • AI • Digital Products</p>
        </div>
      </div>
    </footer>
  );
}
