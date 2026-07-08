import type { BillingPlan } from '../types';

type PlanCardProps = {
  plan: BillingPlan;
  onSelect?: (planId: string) => void;
};

export function PlanCard({ plan, onSelect }: PlanCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-semibold">{plan.name}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{plan.priceCents === 0 ? 'Free tier' : `$${(plan.priceCents / 100).toFixed(2)} / month`}</p>
      <button className="mt-4 rounded bg-slate-900 px-4 py-2 text-sm text-white" type="button" onClick={() => onSelect?.(plan.id)}>
        Choose {plan.name}
      </button>
    </div>
  );
}
