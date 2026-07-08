type Transaction = {
  id: string;
  status: string;
  amountCents: number;
};

type TransactionHistoryProps = {
  transactions?: Transaction[];
};

export function TransactionHistory({ transactions = [] }: TransactionHistoryProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-semibold">Recent transactions</h3>
      <ul className="mt-4 space-y-2">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="flex items-center justify-between rounded border px-3 py-2 text-sm">
            <span>{transaction.id}</span>
            <span>{transaction.status}</span>
            <span>${(transaction.amountCents / 100).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
