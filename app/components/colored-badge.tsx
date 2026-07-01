import type { TransactionStatus, RiskLevel } from "@/app/types/types";
// an interface for either status badge or risk level badge

interface BadgeProps {
    kind: "status" | "risk";
    value: TransactionStatus | RiskLevel;
}

// Lookup tables: whose keys are the transactionStatus and riskLevel values.
const statusClasses: Record<TransactionStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    declined: "bg-red-100 text-red-800",
    "in-review": "bg-blue-100 text-blue-800",
};
const riskClasses: Record<RiskLevel, string> = {
    high: "bg-red-100 text-red-900",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
};

export default function ColoredBadge({ kind, value }: BadgeProps) {
    const classes = kind === "status" 
    ? statusClasses[value as TransactionStatus] 
    : riskClasses[value as RiskLevel];
    return (
        <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium capitalize ${classes}`}>
            {value}
        </span>
    );
}