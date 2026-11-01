import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
type DisclosureProps = { title: string; children: ReactNode };
export function Disclosure({ title, children }: DisclosureProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return <section className="disclosure">
    <h3><button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(value => !value)}>{title}<ChevronDown size={18} className={open ? 'rotated' : ''}/></button></h3>
    <div id={panelId} hidden={!open} className="disclosure-content">{children}</div>
  </section>;
}
