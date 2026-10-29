import { useEffect, useState } from 'react';
import { Footer, Header, WhatsAppButton } from '@/components/SiteChrome';
import { setPageMeta } from '@/lib/seo';
import { AboutPage } from '@/pages/AboutPage';
import { BlogDetailPage } from '@/pages/BlogDetailPage';
import { BlogPage } from '@/pages/BlogPage';
import { ContactPage } from '@/pages/ContactPage';
import { FAQPage } from '@/pages/FAQPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { HomePage } from '@/pages/HomePage';
import { LegalPage } from '@/pages/LegalPage';
import { LocationDetailPage } from '@/pages/LocationDetailPage';
import { LocationsPage } from '@/pages/LocationsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProjectDetailPage } from '@/pages/ProjectDetailPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { VenturesPage } from '@/pages/VenturesPage';
import { WhyInvestPage } from '@/pages/WhyInvestPage';

function normalizePath(path: string) { return path.replace(/\/+$/, '') || '/'; }
function routeView(pathname: string) {
  const clean = normalizePath(pathname);
  if (clean === '/') return <HomePage />;
  if (clean === '/about') return <AboutPage />;
  if (clean === '/ventures' || clean === '/projects') return <VenturesPage />;
  if (clean.startsWith('/ventures/')) return <ProjectDetailPage slug={decodeURIComponent(clean.split('/')[2] || '')} />;
  if (clean === '/services') return <ServicesPage />;
  if (clean === '/locations') return <LocationsPage />;
  if (clean.startsWith('/locations/')) return <LocationDetailPage slug={decodeURIComponent(clean.split('/')[2] || '')} />;
  if (clean === '/gallery') return <GalleryPage />;
  if (clean === '/why-invest' || clean === '/investment-calculator') return <WhyInvestPage />;
  if (clean === '/blog') return <BlogPage />;
  if (clean.startsWith('/blog/')) return <BlogDetailPage slug={decodeURIComponent(clean.split('/')[2] || '')} />;
  if (clean === '/contact') return <ContactPage />;
  if (clean === '/book-site-visit') return <ContactPage booking />;
  if (clean === '/faq') return <FAQPage />;
  if (clean === '/privacy-policy') return <LegalPage />;
  if (clean === '/terms-and-conditions') return <LegalPage terms />;
  return <NotFoundPage />;
}

const pageTitles: Record<string, string> = {
  '/': 'Thoughtful plots. Room for what’s next.', '/about': 'About NestWell',
  '/ventures': 'Explore Ventures', '/projects': 'Explore Ventures', '/services': 'Our Services',
  '/locations': 'Explore Locations', '/gallery': 'Gallery', '/why-invest': 'Why Invest',
  '/investment-calculator': 'Investment Calculator', '/blog': 'Property Insights',
  '/contact': 'Contact NestWell', '/book-site-visit': 'Book a Site Visit',
  '/faq': 'Frequently Asked Questions', '/privacy-policy': 'Privacy Policy',
  '/terms-and-conditions': 'Terms and Conditions'
};

export default function App() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  useEffect(() => {
    const sync = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', sync);
    window.addEventListener('nestwell:navigate', sync);
    return () => { window.removeEventListener('popstate', sync); window.removeEventListener('nestwell:navigate', sync); };
  }, []);
  useEffect(() => {
    const fallback = path.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'Home';
    const title = pageTitles[path] || fallback.charAt(0).toUpperCase() + fallback.slice(1);
    setPageMeta(title, 'Explore NestWell Developers plotted ventures across Visakhapatnam, Vizianagaram, and Rajahmundry.');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [path]);
  return <>
    <Header />
    <div key={path} className="nw-page-enter">{routeView(path)}</div>
    <Footer />
    <WhatsAppButton />
    <style>{`
      .nw-page-enter{animation:nwPageEnter .48s ease both;min-height:35vh}
      @keyframes nwPageEnter{from{opacity:.45;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      @media(prefers-reduced-motion:reduce){.nw-page-enter{animation:none}}
    `}</style>
  </>;
}
