"use client"; // Cleint side component

import { useState } from "react";
import type { Transaction } from "@/app/types/types";
import TransactionsTable from "./transactionsTable";

// Unions for sorting
type SortKey = "date" | "amount" | "description";
type SortDirection = "asc" | "desc";

interface TransactionsProps {
    transactions: Transaction[];
}
    
// state for sorting transactions
export default function TransactionsCard({ transactions }: TransactionsProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const [sort, setSort] = useState<{key: SortKey, direction: SortDirection}>({key: "date", direction: "desc"});


    const filteredTransactions = transactions.filter((t) =>
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="mt-8">
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
               <h2 className="text-lg font-semibold text-zinc-900">
                {/* Heading for the transactions section */}
                Recent Transactions
               </h2> 
                <input
                    type="text"
                    placeholder="Search transactions..."
                    aria-label="Search transactions"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-blue-500 focus:ring-1 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50 sm:w-64"
                />
            </div>
            {/* Display how many transactions matched */}
            <p className="text-zinc-900 text-lg font-medium mb-3">
                {filteredTransactions.length} of {transactions.length} Transactions
            </p>
            {/* Display the filtered transactions table */}
            <TransactionsTable transactions={filteredTransactions} />
        </section>
)}