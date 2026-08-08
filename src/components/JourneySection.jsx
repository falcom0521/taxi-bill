export const JourneySection = ({ values, totalKm, customerDetails = [] }) => {
  const journeyRows = [
    values.startingPlace && { label: 'Starting Place', value: values.startingPlace },
    values.endingPlace && { label: 'Ending Place', value: values.endingPlace },
    values.startingTime && { label: 'Starting Time', value: values.startingTime },
    values.endingTime && { label: 'Ending Time', value: values.endingTime },
  ].filter(Boolean);

  const tripRows = [
    values.startingKm && { label: 'Starting KM', value: values.startingKm },
    values.endingKm && { label: 'Ending KM', value: values.endingKm },
    totalKm > 0 && { label: 'Total KM', value: totalKm },
  ].filter(Boolean);

  if (!customerDetails.length && !journeyRows.length && !tripRows.length) return null;

  return (
    <div className="mt-4 flex flex-nowrap items-start gap-4 rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-50 to-slate-50 p-4 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
      {customerDetails.length > 0 ? (
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">Vehicele Detail</p>
          <div className="mt-2 space-y-1 text-sm">
            {customerDetails.map((row) => (
              <p key={row.label} className="leading-6">
                <span className="font-semibold text-slate-700">{row.label}:</span>{' '}
                <span className="text-slate-500">{row.value}</span>
              </p>
            ))}
          </div>
        </div>
      ) : null}
      {journeyRows.length > 0 ? (
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">Journey Details</p>
          <div className="mt-2 space-y-1 text-sm">
            {journeyRows.map((row) => (
              <p key={row.label} className="leading-6">
                <span className="font-semibold text-slate-700">{row.label}:</span>{' '}
                <span className="text-slate-500">{row.value}</span>
              </p>
            ))}
          </div>
        </div>
      ) : null}
      {tripRows.length > 0 ? (
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">Trip Data</p>
          <div className="mt-2 space-y-1 text-sm">
            {tripRows.map((row) => (
              <p key={row.label} className="leading-6">
                <span className="font-semibold text-slate-700">{row.label}:</span>{' '}
                <span className="text-slate-500">{row.value}</span>
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
