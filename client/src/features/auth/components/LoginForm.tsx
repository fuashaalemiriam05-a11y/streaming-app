import { useState } from 'react';
import { Button } from '../../../components/ui/button';

type LoginFormProps = {
  onSubmit: (values: { email: string; password: string }) => void;
};

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      className="w-full max-w-md space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ email, password });
      }}
    >
      <h2 className="text-xl font-semibold">Sign in</h2>
      <input className="w-full rounded border px-3 py-2" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
      <input className="w-full rounded border px-3 py-2" placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <Button className="w-full" type="submit">Continue</Button>
    </form>
  );
}
