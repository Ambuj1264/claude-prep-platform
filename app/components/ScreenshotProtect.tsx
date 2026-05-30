'use client';
import { useEffect, useState, ReactNode } from 'react';
import { ShieldOff } from 'lucide-react';

export function ScreenshotProtect({ children }: { children: ReactNode }) {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function block() {
      setBlocked(true);
      clearTimeout(timeout);
      // Unblock after 2.5s so the user can continue
      timeout = setTimeout(() => setBlocked(false), 2500);
    }

    function onKeyDown(e: KeyboardEvent) {
      const mac = e.metaKey;
      const win = e.ctrlKey;

      // Mac: Cmd+Shift+3 / 4 / 5 / 6 (screenshots & screen recording)
      if (mac && e.shiftKey && ['3', '4', '5', '6'].includes(e.key)) {
        e.preventDefault();
        block();
        return;
      }
      // Mac: Cmd+Ctrl+Shift+3 / 4 (clipboard screenshots)
      if (mac && win && e.shiftKey && ['3', '4'].includes(e.key)) {
        e.preventDefault();
        block();
        return;
      }
      // Windows / Linux: Print Screen, or Ctrl+Print Screen, or Alt+Print Screen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        block();
        return;
      }
      // Windows Snipping Tool: Win+Shift+S (we can't intercept Win key, but catch Shift+S combos)
      if (win && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        block();
        return;
      }
    }

    // When tab loses focus (user cmd-tabs to screenshot tool, screen recorder, etc.)
    function onVisibilityChange() {
      if (document.hidden) block();
    }

    document.addEventListener('keydown', onKeyDown, { capture: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('keydown', onKeyDown, { capture: true });
      document.removeEventListener('visibilitychange', onVisibilityChange);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {/* CSS-level protection: hidden on print / screen capture media */}
      <style>{`
        @media print {
          .screenshot-protected { visibility: hidden !important; }
        }
      `}</style>

      <div
        className="screenshot-protected"
        style={{
          /* Disable text selection and drag */
          userSelect: 'none',
          WebkitUserSelect: 'none',
          /* Prevent context menu drag-copy */
          pointerEvents: blocked ? 'none' : 'auto',
        }}
        onContextMenu={e => e.preventDefault()}
        onDragStart={e => e.preventDefault()}
        onCopy={e => e.preventDefault()}
      >
        {children}
      </div>

      {/* Blank overlay shown when screenshot is detected */}
      {blocked && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: 'white',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 16,
        }}>
          <ShieldOff size={48} style={{ color: '#d1d5db' }} />
          <p style={{ color: '#9ca3af', fontWeight: 600, fontSize: '1rem' }}>
            Screenshot blocked
          </p>
        </div>
      )}
    </div>
  );
}
