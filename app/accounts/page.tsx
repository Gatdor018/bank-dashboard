import Link from "next/link";
import { accounts } from "@/app/mock-data/mock-data";
import AccountsList from "@/app/components/accountsList";

export default function AccountsIndexPage() {
  return (
    <main className="min-h-screen bg-[#061411] p-6 text-white">
        <Link href="/" className="mb-4 inline-block text-[#35d794] hover:text-[#7ef0c0]">
            ← Back to dashboard
        </Link>
        <AccountsList accounts={accounts} />
    </main>
  );
}