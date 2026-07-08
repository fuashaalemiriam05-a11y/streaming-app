type MomoCheckoutProps = {
  onConfirm?: () => void;
  checkoutUrl?: string;
};

export function MomoCheckout({ onConfirm, checkoutUrl }: MomoCheckoutProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-semibold">Mobile money checkout</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Complete your payment securely with the checkout link below.</p>
      {checkoutUrl ? <a className="mt-4 inline-block text-sm font-medium text-sky-600" href={checkoutUrl}>Open checkout</a> : null}
      <button className="mt-4 rounded bg-emerald-600 px-4 py-2 text-sm text-white" type="button" onClick={onConfirm}>
        Confirm payment
      </button>
    </div>
  );
}
