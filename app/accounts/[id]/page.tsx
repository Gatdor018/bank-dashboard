import Link from "next/link";
import { notFound } from "next/navigation";
import { accounts, transactions } from "../../mock-data/mock-data";
import TransactionsCard from "../../components/transactionsCard";

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
        <main className="min-h-screen bg-zinc-50 p-6">
            <Link href="/" className="mb-4 inline-block text-blue-600 hover:text-blue-800">
               ← Back to dashboard
            </Link>
            <header className="mb-6">
                <h1 className="text-3xl font-semibold text-zinc-900">
                    {account.userName}
                </h1>
                <p className="text-zinc-600">
                    Account ID: {account.id}
                </p>
            </header>

            <section className="mb-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-md">
                        <h2 className="text-lg font-semibold text-zinc-900">Account Type</h2>
                        <p className="text-zinc-600">{account.accountType}</p>
                    </div>
                    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-md">
                        <h2 className="text-lg font-semibold text-zinc-900">Balance</h2>
                        <p className="text-zinc-600">{formatCurrency(account.balance)}</p>
                    </div>
                    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-md">
                        <h2 className="text-lg font-semibold text-zinc-900">Status</h2>
                        <p className="text-zinc-600">{account.accountStatus}</p>
                    </div>
                    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-md">
                        <h2 className="text-lg font-semibold text-zinc-900">Risk Level</h2>
                        <p className="text-zinc-600">{account.riskLevel}</p>
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
        <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-md">
            <h2 className="text-lg font-semibold text-zinc-900">{label}</h2>
            <p className="text-zinc-600">{value}</p>
        </div>
    );
  } 