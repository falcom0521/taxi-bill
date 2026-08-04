import { FiMoon, FiSun } from 'react-icons/fi';

export const Header = ({ isDark, onToggleDark }) => (
  <header className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-soft dark:border-slate-700 dark:bg-slate-900">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Taxi Operations</p>
      <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Taxi Receipt Generator</h1>
    </div>
    <button
      type="button"
      onClick={onToggleDark}
      className="rounded-full border border-slate-200 p-2 text-slate-700 transition hover:border-accent hover:text-accent dark:border-slate-700 dark:text-slate-200"
    >
      {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  </header>
);
