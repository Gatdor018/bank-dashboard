import DashboardProps from "./components/dashboard";
import { accounts, transactions, alerts } from "./mock-data/mock-data";
import TransactionsCard  from "./components/transactionsCard";
import AccountsList from "./components/accountsList";
import AlertsCard from "./components/alertsCard";
import InsightsSummary from "./components/insightsSummary";

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
  const pendingTransactions = transactions.filter((transaction) => transaction.transactionStatus === "pending").length;

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
      <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-xs text-green-700">
            Demo dashboard — all data is mock and no action moves real money.
      </div>

      {/* Responsive design for different screen sizes */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Dashboard components for displaying KPI cards */}
        <DashboardProps
          label="Total Balance"
          value={formatCurrency(totalBalance)}
          hint="Total User Accounts' Net Balance."
        />
        <DashboardProps
          label="Active Accounts"
          value={activeAccounts.toString()}
          hint={`of ${accounts.length} accounts are currently active.`}
        />
        <DashboardProps
          label="Transactions Under"
          value={needsReviewTransactions.toString()}
          hint={"Transactions that require further review."}
          tone="warning"
        />
        <DashboardProps
          label="Pending Transactions"
          value={pendingTransactions.toString()}
          hint={"Transactions that are pending."}
          tone="default"
        />
        <DashboardProps
          label="High Risk Accounts"
          value={highRiskAccounts.toString()}
          hint={"Accounts with high risk levels."}
          tone="danger"
        />
      </section>
      <section className="mt-8">
        <InsightsSummary account={accounts[0]} transactions={transactions} />
      </section>
      <section className="mt-8">
        <AlertsCard alerts={alerts} />
      </section>
      <AccountsList accounts={accounts} />
      <section className="mt-8">
        <TransactionsCard transactions={transactions} />
      </section>
    </main>
  );
}
