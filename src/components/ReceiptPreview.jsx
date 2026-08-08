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
      className={`receipt-print-area mx-auto w-full max-w-[100%] rounded-[24px] border border-slate-200 p-3 shadow-soft sm:p-5 lg:p-6 ${isDark ? 'border-slate-700 bg-slate-900 text-slate-100' : 'bg-white text-slate-900'}`}
      ref={previewRef}
    >
        <div className={`relative mx-auto w-full max-w-none rounded-[20px] border p-5 text-slate-900 shadow-sm sm:p-6 ${isDark ? 'border-slate-700 bg-slate-900 text-slate-100' : 'border-slate-200 bg-white'}`}>
        <div className="text-center">
          <h2 className="text-2xl font-semibold uppercase tracking-[0.2em] text-slate-800">TAXI RECEIPT</h2>
          <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-slate-600 dark:text-slate-300">
            <span>Date: {values.date ? format(new Date(values.date), 'dd/MM/yyyy') : '-'}</span>
            <span>Bill Number: {values.billNumber || '-'}</span>
          </div>
          {values.customerName ? (
            <div className="mt-4 inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
              Customer: {values.customerName}
            </div>
          ) : null}
        </div>

        <JourneySection values={values} totalKm={totalKm} customerDetails={customerDetails.filter((detail) => detail.label !== 'Customer Name')} />
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
