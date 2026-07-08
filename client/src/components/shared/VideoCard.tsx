type VideoCardProps = {
  title: string;
  description: string;
};

export function VideoCard({ title, description }: VideoCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </article>
  );
}
