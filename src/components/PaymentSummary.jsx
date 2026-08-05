import { formatCurrency } from '../utils/calculations';

export const PaymentSummary = ({ values }) => (
  <div className="mt-6 rounded-2xl  p-4">
    {/* <div className="flex items-center justify-between text-sm">
      <span className="text-slate-600">Total Amount</span>
      <span className="font-semibold">{formatCurrency(Number(values.totalAmount) || 0)}</span>
    </div> */}
  </div>
);
