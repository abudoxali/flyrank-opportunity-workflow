import { useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';

type TabItem = { id: string; label: string; content: ReactNode };
type TabsProps = { items: readonly TabItem[] };
export function Tabs({ items }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const base = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  if (items.length === 0) return null;
  const selectedIndex = Math.min(activeIndex, items.length - 1);
  const focusTab = (index: number) => { const next = (index + items.length) % items.length; setActiveIndex(next); refs.current[next]?.focus(); };
  const handleKeydown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === 'ArrowRight') next = index + 1;
    else if (event.key === 'ArrowLeft') next = index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = items.length - 1;
    else return;
    event.preventDefault(); focusTab(next);
  };
  return <div>
    <div className="tabs" role="tablist" aria-label="Component examples">
      {items.map((item, i) => <button key={item.id} ref={node => { refs.current[i] = node; }} id={`${base}-tab-${i}`} type="button" role="tab" aria-selected={selectedIndex === i} tabIndex={selectedIndex === i ? 0 : -1} aria-controls={`${base}-panel-${i}`} onClick={() => setActiveIndex(i)} onKeyDown={event => handleKeydown(event, i)}>{item.label}</button>)}
    </div>
    {items.map((item, i) => <div key={item.id} id={`${base}-panel-${i}`} role="tabpanel" aria-labelledby={`${base}-tab-${i}`} tabIndex={0} hidden={selectedIndex !== i} className="tab-panel">{item.content}</div>)}
  </div>;
}
