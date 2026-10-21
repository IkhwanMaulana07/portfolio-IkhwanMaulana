import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Ikhwan Maulana | AI Engineer & Fullstack Systems Architect',
  description:
    'Distinguished portfolio of Ikhwan Maulana, an Informatics graduate specializing in Computer Vision, Machine Learning, and High-Performance Fullstack Systems.',
  keywords: [
    'Ikhwan Maulana',
    'AI Engineer',
    'Software Engineer',
    'Machine Learning',
    'Computer Vision',
    'Fullstack Developer',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'YOLOv11',
    'Python',
    'Bekasi',
    'Indonesia'
  ],
  authors: [{ name: 'Ikhwan Maulana' }],
  creator: 'Ikhwan Maulana',
  openGraph: {
    title: 'Ikhwan Maulana | AI Engineer & Fullstack Systems Architect',
    description:
      'Architecting intelligent solutions with craft and distinction. High-performance software engineering and computer vision systems.',
    url: 'https://github.com/IkhwanMaulana07',
    siteName: 'Ikhwan Maulana Portfolio Atelier',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark scroll-smooth ${inter.variable}`}>
      <body className="bg-[#070709] text-[#F8F8F9] antialiased min-h-screen selection:bg-amber-400/25 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
