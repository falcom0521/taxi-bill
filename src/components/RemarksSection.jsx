export const RemarksSection = ({ remarks }) => {
  if (!remarks) return null;

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 p-4">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Remarks</p>
      <p className="mt-2 text-sm text-slate-700">{remarks}</p>
    </div>
  );
};
