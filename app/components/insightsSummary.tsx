import type { Account, Transaction } from "../types/types";
interface InsightsSummaryProps {
  account: Account;
  transactions: Transaction[];
}

export default function InsightsSummary({ account, transactions }: InsightsSummaryProps) {
  const highRiskTxn = transactions.filter(t => t.riskLevel === "high").length;
  const overdrawn = account.balance < 0 ? 1 : 0;
  const inReview = transactions.filter(t => t.transactionStatus === "in-review").length;
  const declined = transactions.filter(t => t.transactionStatus === "declined").length;

  const insights: string[] = [];
    if (highRiskTxn > 0) {
        insights.push(`${highRiskTxn} high-risk transactions.`);
    }
    if (overdrawn > 0) {
        insights.push(`${overdrawn} account(s) currently overdrawn.`);
    }
    if (inReview > 0) {
        insights.push(`${inReview} transactions under review.`);
    }
    if (declined > 0) {
        insights.push(`${declined} declined transactions.`);
    }

  return (
    <section>
      <h2 className="text-lg font-semibold text-zinc-900 mb-2">Insights Summary</h2>
      <div className="flex flex-row justify-between gap-4 rounded-lg border border-zinc-200 bg-white p-4 shadow-md">
        {insights.length > 0 ? (
            <ul className="flex items-center gap-4 justify-between text-zinc-600 border border-zinc-900 rounded-lg p-4 w-full">
            {insights.map((insight, index) => (
                <li key={index} className="flex gap-2">
                    <span className={`text-zinc-900 border border-zinc-900 rounded-lg p-2 ${insight.includes('high-risk') ? 'bg-red-100 text-red-800' : ''} ${insight.includes('overdrawn') ? 'bg-yellow-100 text-yellow-800' : ''} ${insight.includes('under review') ? 'bg-blue-100 text-blue-800' : ''} ${insight.includes('declined') ? 'bg-gray-100 text-gray-800' : ''}`}>{insight}</span>
                </li>
            ))}
            </ul>
        ) : (
            <p className="text-zinc-600">No significant insights to report.</p>
        )}
    </div>
    </section>
  );
}