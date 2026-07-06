import Link from "next/link";
import { Account } from "../types/types";

interface AccountsListProps {
  accounts: Account[];
}

export default function AccountsList({ accounts }: AccountsListProps) {
  return (
    <section className="mt-8">
        <h2 className="mb-3 text-xl font-semibold text-white">Client Accounts</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {accounts.map((account) => (
                <Link
                    key={account.id}
                    href={`/accounts/${account.id}`}
                    className="rounded-3xl border border-[#164d33] bg-[#0d2f23] p-4 shadow-xl shadow-black/20 hover:border-[#35d794] hover:bg-[#113d2f]"
                >
                    <h3 className="text-lg font-semibold text-white">{account.userName}</h3>
                    <p className="text-white">{account.id}</p>
                    <div>
                        <span className="text-white">Type: {account.accountType}</span>
                        <span className="text-white ml-2">Status: {account.accountStatus}</span>
                        <span className="text-white ml-2">Risk: {account.riskLevel}</span>
                    </div>
                </Link>
            ))}
        </div>
    </section>
  );
}   
