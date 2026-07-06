import Link from "next/link";
import { transactions } from "@/app/mock-data/mock-data";
import TransactionsCard from "@/app/components/transactionsCard";

export default function TransactionsPage() {
  return (
    <main className="min-h-screen bg-[#061411] p-6 text-white">
        <Link href="/" className="mb-4 inline-block text-[#35d794] hover:text-[#7ef0c0]">
            ← Back to dashboard
        </Link>
        <TransactionsCard transactions={transactions} />
    </main>
  );
}