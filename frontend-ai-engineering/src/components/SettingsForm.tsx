import { useState } from 'react';
import type { FormEvent } from 'react';

type FormErrors = { displayName?: string; email?: string };
function validate(name: string, email: string): FormErrors {
  const errors: FormErrors = {};
  if (name.trim().length < 2) errors.displayName = 'Enter at least two characters.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Enter a valid email address.';
  return errors;
}
export function SettingsForm() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [saved, setSaved] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate(displayName, email); setErrors(next); setSaved(false);
    if (Object.keys(next).length === 0) {
      localStorage.setItem('studyflow-settings', JSON.stringify({ displayName: displayName.trim(), email: email.trim(), notifications }));
      setSaved(true);
    }
  };
  return <form onSubmit={submit} noValidate className="settings-form">
    <label htmlFor="displayName">Display name</label>
    <input id="displayName" name="displayName" autoComplete="name" value={displayName} onChange={e => { setDisplayName(e.target.value); setErrors(p => ({ ...p, displayName: undefined })); setSaved(false); }} aria-invalid={Boolean(errors.displayName)} aria-describedby={errors.displayName ? 'name-error' : undefined}/>
    {errors.displayName && <p className="field-error" id="name-error">{errors.displayName}</p>}
    <label htmlFor="email">Email</label>
    <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); setSaved(false); }} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined}/>
    {errors.email && <p className="field-error" id="email-error">{errors.email}</p>}
    <label className="inline"><input type="checkbox" checked={notifications} onChange={e => setNotifications(e.target.checked)}/> Product updates</label>
    <button className="primary-btn" type="submit">Save settings</button>
    <div role="status" aria-live="polite">{saved ? 'Settings saved locally in this browser.' : ''}</div>
  </form>;
}
