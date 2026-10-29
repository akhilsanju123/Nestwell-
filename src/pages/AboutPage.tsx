import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { ArrowUpRight, ArrowRight, MapPin, ShieldCheck, Handshake, Compass, Eye, Target, CheckCircle2, CalendarDays, Building2, MoveUpRight } from 'lucide-react';
import { SmartLink } from '@/components/SiteChrome';

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('na-visible'); return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('na-visible'); observer.unobserve(el); }
    }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`na-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const values = [
  { icon: ShieldCheck, number: '01', title: 'Clarity over pressure', description: 'We make important project facts easy to find, understand and discuss, so you can move forward at your own pace.' },
  { icon: MapPin, number: '02', title: 'Places with purpose', description: 'We focus on the setting, access, connectivity and practical details that make each location worth exploring.' },
  { icon: Handshake, number: '03', title: 'People-first guidance', description: 'From your first enquiry to a site visit, our approach is built around listening, answering and supporting.' },
  { icon: Compass, number: '04', title: 'A long-term perspective', description: 'We help you look beyond the brochure and consider how a location fits your plans for the future.' },
];

export function AboutPage() {
  return <main className="nestwell-about">
    <section className="na-hero" aria-labelledby="na-hero-title">
      <div className="na-hero-photo" role="img" aria-label="Modern landscaped residential development" />
      <div className="na-hero-shade" />
      <div className="na-container na-hero-content">
        <div className="na-kicker na-kicker-light"><span /> ABOUT NESTWELL DEVELOPERS</div>
        <h1 id="na-hero-title">Land is personal.<br /><em>Your future deserves</em><br />a better foundation.</h1>
        <p>For over 25 years, NestWell Developers has helped people explore plotted development opportunities across Andhra Pradesh with thoughtful guidance and clear information.</p>
        <div className="na-hero-actions">
          <SmartLink href="/ventures" className="na-button na-button-blue">Explore our ventures <span><ArrowUpRight size={19} /></span></SmartLink>
          <SmartLink href="/book-site-visit" className="na-button na-button-outline">Plan a site visit <ArrowRight size={18} /></SmartLink>
        </div>
      </div>
      <div className="na-hero-bottom"><span>VISAKHAPATNAM · VIZIANAGARAM · RAJAHMUNDRY</span><span>THE NESTWELL STORY <ArrowUpRight size={16} /></span></div>
    </section>

    <section className="na-stats" aria-label="NestWell at a glance">
      <div className="na-container na-stats-grid">
        <Reveal><strong>25<span>+</span></strong><p>Years of experience</p></Reveal>
        <Reveal delay={100}><strong>03</strong><p>Andhra Pradesh regions</p></Reveal>
        <Reveal delay={200}><strong>01</strong><p>People-first approach</p></Reveal>
      </div>
    </section>

    <section className="na-section na-story">
      <div className="na-container na-story-grid">
        <Reveal className="na-story-media">
          <div className="na-image-frame"><img src="https://images.pexels.com/photos/7104646/pexels-photo-7104646.jpeg?auto=compress&cs=tinysrgb&w=1300" alt="Aerial view of a developing city and its buildings" loading="lazy" /></div>
          <div className="na-image-label"><Building2 size={24} /><div><small>OUR FOCUS</small><strong>Places for what's next</strong></div></div>
        </Reveal>
        <Reveal className="na-story-copy" delay={120}>
          <div className="na-kicker"><span /> OUR STORY</div>
          <h2 className="na-heading">More than a plot.<br /><em>A place to begin.</em></h2>
          <p>NestWell Traders &amp; Developers brings together a curated portfolio of open plot and villa layout developments across Visakhapatnam, Vizianagaram, and Rajahmundry.</p>
          <p>We believe choosing land should feel informed, personal and considered. Our role is to present every opportunity clearly, help you understand its surroundings and support your next step without unnecessary pressure.</p>
          <div className="na-story-points"><div><CheckCircle2 size={20} /> Useful project information</div><div><CheckCircle2 size={20} /> Location-focused guidance</div><div><CheckCircle2 size={20} /> Site visits before decisions</div></div>
          <SmartLink href="/locations" className="na-text-link">Discover our locations <span><ArrowUpRight size={19} /></span></SmartLink>
        </Reveal>
      </div>
    </section>

    <section className="na-section na-purpose">
      <div className="na-container">
        <Reveal className="na-section-head"><div className="na-kicker"><span /> WHAT DRIVES US</div><h2 className="na-heading">A clearer journey.<br /><em>A more confident decision.</em></h2></Reveal>
        <div className="na-purpose-grid">
          <Reveal className="na-purpose-card"><div className="na-purpose-icon"><Target size={29} /></div><span className="na-card-index">01 / OUR MISSION</span><h3>Make property discovery more meaningful.</h3><p>To help buyers understand the right locations, project details and possibilities through transparent communication and supportive guidance.</p><ArrowUpRight className="na-card-arrow" size={23} /></Reveal>
          <Reveal className="na-purpose-card" delay={120}><div className="na-purpose-icon"><Eye size={29} /></div><span className="na-card-index">02 / OUR VISION</span><h3>Build lasting confidence in every journey.</h3><p>To be a trusted name for thoughtfully presented plotted developments, where people feel empowered to choose what suits their future.</p><ArrowUpRight className="na-card-arrow" size={23} /></Reveal>
        </div>
      </div>
    </section>

    <section className="na-section na-values">
      <div className="na-container">
        <Reveal className="na-values-intro"><div><div className="na-kicker"><span /> THE NESTWELL WAY</div><h2 className="na-heading">What we believe<br /><em>makes the difference.</em></h2></div><p>Our principles are simple: put people first, share information clearly and let every buyer move forward with confidence.</p></Reveal>
        <div className="na-values-grid">{values.map((value, i) => { const Icon = value.icon; return <Reveal key={value.number} className="na-value-card" delay={i * 90}><div className="na-value-top"><span className="na-value-icon"><Icon size={27} strokeWidth={1.65} /></span><span className="na-value-number">{value.number}</span></div><h3>{value.title}</h3><p>{value.description}</p><MoveUpRight className="na-value-arrow" size={21} /></Reveal>; })}</div>
      </div>
    </section>

    <section className="na-experience">
      <div className="na-experience-image"><img src="https://images.pexels.com/photos/11201060/pexels-photo-11201060.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="Aerial view of land and surrounding development" loading="lazy" /></div>
      <div className="na-experience-copy"><Reveal><div className="na-kicker na-kicker-light"><span /> OUR APPROACH</div><h2>We don't just show you land.<br /><em>We help you see the possibilities.</em></h2><p>From understanding the surroundings to reviewing available project information, our team helps make your property search a more comfortable experience.</p><div className="na-experience-list"><div><ShieldCheck size={22} /><span>Understand project and approval details</span></div><div><MapPin size={22} /><span>Explore locations and connectivity</span></div><div><Handshake size={22} /><span>Ask questions and arrange guided site visits</span></div></div><SmartLink href="/about" className="na-button na-button-white">Our approach <span><ArrowUpRight size={19} /></span></SmartLink></Reveal></div>
    </section>

    <section className="na-visit"><div className="na-visit-overlay" /><div className="na-container na-visit-content"><Reveal><div className="na-kicker na-kicker-light"><span /> TAKE THE NEXT STEP</div><h2>See the place.<br /><em>Imagine what comes next.</em></h2><p>Experience the location in person, explore the surroundings and get answers to your questions before you decide.</p><SmartLink href="/book-site-visit" className="na-button na-button-blue"><CalendarDays size={19} /> Book a site visit <span><ArrowUpRight size={19} /></span></SmartLink></Reveal></div></section>

    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
      .nestwell-about{--navy:#081c36;--blue:#2463eb;--ink:#102440;--muted:#66768b;--pale:#f4f7fb;--line:#e4eaf2;font-family:'DM Sans',sans-serif;color:var(--ink);overflow:clip;background:#fff}
      .nestwell-about *,.nestwell-about *::before,.nestwell-about *::after{box-sizing:border-box}
      .nestwell-about h1,.nestwell-about h2,.nestwell-about h3,.nestwell-about p{margin-top:0}
      .nestwell-about a{text-decoration:none}
      .na-container{width:min(100% - 88px,1280px);margin-inline:auto}
      .na-section{padding:clamp(78px,8vw,118px) 0}
      .na-kicker{display:flex;align-items:center;gap:12px;color:var(--blue);font-size:11px;letter-spacing:2.1px;font-weight:800;margin-bottom:25px}
      .na-kicker>span{width:30px;height:2px;background:currentColor;flex:none}
      .na-kicker-light{color:#a7c9ff}
      .na-heading{font-family:'Manrope',sans-serif;font-size:clamp(36px,4.25vw,60px);line-height:1.17;letter-spacing:-2.5px;font-weight:800;margin:0 0 25px}
      .na-heading em{font-style:normal;color:var(--blue)}
      .na-reveal{opacity:0;transform:translateY(28px);transition:opacity .75s ease,transform .75s cubic-bezier(.2,.8,.2,1)}
      .na-reveal.na-visible{opacity:1;transform:translateY(0)}
      .na-hero{position:relative;isolation:isolate;min-height:650px;height:min(790px,90svh);display:flex;align-items:center;color:#fff;background:var(--navy);overflow:hidden}
      .na-hero-photo{position:absolute;inset:0;z-index:-3;background:url('https://images.pexels.com/photos/16005938/pexels-photo-16005938.jpeg?auto=compress&cs=tinysrgb&w=2000') center/cover no-repeat;animation:na-hero-zoom 16s ease-out both}
      .na-hero-shade{position:absolute;inset:0;z-index:-2;background:linear-gradient(90deg,rgba(5,19,39,.95),rgba(5,19,39,.76) 48%,rgba(5,19,39,.23)),linear-gradient(0deg,rgba(5,19,39,.5),transparent 45%)}
      .na-hero-content{padding:90px 0 110px;position:relative}
      .na-hero h1{font-family:'Manrope',sans-serif;font-size:clamp(45px,5.6vw,82px);font-weight:800;line-height:1.12;letter-spacing:-3.7px;max-width:1000px;margin:0 0 27px;animation:na-rise .85s both}
      .na-hero h1 em{font-style:normal;color:#89b7ff}
      .na-hero-content>p{max-width:600px;font-size:16px;line-height:1.85;color:#dce7f5;margin-bottom:34px;animation:na-rise .9s .1s both}
      .na-hero-actions{display:flex;flex-wrap:wrap;gap:14px;animation:na-rise .9s .2s both}
      .na-button{display:inline-flex;align-items:center;justify-content:center;gap:15px;min-height:57px;padding:9px 11px 9px 23px;border-radius:8px;font-size:13px;font-weight:700;transition:transform .35s,background .35s,box-shadow .35s,color .35s}
      .na-button>span{display:grid;place-items:center;width:38px;height:38px;border-radius:6px;background:#ffffff27;transition:transform .35s}
      .na-button:hover{transform:translateY(-4px)}.na-button:hover>span{transform:rotate(45deg)}
      .na-button-blue{background:var(--blue);color:white;box-shadow:0 10px 25px #2463eb35}.na-button-blue:hover{background:#1252d8;color:white;box-shadow:0 17px 34px #2463eb45}
      .na-button-outline{border:1px solid #ffffff80;color:white;padding:15px 24px;background:#ffffff10;backdrop-filter:blur(8px)}.na-button-outline:hover{background:white;color:var(--navy)}
      .na-button-white{background:white;color:var(--navy)}.na-button-white>span{background:#e9f0ff}.na-button-white:hover{background:#e8f0ff;color:var(--navy)}
      .na-hero-bottom{position:absolute;bottom:29px;left:max(44px,calc((100vw - 1280px)/2));right:max(44px,calc((100vw - 1280px)/2));display:flex;justify-content:space-between;gap:20px;font-size:10px;font-weight:700;letter-spacing:1.7px;color:#d2e0f2}
      .na-hero-bottom span:last-child{display:flex;gap:10px;align-items:center}
      .na-stats{background:var(--navy);color:#fff;padding:35px 0;border-top:1px solid #ffffff2a}
      .na-stats-grid{display:grid;grid-template-columns:repeat(3,1fr)}.na-stats-grid>div{padding:14px 30px;border-right:1px solid #ffffff28}.na-stats-grid>div:first-child{padding-left:0}.na-stats-grid>div:last-child{border:0}
      .na-stats strong{font:800 clamp(34px,4vw,55px)/1.1 'Manrope',sans-serif;letter-spacing:-2px}.na-stats strong span{color:#8ab7ff}.na-stats p{margin:8px 0 0;color:#b8cbe2;font-size:13px}
      .na-story-grid{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:clamp(50px,7vw,110px)}
      .na-story-media{position:relative;min-width:0;padding:0 25px 30px 0}.na-image-frame{height:clamp(440px,43vw,610px);overflow:hidden;border-radius:12px;background:var(--pale)}.na-image-frame img{width:100%;height:100%;object-fit:cover;transition:transform 1s cubic-bezier(.2,.8,.2,1)}.na-story-media:hover img{transform:scale(1.07)}
      .na-image-label{position:absolute;right:0;bottom:0;display:flex;align-items:center;gap:16px;padding:22px 25px;background:var(--blue);color:white;border-radius:9px;box-shadow:0 15px 35px #0b24502e}.na-image-label div{display:grid;gap:5px}.na-image-label small{font-size:10px;letter-spacing:1.5px}.na-image-label strong{font-size:14px}
      .na-story-copy>p{color:var(--muted);font-size:15px;line-height:1.95;margin-bottom:18px}.na-story-points{display:grid;gap:14px;margin:26px 0 30px}.na-story-points>div{display:flex;align-items:center;gap:12px;font-size:13px;font-weight:700}.na-story-points svg{color:var(--blue)}
      .na-text-link{display:inline-flex;align-items:center;gap:18px;font-size:13px;font-weight:800;color:var(--navy)}.na-text-link>span{width:43px;height:43px;display:grid;place-items:center;border:1px solid #cdd9e9;border-radius:50%;transition:.35s}.na-text-link:hover>span{background:var(--blue);border-color:var(--blue);color:white;transform:rotate(45deg)}
      .na-purpose{background:var(--pale)}.na-section-head{margin-bottom:40px}.na-purpose-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}
      .na-purpose-card{position:relative;background:white;border:1px solid var(--line);border-radius:13px;padding:38px 38px 65px;min-height:310px;transition:transform .4s,box-shadow .4s,border-color .4s}.na-purpose-card:hover{transform:translateY(-8px);box-shadow:0 22px 55px #0b234219;border-color:#b7d0ff}
      .na-purpose-icon{width:61px;height:61px;display:grid;place-items:center;border-radius:13px;background:#eaf1ff;color:var(--blue);margin-bottom:30px;transition:background .35s,color .35s,transform .35s}.na-purpose-card:hover .na-purpose-icon{background:var(--blue);color:white;transform:rotate(-7deg)}
      .na-card-index{font-size:10px;font-weight:800;letter-spacing:1.8px;color:var(--blue)}.na-purpose-card h3{font:800 clamp(21px,2.2vw,29px)/1.35 'Manrope',sans-serif;letter-spacing:-.9px;max-width:430px;margin:15px 0}.na-purpose-card p{font-size:14px;line-height:1.85;color:var(--muted);max-width:460px;margin:0}.na-card-arrow{position:absolute;bottom:28px;right:30px;color:var(--blue);transition:transform .35s}.na-purpose-card:hover .na-card-arrow{transform:translate(5px,-5px)}
      .na-values-intro{display:flex;align-items:end;justify-content:space-between;gap:45px;margin-bottom:43px}.na-values-intro>p{max-width:370px;color:var(--muted);font-size:15px;line-height:1.9}
      .na-values-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:17px}.na-value-card{position:relative;padding:29px 24px 57px;min-height:325px;border:1px solid var(--line);border-radius:11px;background:#fff;transition:background .4s,border-color .4s,box-shadow .4s,transform .4s}.na-value-card:hover{transform:translateY(-8px);background:#f7faff;border-color:#c5d9ff;box-shadow:0 18px 42px #0b234217}
      .na-value-top{display:flex;justify-content:space-between;align-items:start;margin-bottom:33px}.na-value-icon{display:grid;place-items:center;width:55px;height:55px;border-radius:11px;background:#eaf1ff;color:var(--blue);transition:.35s}.na-value-card:hover .na-value-icon{background:var(--blue);color:white;transform:rotate(-7deg)}.na-value-number{color:#9aa9bb;font-size:12px;font-weight:800}
      .na-value-card h3{font:800 19px/1.35 'Manrope',sans-serif;letter-spacing:-.6px;margin:0 0 13px}.na-value-card p{font-size:13px;line-height:1.85;color:var(--muted);margin:0}.na-value-arrow{position:absolute;bottom:23px;right:23px;color:var(--blue);transition:transform .35s}.na-value-card:hover .na-value-arrow{transform:translate(5px,-5px)}
      .na-experience{display:grid;grid-template-columns:48% 52%;background:var(--navy);color:white}.na-experience-image{min-height:640px;overflow:hidden}.na-experience-image img{width:100%;height:100%;object-fit:cover;transition:transform 1s}.na-experience-image:hover img{transform:scale(1.06)}
      .na-experience-copy{display:flex;align-items:center;padding:clamp(60px,6vw,100px) clamp(35px,5.5vw,95px)}.na-experience-copy h2{font:800 clamp(33px,3.15vw,48px)/1.2 'Manrope',sans-serif;letter-spacing:-1.9px;margin:0 0 25px}.na-experience-copy h2 em{font-style:normal;color:#8bb8ff}.na-experience-copy p{font-size:15px;line-height:1.9;color:#c0d0e4;margin-bottom:27px}.na-experience-list{display:grid;gap:18px;margin-bottom:34px}.na-experience-list>div{display:flex;align-items:center;gap:14px;font-size:13px;font-weight:700}.na-experience-list svg{color:#8bb8ff;flex:none}
      .na-visit{position:relative;isolation:isolate;background:var(--navy) url('https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&w=1800') center/cover no-repeat;color:white}.na-visit-overlay{position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,#071b35f5,#071b35b8 55%,#071b3545)}.na-visit-content{padding:clamp(90px,10vw,150px) 0}.na-visit h2{font:800 clamp(37px,5vw,68px)/1.17 'Manrope',sans-serif;letter-spacing:-2.5px;margin:0 0 24px}.na-visit h2 em{font-style:normal;color:#8bb8ff}.na-visit p{max-width:540px;color:#d6e3f2;font-size:15px;line-height:1.9;margin-bottom:31px}
      @keyframes na-rise{from{opacity:0;transform:translateY(25px)}to{opacity:1;transform:translateY(0)}}@keyframes na-hero-zoom{from{transform:scale(1.08)}to{transform:scale(1)}}
      .nestwell-about a:focus-visible{outline:3px solid #91baff;outline-offset:4px}
      @media(max-width:1100px){.na-values-grid{grid-template-columns:repeat(2,1fr)}.na-story-grid{gap:45px}.na-experience-copy{padding:55px 40px}}
      @media(max-width:800px){.na-container{width:min(100% - 40px,1280px)}.na-hero{height:auto;min-height:660px}.na-hero-content{padding:105px 0 125px}.na-hero h1{letter-spacing:-2.5px}.na-hero-bottom{left:20px;right:20px}.na-story-grid{grid-template-columns:1fr}.na-story-media{max-width:650px}.na-image-frame{height:460px}.na-purpose-grid{grid-template-columns:1fr}.na-values-intro{display:block}.na-values-intro>p{max-width:580px}.na-experience{grid-template-columns:1fr}.na-experience-image{min-height:420px;height:420px}.na-experience-copy{padding:65px 30px}}
      @media(max-width:520px){.na-container{width:calc(100% - 32px)}.na-section{padding:72px 0}.na-hero{min-height:650px}.na-hero-content{padding:85px 0 115px}.na-hero h1{font-size:clamp(37px,10vw,52px);letter-spacing:-1.9px}.na-hero-content>p{font-size:14px}.na-hero-bottom{font-size:9px}.na-hero-bottom span:last-child{display:none}.na-hero-actions{align-items:stretch}.na-hero-actions .na-button{width:100%}.na-stats{padding:24px 0}.na-stats-grid{gap:0}.na-stats-grid>div{padding:8px 10px;text-align:center}.na-stats-grid>div:first-child{padding-left:0}.na-stats strong{font-size:29px}.na-stats p{font-size:10px;line-height:1.5}.na-heading{font-size:35px;letter-spacing:-1.5px}.na-image-frame{height:370px}.na-image-label{padding:17px}.na-purpose-card{padding:28px 25px 60px;min-height:auto}.na-values-grid{grid-template-columns:1fr}.na-value-card{min-height:250px}.na-experience-image{height:310px;min-height:310px}.na-experience-copy{padding:60px 22px}.na-experience-copy h2{font-size:34px}.na-visit h2{letter-spacing:-1.4px}}
      @media(prefers-reduced-motion:reduce){.nestwell-about *, .nestwell-about *::before,.nestwell-about *::after{animation:none!important;transition-duration:.01ms!important;scroll-behavior:auto!important}.na-reveal{opacity:1;transform:none}}
    `}</style>
  </main>;
}
