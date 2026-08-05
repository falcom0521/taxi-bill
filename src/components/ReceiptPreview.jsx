import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ChargesTable } from './ChargesTable';
import { Footer } from './Footer';
import { JourneySection } from './JourneySection';
import { PaymentSummary } from './PaymentSummary';
import { RemarksSection } from './RemarksSection';
import receiptSeal from '../utils/receipt-seal.png';

export const ReceiptPreview = ({ values, isDark, previewRef }) => {
  const totalKm = Number(values.totalKm) || 0;
  const customerDetails = [
    values.customerName && { label: 'Customer Name', value: values.customerName },
    values.vehicleNumber && { label: 'Vehicle Number', value: values.vehicleNumber },
    values.gstNumber && { label: 'GST Number', value: values.gstNumber },
    values.driverName && { label: 'Driver Name', value: values.driverName },
    values.driverLicenseNumber && { label: 'DL Number', value: values.driverLicenseNumber },
  ].filter(Boolean);
  const journeyDetails = [
    values.startingPlace && { label: 'Starting Place', value: values.startingPlace },
    values.endingPlace && { label: 'Ending Place', value: values.endingPlace },
    values.startingTime && { label: 'Starting Time', value: values.startingTime },
    values.endingTime && { label: 'Ending Time', value: values.endingTime },
    values.startingKm && { label: 'Starting KM', value: values.startingKm },
    values.endingKm && { label: 'Ending KM', value: values.endingKm },
    totalKm > 0 && { label: 'Total KM', value: totalKm },
  ].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`receipt-print-area rounded-[24px] border border-slate-200 p-4 shadow-soft sm:p-6 ${isDark ? 'border-slate-700 bg-slate-900 text-slate-100' : 'bg-white text-slate-900'}`}
      ref={previewRef}
    >
        <div className="relative mx-auto w-[100%] max-w-none rounded-[20px] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm">
        <div className="text-center">
          <h2 className="text-2xl font-semibold uppercase tracking-[0.2em]">TAXI RECEIPT</h2>
          <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-slate-600">
            <span>Date: {values.date ? format(new Date(values.date), 'dd/MM/yyyy') : '-'}</span>
            <span>Bill Number: {values.billNumber || '-'}</span>
          </div>
        </div>

        <div className=" rounded-2xl p-4">
          {values.customerName ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Customer</span>
              <span className="text-lg font-semibold text-slate-900">{values.customerName}</span>
            </div>
          ) : null}
          <div className="mt-3 grid gap-1 md:grid-cols-2">
            {customerDetails.filter((detail) => detail.label !== 'Customer Name').map((detail) => (
              <p key={detail.label} className="text-sm text-slate-700">
                {detail.label}: {detail.value}
              </p>
            ))}
          </div>
        </div>

        <JourneySection values={values} totalKm={totalKm} />
        <ChargesTable values={values} />
        <RemarksSection remarks={values.remarks} />
        <img
          src={receiptSeal}
          alt="Receipt Seal"
          className="pointer-events-none absolute bottom-10 right-6 h-24 w-24 rounded-3xl object-contain opacity-90"
        />
        <Footer />
      </div>
    </motion.div>
  );
};
