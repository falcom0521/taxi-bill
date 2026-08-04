import { formatCurrency } from '../utils/calculations';
import { chargeFields } from '../constants';

export const ChargesTable = ({ values }) => (
  <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
    <table className="min-w-full text-sm">
      <thead className="bg-slate-100">
        <tr>
          <th className="px-4 py-3 text-left font-semibold">Description</th>
          <th className="px-4 py-3 text-right font-semibold">Amount</th>
        </tr>
      </thead>
      <tbody>
        {chargeFields.map((field) => (
          <tr key={field.key} className="border-t border-slate-200">
            <td className="px-4 py-3">{field.label}</td>
            <td className="px-4 py-3 text-right">{formatCurrency(values[field.key] || 0)}</td>
          </tr>
        ))}
        <tr className="border-t border-slate-200 bg-slate-50">
          <td className="px-4 py-3 font-semibold">Total Amount</td>
          <td className="px-4 py-3 text-right font-semibold">{formatCurrency(Number(values.totalAmount) || 0)}</td>
        </tr>
        <tr className="border-t border-slate-200">
          <td className="px-4 py-3">Advance Paid</td>
          <td className="px-4 py-3 text-right">{formatCurrency(Number(values.advance) || 0)}</td>
        </tr>
        <tr className="border-t border-slate-200 bg-slate-50">
          <td className="px-4 py-3 font-semibold">Balance Amount</td>
          <td className="px-4 py-3 text-right font-semibold">{formatCurrency(Number(values.balanceAmount) || 0)}</td>
        </tr>
      </tbody>
    </table>
  </div>
);
