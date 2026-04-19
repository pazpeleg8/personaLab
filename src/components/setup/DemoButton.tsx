interface Props {
  onLoad: () => void;
}

export function DemoButton({ onLoad }: Props) {
  return (
    <button
      type="button"
      onClick={onLoad}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-indigo-200 text-indigo-600 text-sm hover:bg-indigo-50 transition"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      Load demo scenario
    </button>
  );
}
