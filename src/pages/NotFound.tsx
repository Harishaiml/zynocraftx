import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-fog px-6 text-center">
      <div>
        <p className="font-display text-[80px] font-bold leading-none tracking-tight text-brand md:text-[120px]">404</p>
        <h1 className="mt-4 font-display text-[1.6rem] font-bold tracking-tight text-ink md:text-[2rem]">This page took a detour.</h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-muted">The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="btn btn-primary mt-8"><ArrowLeft size={16} /> Back home</Link>
      </div>
    </section>
  );
}
