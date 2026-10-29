import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { ArrowUpRight, ArrowRight, MapPin, Compass, CalendarDays, ShieldCheck } from 'lucide-react';
import { locations } from '@/data/locations';
import { SmartLink } from '@/components/SiteChrome';

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('nl-visible'); return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('nl-visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.08 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`nl-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function LocationsPage() {
  return (
    <main className="nl-page">
      <section className="nl-hero" aria-labelledby="nl-title">
        <div className="nl-hero-image" />
        <div className="nl-hero-shade" />
        <div className="nl-container nl-hero-content">
          <Reveal>
            <span className="nl-eyebrow nl-eyebrow-light"><span className="nl-dash" /> EXPLORE OUR DESTINATIONS</span>
            <h1 id="nl-title">Find Your Place.<br /><span>Discover What’s Next.</span></h1>
            <p>From coastal destinations to growing urban corridors, explore the places behind NestWell's thoughtfully selected developments.</p>
            <a className="nl-hero-action" href="#destinations">Explore Locations <ArrowUpRight size={19} /></a>
          </Reveal>
          <div className="nl-hero-foot"><span><MapPin size={17} /> Andhra Pradesh, India</span><span>{String(locations.length).padStart(2, '0')} destinations to explore</span></div>
        </div>
      </section>

      <section className="nl-intro nl-section" id="destinations">
        <div className="nl-container">
          <Reveal className="nl-heading-row">
            <div><span className="nl-eyebrow"><span className="nl-dash" /> THE LOCATIONS</span><h2>Every Place Has <span>A Story.</span></h2></div>
            <p>Discover the character, setting, and possibilities of each location. Choose a destination to learn more about the developments available there.</p>
          </Reveal>
          <div className="nl-locations">
            {locations.map((location, index) => (
              <Reveal key={location.slug} delay={Math.min(index, 3) * 90}>
                <SmartLink href={`/locations/${location.slug}`} className="nl-location-card">
                  <div className="nl-location-media">
                    <img src={location.image} alt={`Landscape of ${location.name}`} loading="lazy" />
                    <span className="nl-image-number">{String(index + 1).padStart(2, '0')} / {String(locations.length).padStart(2, '0')}</span>
                  </div>
                  <div className="nl-location-info">
                    <span className="nl-kicker"><MapPin size={15} /> {location.kicker}</span>
                    <h3>{location.name}</h3>
                    <p>{location.description}</p>
                    <span className="nl-location-link">Discover {location.name} <ArrowUpRight size={18} /></span>
                  </div>
                  <span className="nl-corner-arrow" aria-hidden="true"><ArrowUpRight size={24} /></span>
                </SmartLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="nl-section nl-why">
        <div className="nl-container">
          <Reveal className="nl-center-heading"><span className="nl-eyebrow"><span className="nl-dash" /> OUR APPROACH</span><h2>Explore With <span>Confidence.</span></h2><p>Good property decisions begin with understanding the place, not just viewing a plot.</p></Reveal>
          <div className="nl-benefits">
            {[
              { icon: Compass, title: 'Understand the Setting', text: 'Get a clearer view of the area, nearby connections, and the character of each destination.' },
              { icon: MapPin, title: 'Discover the Developments', text: 'Explore the projects associated with the locations that interest you most.' },
              { icon: ShieldCheck, title: 'Make an Informed Choice', text: 'Review available project information and ask questions before making a decision.' },
            ].map((item, index) => {
              const Icon = item.icon;
              return <Reveal key={item.title} delay={index * 100} className="nl-benefit"><div className="nl-benefit-icon"><Icon size={27} strokeWidth={1.6} /></div><span className="nl-benefit-num">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p><span className="nl-benefit-line" /></Reveal>;
            })}
          </div>
        </div>
      </section>

      <section className="nl-cta">
        <div className="nl-container nl-cta-inner">
          <Reveal><span className="nl-eyebrow nl-eyebrow-light"><span className="nl-dash" /> SEE IT FOR YOURSELF</span><h2>The Best Way To Know<br /><span>Is To Be There.</span></h2><p>Visit the location, explore the surroundings, and take your next step with greater clarity.</p></Reveal>
          <Reveal delay={120}><SmartLink href="/book-site-visit" className="nl-cta-button"><CalendarDays size={20} /> Book a Site Visit <ArrowUpRight size={20} /></SmartLink></Reveal>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
        .nl-page{--navy:#081d39;--blue:#2563eb;--sky:#87b6ff;--ink:#10243f;--muted:#6b7a90;--line:#e3eaf3;font-family:'DM Sans',sans-serif;background:#fff;color:var(--ink);overflow:clip}
        .nl-page *{box-sizing:border-box}.nl-page h1,.nl-page h2,.nl-page h3,.nl-page p{margin-top:0}.nl-page a{text-decoration:none}.nl-container{width:min(100% - 80px,1320px);margin-inline:auto}.nl-section{padding:110px 0}.nl-page h1,.nl-page h2,.nl-page h3{font-family:'Manrope',sans-serif}.nl-eyebrow{display:inline-flex;align-items:center;gap:12px;font-size:11px;font-weight:800;letter-spacing:2px;color:var(--blue);margin-bottom:23px}.nl-dash{width:29px;height:2px;background:currentColor}.nl-eyebrow-light{color:#a7caff}
        .nl-hero{min-height:660px;height:78svh;max-height:880px;position:relative;background:var(--navy);isolation:isolate;color:#fff;display:flex;align-items:center}.nl-hero-image{position:absolute;inset:0;z-index:-2;background:url('https://images.pexels.com/photos/11201060/pexels-photo-11201060.jpeg?auto=compress&cs=tinysrgb&w=1920') center/cover no-repeat;animation:nl-hero-zoom 13s ease-out both}.nl-hero-shade{position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,rgba(5,21,43,.94) 0%,rgba(5,21,43,.75) 47%,rgba(5,21,43,.28) 100%),linear-gradient(0deg,rgba(5,21,43,.5),transparent 40%)}.nl-hero-content{position:relative;padding-block:100px}.nl-hero h1{font-size:clamp(49px,6.5vw,94px);font-weight:800;letter-spacing:-4px;line-height:1.11;margin-bottom:26px}.nl-hero h1 span,.nl-cta h2 span{color:var(--sky)}.nl-hero p{max-width:610px;font-size:16px;line-height:1.95;color:#d5e2f3;margin-bottom:32px}.nl-hero-action{display:inline-flex;align-items:center;gap:30px;padding:18px 24px;border-radius:7px;background:var(--blue);color:white;font-size:13px;font-weight:700;transition:transform .35s,background .35s,box-shadow .35s}.nl-hero-action:hover{background:#1552d8;transform:translateY(-4px);box-shadow:0 14px 30px #0004}.nl-hero-action svg{transition:transform .3s}.nl-hero-action:hover svg{transform:translate(3px,-3px)}.nl-hero-foot{position:absolute;bottom:35px;left:0;right:0;display:flex;justify-content:space-between;align-items:center;font-size:11px;letter-spacing:1px;font-weight:700;color:#d1e1f6;text-transform:uppercase}.nl-hero-foot span:first-child{display:flex;align-items:center;gap:8px}
        .nl-intro{background:#f7f9fc}.nl-heading-row{display:flex;align-items:end;justify-content:space-between;gap:50px;margin-bottom:47px}.nl-heading-row h2,.nl-center-heading h2{font-size:clamp(35px,4.4vw,62px);line-height:1.18;letter-spacing:-2.3px;font-weight:800;margin:0}.nl-heading-row h2 span,.nl-center-heading h2 span{color:var(--blue)}.nl-heading-row>p{max-width:430px;font-size:15px;line-height:1.9;color:var(--muted);margin-bottom:4px}.nl-locations{display:grid;gap:25px}.nl-location-card{position:relative;display:grid;grid-template-columns:minmax(0,1.03fr) minmax(0,1fr);min-height:350px;background:#fff;border:1px solid var(--line);border-radius:15px;overflow:hidden;color:var(--ink);box-shadow:0 8px 24px #10243f08;transition:transform .4s,box-shadow .4s,border-color .4s}.nl-location-card:hover{transform:translateY(-7px);border-color:#b6ccf5;box-shadow:0 24px 55px #10243f20}.nl-location-media{position:relative;min-height:350px;overflow:hidden;background:#dce6f2}.nl-location-media img{width:100%;height:100%;position:absolute;inset:0;object-fit:cover;transition:transform .9s cubic-bezier(.2,.8,.2,1),filter .6s}.nl-location-card:hover img{transform:scale(1.075);filter:saturate(1.08)}.nl-image-number{position:absolute;top:23px;left:23px;background:#fff;color:var(--navy);border-radius:5px;padding:11px 14px;font-size:11px;font-weight:800;letter-spacing:1px}.nl-location-info{padding:clamp(28px,4vw,60px);display:flex;flex-direction:column;align-items:flex-start;justify-content:center}.nl-kicker{display:flex;align-items:center;gap:8px;color:var(--blue);font-size:11px;font-weight:800;letter-spacing:1.3px;text-transform:uppercase;margin-bottom:17px}.nl-location-info h3{font-size:clamp(30px,3.2vw,47px);line-height:1.15;letter-spacing:-1.6px;margin-bottom:18px;font-weight:800;transition:color .3s}.nl-location-card:hover h3{color:var(--blue)}.nl-location-info p{font-size:14px;line-height:1.95;color:var(--muted);max-width:460px;margin-bottom:29px}.nl-location-link{display:inline-flex;align-items:center;gap:14px;color:var(--blue);font-size:13px;font-weight:800}.nl-location-link svg{transition:transform .3s}.nl-location-card:hover .nl-location-link svg{transform:translate(4px,-4px)}.nl-corner-arrow{position:absolute;top:25px;right:25px;width:45px;height:45px;display:grid;place-items:center;border:1px solid var(--line);border-radius:50%;color:var(--blue);transition:background .35s,color .35s,transform .35s}.nl-location-card:hover .nl-corner-arrow{background:var(--blue);color:#fff;transform:rotate(45deg)}
        .nl-why{background:#fff}.nl-center-heading{text-align:center;max-width:740px;margin:0 auto 52px}.nl-center-heading p{font-size:15px;line-height:1.85;color:var(--muted);margin:20px auto 0;max-width:570px}.nl-benefits{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}.nl-benefit{position:relative;padding:36px 32px 42px;border:1px solid var(--line);border-radius:13px;min-height:300px;background:#fff;overflow:hidden;transition:transform .4s,box-shadow .4s,border-color .4s}.nl-benefit:hover{transform:translateY(-9px);border-color:#b9d0fc;box-shadow:0 20px 45px #10243f14}.nl-benefit-icon{width:65px;height:65px;display:grid;place-items:center;background:#eaf1ff;color:var(--blue);border-radius:12px;margin-bottom:38px;transition:transform .35s,background .35s,color .35s}.nl-benefit:hover .nl-benefit-icon{background:var(--blue);color:#fff;transform:rotate(-7deg)}.nl-benefit-num{position:absolute;right:31px;top:37px;color:#a6b5c8;font-size:12px;font-weight:800}.nl-benefit h3{font-size:20px;letter-spacing:-.5px;margin-bottom:13px}.nl-benefit p{font-size:13px;line-height:1.9;color:var(--muted);margin-bottom:0}.nl-benefit-line{position:absolute;left:0;bottom:0;width:100%;height:4px;background:var(--blue);transform:scaleX(0);transform-origin:left;transition:transform .4s}.nl-benefit:hover .nl-benefit-line{transform:scaleX(1)}
        .nl-cta{background:radial-gradient(circle at 95% 15%,#2563eb40,transparent 45%),linear-gradient(115deg,#071b35,#102d55);color:#fff;padding:94px 0}.nl-cta-inner{display:flex;align-items:center;justify-content:space-between;gap:45px}.nl-cta h2{font-size:clamp(39px,4.5vw,66px);font-weight:800;line-height:1.2;letter-spacing:-2px;margin-bottom:20px}.nl-cta p{font-size:15px;line-height:1.85;color:#c3d4e9;max-width:570px;margin:0}.nl-cta-button{display:inline-flex;align-items:center;justify-content:center;gap:17px;background:var(--blue);color:#fff;border-radius:8px;padding:20px 25px;font-size:13px;font-weight:800;white-space:nowrap;transition:transform .35s,background .35s,box-shadow .35s}.nl-cta-button:hover{background:#3779ff;color:#fff;transform:translateY(-5px);box-shadow:0 16px 30px #0003}.nl-cta-button svg:last-child{transition:transform .3s}.nl-cta-button:hover svg:last-child{transform:translate(3px,-3px)}
        .nl-reveal{opacity:0;transform:translateY(30px);transition:opacity .75s ease,transform .75s cubic-bezier(.2,.8,.2,1)}.nl-reveal.nl-visible{opacity:1;transform:translateY(0)}@keyframes nl-hero-zoom{from{transform:scale(1.08)}to{transform:scale(1)}}
        @media(max-width:1000px){.nl-container{width:min(100% - 48px,1320px)}.nl-heading-row{align-items:flex-start;flex-direction:column;gap:22px}.nl-heading-row>p{max-width:650px}.nl-location-info{padding:34px}.nl-location-card,.nl-location-media{min-height:320px}.nl-benefit{padding:30px 25px}}
        @media(max-width:720px){.nl-container{width:min(100% - 36px,1320px)}.nl-section{padding:72px 0}.nl-hero{height:auto;min-height:640px}.nl-hero-content{padding-block:115px 100px}.nl-hero h1{font-size:clamp(43px,9vw,65px);letter-spacing:-2px}.nl-hero p{font-size:14px}.nl-hero-foot{bottom:23px;gap:12px;flex-wrap:wrap;font-size:9px}.nl-heading-row h2,.nl-center-heading h2{font-size:clamp(34px,8vw,47px);letter-spacing:-1.5px}.nl-location-card{grid-template-columns:1fr}.nl-location-media{min-height:250px;aspect-ratio:1.55}.nl-location-info{padding:30px 25px 35px}.nl-location-info h3{font-size:32px}.nl-corner-arrow{top:18px;right:18px;background:white}.nl-benefits{grid-template-columns:1fr}.nl-benefit{min-height:260px}.nl-cta{padding:72px 0}.nl-cta-inner{flex-direction:column;align-items:flex-start}.nl-cta h2{font-size:40px;letter-spacing:-1.5px}.nl-cta-button{white-space:normal}}
        @media(prefers-reduced-motion:reduce){.nl-page *,.nl-page *::before,.nl-page *::after{animation:none!important;transition-duration:.01ms!important;scroll-behavior:auto!important}.nl-reveal{opacity:1;transform:none}}
      `}</style>
    </main>
  );
}
