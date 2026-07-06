import Link from "next/link";
import { notFound } from "next/navigation";
import { accounts, transactions } from "@/app/mock-data/mock-data";
import TransactionsCard from "@/app/components/transactionsCard";

// format the currrency to USD
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  }).format(amount);
}
// Account page component that displays account details and transactions
export default async function AccountPage(
  { params }: { 
    params: Promise<{ id: string }>;
   }) {
  const { id } = await params;
  // Find the account with the matching ID
  const account = accounts.find((acc) => acc.id === id);

  // If the account is not found, return a 404 page
  if (!account) {
    notFound();
  }
  // Filter transactions for the specific account
  const accountTransactions = transactions.filter(
    (t) => t.accountId === account.id);

  return (
    <main className="min-h-screen bg-[#061411] p-6 text-white">
      <Link href="/accounts" className="mb-4 inline-block text-[#35d794] hover:text-[#7ef0c0]">
         ← Back to accounts
      </Link>
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-white">
          {account.userName}
        </h1>
        <p className="text-white">
          Account ID: {account.id}
        </p>
      </header>

      <section className="mb-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-[#164d33] bg-[#0d2f23] p-4 shadow-xl shadow-black/20">
            <h2 className="text-lg font-semibold text-white">Account Type</h2>
            <p className="text-white">{account.accountType}</p>
          </div>
          <div className="rounded-3xl border border-[#164d33] bg-[#0d2f23] p-4 shadow-xl shadow-black/20">
            <h2 className="text-lg font-semibold text-white">Balance</h2>
            <p className="text-white">{formatCurrency(account.balance)}</p>
          </div>
          <div className="rounded-3xl border border-[#164d33] bg-[#0d2f23] p-4 shadow-xl shadow-black/20">
            <h2 className="text-lg font-semibold text-white">Status</h2>
            <p className="text-white">{account.accountStatus}</p>
          </div>
          <div className="rounded-3xl border border-[#164d33] bg-[#0d2f23] p-4 shadow-xl shadow-black/20">
            <h2 className="text-lg font-semibold text-white">Risk Level</h2>
            <p className="text-white">{account.riskLevel}</p>
          </div>
        </div>
      </section>

      {/* Transactions Card */}
      <TransactionsCard transactions={accountTransactions} />
    </main>
  );

  }

    function DetailItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-3xl border border-[#164d33] bg-[#0d2f23] p-4 shadow-xl shadow-black/20">
            <h2 className="text-lg font-semibold text-white">{label}</h2>
            <p className="text-white">{value}</p>
        </div>
    );
  } 
