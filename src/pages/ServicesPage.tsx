import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowRight, ArrowUpRight, BadgeCheck, CalendarDays, CheckCircle2,
  ClipboardCheck, Compass, FileCheck2, Handshake, MapPin, MapPinned,
  Search, ShieldCheck, Sparkles
} from 'lucide-react';
import { serviceItems } from '@/data/siteContent';
import { SmartLink } from '@/components/SiteChrome';

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('nws-visible');
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('nws-visible');
        observer.unobserve(node);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`nws-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const serviceIcons = [MapPinned, FileCheck2, Handshake, Compass, ShieldCheck, ClipboardCheck];
const steps = [
  { title: 'Share your vision', text: 'Tell us your preferred location, plot requirements, and what matters most to you.', icon: Search },
  { title: 'Explore your options', text: 'Compare relevant locations, layouts, and available project information.', icon: MapPinned },
  { title: 'Visit and understand', text: 'See the setting in person, ask questions, and review the important details.', icon: CalendarDays },
  { title: 'Decide with clarity', text: 'Take your next step at your own pace with guidance from our team.', icon: CheckCircle2 },
];

export function ServicesPage() {
  return (
    <main className="nws-page">
      <section className="nws-hero" aria-labelledby="nws-hero-title">
        <div className="nws-hero-image" />
        <div className="nws-hero-shade" />
        <div className="nws-container nws-hero-inner">
          <Reveal className="nws-hero-content">
            <span className="nws-eyebrow nws-eyebrow-light"><span className="nws-line" /> OUR SERVICES</span>
            <h1 id="nws-hero-title">Every Step,<br /><em>Thoughtfully Guided.</em></h1>
            <p>From finding the right setting to understanding a project in person, we make your property journey simpler, clearer, and more personal.</p>
            <div className="nws-hero-actions">
              <a href="#explore-services" className="nws-button nws-button-blue">Explore Our Services <span><ArrowUpRight size={18} /></span></a>
              <SmartLink href="/contact" className="nws-button nws-button-outline">Talk to Our Team <ArrowRight size={18} /></SmartLink>
            </div>
          </Reveal>
          <div className="nws-hero-bottom"><span>DISCOVER • UNDERSTAND • DECIDE</span><span>SCROLL TO EXPLORE ↓</span></div>
        </div>
      </section>

      <section className="nws-intro nws-section">
        <div className="nws-container nws-intro-grid">
          <Reveal>
            <span className="nws-eyebrow"><span className="nws-line" /> HOW WE HELP</span>
            <h2 className="nws-heading">A Better Experience.<br /><span>From The Very Start.</span></h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="nws-intro-copy">Finding the right plot is more than choosing a location. It's about understanding the possibilities, asking the right questions, and feeling confident about your next step. That's where NestWell comes in.</p>
            <SmartLink href="/about" className="nws-text-link">Get to Know NestWell <span><ArrowUpRight size={18} /></span></SmartLink>
          </Reveal>
        </div>
      </section>

      <section id="explore-services" className="nws-section nws-services">
        <div className="nws-container">
          <Reveal className="nws-section-top">
            <div>
              <span className="nws-eyebrow"><span className="nws-line" /> WHAT WE OFFER</span>
              <h2 className="nws-heading">Guidance That Makes<br /><span>A Real Difference.</span></h2>
            </div>
            <p>Practical support, helpful information, and a personal approach at every stage of your property search.</p>
          </Reveal>
          <div className="nws-service-grid">
            {serviceItems.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];
              return (
                <Reveal className="nws-service-wrap" key={`${service.title}-${index}`} delay={(index % 3) * 100}>
                  <article className="nws-service-card">
                    <div className="nws-service-top"><span className="nws-service-icon"><Icon size={28} strokeWidth={1.7} /></span><span className="nws-service-number">{String(index + 1).padStart(2, '0')}</span></div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <SmartLink href="/contact" className="nws-service-link">Talk to Our Team <ArrowUpRight size={19} /></SmartLink>
                    <span className="nws-card-glow" aria-hidden="true" />
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="nws-experience nws-section">
        <div className="nws-container nws-experience-grid">
          <Reveal className="nws-experience-photo">
            <img src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Contemporary residential architecture and landscaped surroundings" loading="lazy" />
            <div className="nws-photo-caption"><BadgeCheck size={25} /><span>GUIDANCE BUILT ON<br /><strong>CLARITY & TRUST</strong></span></div>
          </Reveal>
          <Reveal className="nws-experience-copy" delay={120}>
            <span className="nws-eyebrow"><span className="nws-line" /> THE NESTWELL APPROACH</span>
            <h2 className="nws-heading">More Than A Service.<br /><span>A Thoughtful Partnership.</span></h2>
            <p>We believe informed decisions begin with clear conversations. Our team helps you explore the location, understand available project details, and plan an on-site visit before making your choice.</p>
            <div className="nws-checks">
              <div><ShieldCheck size={22} /><span>Clear, project-specific information</span></div>
              <div><MapPin size={22} /><span>Guidance across selected AP locations</span></div>
              <div><Handshake size={22} /><span>Personal support without unnecessary pressure</span></div>
            </div>
            <SmartLink href="/contact" className="nws-button nws-button-dark">Connect With NestWell <span><ArrowUpRight size={18} /></span></SmartLink>
          </Reveal>
        </div>
      </section>

      <section className="nws-process nws-section">
        <div className="nws-container">
          <Reveal className="nws-process-head">
            <span className="nws-eyebrow nws-eyebrow-light"><span className="nws-line" /> OUR SIMPLE PROCESS</span>
            <h2 className="nws-heading">Four Steps To<br /><span>Your Next Chapter.</span></h2>
            <p>A straightforward journey designed around your needs, questions, and comfort.</p>
          </Reveal>
          <div className="nws-process-grid">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} className="nws-step-wrap" delay={index * 90}>
                  <article className="nws-step">
                    <div className="nws-step-top"><span>0{index + 1}</span><Icon size={25} strokeWidth={1.7} /></div>
                    <h3>{step.title}</h3><p>{step.text}</p>
                    {index < steps.length - 1 && <ArrowRight className="nws-step-arrow" size={18} aria-hidden="true" />}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="nws-cta">
        <div className="nws-cta-image" />
        <div className="nws-container nws-cta-inner">
          <Reveal>
            <span className="nws-eyebrow nws-eyebrow-light"><span className="nws-line" /> TAKE THE NEXT STEP</span>
            <h2>See The Place.<br /><span>Imagine What's Next.</span></h2>
            <p>Get a closer look at the location, explore the project details, and let our team help you plan your visit.</p>
            <div className="nws-cta-actions">
              <SmartLink href="/book-site-visit" className="nws-button nws-button-blue">Book a Site Visit <span><ArrowUpRight size={18} /></span></SmartLink>
              <SmartLink href="/ventures" className="nws-button nws-button-outline">Explore Ventures <ArrowRight size={18} /></SmartLink>
            </div>
          </Reveal>
          <Sparkles className="nws-cta-sparkle" size={85} strokeWidth={0.7} aria-hidden="true" />
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
        .nws-page{--navy:#071b35;--blue:#2563eb;--muted:#68798d;--light:#f5f8fc;color:var(--navy);background:#fff;font-family:'DM Sans',sans-serif;overflow-x:clip}
        .nws-page *,.nws-page *::before,.nws-page *::after{box-sizing:border-box}
        .nws-page h1,.nws-page h2,.nws-page h3,.nws-page p{margin-top:0}
        .nws-page a{text-decoration:none}
        .nws-container{width:min(100% - 80px,1240px);margin-inline:auto}
        .nws-section{padding:108px 0}
        .nws-heading{font-family:'Manrope',sans-serif;font-size:clamp(34px,4vw,58px);font-weight:800;line-height:1.18;letter-spacing:-2.2px;margin:0}
        .nws-heading span{color:var(--blue)}
        .nws-eyebrow{display:inline-flex;align-items:center;gap:11px;color:var(--blue);font:800 11px 'Manrope',sans-serif;letter-spacing:2.2px;text-transform:uppercase;margin-bottom:24px}
        .nws-eyebrow-light{color:#9fc3ff}
        .nws-line{width:29px;height:2px;background:currentColor;display:inline-block}
        .nws-reveal{opacity:0;transform:translateY(26px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.2,1)}
        .nws-reveal.nws-visible{opacity:1;transform:translateY(0)}
        .nws-button{min-height:57px;display:inline-flex;align-items:center;justify-content:center;gap:18px;padding:9px 12px 9px 24px;border-radius:8px;font:800 13px 'Manrope',sans-serif;transition:transform .3s,background .3s,box-shadow .3s,color .3s}
        .nws-button:hover{transform:translateY(-4px)}
        .nws-button>span{width:37px;height:37px;display:grid;place-items:center;border-radius:6px;background:#ffffff24;transition:transform .35s}
        .nws-button:hover>span{transform:rotate(45deg)}
        .nws-button-blue{background:var(--blue);color:white;box-shadow:0 12px 28px #2563eb38}
        .nws-button-blue:hover{background:#1553d5;color:#fff;box-shadow:0 16px 34px #2563eb55}
        .nws-button-outline{border:1px solid #ffffff80;color:white;background:#ffffff0d;padding:16px 23px;backdrop-filter:blur(8px)}
        .nws-button-outline:hover{background:#fff;color:var(--navy)}
        .nws-button-dark{background:var(--navy);color:#fff}
        .nws-button-dark:hover{background:var(--blue);color:#fff}
        .nws-hero{height:min(830px,90svh);min-height:630px;position:relative;isolation:isolate;background:var(--navy);color:white;overflow:hidden}
        .nws-hero-image{position:absolute;inset:0;z-index:-2;background:url('https://images.pexels.com/photos/16005938/pexels-photo-16005938.jpeg?auto=compress&cs=tinysrgb&w=2000') center 52%/cover no-repeat;animation:nws-zoom 18s ease-out both}
        .nws-hero-shade{position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,#06172feF 0%,#06172fc9 43%,#06172f55 100%),linear-gradient(0deg,#06172fa0,transparent 55%)}
        .nws-hero-inner{height:100%;display:flex;align-items:center;position:relative}
        .nws-hero-content{max-width:850px;padding:45px 0}
        .nws-hero h1{font:800 clamp(51px,6.8vw,94px)/1.09 'Manrope',sans-serif;letter-spacing:-4px;margin:0 0 28px}
        .nws-hero h1 em{font-style:normal;color:#9bc1ff}
        .nws-hero-content>p{max-width:575px;color:#d5e2f1;font-size:16px;line-height:1.9;margin-bottom:34px}
        .nws-hero-actions,.nws-cta-actions{display:flex;gap:14px;flex-wrap:wrap}
        .nws-hero-bottom{position:absolute;bottom:37px;left:0;right:0;display:flex;justify-content:space-between;gap:15px;font:700 10px 'Manrope',sans-serif;letter-spacing:2px;color:#c8d8eb}
        .nws-intro{background:#fff}
        .nws-intro-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:95px;align-items:end}
        .nws-intro-copy{font-size:16px;line-height:2;color:var(--muted);margin-bottom:23px}
        .nws-text-link{display:inline-flex;align-items:center;gap:17px;color:var(--navy);font:800 13px 'Manrope',sans-serif}
        .nws-text-link>span{display:grid;place-items:center;width:41px;height:41px;border:1px solid #d7e0ed;border-radius:50%;transition:.3s}
        .nws-text-link:hover>span{transform:rotate(45deg);background:var(--blue);border-color:var(--blue);color:white}
        .nws-services{background:var(--light);scroll-margin-top:80px}
        .nws-section-top{display:flex;justify-content:space-between;align-items:end;gap:50px;margin-bottom:45px}
        .nws-section-top>p{max-width:340px;color:var(--muted);line-height:1.9;font-size:15px;margin:0}
        .nws-service-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
        .nws-service-wrap{min-width:0;height:100%}
        .nws-service-card{height:100%;min-height:350px;background:#fff;border:1px solid #e6edf5;border-radius:14px;padding:31px;position:relative;overflow:hidden;display:flex;flex-direction:column;transition:transform .4s,box-shadow .4s,border-color .4s}
        .nws-service-card:hover{transform:translateY(-9px);box-shadow:0 24px 50px #0a23421b;border-color:#a9c4f8}
        .nws-service-top{display:flex;align-items:start;justify-content:space-between;margin-bottom:32px}
        .nws-service-icon{width:65px;height:65px;border-radius:12px;display:grid;place-items:center;background:#eaf1ff;color:var(--blue);transition:transform .35s,background .35s,color .35s}
        .nws-service-card:hover .nws-service-icon{transform:rotate(-8deg) scale(1.07);background:var(--blue);color:#fff}
        .nws-service-number{font:800 13px 'Manrope',sans-serif;color:#a4b3c6;letter-spacing:1px}
        .nws-service-card h3{font:800 clamp(19px,1.7vw,23px)/1.35 'Manrope',sans-serif;letter-spacing:-.6px;margin-bottom:14px}
        .nws-service-card p{font-size:14px;line-height:1.9;color:var(--muted);margin-bottom:28px}
        .nws-service-link{display:flex;align-items:center;justify-content:space-between;gap:15px;border-top:1px solid #e8edf5;padding-top:20px;margin-top:auto;color:var(--blue);font:800 12px 'Manrope',sans-serif}
        .nws-service-link svg{transition:transform .3s}
        .nws-service-card:hover .nws-service-link svg{transform:translate(4px,-4px)}
        .nws-card-glow{pointer-events:none;position:absolute;width:180px;height:180px;border-radius:50%;background:#2563eb08;right:-100px;top:-100px;transition:transform .6s}
        .nws-service-card:hover .nws-card-glow{transform:scale(2.5)}
        .nws-experience{background:#fff}
        .nws-experience-grid{display:grid;grid-template-columns:.95fr 1.05fr;gap:85px;align-items:center}
        .nws-experience-photo{height:555px;position:relative;border-radius:16px;overflow:hidden;background:#dfe7f0}
        .nws-experience-photo>img{width:100%;height:100%;object-fit:cover;transition:transform .9s}
        .nws-experience-photo:hover>img{transform:scale(1.07)}
        .nws-photo-caption{position:absolute;bottom:24px;left:24px;background:#fff;padding:19px 22px;display:flex;align-items:center;gap:15px;border-radius:10px;box-shadow:0 12px 30px #06172f30;color:var(--blue)}
        .nws-photo-caption span{font:700 10px/1.8 'Manrope',sans-serif;letter-spacing:1px;color:#68798d}
        .nws-photo-caption strong{font-size:12px;color:var(--navy)}
        .nws-experience-copy>p{font-size:15px;line-height:2;color:var(--muted);margin:25px 0}
        .nws-checks{display:grid;gap:16px;margin-bottom:32px}
        .nws-checks>div{display:flex;align-items:center;gap:13px;color:#354b66;font:700 13px 'Manrope',sans-serif}
        .nws-checks svg{color:var(--blue);flex-shrink:0}
        .nws-process{background:var(--navy);color:#fff}
        .nws-process-head{max-width:750px;margin-bottom:50px}
        .nws-process-head .nws-heading{color:#fff}
        .nws-process-head .nws-heading span{color:#91baff}
        .nws-process-head>p{color:#b7c8df;line-height:1.9;margin:21px 0 0}
        .nws-process-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}
        .nws-step-wrap{min-width:0}
        .nws-step{height:100%;min-height:275px;padding:27px;position:relative;border:1px solid #ffffff27;border-radius:12px;background:#ffffff08;transition:transform .35s,background .35s,border-color .35s}
        .nws-step:hover{transform:translateY(-8px);background:#ffffff12;border-color:#78aaff}
        .nws-step-top{display:flex;align-items:center;justify-content:space-between;color:#9fc3ff;margin-bottom:43px}
        .nws-step-top span{font:800 28px 'Manrope',sans-serif}
        .nws-step h3{font:800 18px 'Manrope',sans-serif;margin-bottom:13px;letter-spacing:-.5px}
        .nws-step p{font-size:13px;line-height:1.85;color:#b9c9dd;margin:0}
        .nws-step-arrow{position:absolute;right:-18px;top:50%;z-index:2;color:#91baff}
        .nws-cta{position:relative;isolation:isolate;background:#0a2342;color:#fff;overflow:hidden}
        .nws-cta-image{position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,#071b35f5,#071b35b0),url('https://images.pexels.com/photos/11201060/pexels-photo-11201060.jpeg?auto=compress&cs=tinysrgb&w=1800') center/cover no-repeat;transition:transform 1s}
        .nws-cta:hover .nws-cta-image{transform:scale(1.04)}
        .nws-cta-inner{padding:100px 0;position:relative}
        .nws-cta h2{font:800 clamp(39px,5vw,70px)/1.16 'Manrope',sans-serif;letter-spacing:-2.8px;margin:0 0 22px}
        .nws-cta h2 span{color:#9bc1ff}
        .nws-cta p{max-width:550px;font-size:15px;line-height:1.9;color:#c8d8eb;margin-bottom:30px}
        .nws-cta-sparkle{position:absolute;right:8%;top:30%;color:#ffffff22;pointer-events:none}
        @keyframes nws-zoom{from{transform:scale(1.1)}to{transform:scale(1)}}
        @media(max-width:1050px){.nws-service-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.nws-process-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.nws-step-arrow{display:none}.nws-experience-grid{gap:42px}.nws-experience-photo{height:480px}.nws-intro-grid{gap:45px}}
        @media(max-width:700px){.nws-container{width:min(100% - 36px,1240px)}.nws-section{padding:72px 0}.nws-heading{font-size:clamp(31px,8vw,44px);letter-spacing:-1.5px}.nws-hero{min-height:620px;height:85svh}.nws-hero h1{font-size:clamp(42px,10vw,64px);letter-spacing:-2.3px}.nws-hero-content>p{font-size:14px}.nws-hero-bottom{bottom:22px;font-size:8px;letter-spacing:1px}.nws-intro-grid,.nws-experience-grid{grid-template-columns:1fr;gap:28px}.nws-section-top{display:block}.nws-section-top>p{margin-top:22px}.nws-service-grid{grid-template-columns:1fr}.nws-service-card{min-height:300px;padding:26px}.nws-experience-photo{height:380px}.nws-process-grid{grid-template-columns:1fr}.nws-step{min-height:210px}.nws-step-top{margin-bottom:25px}.nws-cta-inner{padding:76px 0}.nws-cta h2{letter-spacing:-1.7px}.nws-cta-sparkle{display:none}}
        @media(max-width:420px){.nws-hero-actions .nws-button,.nws-cta-actions .nws-button{width:100%;justify-content:space-between}.nws-hero h1{font-size:42px}.nws-hero-bottom span:last-child{display:none}.nws-photo-caption{left:13px;bottom:13px;padding:13px}.nws-experience-photo{height:320px}}
        @media(prefers-reduced-motion:reduce){.nws-page *,.nws-page *::before,.nws-page *::after{animation:none!important;transition-duration:.01ms!important}.nws-reveal{opacity:1;transform:none}}
      `}</style>
    </main>
  );
}
