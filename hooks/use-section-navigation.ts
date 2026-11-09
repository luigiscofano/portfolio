'use client';
import { useEffect, useRef, useState } from 'react';

export function useSectionNavigation() {
  const [active, setActive] = useState('sobre');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const sections = [
      ...document.querySelectorAll<HTMLElement>('main > section[id]'),
    ];
    let frame: number | null = null;
    const update = () => {
      frame = null;
      let current = sections[0]?.id || 'sobre';
      for (const section of sections) {
        if (section.getBoundingClientRect().top < 180) current = section.id;
      }
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8
      )
        current = 'contato';
      setActive(current);
    };
    // Agrupa eventos de rolagem para medir o layout no máximo uma vez por quadro.
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('hashchange', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('hashchange', schedule);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);
  // O menu móvel prende o foco e devolve a navegação ao botão ao fechar.
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const desktop = window.matchMedia('(min-width:769px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;
      const links = [
        menuButton.current,
        ...document.querySelectorAll<HTMLElement>(
          '.sidebar a[href], .sidebar button',
        ),
      ].filter((item): item is HTMLElement => Boolean(item));
      const first = links[0],
        last = links.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [menuOpen]);
  function followSection(id: string) {
    setActive(id);
    setMenuOpen(false);
    requestAnimationFrame(() =>
      document.getElementById(id)?.focus({ preventScroll: true }),
    );
  }
  return { active, menuOpen, setMenuOpen, menuButton, followSection };
}
