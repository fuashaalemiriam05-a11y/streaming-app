import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { CatalogGrid } from '@/features/catalog/components/CatalogGrid';
import { PlayerPanel } from '@/features/player/components/PlayerPanel';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';

export function HomePage() {
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10">
        <section className="space-y-4">
          <h1 className="text-4xl font-semibold">StreamCM platform scaffold</h1>
          <p className="max-w-2xl text-slate-600 dark:text-slate-400">
            A starter monorepo for video delivery, creator tools, and moderation workflows.
          </p>
          <Button onClick={toggleSidebar}>Toggle sidebar state</Button>
        </section>
        <CatalogGrid />
        <PlayerPanel />
      </main>
      <Footer />
    </div>
  );
}
