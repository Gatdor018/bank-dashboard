"use client"; // Client side component

import { useState } from "react";
import type { Transaction } from "@/app/types/types";
import TransactionsTable from "./transactionsTable";

// Unions for sorting, we can sort by date or amount, and the direction can be ascending or descending.
type SortKey = "date" | "amount";
type SortDirection = "asc" | "desc";
// Shape for the TransactionsCard component, which includes an array of transactions.
interface TransactionsProps {
    transactions: Transaction[];
}
    
// state for sorting transactions
export default function TransactionsCard({ transactions }: TransactionsProps) {
    const [searchTerm, setSearchTerm] = useState("");
    // State for sorting transactions, initialized to sort by date in descending order.
    const [sort, setSort] = useState<{key: SortKey, direction: SortDirection}>({
        key: "date", 
        direction: "desc",
    });

    // Filter transactions based on the search term
    const filteredTransactions = transactions.filter((t) =>
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Make a copy of the filtered transactions and sort them.
    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
        let comparison = 0;

        if (sort.key === "amount") {
            comparison = a.amount - b.amount;
        } else {
            comparison = a.date.localeCompare(b.date);
        }

        return sort.direction === "asc" 
        ? comparison 
        : -comparison;
    });
    // Function to update state after sorting when a column header is clicked. 
    // It toggles the sort direction if the same column is clicked again, or sets it to ascending if a different column is clicked.
    function handleSort(key: SortKey) {
        setSort((currentSort) => {
            if (currentSort.key === key) {
                return { key,
                    direction: currentSort.direction === "asc" ? "desc" : "asc",
                };
            }
            // If the key is different, set it to ascending by default
            return { key, direction: "asc" };
        });
    }

    return (
        <section className="mt-8">
            <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
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
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900
                     placeholder-zinc-400 shadow-sm focus:border-blue-500 focus:ring-1 focus:outline-none focus:ring-blue-500 sm:w-64"
                />
            </div>
            {/* Display how many transactions matched the search term */}
            <p className="text-zinc-900 text-lg font-medium mb-3">
                {filteredTransactions.length} of {transactions.length} Transactions
            </p>
            {/* Display the filtered transactions table */}
            <TransactionsTable transactions={sortedTransactions} 
            sort={sort} 
            onSort={handleSort}/>
        </section>
)}