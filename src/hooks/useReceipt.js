import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues } from '../constants';
import { calculateBalance, calculateTotalKm, generateBillNumber, sumCharges } from '../utils/calculations';
import { loadReceiptState, saveReceiptState } from '../utils/storage';

export const useReceipt = () => {
  const [isDark, setIsDark] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [toast, setToast] = useState('');
  const [showPreview, setShowPreview] = useState(true);

  const form = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const { watch, setValue, reset, formState: { errors } } = form;

  const values = watch();

  useEffect(() => {
    const saved = loadReceiptState();
    if (saved) {
      const restored = { ...defaultValues, ...saved, date: saved.date || defaultValues.date };
      if (!restored.billNumber) {
        restored.billNumber = generateBillNumber(restored.date);
      }
      reset(restored);
    } else {
      setValue('billNumber', generateBillNumber(defaultValues.date));
    }
  }, [reset, setValue]);

  useEffect(() => {
    saveReceiptState(values);
  }, [values]);

  useEffect(() => {
    const startKm = Number(values.startingKm) || 0;
    const endKm = Number(values.endingKm) || 0;
    setValue('totalKm', Math.max(0, endKm - startKm), { shouldDirty: true });
  }, [values.startingKm, values.endingKm, setValue]);

  const totalCharges = useMemo(() => sumCharges(values), [values]);
  const totalAmount = useMemo(() => totalCharges, [totalCharges]);
  const balanceAmount = useMemo(() => calculateBalance(totalAmount, Number(values.advance) || 0), [totalAmount, values.advance]);

  useEffect(() => {
    setValue('totalAmount', totalAmount, { shouldDirty: true });
    setValue('balanceAmount', balanceAmount, { shouldDirty: true });
  }, [totalAmount, balanceAmount, setValue]);

  const toggleDarkMode = () => setIsDark((prev) => !prev);
  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2500);
  };

  return {
    form,
    values,
    errors,
    isDark,
    isGeneratingPdf,
    toast,
    showPreview,
    setShowPreview,
    totalCharges,
    balanceAmount,
    toggleDarkMode,
    showToast,
    setIsGeneratingPdf,
  };
};
