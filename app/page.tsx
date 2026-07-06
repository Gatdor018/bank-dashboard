import DashboardProps from "./components/dashboard";
import { accounts, transactions, alerts } from "./mock-data/mock-data";
import AlertsCard from "./components/alertsCard";
import InsightsSummary from "./components/insightsSummary";

import Link from "next/link";
import ThemeToggle from "./components/themeToggle";

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
    <main className="min-h-screen bg-[#061411] p-6 text-slate-100">
      <header className="mb-6 flex items-start justify-between">
        <h1 className="text-4xl font-semibold text-white">
          Bank of the Future
        </h1>
        <ThemeToggle />
      </header>
      <div className="mt-2 mb-8 px-4 py-3 text-3xl text-[#8fe8c1]">
        Bank Dashboard
      </div>

      {/* Responsive design for different screen sizes */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Dashboard components for displaying KPI cards */}
        <DashboardProps
          label="Total Balance"
          value={formatCurrency(totalBalance)}
          hint="Total User Accounts' Net Balance."
        />
        <DashboardProps
          label="Active Accounts"
          value={activeAccounts.toString()}
        />
        <DashboardProps
          label="Transactions Under Review"
          value={needsReviewTransactions.toString()}
          tone="warning"
        />
        <DashboardProps
          label="Pending Transactions"
          value={pendingTransactions.toString()}
          tone="default"
        />
        <DashboardProps
          label="High Risk Accounts"
          value={highRiskAccounts.toString()}
          tone="danger"
        />
      </section>
      <section className="mt-8">
        <InsightsSummary account={accounts[0]} transactions={transactions} />
      </section>
      <section className="mt-8">
        <AlertsCard alerts={alerts} />
      </section>
      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/accounts" 
        className="group flex items-center justify-between rounded-3xl border border-[#164d33] bg-[#0d3126] p-5 shadow-xl shadow-black/20 hover:border-[#35d794]"
        >
          <div>
            <p className="text-lg font-semibold text-white">Accounts</p>
            <p className="text-white">View Client Accounts.</p>
          </div>
          <span className="text-[#35d794] text-2xl">→</span>
        </Link>
        <Link href="/transactions" className="group flex items-center justify-between rounded-3xl border border-[#164d33] bg-[#0d3126] p-5 shadow-xl shadow-black/20 hover:border-[#35d794]">
          <div>
            <p className="text-lg font-semibold text-white">Transactions</p>
            <p className="text-white">View Client Transactions.</p>
          </div>
          <span className="text-[#35d794] text-2xl">→</span>
        </Link>
      </section>
    </main>
  );
}
