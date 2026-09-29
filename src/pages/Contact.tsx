import { useState } from 'react';
import { ArrowRight, Mail, Clock, MessageSquare } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';

const projectTypes = ['Product Engineering', 'Web Application', 'Software System', 'Mobile Application', 'AI / Machine Learning', 'Automation', 'Other'];

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') || '');
    const email = String(data.get('email') || '');
    const company = String(data.get('company') || '');
    const type = String(data.get('project_type') || '');
    const details = String(data.get('details') || '');
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company && `Company: ${company}`,
      type && `Project type: ${type}`,
      '',
      details,
    ].filter(Boolean).join('\n');
    const subject = `Project enquiry${type ? ` — ${type}` : ''}`;
    window.location.href = `mailto:hello@zynocraftx.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let's talk about your project.</>}
        subtitle="Share what you're building, the challenge you're solving, or where your current product needs to go next."
      />
      <section className="bg-fog py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Info */}
          <Reveal>
            <div className="flex flex-col gap-6">
              {[
                { icon: Mail, title: 'Email us', text: 'hello@zynocraftx.com', href: 'mailto:hello@zynocraftx.com' },
                { icon: Clock, title: 'Response time', text: 'We reply within one business day.' },
                { icon: MessageSquare, title: 'No perfect brief needed', text: 'Bring the problem — we’ll suggest a useful first step.' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4 rounded-2xl border border-line bg-white p-6">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-[0_8px_18px_rgba(228,6,2,0.26)]">
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="font-display text-[16px] font-semibold text-ink">{item.title}</h3>
                      {item.href ? (
                        <a href={item.href} className="mt-1 inline-block text-[14px] text-cobalt hover:underline">{item.text}</a>
                      ) : (
                        <p className="mt-1 text-[14px] text-muted">{item.text}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-line bg-white p-7 md:p-9">
              {sent ? (
                <div className="flex h-full min-h-[380px] flex-col items-center justify-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <Mail size={24} strokeWidth={1.7} />
                  </div>
                  <h3 className="mt-5 font-display text-[19px] font-semibold text-ink">Your email is ready to send.</h3>
                  <p className="mt-2 max-w-sm text-[14px] text-muted">
                    We opened your email client with the details filled in. If nothing happened, email us directly at{' '}
                    <a href="mailto:hello@zynocraftx.com" className="text-cobalt hover:underline">hello@zynocraftx.com</a>.
                  </p>
                  <button onClick={() => setSent(false)} className="btn btn-outline mt-6">Edit details</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full Name" name="name" required />
                    <Field label="Business Email" name="email" type="email" required />
                  </div>
                  <Field label="Company / Organization" name="company" />
                  <div>
                    <Label>Project Type</Label>
                    <select name="project_type" defaultValue="" className="w-full rounded-xl border border-line bg-mist px-4 py-3 text-[14px] text-ink outline-none transition-colors focus:border-cobalt">
                      <option value="" disabled>Select a project type</option>
                      {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label>Project Details</Label>
                    <textarea name="details" required rows={5} placeholder="Tell us about your project, goals, and timeline."
                      className="w-full resize-none rounded-xl border border-line bg-mist px-4 py-3 text-[14px] text-ink outline-none transition-colors focus:border-cobalt" />
                  </div>
                  <button type="submit" className="btn btn-primary w-full justify-center">Send Project Details <ArrowRight size={16} /></button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-2 block font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">{children}</label>;
}

function Field({ label, name, type = 'text', required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <Label>{label}</Label>
      <input type={type} name={name} required={required}
        className="w-full rounded-xl border border-line bg-mist px-4 py-3 text-[14px] text-ink outline-none transition-colors focus:border-cobalt" />
    </div>
  );
}
