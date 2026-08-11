import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';

type MouseRef = { x: number; y: number; nx: number; ny: number };

const MouseContext = createContext<React.RefObject<MouseRef>>({ current: { x: 0, y: 0, nx: 0, ny: 0 } });

export function MouseProvider({ children }: { children: ReactNode }) {
  const mouse = useRef<MouseRef>({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.nx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.ny = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return <MouseContext.Provider value={mouse}>{children}</MouseContext.Provider>;
}

export function useMouse() {
  return useContext(MouseContext);
}
