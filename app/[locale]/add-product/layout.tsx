import type { Metadata } from 'next';
import '../../../styles/globals.css'

export const metadata: Metadata = {
  title: 'Add Product - EGLO',
  description: 'Add a new product to your EGLO store',
  icons: {
    icon: '/assets/images/icon.png?v=1',
    shortcut: '/assets/images/icon.png?v=1',
    apple: '/assets/images/icon.png?v=1',
  },
};

export default function AddProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 