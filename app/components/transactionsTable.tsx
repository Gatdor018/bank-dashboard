import type { Transaction } from "@/app/types/types";
import ColoredBadge from "./colored-badge";

// Recieves an array of transactions and displays them in a table format
interface TransactionsTableProps {
    transactions: Transaction[];
}
function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
    }).format(amount);
}

export default function TransactionsTable({ transactions }: TransactionsTableProps) {
    return (
        <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-md">
            <table className="min-w-full text-sm">
                <thead className="border-b border-zinc-200 bg-zinc-50 text-zinc-500 text-left tracking-wide uppercase">
                    <tr>
                        <th className="px-4 py-3 font-medium">Date</th>
                        <th className="px-6 py-3 font-medium">Description</th>
                        <th className="px-6 py-3 font-medium">Type</th>
                        <th className="px-6 py-3 font-medium">Amount</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                        <th className="px-6 py-3 font-medium">Risk</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                    {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-zinc-50">
                            <td className="px-4 py-3 text-zinc-600">{transaction.date}</td>
                            <td className="px-6 py-3 text-zinc-900 font-medium">{transaction.description}</td>
                            <td className="px-4 py-3 text-zinc-600">{transaction.type}</td>
                            <td className={`px-4 py-3 font-medium ${transaction.amount < 0 ? "text-zinc-900" : "text-green-600"}`}>
                                {formatCurrency(transaction.amount)}
                                </td>
                            <td className="px-6 py-3">
                                <ColoredBadge kind="status" value={transaction.transactionStatus} />
                            </td>
                            <td className="px-6 py-3">
                                <ColoredBadge kind="risk" value={transaction.riskLevel} />
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}