import { useRef, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { Activity, ArrowRight, CheckCircle2, CircleHelp, Code2, LayoutDashboard, ListTodo, Settings, ShieldCheck } from 'lucide-react';
import { Dialog } from './playground/Dialog';
import { Tabs } from './playground/Tabs';
import { Disclosure } from './playground/Disclosure';
import { SettingsForm } from './components/SettingsForm';
import { Health } from './pages/Health';

const navigation = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/tasks', label: 'Tasks', icon: ListTodo },
  { to: '/insights', label: 'Insights', icon: Activity },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/playground', label: 'A11y Playground', icon: ShieldCheck },
  { to: '/health', label: 'Health Check', icon: Code2 }
];
function Shell({ children }: { children: React.ReactNode }) {
  return <div className="shell"><aside className="sidebar" aria-label="Sidebar"><Link className="brand" to="/"><span className="brand-mark">S</span><span>StudyFlow <small>AI engineering lab</small></span></Link>
    <nav aria-label="Primary navigation">{navigation.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} className={({isActive})=>`nav-link ${isActive ? 'active' : ''}`}><Icon size={18}/><span>{label}</span></NavLink>)}</nav>
    <div className="sidebar-note"><strong>FlyRank · 2026</strong><p>Accessible components. Verified behavior. Transparent AI workflow.</p></div>
  </aside><div className="workspace"><header className="topbar"><span className="breadcrumbs">Frontend AI Engineering <span>/</span> Capstone</span><span className="avatar" aria-label="Workspace owner: Abdullah">AR</span></header><main id="main" className="page">{children}</main></div></div>;
}
function PageTitle({ overline, title, description }: { overline: string; title: string; description: string }) { return <header className="page-title"><span className="eyebrow">{overline}</span><h1>{title}</h1><p>{description}</p></header>; }
function Overview() { return <><PageTitle overline="YOUR WORKSPACE" title="Build with clarity." description="A React and TypeScript capstone starter with accessible interaction patterns and meaningful engineering checks."/>
  <div className="stats"><div className="stat"><span>Route coverage</span><strong>6</strong><small>Client-side screens</small></div><div className="stat"><span>Custom widgets</span><strong>3</strong><small>Modal · Tabs · Disclosure</small></div><div className="stat"><span>Persistence</span><strong>Local</strong><small>Browser-only settings</small></div></div>
  <div className="two-column"><section className="panel"><div className="section-label"><h2>Start here</h2><span className="pill">Foundation</span></div><p>This demonstration keeps generated widgets out of the hand-built components. Evaluate functionality before comparing shadcn alternatives.</p><Link className="text-link" to="/playground">Inspect interactive components <ArrowRight size={16}/></Link></section><section className="panel"><div className="section-label"><h2>Engineering checks</h2><CheckCircle2 size={20}/></div><ul className="check-list"><li>Typed component props</li><li>Semantic keyboard patterns</li><li>Rendered health fetch</li><li>Accessible form feedback</li></ul></section></div>
 </>; }
const seedTasks = [{ title:'Validate modal focus trap', done:true },{ title:'Verify tabs keyboard navigation', done:false },{ title:'Review shadcn source comparison', done:false }];
function Tasks() {
  const [tasks, setTasks] = useState(seedTasks);
  const [draft, setDraft] = useState('');
  return <><PageTitle overline="EXECUTION" title="Task board" description="A tiny interactive screen for the independently developed React application."/><section className="panel"><form className="task-input" onSubmit={e => { e.preventDefault(); if (draft.trim()) {setTasks(p => [...p, {title:draft.trim(),done:false}]);setDraft('');}}}><label htmlFor="newTask">New task</label><div className="input-row"><input id="newTask" value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Describe the task"/><button className="primary-btn" type="submit">Add task</button></div></form><ul className="task-list">{tasks.map((task,i)=><li key={`${i}-${task.title}`}><label><input type="checkbox" checked={task.done} onChange={e=>setTasks(p=>p.map((t,j)=>j===i?{...t,done:e.target.checked}:t))}/><span className={task.done?'done':''}>{task.title}</span></label></li>)}</ul></section></>;
}
function Insights() { return <><PageTitle overline="ANALYTICS" title="Product insights" description="A routed placeholder screen for future data visualization."/><section className="panel"><h2>Data integration upcoming</h2><p>This route is intentionally present without fake metrics. Connect a verified data source before adding charts.</p></section></>; }
function SettingsPage() { return <><PageTitle overline="PREFERENCES" title="Workspace settings" description="A validated settings form built as the structured AI workflow exercise."/><section className="panel narrow"><SettingsForm/></section></>; }
function Playground() {
  const [dialogOpen,setDialogOpen] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  return <><PageTitle overline="FE-05 · ACCESSIBILITY" title="Component playground" description="Three manually implemented WAI-ARIA patterns; test with Tab, Shift+Tab, Escape, Enter, Space and arrow keys."/>
  <section className="panel"><h2>Modal dialog</h2><p>Focus enters the dialog, stays inside with Tab / Shift+Tab, and returns to the opener on close.</p><button ref={opener} className="primary-btn" type="button" onClick={()=>setDialogOpen(true)}>Open dialog</button><Dialog open={dialogOpen} title="Review changes" onClose={()=>setDialogOpen(false)} returnFocusRef={opener}><p>Use Tab to cycle between the controls. Press Escape to close.</p><div className="button-row"><button type="button" className="secondary-btn" onClick={()=>setDialogOpen(false)}>Cancel</button><button type="button" className="primary-btn" onClick={()=>setDialogOpen(false)}>Confirm</button></div></Dialog></section>
  <section className="panel"><h2>Tabs</h2><p>Use Left / Right arrows, Home, and End to move within the horizontal tablist.</p><Tabs items={[{ id:'overview',label:'Overview',content:<p>The active panel is associated with its tab via aria-labelledby.</p> },{id:'keyboard',label:'Keyboard',content:<p>Arrow keys move focus and selection. Only the active tab is in the sequential tab order.</p>},{id:'semantics',label:'Semantics',content:<p>Tabs and tabpanels use their corresponding ARIA roles and control IDs.</p>}]}/></section>
  <section className="panel"><h2>Disclosure</h2><p>Use Enter or Space on each button to expand or collapse its panel.</p><Disclosure title="What is keyboard accessibility?"><p>Controls are operable without a pointer; focus remains visible and follows expected interactions.</p></Disclosure><Disclosure title="Why use a real button?"><p>Buttons provide keyboard activation behavior by default and keep expanded state programmatically accessible.</p></Disclosure></section>
  <section className="panel"><h2>Comparison status</h2><p>shadcn/ui code generation and an audited source comparison are still pending; see NOTES.md. The custom implementations are not represented as shadcn components.</p></section>
  </>;
}
function NotFound() {return <><PageTitle overline="NOT FOUND" title="Page unavailable" description="The requested route is not part of this starter."/><Link to="/" className="text-link">Back to overview <ArrowRight size={16}/></Link></>;}
export function App() {return <><a className="skip-link" href="#main">Skip to content</a><Shell><Routes><Route path="/" element={<Overview/>}/><Route path="/tasks" element={<Tasks/>}/><Route path="/insights" element={<Insights/>}/><Route path="/settings" element={<SettingsPage/>}/><Route path="/playground" element={<Playground/>}/><Route path="/health" element={<Health/>}/><Route path="*" element={<NotFound/>}/></Routes></Shell><div className="sr-only"><CircleHelp/></div></>;}
