import type { Metadata } from 'next';
import './globals.css';
import ApolloWrapper from './components/ApolloWrapper';

export const metadata: Metadata = {
  title: 'Nexus Bank',
  description: 'Experience the future of digital banking.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
