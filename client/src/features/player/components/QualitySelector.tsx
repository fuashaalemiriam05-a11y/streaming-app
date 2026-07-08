type QualitySelectorProps = {
  qualities: string[];
  selectedQuality?: string;
  onChange?: (quality: string) => void;
};

export function QualitySelector({ qualities, selectedQuality, onChange }: QualitySelectorProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-semibold">Quality</h3>
      <select
        className="mt-3 rounded border px-3 py-2"
        value={selectedQuality ?? qualities[0]}
        onChange={(event) => onChange?.(event.target.value)}
      >
        {qualities.map((quality) => (
          <option key={quality} value={quality}>
            {quality}
          </option>
        ))}
      </select>
    </div>
  );
}
