import { useState } from 'react';
import { Button } from '../../../components/ui/button';

type UploadDropzoneProps = {
  onUpload: (file: File) => void;
};

export function UploadDropzone({ onUpload }: UploadDropzoneProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-semibold">Upload video</h2>
      <input
        className="mt-4 block w-full rounded border px-3 py-2"
        type="file"
        accept="video/*"
        onChange={(event) => {
          const file = event.target.files?.[0] ?? null;
          setSelectedFile(file);
          if (file) {
            onUpload(file);
          }
        }}
      />
      {selectedFile ? <p className="mt-3 text-sm text-slate-600">Selected: {selectedFile.name}</p> : null}
      <Button className="mt-4" type="button">Choose file</Button>
    </div>
  );
}
