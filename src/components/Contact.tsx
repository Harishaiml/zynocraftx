import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const projectTypes = [
  'Product Engineering',
  'Web Application',
  'Software System',
  'Mobile Application',
  'AI / Machine Learning',
  'Automation',
  'SaaS Platform',
  'Other',
];

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      full_name: String(data.get('full_name') || ''),
      email: String(data.get('email') || ''),
      phone: String(data.get('phone') || '') || null,
      company: String(data.get('company') || '') || null,
      project_type: String(data.get('project_type') || '') || null,
      project_details: String(data.get('project_details') || ''),
    };

    try {
      const { error } = await supabase.from('project_inquiries').insert(payload);
      if (error) throw error;
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="relative z-10 py-32 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* left — heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Contact
            </span>
            <h2 className="section-title mt-4 text-4xl md:text-5xl text-gradient">
              Let&apos;s Talk About Your Project.
            </h2>
            <p className="mt-6 max-w-md text-white/50 leading-relaxed">
              Share what you&apos;re building, the challenge you&apos;re solving,
              or where your current product needs to go next.
            </p>
          </motion.div>

          {/* right — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-white/8 bg-white/[0.02] p-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                  <Check className="h-6 w-6 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-lg font-medium text-white">Project details received.</h3>
                <p className="mt-2 text-sm text-white/50">
                  We&apos;ll review your submission and respond within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full Name" name="full_name" required />
                  <Field label="Business Email" name="email" type="email" required />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Phone Number" name="phone" type="tel" />
                  <Field label="Company / Organization" name="company" />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-white/40">
                    Project Type
                  </label>
                  <select
                    name="project_type"
                    defaultValue=""
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent/50"
                  >
                    <option value="" disabled className="bg-[#0a0a0a]">Select a project type</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t} className="bg-[#0a0a0a]">{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-white/40">
                    Project Details
                  </label>
                  <textarea
                    name="project_details"
                    required
                    rows={4}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent/50"
                    placeholder="Tell us about your project, goals, and timeline."
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-400/80">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60"
                  style={{
                    background: 'linear-gradient(135deg, rgba(37,99,235,0.9), rgba(124,58,237,0.9))',
                    boxShadow: '0 8px 32px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                  }}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Project Details'}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-white/40">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent/50"
      />
    </div>
  );
}
