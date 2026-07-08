import { useState } from 'react';
import { Button } from '../../../components/ui/button';

type OtpVerifyProps = {
  onSubmit: (values: { userId: string; otp: string }) => void;
};

export function OtpVerify({ onSubmit }: OtpVerifyProps) {
  const [userId, setUserId] = useState('');
  const [otp, setOtp] = useState('');

  return (
    <form
      className="w-full max-w-md space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ userId, otp });
      }}
    >
      <h2 className="text-xl font-semibold">Verify OTP</h2>
      <input className="w-full rounded border px-3 py-2" placeholder="User ID" value={userId} onChange={(event) => setUserId(event.target.value)} />
      <input className="w-full rounded border px-3 py-2" placeholder="6-digit OTP" value={otp} onChange={(event) => setOtp(event.target.value)} />
      <Button className="w-full" type="submit">Verify</Button>
    </form>
  );
}
