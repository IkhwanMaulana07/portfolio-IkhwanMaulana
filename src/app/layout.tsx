import './globals.css';
import type { Metadata } from 'next';
import SmoothScroll from '../components/SmoothScroll';

export const metadata: Metadata = {
  title: 'Ikhwan Maulana | Full Stack Developer & Software Engineer',
  description:
    'Portfolio of Ikhwan Maulana, Full Stack Developer and Software Engineer certified by BNSP in Software Programming and Computer & Network Engineering.',
  keywords: [
    'Ikhwan Maulana',
    'Full Stack Developer',
    'Software Engineer',
    'BNSP Programmer',
    'BNSP Teknisi Jaringan',
    'Go',
    'Golang',
    'React',
    'Next.js',
    'PHP',
    'Laravel',
    'MySQL',
    'Tailwind CSS',
    'GSAP',
    'Lenis'
  ],
  authors: [{ name: 'Ikhwan Maulana' }],
  creator: 'Ikhwan Maulana',
  openGraph: {
    title: 'Ikhwan Maulana | Full Stack Developer & Software Engineer',
    description:
      'Full Stack Developer & Software Engineer crafting scalable, high-performance web systems and certified national technical solutions.',
    url: 'https://my-first-portfolio-six-gilt.vercel.app',
    siteName: 'Ikhwan Maulana Portfolio',
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
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#030304] text-[#F3F3F6] antialiased min-h-screen selection:bg-orange-500/30 selection:text-orange-200">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
