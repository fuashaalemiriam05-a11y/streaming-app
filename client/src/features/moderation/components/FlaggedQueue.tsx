import type { ModerationFlag } from '../types';

type FlaggedQueueProps = {
  flags: ModerationFlag[];
  onReview?: (flagId: string, action: 'approve' | 'reject') => void;
};

export function FlaggedQueue({ flags, onReview }: FlaggedQueueProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-semibold">Flagged queue</h2>
      <ul className="mt-4 space-y-3">
        {flags.map((flag) => (
          <li key={flag.id} className="rounded border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{flag.videoTitle}</p>
                <p className="text-sm text-slate-500">{flag.reason}</p>
              </div>
              <span className="rounded bg-slate-100 px-2 py-1 text-xs uppercase">{flag.status}</span>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="rounded bg-emerald-600 px-3 py-2 text-sm text-white" type="button" onClick={() => onReview?.(flag.id, 'approve')}>
                Approve
              </button>
              <button className="rounded bg-rose-600 px-3 py-2 text-sm text-white" type="button" onClick={() => onReview?.(flag.id, 'reject')}>
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
