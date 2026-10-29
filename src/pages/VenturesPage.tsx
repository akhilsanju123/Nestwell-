import { useEffect, useRef, type ReactNode } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, Compass,
  FileCheck2, Handshake, MapPin, ShieldCheck, Sparkles,
} from 'lucide-react';
import { ProjectExplorer } from '@/components/ProjectExplorer';
import { SmartLink } from '@/components/SiteChrome';

const HERO_IMAGE = 'https://images.pexels.com/photos/11201060/pexels-photo-11201060.jpeg?auto=compress&cs=tinysrgb&w=2000';
const DETAIL_IMAGE = 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200';

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('nv-visible');
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('nv-visible');
        observer.unobserve(node);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`nv-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const benefits = [
  { icon: MapPin, number: '01', title: 'Locations with context', description: 'Explore where each venture sits, its surroundings, and the connections that matter to you.' },
  { icon: FileCheck2, number: '02', title: 'Details that matter', description: 'Review available layout specifications and approval information before making a decision.' },
  { icon: Handshake, number: '03', title: 'Guidance, not pressure', description: 'Ask questions, compare options, and arrange a visit when you feel ready.' },
];

export function VenturesPage() {
  const scrollToVentures = () => document.getElementById('nestwell-venture-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <main className="nv-page">
      <section className="nv-hero" aria-labelledby="nv-hero-title">
        <img className="nv-hero-photo" src={HERO_IMAGE} alt="Aerial view of a thoughtfully planned development landscape" fetchPriority="high" />
        <div className="nv-hero-shade" />
        <div className="nv-container nv-hero-content">
          <Reveal>
            <div className="nv-eyebrow nv-eyebrow-light"><span className="nv-line" /> THE NESTWELL PORTFOLIO</div>
            <h1 id="nv-hero-title">Discover land.<br /><span>Discover possibility.</span></h1>
            <p>Explore thoughtfully selected plotted developments across Visakhapatnam and Vizianagaram. Find the setting, space, and details that feel right for your next chapter.</p>
            <div className="nv-hero-actions">
              <button type="button" onClick={scrollToVentures} className="nv-button nv-button-blue">Explore ventures <span><ArrowUpRight size={19} /></span></button>
              <SmartLink href="/book-site-visit" className="nv-button nv-button-outline">Book a site visit <ArrowRight size={18} /></SmartLink>
            </div>
          </Reveal>
          <div className="nv-hero-bottom">
            <div className="nv-hero-proof"><ShieldCheck size={19} /> Project information, presented with clarity</div>
            <button type="button" className="nv-scroll" onClick={scrollToVentures} aria-label="Scroll to ventures"><ArrowDown size={20} /></button>
          </div>
        </div>
        <div className="nv-hero-vertical">NESTWELL DEVELOPERS · ANDHRA PRADESH</div>
      </section>

      <section className="nv-intro" aria-label="Our developments">
        <div className="nv-container nv-intro-grid">
          <Reveal>
            <div className="nv-eyebrow"><span className="nv-line" /> FIND YOUR NEXT PLACE</div>
            <h2>Spaces for the life<br /><em>you’re building.</em></h2>
          </Reveal>
          <Reveal delay={130}>
            <p>Every property journey starts with a different ambition. Whether you are exploring a future home or considering a long-term land purchase, we help you understand your options with greater confidence.</p>
            <div className="nv-intro-tags"><span><MapPin size={15} /> Visakhapatnam</span><span><MapPin size={15} /> Vizianagaram</span></div>
          </Reveal>
        </div>
      </section>

      <section className="nv-listing" id="nestwell-venture-list" aria-labelledby="nv-listing-title">
        <div className="nv-container">
          <Reveal className="nv-listing-heading">
            <div>
              <div className="nv-eyebrow"><span className="nv-line" /> EXPLORE OUR COLLECTION</div>
              <h2 id="nv-listing-title">Featured <em>ventures.</em></h2>
            </div>
            <p>Browse the portfolio, refine your search, and open any project to explore its available details.</p>
          </Reveal>
          <Reveal delay={100} className="nv-explorer-shell">
            <ProjectExplorer />
          </Reveal>
          <Reveal className="nv-listing-footer">
            <span><Sparkles size={18} /> Need help choosing a venture?</span>
            <SmartLink href="/book-site-visit" className="nv-text-link">Talk to our team <ArrowUpRight size={19} /></SmartLink>
          </Reveal>
        </div>
      </section>

      <section className="nv-difference" aria-labelledby="nv-difference-title">
        <div className="nv-container">
          <Reveal className="nv-difference-heading">
            <div className="nv-eyebrow"><span className="nv-line" /> THE NESTWELL APPROACH</div>
            <h2 id="nv-difference-title">A clearer way to<br /><em>choose your next plot.</em></h2>
            <p>More than attractive photographs. We focus on the information and conversations that make property discovery easier.</p>
          </Reveal>
          <div className="nv-benefit-grid">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return <Reveal className="nv-benefit" delay={index * 100} key={benefit.number}>
                <div className="nv-benefit-top"><span className="nv-benefit-icon"><Icon size={26} strokeWidth={1.7} /></span><span className="nv-benefit-number">{benefit.number}</span></div>
                <h3>{benefit.title}</h3><p>{benefit.description}</p><span className="nv-benefit-rule" />
              </Reveal>;
            })}
          </div>
        </div>
      </section>

      <section className="nv-visit" aria-labelledby="nv-visit-title">
        <div className="nv-visit-photo"><img src={DETAIL_IMAGE} alt="Contemporary property and landscaped surroundings" loading="lazy" /></div>
        <div className="nv-visit-copy">
          <Reveal>
            <div className="nv-eyebrow nv-eyebrow-light"><span className="nv-line" /> THE NEXT STEP</div>
            <h2 id="nv-visit-title">See the place.<br /><em>Feel the potential.</em></h2>
            <p>Images and layouts are a starting point. A guided site visit helps you experience the roads, setting, and surroundings for yourself.</p>
            <div className="nv-visit-points"><span><BadgeCheck size={18} /> Explore on site</span><span><Compass size={18} /> Understand the surroundings</span></div>
            <SmartLink href="/book-site-visit" className="nv-button nv-button-blue">Schedule a site visit <span><ArrowUpRight size={19} /></span></SmartLink>
          </Reveal>
        </div>
      </section>

      <section className="nv-final">
        <div className="nv-container nv-final-inner">
          <Reveal>
            <div className="nv-eyebrow"><span className="nv-line" /> YOUR JOURNEY STARTS HERE</div>
            <h2>Find a place for<br /><em>what comes next.</em></h2>
          </Reveal>
          <Reveal delay={100}><SmartLink href="/book-site-visit" className="nv-button nv-button-dark">Let's find your place <span><ArrowUpRight size={19} /></span></SmartLink></Reveal>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
        .nv-page{--navy:#081c37;--blue:#2868e8;--sky:#87b5ff;--ink:#10233f;--muted:#697b91;--soft:#f5f7fb;--stroke:#e4eaf2;font-family:'DM Sans',sans-serif;color:var(--ink);overflow:clip;background:white}
        .nv-page *,.nv-page *::before,.nv-page *::after{box-sizing:border-box}
        .nv-page h1,.nv-page h2,.nv-page h3,.nv-page p{margin-top:0}
        .nv-page a{text-decoration:none}.nv-page button{font:inherit;cursor:pointer}
        .nv-container{width:min(100% - 80px,1320px);margin-inline:auto}
        .nv-eyebrow{display:inline-flex;align-items:center;gap:12px;color:var(--blue);font-size:11px;font-weight:800;letter-spacing:2px;margin-bottom:22px}
        .nv-line{width:30px;height:2px;background:currentColor;display:inline-block}
        .nv-eyebrow-light{color:#a9caff}
        .nv-page h1,.nv-page h2,.nv-page h3{font-family:'Manrope',sans-serif}
        .nv-page h2{font-size:clamp(36px,4.4vw,64px);font-weight:800;letter-spacing:-2.6px;line-height:1.16}
        .nv-page h2 em{font-style:normal;color:var(--blue)}
        .nv-button{display:inline-flex;align-items:center;justify-content:center;gap:16px;min-height:56px;padding:9px 11px 9px 24px;border:1px solid transparent;border-radius:7px;font-size:13px;font-weight:700;transition:transform .3s,background .3s,box-shadow .3s,color .3s}
        .nv-button:hover{transform:translateY(-4px)}
        .nv-button>span{display:grid;place-items:center;width:38px;height:38px;background:#ffffff25;border-radius:5px;transition:transform .3s}
        .nv-button:hover>span{transform:rotate(45deg)}
        .nv-button-blue{background:var(--blue);color:white;box-shadow:0 10px 30px #2868e83b}
        .nv-button-blue:hover{background:#1656cf;color:white;box-shadow:0 16px 34px #2868e859}
        .nv-button-outline{border-color:#ffffff70;background:#ffffff12;color:white;padding:16px 24px;backdrop-filter:blur(10px)}
        .nv-button-outline:hover{background:white;color:var(--navy)}
        .nv-button-dark{background:var(--navy);color:white}.nv-button-dark:hover{background:var(--blue);color:white}
        .nv-hero{min-height:670px;height:min(780px,90svh);position:relative;background:var(--navy);color:white;isolation:isolate;overflow:hidden}
        .nv-hero-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-3;animation:nv-hero-zoom 13s ease-out both}
        .nv-hero-shade{position:absolute;inset:0;z-index:-2;background:linear-gradient(90deg,rgba(4,18,37,.94),rgba(4,18,37,.76) 43%,rgba(4,18,37,.18)),linear-gradient(0deg,#06182b8a,transparent 48%)}
        .nv-hero-content{height:100%;display:flex;flex-direction:column;justify-content:center;position:relative;padding-block:75px 110px}
        .nv-hero-content>div:first-child{max-width:850px}
        .nv-hero h1{font-size:clamp(54px,6.6vw,98px);font-weight:800;line-height:1.12;letter-spacing:-4.5px;margin-bottom:28px}
        .nv-hero h1 span{color:var(--sky)}
        .nv-hero p{max-width:610px;font-size:16px;line-height:1.95;color:#d6e3f4;margin-bottom:34px}
        .nv-hero-actions{display:flex;flex-wrap:wrap;gap:14px}
        .nv-hero-bottom{position:absolute;bottom:37px;left:0;right:0;display:flex;align-items:center;justify-content:space-between;gap:20px}
        .nv-hero-proof{display:flex;align-items:center;gap:11px;font-size:12px;color:#d3e4ff;letter-spacing:.2px}
        .nv-scroll{height:47px;width:47px;border:1px solid #ffffff70;background:#ffffff18;color:white;border-radius:50%;display:grid;place-items:center;transition:background .3s,transform .3s}
        .nv-scroll:hover{background:var(--blue);transform:translateY(5px)}
        .nv-hero-vertical{position:absolute;right:22px;top:50%;writing-mode:vertical-rl;transform:translateY(-50%);font-size:10px;letter-spacing:3px;color:#ffffffa3}
        .nv-intro{padding:105px 0;background:white}
        .nv-intro-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:95px;align-items:center}
        .nv-intro h2{margin-bottom:0}.nv-intro p{font-size:16px;line-height:2;color:var(--muted);margin-bottom:25px}
        .nv-intro-tags{display:flex;gap:10px;flex-wrap:wrap}
        .nv-intro-tags span{display:inline-flex;align-items:center;gap:7px;padding:10px 14px;background:#edf4ff;color:#285b9c;border-radius:6px;font-size:12px;font-weight:700}
        .nv-listing{padding:108px 0 100px;background:var(--soft);scroll-margin-top:80px}
        .nv-listing-heading{display:flex;align-items:end;justify-content:space-between;gap:45px;margin-bottom:45px}
        .nv-listing-heading h2{margin:0}.nv-listing-heading p{max-width:365px;font-size:15px;line-height:1.9;color:var(--muted);margin-bottom:4px}
        .nv-explorer-shell{min-width:0}
        /* ProjectExplorer keeps its existing filter/search behavior. These selectors enhance common card markup. */
        .nv-explorer-shell :is(.project-card,.venture-card){border-radius:12px;overflow:hidden;transition:transform .35s,box-shadow .35s,border-color .35s;box-shadow:0 4px 16px #0b274008}
        .nv-explorer-shell :is(.project-card,.venture-card):hover{transform:translateY(-8px);box-shadow:0 20px 40px #0b27401c;border-color:#c9d9f5}
        .nv-explorer-shell :is(.project-card,.venture-card) img{transition:transform .7s cubic-bezier(.2,.8,.2,1)}
        .nv-explorer-shell :is(.project-card,.venture-card):hover img{transform:scale(1.055)}
        .nv-explorer-shell :is(button,select,input){transition:border-color .25s,background .25s,box-shadow .25s}
        .nv-explorer-shell :is(button,select,input):focus-visible{outline:2px solid var(--blue);outline-offset:3px}
        .nv-listing-footer{margin-top:44px;padding-top:24px;border-top:1px solid #dfe6f0;display:flex;align-items:center;justify-content:space-between;gap:20px}
        .nv-listing-footer>span{display:inline-flex;align-items:center;gap:9px;font-size:13px;color:var(--muted)}
        .nv-text-link{display:inline-flex;align-items:center;gap:9px;color:var(--blue);font-size:13px;font-weight:800;transition:gap .3s}
        .nv-text-link:hover{gap:16px}
        .nv-difference{padding:110px 0 120px;background:white}
        .nv-difference-heading{max-width:740px;margin-bottom:48px}
        .nv-difference-heading p{max-width:600px;color:var(--muted);font-size:15px;line-height:1.9;margin:22px 0 0}
        .nv-benefit-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
        .nv-benefit{padding:35px 30px 34px;border:1px solid var(--stroke);border-radius:12px;min-height:305px;position:relative;overflow:hidden;background:white;transition:background .35s,border-color .35s,box-shadow .35s,transform .35s}
        .nv-benefit:hover{transform:translateY(-9px);background:#f8fbff;border-color:#bcd1fa;box-shadow:0 22px 45px #102c5016}
        .nv-benefit-top{display:flex;align-items:start;justify-content:space-between;margin-bottom:35px}
        .nv-benefit-icon{height:61px;width:61px;display:grid;place-items:center;border-radius:10px;background:#eaf2ff;color:var(--blue);transition:transform .35s,background .35s,color .35s}
        .nv-benefit:hover .nv-benefit-icon{transform:rotate(-7deg);background:var(--blue);color:white}
        .nv-benefit-number{font-size:12px;color:#a4b1c2;font-weight:800}
        .nv-benefit h3{font-size:21px;letter-spacing:-.7px;margin-bottom:12px}
        .nv-benefit p{font-size:13px;line-height:1.85;color:var(--muted);margin-bottom:0}
        .nv-benefit-rule{position:absolute;bottom:0;left:0;height:4px;width:100%;background:var(--blue);transform:scaleX(0);transform-origin:left;transition:transform .4s}
        .nv-benefit:hover .nv-benefit-rule{transform:scaleX(1)}
        .nv-visit{display:grid;grid-template-columns:1fr 1fr;background:var(--navy);color:white;min-height:560px}
        .nv-visit-photo{position:relative;min-height:480px;overflow:hidden}
        .nv-visit-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1s}
        .nv-visit-photo:hover img{transform:scale(1.07)}
        .nv-visit-copy{display:flex;align-items:center;padding:75px clamp(32px,6vw,110px)}
        .nv-visit-copy>div{width:100%;max-width:620px}
        .nv-visit h2{font-size:clamp(39px,4.2vw,63px);margin-bottom:25px;color:white}
        .nv-visit h2 em{color:var(--sky)}
        .nv-visit p{color:#c4d3e6;line-height:1.95;font-size:15px;margin-bottom:24px}
        .nv-visit-points{display:flex;flex-wrap:wrap;gap:12px 24px;margin-bottom:31px}
        .nv-visit-points span{display:inline-flex;align-items:center;gap:8px;color:#dce8fa;font-size:12px;font-weight:700}
        .nv-visit-points svg{color:var(--sky)}
        .nv-final{padding:88px 0;background:linear-gradient(115deg,#eef4ff,#fff)}
        .nv-final-inner{display:flex;justify-content:space-between;align-items:center;gap:40px}
        .nv-final h2{margin-bottom:0}
        .nv-reveal{opacity:0;transform:translateY(30px);transition:opacity .75s ease,transform .75s cubic-bezier(.2,.8,.2,1)}
        .nv-reveal.nv-visible{opacity:1;transform:translateY(0)}
        @keyframes nv-hero-zoom{from{transform:scale(1.09)}to{transform:scale(1)}}
        @media(max-width:1100px){.nv-container{width:min(100% - 48px,1320px)}.nv-intro-grid{gap:45px}.nv-visit-copy{padding:55px 35px}.nv-hero h1{letter-spacing:-3px}}
        @media(max-width:767px){
          .nv-container{width:min(100% - 36px,1320px)}
          .nv-hero{min-height:640px;height:85svh}.nv-hero-photo{object-position:58% center}
          .nv-hero-shade{background:linear-gradient(90deg,#06172fe8,#06172f9e)}
          .nv-hero-content{padding-block:65px 100px}.nv-hero h1{font-size:clamp(44px,10vw,66px);letter-spacing:-2px}
          .nv-hero p{font-size:14px;line-height:1.8}.nv-hero-actions{align-items:flex-start}
          .nv-hero-vertical{display:none}.nv-hero-proof{font-size:10px;max-width:240px}
          .nv-intro,.nv-listing,.nv-difference{padding-block:75px}
          .nv-intro-grid{grid-template-columns:1fr;gap:22px}
          .nv-page h2{font-size:clamp(34px,8vw,48px);letter-spacing:-1.5px}
          .nv-listing-heading{flex-direction:column;align-items:flex-start;gap:15px;margin-bottom:30px}
          .nv-benefit-grid{grid-template-columns:1fr}.nv-benefit{min-height:260px}
          .nv-listing-footer{align-items:flex-start;flex-direction:column}
          .nv-visit{grid-template-columns:1fr}.nv-visit-photo{min-height:320px}.nv-visit-copy{padding:65px 24px}
          .nv-final{padding-block:70px}.nv-final-inner{flex-direction:column;align-items:flex-start;gap:25px}
        }
        @media(max-width:420px){.nv-hero-actions{flex-direction:column;align-items:stretch}.nv-hero h1{font-size:43px}.nv-button{width:100%}}
        @media(prefers-reduced-motion:reduce){.nv-page *,.nv-page *::before,.nv-page *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}.nv-reveal{opacity:1;transform:none}}
      `}</style>
    </main>
  );
}
