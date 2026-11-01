// Browser DOM behavior tests; run with Vitest + jsdom.
// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef, useState } from 'react';
import { Dialog } from './Dialog';
import { Tabs } from './Tabs';
import { Disclosure } from './Disclosure';

afterEach(cleanup);

function ModalHarness() {
 const [open,setOpen]=useState(false);
 const opener=useRef<HTMLButtonElement>(null);
 return <><button ref={opener} type="button" onClick={()=>setOpen(true)}>Show modal</button>
 <Dialog open={open} title="Review" onClose={()=>setOpen(false)} returnFocusRef={opener}>
   <button type="button">First action</button><button type="button">Last action</button>
 </Dialog></>;
}
describe('dialog keyboard behavior',()=>{
 it('opens with focus, traps both tab directions, closes on Escape and restores focus',async()=>{
  const user=userEvent.setup();render(<ModalHarness/>);
  const opener=screen.getByRole('button',{name:'Show modal'});await user.click(opener);
  const close=screen.getByRole('button',{name:'Close dialog'});
  expect(document.activeElement).toBe(close);
  await user.keyboard('{Shift>}{Tab}{/Shift}');expect(document.activeElement).toBe(screen.getByRole('button',{name:'Last action'}));
  await user.tab();expect(document.activeElement).toBe(close);
  await user.keyboard('{Escape}');expect(screen.queryByRole('dialog')).toBeNull();expect(document.activeElement).toBe(opener);
 });
});
describe('tabs keyboard behavior',()=>{
 it('moves focus and selection with ArrowRight, Home and End',async()=>{
  const user=userEvent.setup();render(<Tabs items={[{id:'a',label:'Alpha',content:'Alpha content'},{id:'b',label:'Beta',content:'Beta content'},{id:'c',label:'Gamma',content:'Gamma content'}]}/>);
  const alpha=screen.getByRole('tab',{name:'Alpha'});alpha.focus();
  await user.keyboard('{ArrowRight}');expect(screen.getByRole('tab',{name:'Beta'}).getAttribute('aria-selected')).toBe('true');
  await user.keyboard('{End}');expect(screen.getByRole('tab',{name:'Gamma'}).getAttribute('aria-selected')).toBe('true');
  await user.keyboard('{Home}');expect(alpha.getAttribute('aria-selected')).toBe('true');
 });
});
describe('disclosure keyboard behavior',()=>{
 it('toggles aria-expanded using Space',async()=>{
  const user=userEvent.setup();render(<Disclosure title="Question"><p>Answer</p></Disclosure>);
  const btn=screen.getByRole('button',{name:'Question'});btn.focus();expect(btn.getAttribute('aria-expanded')).toBe('false');
  await user.keyboard(' ');expect(btn.getAttribute('aria-expanded')).toBe('true');
  await user.keyboard(' ');expect(btn.getAttribute('aria-expanded')).toBe('false');
 });
});
