import { useEffect, useId, useRef } from 'react';
import type { ReactNode, RefObject } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

type DialogProps = { open: boolean; title: string; children: ReactNode; onClose: () => void; returnFocusRef: RefObject<HTMLElement>; };
const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Dialog({ open, title, children, onClose, returnFocusRef }: DialogProps) {
  const titleId = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    if (!open) return;
    const appRoot = document.getElementById('root');
    const previousInert = appRoot?.inert ?? false;
    if (appRoot) appRoot.inert = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const node = contentRef.current;
    const focusables = () => Array.from(node?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    (focusables()[0] ?? node)?.focus();
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); onCloseRef.current(); return; }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) { event.preventDefault(); node?.focus(); return; }
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === node)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const containFocus = (event: FocusEvent) => {
      if (node && event.target instanceof Node && !node.contains(event.target)) {
        (focusables()[0] ?? node).focus();
      }
    };
    document.addEventListener('keydown', handleKeydown, true);
    document.addEventListener('focusin', containFocus, true);
    return () => { document.removeEventListener('keydown', handleKeydown, true); document.removeEventListener('focusin', containFocus, true); document.body.style.overflow = previousOverflow; if (appRoot) appRoot.inert = previousInert; returnFocusRef.current?.focus(); };
  }, [open, returnFocusRef]);
  if (!open) return null;
  return createPortal(<div className="dialog-overlay" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} ref={contentRef} tabIndex={-1}>
      <div className="dialog-heading"><h2 id={titleId}>{title}</h2><button className="icon-btn" type="button" aria-label="Close dialog" onClick={onClose}><X size={20}/></button></div>
      {children}
    </div>
  </div>, document.body);
}
