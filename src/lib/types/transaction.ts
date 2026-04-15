export type TransactionType = "Masuk" | "Keluar";

export type Transaction = {
  id: string;
  date: string;
  type: TransactionType;
  description: string;
  category: string;
  method: string;
  totalAmount: number;
};
