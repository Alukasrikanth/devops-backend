export type Account = {
  id: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
};

export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
};

export async function fetchAccounts(): Promise<Account[]> {
  // Simulate Hasura fetch
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'ACC-1001', name: 'Primary Checking', type: 'Checking', balance: 12450.50, currency: 'USD' },
        { id: 'ACC-2002', name: 'Digital Savings', type: 'Savings', balance: 45200.00, currency: 'USD' },
        { id: 'ACC-3003', name: 'Investment Core', type: 'Investment', balance: 8900.25, currency: 'USD' },
      ]);
    }, 1000);
  });
}

export async function fetchTransactions(): Promise<Transaction[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'TX-1', date: '2026-04-22', description: 'Amazon.com Checkout', amount: -124.50, status: 'completed' },
        { id: 'TX-2', date: '2026-04-21', description: 'Monthly Salary Deposit', amount: 4500.00, status: 'completed' },
        { id: 'TX-3', date: '2026-04-20', description: 'Starbucks Coffee', amount: -12.25, status: 'completed' },
        { id: 'TX-4', date: '2026-04-19', description: 'Internal Transfer', amount: 500.00, status: 'completed' },
      ]);
    }, 1200);
  });
}
