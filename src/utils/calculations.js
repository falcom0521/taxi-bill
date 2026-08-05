export const generateBillNumber = (date) => {
  const cleanDate = date ? date.replace(/-/g, '') : new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = String(Math.floor(Math.random() * 900) + 100);
  return `TR-${cleanDate}-${random}`;
};

export const calculateTotalKm = (startKm, endKm) => {
  const start = Number(startKm) || 0;
  const end = Number(endKm) || 0;
  return Math.max(0, end - start);
};

export const sumCharges = (values) => {
  const chargeKeys = ['tollCharges', 'parkingCharges', 'interstatePermitCharges', 'miscellaneousCharges', 'perKmCharges'];
  return chargeKeys.reduce((sum, key) => sum + (Number(values[key]) || 0), 0);
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value) || 0);
