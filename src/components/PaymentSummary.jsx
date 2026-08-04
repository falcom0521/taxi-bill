import { formatCurrency } from '../utils/calculations';

export const PaymentSummary = ({ values }) => (
  <div className="mt-6 rounded-2xl border border-slate-200 p-4">
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-600">Total Amount</span>
      <span className="font-semibold">{formatCurrency(Number(values.totalAmount) || 0)}</span>
    </div>
    <div className="mt-2 flex items-center justify-between text-sm">
      <span className="text-slate-600">Advance Paid</span>
      <span>{formatCurrency(Number(values.advance) || 0)}</span>
    </div>
    <div className="mt-2 flex items-center justify-between text-sm">
      <span className="text-slate-600">Balance Amount</span>
      <span className="font-semibold text-accent">{formatCurrency(Number(values.balanceAmount) || 0)}</span>
    </div>
  </div>
);
