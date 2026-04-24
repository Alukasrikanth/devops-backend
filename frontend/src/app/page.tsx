import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div className="animate-fade-in">
        <Image src="/logo.png" alt="Nexus Bank Logo" width={160} height={160} className="hero-logo" priority />
        <h1 className="title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Welcome to <span style={{ color: 'var(--primary)' }}>Nexus Bank</span>
        </h1>
        <p className="muted" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
          Experience the future of digital banking. Secure, seamless, and smarter than ever before. Manage your wealth with intelligent insights and real-time payments.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/login" className="btn" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
            Login to your account
          </Link>
        </div>
      </div>
    </div>
  );
}
