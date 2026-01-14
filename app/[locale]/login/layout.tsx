import type { Metadata } from 'next';
import '../../../styles/globals.css'

export const metadata: Metadata = {
  title: 'Login - EGLO',
  description: 'Sign in to your EGLO account',
  icons: {
    icon: '/assets/images/icon.png?v=1',
    shortcut: '/assets/images/icon.png?v=1',
    apple: '/assets/images/icon.png?v=1',
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 