'use client';

import { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';

export default function Home() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInstanceRef = useRef<Terminal | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize terminal
    const term = new Terminal();
    terminalInstanceRef.current = term;
    
    // Open terminal in the div
    term.open(terminalRef.current);
    
    // Write the initial message
    term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');

    // Cleanup function
    return () => {
      if (terminalInstanceRef.current) {
        terminalInstanceRef.current.dispose();
      }
    };
  }, []);

  return (
    <div id="terminal" ref={terminalRef} style={{ width: '100%', height: '100vh' }} />
  );
}
