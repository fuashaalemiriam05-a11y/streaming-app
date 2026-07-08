type ResumePromptProps = {
  resumePosition: number;
  onResume?: () => void;
};

export function ResumePrompt({ resumePosition, onResume }: ResumePromptProps) {
  if (resumePosition <= 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200">
      <p>Resume from {resumePosition}s?</p>
      <button className="mt-2 rounded bg-amber-600 px-3 py-2 text-white" type="button" onClick={onResume}>
        Resume
      </button>
    </div>
  );
}
