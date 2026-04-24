"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, clearSession } from "@/lib/session";
import { fetchAccounts, fetchTransactions, Account, Transaction } from "@/lib/api";
import PaymentsDrawer from "../components/PaymentsDrawer";
import { gql } from "@apollo/client";
import { useSubscription } from "@apollo/client/react";

const PAYMENTS_SUBSCRIPTION = gql`
  subscription GetPayments {
    payments(order_by: { created_at: desc }, limit: 10) {
      id
      from_account
      to_account
      amount
      currency
      status
      created_at
    }
  }
`;

export default function DashboardPage() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [mockTransactions, setMockTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);

  const { data: subData } = useSubscription(PAYMENTS_SUBSCRIPTION);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.push("/login");
      return;
    }

    async function loadData() {
      const [accData, txData] = await Promise.all([fetchAccounts(), fetchTransactions()]);
      setAccounts(accData);
      setMockTransactions(txData);
      setLoading(false);
    }

    loadData();
  }, [router]);

  function handleLogout() {
    clearSession();
    router.push("/");
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div className="muted">Initialising secure session...</div>
      </div>
    );
  }

  // Map the Hasura payments to the UI transaction format
  const realTransactions: Transaction[] = subData?.payments?.map((p: any) => ({
    id: p.id.split('-')[0], // Shorten UUID for display
    date: new Date(p.created_at).toLocaleDateString(),
    description: `Transfer to ${p.to_account}`,
    amount: -Math.abs(p.amount), // Outgoing transfer
    status: p.status.toLowerCase() as any,
  })) || [];

  // Combine real transactions from Hasura with the mocked ones, taking real ones first.
  const displayTransactions = [...realTransactions, ...mockTransactions].slice(0, 10);

  return (
    <div className="dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 className="title" style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Portfolio Overview</h1>
          <p className="muted">Welcome back, {getSession()?.username}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn" onClick={() => setShowDrawer(true)}>Pay Someone</button>
          <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="grid" style={{ marginBottom: '3rem' }}>
        {accounts.map(acc => (
          <div key={acc.id} className="stat-card animate-fade-in">
            <div className="stat-label">{acc.name}</div>
            <div className="stat-value">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: acc.currency }).format(acc.balance)}
            </div>
            <div className="muted" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>{acc.id} • {acc.type}</div>
          </div>
        ))}
      </div>

      <div className="card animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="title" style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Recent Transactions (Live)</h2>
        <div className="transaction-list">
          {displayTransactions.map((tx, idx) => (
            <div key={`${tx.id}-${idx}`} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '1rem 0', 
              borderBottom: '1px solid var(--border)',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: 600 }}>{tx.description}</div>
                <div className="muted" style={{ fontSize: '0.8rem' }}>{tx.date} • {tx.id}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  fontWeight: 700, 
                  color: tx.amount < 0 ? 'var(--error)' : 'var(--success)' 
                }}>
                  {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toFixed(2)}
                </div>
                <div className="pill" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', marginTop: '0.2rem' }}>
                  {tx.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDrawer && (
        <PaymentsDrawer 
          onClose={() => setShowDrawer(false)} 
          accounts={accounts}
        />
      )}
    </div>
  );
}
