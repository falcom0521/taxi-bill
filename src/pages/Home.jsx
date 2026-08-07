import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiPrinter, FiShare2, FiLoader, FiStar } from 'react-icons/fi';
import { Header } from '../components/Header';
import { ReceiptForm } from '../components/ReceiptForm';
import { ReceiptPreview } from '../components/ReceiptPreview';
import { useReceipt } from '../hooks/useReceipt';
import { downloadPdf } from '../utils/pdfGenerator';
import { generateBillNumber } from '../utils/calculations';

export const Home = () => {
  const previewRef = useRef(null);
  const {
    form,
    values,
    errors,
    isDark,
    isGeneratingPdf,
    toast,
    showPreview,
    setShowPreview,
    totalCharges,
    toggleDarkMode,
    showToast,
    setIsGeneratingPdf,
  } = useReceipt();

  const [view, setView] = useState('landing');

  const onSubmit = (data) => {
    if (Number(data.endingKm) < Number(data.startingKm)) {
      showToast('Ending KM cannot be smaller than starting KM');
      return;
    }
    setShowPreview(true);
    setView('form');
    showToast('Receipt ready to review');
  };


  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;
    setIsGeneratingPdf(true);
    try {
      await downloadPdf(previewRef.current, values.billNumber || 'preview');
      showToast('PDF downloaded successfully');
    } catch {
      showToast('Unable to generate PDF');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (!previewRef.current) return;
    if (navigator.share) {
      setIsGeneratingPdf(true);
      try {
        const blob = await import('../utils/pdfGenerator').then((mod) => mod.generateReceiptPdf(previewRef.current, values.billNumber || 'preview'));
        const file = new File([blob], `Taxi_Receipt_${values.billNumber || 'preview'}.pdf`, { type: 'application/pdf' });
        await navigator.share({ title: 'Taxi Receipt', files: [file] });
        showToast('Receipt shared successfully');
      } catch {
        showToast('Sharing is not supported on this browser.');
      } finally {
        setIsGeneratingPdf(false);
      }
    } else {
      showToast('Sharing is not supported on this browser.');
    }
  };

  const handleCreateNew = () => {
    form.reset({
      ...form.getValues(),
      billNumber: generateBillNumber(new Date().toISOString().slice(0, 10)),
      date: new Date().toISOString().slice(0, 10),
      customerName: '',
      vehicleNumber: '',
      gstNumber: '',
      startingPlace: '',
      endingPlace: '',
      startingKm: '',
      endingKm: '',
      startingTime: '09:00',
      endingTime: '10:30',
      tollCharges: '0',
      parkingCharges: '0',
      interstatePermitCharges: '0',
      miscellaneousCharges: '0',
      totalAmount: '',
      remarks: '',
      totalKm: 0,
    });
    setShowPreview(true);
    setView('form');
    showToast('New receipt started');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-white' : 'bg-surface text-slate-900'}`}>
      <div className="mx-auto flex w-full max-w-none flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Header isDark={isDark} onToggleDark={toggleDarkMode} />
        {view === 'landing' ? (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-slate-200 bg-white/80 p-8 shadow-soft backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-accent/10 p-3 text-accent">
                <FiStar size={24} />
              </div>
              <h1 className="text-3xl font-semibold uppercase tracking-[0.25em] sm:text-4xl">TAXI RECEIPT GENERATOR</h1>
              <p className="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-300">Generate professional taxi receipts instantly.</p>
              <button onClick={() => setView('form')} className="mt-6 rounded-2xl bg-accent px-5 py-3 font-semibold text-white transition hover:bg-accent/90">
                Create New Receipt
              </button>
            </div>
          </motion.section>
        ) : (
          <div className="grid w-full gap-6 lg:grid-cols-1">
            <ReceiptForm form={form} errors={errors} values={values} onSubmit={onSubmit} isGeneratingPdf={isGeneratingPdf} onCreateNew={handleCreateNew} isDark={isDark} totalCharges={totalCharges} />
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-soft dark:border-slate-700 dark:bg-slate-900">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Live Preview</p>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Professional Receipt</h2>
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Auto-updating</div>
              </div>
              <AnimatePresence mode="wait">
                {showPreview ? (
                  <motion.div key="preview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full space-y-4">
                    <ReceiptPreview values={values} isDark={isDark} previewRef={previewRef} />
                    <div className="flex flex-wrap gap-3">
                      <button type="button" onClick={handleDownloadPdf} className="flex items-center gap-2 rounded-2xl bg-accent px-4 py-2.5 font-semibold text-white transition hover:bg-accent/90">
                        {isGeneratingPdf ? <FiLoader className="animate-spin" /> : <FiDownload />} Download PDF
                      </button>
                      <button type="button" onClick={handlePrint} className="flex items-center gap-2 rounded-2xl border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 transition hover:border-accent hover:text-accent dark:border-slate-700 dark:text-slate-200">
                        <FiPrinter /> Print Receipt
                      </button>
                      <button type="button" onClick={handleShare} className="flex items-center gap-2 rounded-2xl border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 transition hover:border-accent hover:text-accent dark:border-slate-700 dark:text-slate-200">
                        <FiShare2 /> Share Receipt
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-[24px] border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600 shadow-soft dark:border-slate-700 dark:bg-slate-900">
                    <p className="text-lg font-semibold">Your receipt preview will appear here.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {toast ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg">
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
