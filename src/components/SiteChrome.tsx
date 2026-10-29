import { useEffect, useState, type MouseEvent, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, MapPin, Menu, Phone, Mail, X, MessageCircle, Instagram, Facebook, Linkedin } from 'lucide-react';
import { navItems, siteContent } from '@/data/siteContent';

type SmartLinkProps = { href: string; children: ReactNode; className?: string; onClick?: () => void; 'aria-label'?: string };

/** Client-side navigation compatible with the existing App.tsx popstate listener. */
export function SmartLink({ href, children, className = '', onClick, 'aria-label': ariaLabel }: SmartLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (href.startsWith('/') && !href.startsWith('//')) {
      event.preventDefault();
      const current = window.location.pathname + window.location.search + window.location.hash;
      if (current !== href) {
        window.history.pushState({}, '', href);
        window.dispatchEvent(new PopStateEvent('popstate'));
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    onClick?.();
  };
  return <a href={href} className={className} onClick={handleClick} aria-label={ariaLabel}>{children}</a>;
}

const extraLinks = [
  { label: 'Project Gallery', href: '/gallery' },
  { label: 'Why Invest', href: '/why-invest' },
  { label: 'FAQs', href: '/faq' },
];
const isActive = (href: string, path: string) => href === '/' ? path === '/' : path === href || path.startsWith(href + '/');

function Brand({ light = false, close }: { light?: boolean; close?: () => void }) {
  return <SmartLink href="/" className={`nsc-brand ${light ? 'nsc-brand-light' : ''}`} onClick={close} aria-label="NestWell Developers home">
    <span className="nsc-brand-image"><img src={siteContent.logoImage} alt="NestWell logo" /></span>
    <span className="nsc-brand-words"><strong>NESTWELL</strong><small>TRADERS &amp; DEVELOPERS</small></span>
  </SmartLink>;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [path, setPath] = useState(typeof window !== 'undefined' ? window.location.pathname : '/');
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onRoute = () => { setPath(window.location.pathname); setMenuOpen(false); setMoreOpen(false); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('popstate', onRoute);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('popstate', onRoute); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onEscape);
    return () => { document.body.style.overflow = original; document.removeEventListener('keydown', onEscape); };
  }, [menuOpen]);

  return <>
    <style>{styles}</style>
    <div className="nsc-topbar"><div className="nsc-shell nsc-topbar-inner">
      <span className="nsc-top-note"><span className="nsc-top-dot" /> Discover thoughtfully planned plots across Andhra Pradesh</span>
      <a href={siteContent.phoneHref}><Phone size={13} /> {siteContent.phone}</a>
    </div></div>
    <header className={`nsc-header ${scrolled ? 'nsc-scrolled' : ''}`}>
      <div className="nsc-shell nsc-header-inner">
        <Brand />
        <nav className="nsc-desktop-nav" aria-label="Main navigation">
          {navItems.map(item => <SmartLink key={item.href} href={item.href} className={`nsc-nav-link ${isActive(item.href, path) ? 'nsc-active' : ''}`}>{item.label}</SmartLink>)}
          <div className="nsc-more" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
            <button type="button" className={`nsc-nav-link nsc-more-trigger ${moreOpen ? 'nsc-active' : ''}`} onClick={() => setMoreOpen(v => !v)} aria-expanded={moreOpen} aria-haspopup="true">More <ChevronDown size={14} /></button>
            <div className={`nsc-dropdown ${moreOpen ? 'nsc-dropdown-open' : ''}`}>
              {extraLinks.map(item => <SmartLink key={item.href} href={item.href} onClick={() => setMoreOpen(false)} className={isActive(item.href, path) ? 'nsc-active' : ''}>{item.label}<ArrowUpRight size={15}/></SmartLink>)}
            </div>
          </div>
        </nav>
        <div className="nsc-header-actions">
          <SmartLink href="/book-site-visit" className="nsc-visit-btn">Book a Site Visit <span><ArrowUpRight size={17}/></span></SmartLink>
          <button type="button" className="nsc-menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open navigation menu" aria-expanded={menuOpen}><Menu size={24}/></button>
        </div>
      </div>
    </header>
    <div className={`nsc-mobile-overlay ${menuOpen ? 'nsc-overlay-visible' : ''}`} onClick={() => setMenuOpen(false)} aria-hidden="true" />
    <aside className={`nsc-mobile-drawer ${menuOpen ? 'nsc-drawer-open' : ''}`} aria-label="Mobile navigation" aria-hidden={!menuOpen}>
      <div className="nsc-drawer-top"><Brand close={() => setMenuOpen(false)}/><button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={23}/></button></div>
      <div className="nsc-drawer-caption">EXPLORE NESTWELL</div>
      <nav className="nsc-mobile-nav" aria-label="Mobile main navigation">
        {[...navItems, ...extraLinks].map((item, index) => <SmartLink key={`${item.href}-${index}`} href={item.href} className={isActive(item.href, path) ? 'nsc-mobile-active' : ''} onClick={() => setMenuOpen(false)}><span>{item.label}</span><ArrowUpRight size={17}/></SmartLink>)}
      </nav>
      <div className="nsc-drawer-bottom"><SmartLink href="/book-site-visit" className="nsc-visit-btn" onClick={() => setMenuOpen(false)}>Schedule a Site Visit <ArrowUpRight size={18}/></SmartLink><a href={siteContent.phoneHref}><Phone size={16}/> {siteContent.phone}</a></div>
    </aside>
  </>;
}

export function Footer() {
  return <footer className="nsc-footer">
    <div className="nsc-footer-glow" aria-hidden="true" />
    <div className="nsc-shell">
      <div className="nsc-footer-cta"><div><span className="nsc-eyebrow">YOUR NEXT CHAPTER STARTS HERE</span><h2>Let's find a place<br/><em>you can call your own.</em></h2></div><SmartLink href="/book-site-visit" className="nsc-footer-cta-btn">Plan Your Site Visit <ArrowUpRight size={20}/></SmartLink></div>
      <div className="nsc-footer-grid">
        <div className="nsc-footer-about"><Brand light/><p>Thoughtfully planned plotted developments and personal guidance for people building a future with more clarity and possibility.</p><div className="nsc-socials" aria-label="Social media"><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18}/></a><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18}/></a><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18}/></a></div></div>
        <div className="nsc-footer-column"><h3>Explore</h3><SmartLink href="/ventures">All Ventures</SmartLink><SmartLink href="/locations">Locations</SmartLink><SmartLink href="/gallery">Project Gallery</SmartLink><SmartLink href="/why-invest">Why Invest</SmartLink><SmartLink href="/book-site-visit">Book a Site Visit</SmartLink></div>
        <div className="nsc-footer-column"><h3>Company</h3><SmartLink href="/about">About Us</SmartLink><SmartLink href="/services">Our Services</SmartLink><SmartLink href="/blog">Journal & Insights</SmartLink><SmartLink href="/faq">FAQs</SmartLink><SmartLink href="/contact">Contact Us</SmartLink></div>
        <div className="nsc-footer-column nsc-footer-reach"><h3>Get in Touch</h3><a href={siteContent.phoneHref}><Phone size={17}/><span>{siteContent.phone}</span></a><a href={`mailto:${siteContent.email}`}><Mail size={17}/><span>{siteContent.email}</span></a><div className="nsc-address"><MapPin size={18}/><span>{siteContent.address}</span></div><SmartLink href="/contact" className="nsc-footer-contact-link">Contact Our Team <ArrowRight size={16}/></SmartLink></div>
      </div>
      <div className="nsc-footer-bottom"><span>© {new Date().getFullYear()} NestWell Traders &amp; Developers. All rights reserved.</span><div><SmartLink href="/privacy-policy">Privacy Policy</SmartLink><SmartLink href="/terms-and-conditions">Terms &amp; Conditions</SmartLink></div><span>Made for better tomorrows.</span></div>
    </div>
  </footer>;
}

export function WhatsAppButton() {
  // Replace with the company's verified WhatsApp number if different.
  const number = '918985720006';
  const message = encodeURIComponent('Hello NestWell, I would like to know more about your ventures.');
  return <a className="nsc-whatsapp" href={`https://wa.me/${number}?text=${message}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with NestWell on WhatsApp" title="Chat on WhatsApp"><MessageCircle size={25} fill="currentColor" strokeWidth={1.7}/><span className="nsc-whatsapp-tooltip">Chat with us</span></a>;
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
.nsc-topbar,.nsc-header,.nsc-mobile-drawer,.nsc-footer,.nsc-whatsapp{font-family:'DM Sans',sans-serif;box-sizing:border-box}
.nsc-topbar *,.nsc-header *,.nsc-mobile-drawer *,.nsc-footer *,.nsc-whatsapp *{box-sizing:border-box}
.nsc-shell{width:min(100% - 72px,1280px);margin-inline:auto}
.nsc-topbar{background:#07172e;color:#c4d5ed;font-size:11px;letter-spacing:.025em}
.nsc-topbar-inner{height:35px;display:flex;align-items:center;justify-content:space-between;gap:18px}
.nsc-top-note{display:inline-flex;align-items:center;gap:9px}.nsc-top-dot{width:6px;height:6px;background:#59a6ff;border-radius:50%;box-shadow:0 0 0 4px #59a6ff20}
.nsc-topbar a{display:inline-flex;align-items:center;gap:8px;color:#dceaff;text-decoration:none;transition:color .25s}.nsc-topbar a:hover{color:#78b5ff}
.nsc-header{position:sticky;top:0;z-index:1000;background:rgba(255,255,255,.97);border-bottom:1px solid #e9edf5;transition:box-shadow .3s,background .3s;backdrop-filter:blur(18px)}
.nsc-header.nsc-scrolled{box-shadow:0 12px 35px #0a23451c;background:rgba(255,255,255,.95)}
.nsc-header-inner{min-height:83px;display:flex;align-items:center;justify-content:space-between;gap:26px}
.nsc-brand{display:inline-flex;align-items:center;gap:11px;flex-shrink:0;text-decoration:none;color:#071b35;min-width:0}
.nsc-brand-image{width:50px;height:50px;display:grid;place-items:center;overflow:hidden;flex-shrink:0}.nsc-brand-image img{width:100%;height:100%;object-fit:contain;transition:transform .4s}.nsc-brand:hover img{transform:scale(1.07)}
.nsc-brand-words{display:flex;flex-direction:column;gap:3px;min-width:0}.nsc-brand-words strong{font:800 22px/1 'Manrope',sans-serif;letter-spacing:-1.15px}.nsc-brand-words small{font-size:8px;letter-spacing:1.5px;font-weight:800;white-space:nowrap}
.nsc-desktop-nav{display:flex;align-items:center;gap:clamp(12px,1.6vw,25px);margin-left:auto}
.nsc-nav-link{display:inline-flex;align-items:center;gap:5px;position:relative;border:0;background:transparent;color:#34445a;text-decoration:none;font-size:12px;font-weight:700;white-space:nowrap;padding:30px 0;transition:color .25s}
.nsc-nav-link:after{content:'';position:absolute;bottom:20px;left:0;width:0;height:2px;background:#2563eb;transition:width .3s}.nsc-nav-link:hover,.nsc-nav-link.nsc-active{color:#1b59db}.nsc-nav-link:hover:after,.nsc-nav-link.nsc-active:after{width:100%}
.nsc-more{position:relative}.nsc-more-trigger{cursor:pointer}.nsc-more-trigger svg{transition:transform .25s}.nsc-more-trigger[aria-expanded=true] svg{transform:rotate(180deg)}
.nsc-dropdown{position:absolute;right:-15px;top:calc(100% - 6px);width:205px;background:#fff;border:1px solid #e7edf6;box-shadow:0 18px 45px #071b3521;border-radius:12px;padding:9px;opacity:0;visibility:hidden;transform:translateY(9px);transition:opacity .2s,transform .2s,visibility .2s;z-index:5}
.nsc-dropdown-open,.nsc-more:focus-within .nsc-dropdown{opacity:1;visibility:visible;transform:translateY(0)}
.nsc-dropdown a{display:flex;align-items:center;justify-content:space-between;text-decoration:none;color:#273b54;font-size:12px;font-weight:700;padding:12px;border-radius:7px;transition:background .25s,color .25s}.nsc-dropdown a:hover,.nsc-dropdown a.nsc-active{background:#edf4ff;color:#2563eb}
.nsc-header-actions{display:flex;align-items:center;gap:10px}.nsc-visit-btn{display:inline-flex;align-items:center;justify-content:center;gap:16px;background:#195ce4;color:white!important;border-radius:7px;padding:9px 9px 9px 17px;font-size:12px;font-weight:800;text-decoration:none;white-space:nowrap;transition:transform .3s,box-shadow .3s,background .3s}.nsc-visit-btn>span{display:grid;place-items:center;width:32px;height:32px;background:#ffffff28;border-radius:5px}.nsc-visit-btn:hover{transform:translateY(-3px);background:#0b2f85;box-shadow:0 12px 25px #195ce43b}.nsc-visit-btn:hover svg{transform:rotate(45deg)}.nsc-visit-btn svg{transition:transform .3s}
.nsc-menu-toggle{display:none;align-items:center;justify-content:center;width:43px;height:43px;border:1px solid #dfe6f2;border-radius:8px;background:#fff;color:#102d57;cursor:pointer}
.nsc-mobile-overlay{position:fixed;inset:0;background:#061326a8;z-index:1098;opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s}.nsc-overlay-visible{opacity:1;visibility:visible}
.nsc-mobile-drawer{position:fixed;z-index:1099;right:0;top:0;bottom:0;width:min(420px,90vw);background:white;box-shadow:-18px 0 55px #0002;transform:translateX(105%);transition:transform .4s cubic-bezier(.2,.8,.2,1);display:flex;flex-direction:column;padding:25px;overflow-y:auto;visibility:hidden}.nsc-drawer-open{transform:translateX(0);visibility:visible}
.nsc-drawer-top{display:flex;align-items:center;justify-content:space-between;gap:10px;padding-bottom:23px;border-bottom:1px solid #e9edf4}.nsc-drawer-top>button{width:40px;height:40px;border:1px solid #e2e8f0;border-radius:8px;background:#f7f9fc;cursor:pointer;display:grid;place-items:center;color:#102d57}
.nsc-drawer-caption{font-size:10px;letter-spacing:2px;color:#2563eb;font-weight:800;margin:30px 0 12px}.nsc-mobile-nav{display:flex;flex-direction:column}.nsc-mobile-nav>a{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #e9edf4;padding:15px 4px;color:#10233d;font-size:15px;font-weight:700;text-decoration:none;transition:padding .25s,color .25s}.nsc-mobile-nav>a:hover,.nsc-mobile-nav>a.nsc-mobile-active{padding-left:12px;color:#2563eb}.nsc-drawer-bottom{margin-top:auto;padding-top:25px;display:flex;flex-direction:column;gap:19px}.nsc-drawer-bottom>.nsc-visit-btn{padding:16px}.nsc-drawer-bottom>a:last-child{display:flex;align-items:center;gap:10px;color:#233a56;text-decoration:none;font-size:13px;font-weight:700}
.nsc-footer{position:relative;overflow:hidden;background:#071b35;color:white;padding-top:0}.nsc-footer-glow{position:absolute;right:-220px;top:-190px;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,#235bba2a,transparent 65%);pointer-events:none}
.nsc-footer-cta{position:relative;display:flex;align-items:center;justify-content:space-between;gap:35px;padding:75px 0 65px;border-bottom:1px solid #ffffff25}.nsc-eyebrow{font-size:10px;letter-spacing:2.2px;font-weight:800;color:#8ab7ff}.nsc-footer-cta h2{font:700 clamp(30px,3.7vw,53px)/1.2 'Manrope',sans-serif;letter-spacing:-1.8px;margin:16px 0 0}.nsc-footer-cta h2 em{font-style:normal;color:#83b4ff}.nsc-footer-cta-btn{display:inline-flex;align-items:center;gap:30px;background:#2463eb;color:white;text-decoration:none;padding:19px 22px;border-radius:8px;font-size:13px;font-weight:800;white-space:nowrap;transition:transform .3s,background .3s,box-shadow .3s}.nsc-footer-cta-btn:hover{transform:translateY(-4px);background:#3a7aff;box-shadow:0 15px 35px #2463eb45}.nsc-footer-cta-btn svg{transition:transform .3s}.nsc-footer-cta-btn:hover svg{transform:rotate(45deg)}
.nsc-footer-grid{position:relative;display:grid;grid-template-columns:1.65fr .8fr .8fr 1.3fr;gap:clamp(25px,4vw,75px);padding:66px 0 70px}.nsc-brand-light{color:#fff}.nsc-footer-about>p{font-size:13px;line-height:1.9;color:#aebed4;max-width:320px;margin:22px 0}.nsc-socials{display:flex;gap:9px}.nsc-socials a{display:grid;place-items:center;width:39px;height:39px;color:#d5e3f7;border:1px solid #ffffff32;border-radius:7px;transition:background .25s,transform .25s,color .25s}.nsc-socials a:hover{background:#2463eb;color:white;transform:translateY(-4px)}
.nsc-footer-column{display:flex;flex-direction:column;align-items:flex-start;gap:15px}.nsc-footer-column h3{font:800 13px 'Manrope',sans-serif;color:white;margin:9px 0 13px}.nsc-footer-column>a{color:#b6c6da;text-decoration:none;font-size:12px;line-height:1.5;transition:color .25s,transform .25s}.nsc-footer-column>a:hover{color:#80b4ff;transform:translateX(4px)}.nsc-footer-reach>a:not(.nsc-footer-contact-link),.nsc-address{display:flex;align-items:flex-start;gap:11px}.nsc-footer-reach svg{color:#83b4ff;flex-shrink:0}.nsc-address{color:#b6c6da;font-size:12px;line-height:1.9}.nsc-footer-reach .nsc-footer-contact-link{color:#83b4ff;font-weight:800;display:inline-flex;align-items:center;gap:10px;margin-top:6px}
.nsc-footer-bottom{border-top:1px solid #ffffff25;padding:25px 0 30px;display:flex;align-items:center;justify-content:space-between;gap:20px;color:#91a5bf;font-size:11px}.nsc-footer-bottom>div{display:flex;gap:23px}.nsc-footer-bottom a{color:#aebed4;text-decoration:none;transition:color .25s}.nsc-footer-bottom a:hover{color:white}
.nsc-whatsapp{position:fixed;right:24px;bottom:24px;z-index:1050;width:57px;height:57px;border-radius:50%;background:#20c769;color:white;display:grid;place-items:center;text-decoration:none;box-shadow:0 12px 30px #108f4c60;transition:transform .3s,box-shadow .3s}.nsc-whatsapp:hover{transform:translateY(-5px) scale(1.04);box-shadow:0 18px 35px #108f4c70}.nsc-whatsapp-tooltip{position:absolute;right:68px;top:50%;transform:translateY(-50%) translateX(5px);white-space:nowrap;background:#10213b;color:white;font-size:11px;font-weight:700;padding:9px 12px;border-radius:6px;opacity:0;visibility:hidden;transition:opacity .25s,transform .25s}.nsc-whatsapp:hover .nsc-whatsapp-tooltip{opacity:1;visibility:visible;transform:translateY(-50%) translateX(0)}
@media(max-width:1150px){.nsc-desktop-nav{gap:12px}.nsc-nav-link{font-size:11px}.nsc-brand-words strong{font-size:19px}.nsc-brand-words small{font-size:7px}.nsc-header-inner{gap:15px}}
@media(max-width:980px){.nsc-desktop-nav{display:none}.nsc-menu-toggle{display:flex}.nsc-header-inner{min-height:73px}.nsc-footer-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:40px}.nsc-footer-cta{padding:60px 0}}
@media(max-width:640px){.nsc-shell{width:min(100% - 36px,1280px)}.nsc-topbar-inner{justify-content:center}.nsc-top-note{display:none}.nsc-header-inner{min-height:69px}.nsc-header-actions>.nsc-visit-btn{display:none}.nsc-brand-image{width:44px;height:44px}.nsc-brand-words strong{font-size:19px}.nsc-brand-words small{letter-spacing:1.1px}.nsc-footer-cta{flex-direction:column;align-items:flex-start;gap:25px;padding:55px 0}.nsc-footer-cta h2{letter-spacing:-1px}.nsc-footer-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:36px 20px;padding:50px 0}.nsc-footer-about{grid-column:1/-1}.nsc-footer-reach{grid-column:1/-1}.nsc-footer-bottom{flex-direction:column;align-items:flex-start;gap:13px}.nsc-whatsapp{right:16px;bottom:16px;width:52px;height:52px}}
@media(prefers-reduced-motion:reduce){.nsc-header *,.nsc-footer *,.nsc-mobile-drawer *,.nsc-whatsapp{transition:none!important;animation:none!important}}
`;
