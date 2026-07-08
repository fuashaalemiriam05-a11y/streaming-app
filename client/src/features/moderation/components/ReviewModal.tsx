import { useState } from 'react';

type ReviewModalProps = {
  open: boolean;
  onClose?: () => void;
  onReview?: (action: 'approve' | 'reject') => void;
};

export function ReviewModal({ open, onClose, onReview }: ReviewModalProps) {
  const [action, setAction] = useState<'approve' | 'reject'>('approve');

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-lg font-semibold">Admin review</h3>
        <select className="mt-4 w-full rounded border px-3 py-2" value={action} onChange={(event) => setAction(event.target.value as 'approve' | 'reject')}>
          <option value="approve">Approve</option>
          <option value="reject">Reject</option>
        </select>
        <div className="mt-6 flex justify-end gap-2">
          <button className="rounded border px-3 py-2 text-sm" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="rounded bg-slate-900 px-3 py-2 text-sm text-white" type="button" onClick={() => onReview?.(action)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
