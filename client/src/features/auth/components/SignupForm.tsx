import { useState } from 'react';
import { Button } from '../../../components/ui/button';

type SignupFormProps = {
  onSubmit: (values: { email: string; password: string; name?: string }) => void;
};

export function SignupForm({ onSubmit }: SignupFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  return (
    <form
      className="w-full max-w-md space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ email, password, name });
      }}
    >
      <h2 className="text-xl font-semibold">Create account</h2>
      <input className="w-full rounded border px-3 py-2" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
      <input className="w-full rounded border px-3 py-2" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
      <input className="w-full rounded border px-3 py-2" placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <Button className="w-full" type="submit">Sign up</Button>
    </form>
  );
}
