export const JourneySection = ({ values, totalKm }) => {
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

  if (!journeyRows.length && !tripRows.length) return null;

  return (
    <div className="grid gap-4 rounded-2xl p-4 grid-cols-2">
      {journeyRows.length > 0 ? (
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Journey Details</p>
          <div className="mt-2 space-y-1 text-sm">
            {journeyRows.map((row) => (
              <p key={row.label}>{row.label}: {row.value}</p>
            ))}
          </div>
        </div>
      ) : null}
      {tripRows.length > 0 ? (
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Trip Data</p>
          <div className="mt-2 space-y-1 text-sm">
            {tripRows.map((row) => (
              <p key={row.label}>{row.label}: {row.value}</p>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
