import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { QualitySelector } from '@/features/player/components/QualitySelector';
import { ResumePrompt } from '@/features/player/components/ResumePrompt';
import { VideoPlayer } from '@/features/player/components/VideoPlayer';
import { usePlaybackSession } from '@/features/player/hooks/usePlaybackSession';

export function WatchPage() {
  const { session, setSession } = usePlaybackSession();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10">
        <section className="space-y-2">
          <h1 className="text-3xl font-semibold">Watch</h1>
          <p className="text-slate-600 dark:text-slate-400">Stream content with resumable playback controls.</p>
        </section>
        <ResumePrompt resumePosition={session.resumePosition} onResume={() => setSession((current) => ({ ...current, resumePosition: current.resumePosition }))} />
        <VideoPlayer session={session} onTimeUpdate={(time) => setSession((current) => ({ ...current, resumePosition: time }))} />
        <QualitySelector qualities={session.qualities} />
      </main>
      <Footer />
    </div>
  );
}
