type UploadProgressProps = {
  progress: number;
  status: string;
};

export function UploadProgress({ progress, status }: UploadProgressProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-semibold">Upload status</h3>
      <p className="mt-2 text-sm text-slate-600">{status}</p>
      <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
        <div className="h-2 rounded-full bg-[hsl(var(--primary))]" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
