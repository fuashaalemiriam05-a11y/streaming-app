import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { UploadDropzone } from '@/features/creator-studio/components/UploadDropzone';
import { UploadProgress } from '@/features/creator-studio/components/UploadProgress';
import { VideoManageTable } from '@/features/creator-studio/components/VideoManageTable';
import { useChunkedUpload } from '@/features/creator-studio/hooks/useChunkedUpload';

export function CreatorStudioPage() {
  const uploadMutation = useChunkedUpload();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10">
        <section className="space-y-2">
          <h1 className="text-3xl font-semibold">Creator studio</h1>
          <p className="text-slate-600 dark:text-slate-400">Upload content and manage transcoding state.</p>
        </section>
        <UploadDropzone
          onUpload={(file) => {
            uploadMutation.mutate({ title: file.name, fileName: file.name, mimeType: file.type });
          }}
        />
        <UploadProgress progress={uploadMutation.isPending ? 60 : 100} status={uploadMutation.isPending ? 'Uploading' : 'Ready'} />
        <VideoManageTable videos={[{ id: 'video-1', title: 'Demo clip', status: 'READY' }]} />
      </main>
      <Footer />
    </div>
  );
}
