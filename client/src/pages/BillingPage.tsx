import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { PlanCard } from '@/features/billing/components/PlanCard';
import { MomoCheckout } from '@/features/billing/components/MomoCheckout';
import { TransactionHistory } from '@/features/billing/components/TransactionHistory';
import { useSubscription } from '@/features/billing/hooks/useSubscription';

export function BillingPage() {
  const { plans, selectedPlanId, checkoutUrl, selectPlan } = useSubscription();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10">
        <section className="space-y-2">
          <h1 className="text-3xl font-semibold">Billing</h1>
          <p className="text-slate-600 dark:text-slate-400">Choose a plan and complete mobile money checkout.</p>
        </section>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} onSelect={selectPlan} />
            ))}
          </div>
          <div className="space-y-4">
            <MomoCheckout checkoutUrl={checkoutUrl} onConfirm={() => window.alert(`Selected plan: ${selectedPlanId}`)} />
            <TransactionHistory transactions={[{ id: 'txn-1', status: 'SUCCESS', amountCents: 1299 }]} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
