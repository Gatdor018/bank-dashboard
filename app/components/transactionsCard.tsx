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
    // State for filtering transactions by status, risk level, and type. 
    // Initialized to "all" for each filter.

    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [riskFilter, setRiskFilter] = useState<string>("all");
    const [typeFilter, setTypeFilter] = useState<string>("all");


    // Filter transactions based on the search term
    const filteredTransactions = transactions.filter((t) => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || t.transactionStatus === statusFilter;
        const matchesRisk = riskFilter === "all" || t.riskLevel === riskFilter;
        const matchesType = typeFilter === "all" || t.transactionType === typeFilter;

        return matchesSearch && matchesStatus && matchesRisk && matchesType;
    });
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
            <div className="mt-3 flex flex-wrap flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
               <h2 className="text-lg font-semibold text-white">
                {/* Heading for the transactions section */}
                Recent Transactions
               </h2>

                <select
                    aria-label="Filter by transaction type"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full rounded-2xl border border-[#164d33] bg-[#0d2f23] px-3 py-2 text-sm text-slate-100 placeholder-slate-500 shadow-black/30 focus:border-[#35d794] focus:ring-1 focus:outline-none focus:ring-[#35d794]/20 sm:w-64"
                >
                    <option value="all">Transaction Types</option>
                    <option value="deposit">Deposit</option>
                    <option value="withdrawal">Withdrawal</option>
                    <option value="transfer">Transfer</option>
                </select>
                <select
                    aria-label="Filter by status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full rounded-2xl border border-[#164d33] bg-[#0d2f23] px-3 py-2 text-sm text-slate-100 placeholder-slate-500 shadow-black/30 focus:border-[#35d794] focus:ring-1 focus:outline-none focus:ring-[#35d794]/20 sm:w-64"
                >
                    <option value="all">Statuses</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="declined">Declined</option>
                    <option value="in-review">In Review</option>
                </select>
                <select
                    aria-label="Filter by risk level"
                    value={riskFilter}
                    onChange={(e) => setRiskFilter(e.target.value)}
                    className="w-full rounded-2xl border border-[#164d33] bg-[#0d2f23] px-3 py-2 text-sm text-slate-100 shadow-black/30 focus:border-[#35d794] focus:ring-1 focus:outline-none focus:ring-[#35d794]/20 sm:w-64"
                >
                    <option value="all">Risk Levels</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>

                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-2xl border border-[#164d33] bg-[#0d2f23] px-3 py-2 text-sm text-slate-100 placeholder-slate-500 shadow-black/30 focus:border-[#35d794] focus:ring-1 focus:outline-none focus:ring-[#35d794]/20 sm:w-64"
                />
            </div>
            {/* Display how many transactions matched the search term */}
            <p className="text-white text-lg font-medium mb-3">
                {filteredTransactions.length} of {transactions.length} Transactions
            </p>
            {/* Display the filtered transactions table */}
            <TransactionsTable transactions={sortedTransactions} 
            sort={sort} 
            onSort={handleSort}/>
        </section>
)}