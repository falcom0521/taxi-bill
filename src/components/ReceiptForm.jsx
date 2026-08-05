import { motion } from 'framer-motion';
import { FiCheckCircle, FiFileText } from 'react-icons/fi';
import { chargeFields } from '../constants';
import { formatCurrency } from '../utils/calculations';

export const ReceiptForm = ({ form, errors, values, onSubmit, isGeneratingPdf, onCreateNew, isDark, totalCharges }) => {
  const { register, handleSubmit } = form;

  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className={`rounded-[24px] border border-slate-200 p-4 shadow-soft sm:p-6 ${isDark ? 'border-slate-700 bg-slate-900' : 'bg-white'}`}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Receipt Builder</p>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">TAXI RECEIPT</h2>
        </div>
        <div className="rounded-full bg-accent/10 p-3 text-accent">
          <FiFileText size={20} />
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">General Information</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <span>Date</span>
              <input type="date" {...register('date')} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 outline-none ring-0 focus:border-accent dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <span>Bill Number</span>
              <input type="text" {...register('billNumber')} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 outline-none focus:border-accent dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <span>Vehicle Number</span>
              <input type="text" {...register('vehicleNumber')} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 outline-none focus:border-accent dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <span>GST Number</span>
              <input type="text" {...register('gstNumber')} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 outline-none focus:border-accent dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 md:col-span-2">
              <span>Customer Name</span>
              <input type="text" {...register('customerName')} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 outline-none focus:border-accent dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <span>Driver Name</span>
              <input type="text" {...register('driverName')} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 outline-none focus:border-accent dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <span>DL Number</span>
              <input type="text" {...register('driverLicenseNumber')} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 outline-none focus:border-accent dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </label>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">Journey Details</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <span>Starting Place</span>
              <input type="text" {...register('startingPlace')} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 outline-none focus:border-accent dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <span>Ending Place</span>
              <input type="text" {...register('endingPlace')} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 outline-none focus:border-accent dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <span>Starting KM</span>
              <input type="number" step="0.01" {...register('startingKm')} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 outline-none focus:border-accent dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <span>Ending KM</span>
              <input type="number" step="0.01" {...register('endingKm', { validate: (value) => !value || Number(value) >= Number(values.startingKm || 0) || 'Ending KM cannot be smaller than Starting KM' })} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 outline-none focus:border-accent dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              {errors.endingKm && <span className="mt-1 block text-xs text-red-500">{errors.endingKm.message}</span>}
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <span>Starting Time</span>
              <input type="time" {...register('startingTime')} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 outline-none focus:border-accent dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <span>Ending Time</span>
              <input type="time" {...register('endingTime')} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 outline-none focus:border-accent dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 md:col-span-2">
              <span>Total KM</span>
              <input readOnly value={values.totalKm || 0} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-100 px-3 py-2 text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200" />
            </label>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">Charges</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {chargeFields.map((field) => (
              <label key={field.key} className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span>{field.label}</span>
                <input type="number" step="0.01" {...register(field.key)} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 outline-none focus:border-accent dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </label>
            ))}
            <div className="rounded-2xl border border-dashed border-accent/30 bg-accent/5 p-4 text-sm text-slate-700 dark:text-slate-300 md:col-span-2">
              <div className="flex items-center justify-between">
                <span>Calculated Charges</span>
                <span className="font-semibold text-accent">{formatCurrency(totalCharges)}</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">Payment</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 md:col-span-2">
              <span>Total Amount</span>
              <input type="number" step="0.01" {...register('totalAmount')} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 outline-none focus:border-accent dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </label>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">Additional Information</h3>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            <span>Remarks</span>
            <textarea rows={4} placeholder="Enter additional notes if any..." {...register('remarks')} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 outline-none focus:border-accent dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </label>
        </section>

        <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={isGeneratingPdf} className="rounded-2xl bg-accent px-4 py-2.5 font-semibold text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-70">
              {isGeneratingPdf ? 'Generating...' : 'Generate Receipt'}
            </button>
            <button type="button" onClick={onCreateNew} className="rounded-2xl border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 transition hover:border-accent hover:text-accent dark:border-slate-700 dark:text-slate-200">
              Create New Receipt
            </button>
          </div>
      </div>
    </motion.form>
  );
};
