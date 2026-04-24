"use client";

import { useState } from "react";
import { Account } from "@/lib/api";

type Result =
  | { ok: true; paymentId: string; authorizationId: string; status: string }
  | { ok: false; message: string };

export default function PaymentsDrawer({ 
  onClose, 
  accounts 
}: { 
  onClose: () => void; 
  accounts: Account[] 
}) {
  const [fromAccount, setFromAccount] = useState(accounts[0]?.id || "");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    setLoading(true);

    try {
      // Simulate backend call to the authorization endpoint
      const res = await fetch("http://localhost:8081/api/payments/authorize", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fromAccount,
          toAccount,
          amount: Number(amount),
          currency: "USD"
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setResult({ ok: false, message: data?.message ?? "Request failed" });
      } else {
        setResult({
          ok: true,
          paymentId: data.paymentId,
          authorizationId: data.authorizationId,
          status: data.status
        });
      }
    } catch (err: unknown) {
      setResult({ ok: false, message: "Network error. Is the backend running?" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 className="title" style={{ fontSize: '1.5rem', marginBottom: 0 }}>New Payment</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
        </div>

        {result?.ok ? (
          <div className="animate-fade-in">
            <div className="pill success" style={{ width: '100%', padding: '1rem', marginBottom: '1.5rem' }}>
              Payment Authorised Successfully
            </div>
            <div className="card" style={{ marginBottom: '2rem' }}>
              <div className="muted" style={{ fontSize: '0.9rem', display: 'grid', gap: '8px' }}>
                <div>Status: <b style={{ color: 'var(--success)' }}>{result.status}</b></div>
                <div>Payment ID: <b>{result.paymentId}</b></div>
                <div>Authorization ID: <b>{result.authorizationId}</b></div>
              </div>
            </div>
            <button className="btn" style={{ width: '100%' }} onClick={onClose}>Done</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="form-group">
              <label>From Account</label>
              <select value={fromAccount} onChange={(e) => setFromAccount(e.target.value)}>
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>{acc.name} ({acc.id})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Recipient Account Number</label>
              <input 
                value={toAccount} 
                onChange={(e) => setToAccount(e.target.value)} 
                placeholder="ACC-XXXX" 
                required
              />
            </div>

            <div className="form-group">
              <label>Amount (USD)</label>
              <input 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                type="number" 
                step="0.01" 
                placeholder="0.00" 
                required
              />
            </div>

            {result && !result.ok && (
              <div className="pill error" style={{ width: '100%', marginBottom: '1.5rem', justifyContent: 'center' }}>
                {result.message}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button className="btn" type="submit" style={{ flex: 1 }} disabled={loading}>
                {loading ? "Processing..." : "Confirm Payment"}
              </button>
              <button className="btn btn-secondary" type="button" onClick={onClose} disabled={loading}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
