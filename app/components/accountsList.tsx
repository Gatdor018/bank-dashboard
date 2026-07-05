import Link from "next/link";
import { Account } from "../types/types";

interface AccountsListProps {
  accounts: Account[];
}

export default function AccountsList({ accounts }: AccountsListProps) {
  return (
    <section className="mt-8">
        <h2 className="mb-3 text-xl font-semibold text-zinc-900">Client Accounts</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {accounts.map((account) => (
                <Link
                    key={account.id}
                    href={`/accounts/${account.id}`}
                    className="rounded-lg border border-zinc-200 bg-white p-4 shadow-md hover:bg-zinc-50"
                >
                    <h3 className="text-lg font-semibold text-zinc-900">{account.userName}</h3>
                    <p className="text-zinc-600">{account.id}</p>
                    <div>
                        <span className="text-zinc-600">Type: {account.accountType}</span>
                        <span className="text-zinc-600 ml-2">Status: {account.accountStatus}</span>
                        <span className="text-zinc-600 ml-2">Risk: {account.riskLevel}</span>
                    </div>
                </Link>
            ))}
        </div>
    </section>
  );
}   
