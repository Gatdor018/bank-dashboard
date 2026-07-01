import DashboardProps from "./components/dashboard";
import { accounts, transactions } from "./mock-data/mock-data";
import TransactionsCard  from "./components/transactionsCard";

// format the currrency to USD
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export default function Home() {
  // reduce(): accumulate the total balance of all accounts
  const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0);
  // filter(): get the number of accounts that are active
  const activeAccounts = accounts.filter((account) => account.accountStatus === "active").length;

  const needsReviewTransactions = transactions.filter((transaction) => transaction.transactionStatus === "in-review").length;

  const highRiskAccounts = accounts.filter((account) => account.riskLevel === "high").length;
  return (
    <main className="min-h-screen bg-zinc-50 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-zinc-900">
          Bank of the Future
        </h1>
        <p className="text-zinc-600">
          Bank Dashboard
        </p>
      </header>

      {/* Responsive design for different screen sizes */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Dashboard components for displaying KPI cards */}
        <DashboardProps
          label="Total Balance"
          value={formatCurrency(totalBalance)}
          hint="This is the total balance of all accounts combined."
        />
        <DashboardProps
          label="Active Accounts"
          value={activeAccounts.toString()}
          hint={`of ${accounts.length} accounts are currently active.`}
        />
        <DashboardProps
          label="Transactions Under Review"
          value={needsReviewTransactions.toString()}
          hint={`of ${transactions.length} transactions are under review.`}
          tone="warning"
        />
        <DashboardProps
          label="High Risk Accounts"
          value={highRiskAccounts.toString()}
          tone="danger"
        />
      </section>
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-zinc-900">
          Recent Transactions
        </h2>
        <TransactionsCard transactions={transactions} />
      </section>
    </main>
  );
}
