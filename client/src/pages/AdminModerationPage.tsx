import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { FlaggedQueue } from '@/features/moderation/components/FlaggedQueue';
import { ReviewModal } from '@/features/moderation/components/ReviewModal';
import { useModeration } from '@/features/moderation/hooks/useModeration';
import { useState } from 'react';

export function AdminModerationPage() {
  const { flags, reviewMutation } = useModeration();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlagId, setSelectedFlagId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10">
        <section className="space-y-2">
          <h1 className="text-3xl font-semibold">Moderation</h1>
          <p className="text-slate-600 dark:text-slate-400">Review and resolve flagged content.</p>
        </section>
        <FlaggedQueue
          flags={flags}
          onReview={(flagId, action) => {
            setSelectedFlagId(flagId);
            reviewMutation.mutate({ flagId, action });
            setIsModalOpen(false);
          }}
        />
        <ReviewModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onReview={(action) => {
            if (!selectedFlagId) {
              return;
            }
            reviewMutation.mutate({ flagId: selectedFlagId, action });
            setIsModalOpen(false);
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
