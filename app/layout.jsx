import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TEAM RGYCSP - Memories',
  description: 'A digital home for our adventures.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* THE LIGHT MODE GRADIENT:
         - A soft gradient from Rose (Pink) to Sky (Blue) to Indigo.
         - 'min-h-screen' ensures it covers the whole page.
      */}
      <body className={`${inter.className} bg-linear-gradient-to-br from-rose-50 via-white to-sky-100 min-h-screen text-gray-900 antialiased selection:bg-pink-200 selection:text-pink-900`}>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}