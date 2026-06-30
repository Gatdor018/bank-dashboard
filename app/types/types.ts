// create a union that displays the transaction status
export type TransactionStatus = "pending" | "completed" | "declined" | "in-review";
// Customer transaction type
export type TransactionType = "deposit" | "transfer" | "withdrawal";
// Account risk exposure 
export type RiskLevel = "high" | "medium" | "low";
// Account status
export type AccountStatus = "active" | "inactive" | "frozen" | "closed";
// type of customer account
export type AccountType = "checking" | "savings" | "highYield";

// create typescript interfaces that keeps track of the data types

export interface Account {
    id: string;
    userName: string;
    accountType: AccountType;
    accountStatus: AccountStatus;
    riskLevel: RiskLevel;
    balance: number;
}

export interface Transaction {
    id: string;
    accountId: string;
    date: string;
    description: string;
    type: TransactionType;
    amount: number;
    transactionStatus: TransactionStatus;
    riskLevel: RiskLevel;
}

export interface Alert {
    id:  string;
    riskLevel: RiskLevel;
    alertMessage: string;
    alertTime: string;
    reviewed: boolean;
}