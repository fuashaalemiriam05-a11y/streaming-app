type VideoRecord = {
  id: string;
  title: string;
  status: string;
};

type VideoManageTableProps = {
  videos?: VideoRecord[];
};

export function VideoManageTable({ videos = [] }: VideoManageTableProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-semibold">Videos</h3>
      <ul className="mt-4 space-y-2">
        {videos.map((video) => (
          <li key={video.id} className="flex items-center justify-between rounded border px-3 py-2">
            <span>{video.title}</span>
            <span className="text-sm text-slate-500">{video.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
