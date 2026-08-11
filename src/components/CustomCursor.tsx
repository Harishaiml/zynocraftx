import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rx = 0, ry = 0, dx = 0, dy = 0;
    let mx = 0, my = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) setVisible(true);
      const t = e.target as HTMLElement;
      const interactive = !!t.closest('a, button, [data-cursor="hover"]');
      setHovering(interactive);
    };

    const loop = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      dx += (mx - dx) * 0.45;
      dy += (my - dy) * 0.45;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          border: '1px solid rgba(255,255,255,0.5)',
          borderRadius: '50%',
          opacity: visible ? 1 : 0,
          transition: 'width 0.3s var(--ease-lux), height 0.3s var(--ease-lux), opacity 0.3s ease',
          boxShadow: hovering
            ? '0 0 24px rgba(37,99,235,0.5), inset 0 0 12px rgba(124,58,237,0.3)'
            : '0 0 8px rgba(255,255,255,0.15)',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          width: 6,
          height: 6,
          background: '#fff',
          borderRadius: '50%',
          opacity: visible ? 1 : 0,
          boxShadow: '0 0 8px rgba(37,99,235,0.8)',
        }}
      />
    </>
  );
}
