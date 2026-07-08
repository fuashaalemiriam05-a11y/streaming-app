import { VideoCard } from '@/components/shared/VideoCard';

export function CatalogGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <VideoCard title="Intro to StreamCM" description="A starter catalog item for the platform." />
      <VideoCard title="Creator Workflow" description="See how creators publish content inside the studio." />
    </div>
  );
}
