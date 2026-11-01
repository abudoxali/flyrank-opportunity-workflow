import { useState } from 'react';
// Vague-round implementation: "Make me a settings form".
export function SettingsForm() {
 const [name,setName]=useState('');
 const [email,setEmail]=useState('');
 return <div className="settings-form">
  <h2>Settings</h2>
  <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>
  <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
  <button type="button" onClick={()=>alert('Saved!')}>Save</button>
 </div>;
}
