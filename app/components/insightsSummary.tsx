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
    <section className="mt-12  p-4 shadow-xl shadow-black/20">
      <h2 className="text-lg font-semibold text-white mb-2">Insights Summary</h2>
      <div className="flex flex-row justify-between gap-4 rounded-3xl p-4 shadow-xl shadow-black/20">
        {insights.length > 0 ? (
            <ul className="flex flex-wrap items-center gap-4 justify-between text-white p-4 w-full">
            {insights.map((insight, index) => (
                <li key={index} className="flex gap-2">
                    <span className={` px-3 py-2 text-sm font-medium ${insight.includes('high-risk') ? ' text-[#e20707]' : ''} ${insight.includes('overdrawn') ? ' text-[#eecf4f]' : ''} ${insight.includes('under review') ? 'text-blue-500' : ''} ${insight.includes('declined') ? 'text-[#ae7c47]' : ''}`}>{insight}</span>
                </li>
            ))}
            </ul>
        ) : (
            <p className="text-white">No significant insights to report.</p>
        )}
    </div>
    </section>
  );
}