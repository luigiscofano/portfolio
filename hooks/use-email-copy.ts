'use client';
import { useEffect, useRef, useState } from 'react';

/** Cada nova cópia substitui o feedback anterior, inclusive em cliques rápidos. */
export function useEmailCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const request = useRef(0);
  useEffect(
    () => () => {
      request.current += 1;
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );
  async function copyEmail(email: string) {
    const current = ++request.current;
    if (timeout.current) clearTimeout(timeout.current);
    setCopied(null);
    setCopyError(null);
    try {
      await navigator.clipboard.writeText(email);
      // Uma operação antiga não deve apagar o resultado da mais recente.
      if (current !== request.current) return;
      setCopied(email);
      timeout.current = setTimeout(() => setCopied(null), 2500);
    } catch {
      if (current === request.current) setCopyError(email);
    }
  }
  return { copied, copyError, copyEmail };
}
