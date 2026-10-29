import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Compass, MapPin, MapPinned, ShieldCheck, Trees } from 'lucide-react';
import { locations } from '@/data/locations';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { SmartLink } from '@/components/SiteChrome';

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('nld-visible');
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { entry.target.classList.add('nld-visible'); observer.unobserve(entry.target); }
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`nld-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function LocationDetailPage({ slug }: { slug: string }) {
  const location = locations.find((item) => item.slug === slug);
  const related = location ? projects.filter((project) => project.region?.trim().toLowerCase() === location.name.trim().toLowerCase()) : [];

  if (!location) {
    return <main className="nld-page"><section className="nld-not-found"><MapPin size={42} /><span className="nld-kicker">LOCATION GUIDE</span><h1>Location not found.</h1><p>This destination may have moved or is no longer listed.</p><SmartLink href="/locations" className="nld-button nld-primary"><ArrowLeft size={18} /> Explore locations</SmartLink></section><LocationStyles /></main>;
  }

  return (
    <main className="nld-page">
      <section className="nld-hero" aria-label={`${location.name} location overview`}>
        <img className="nld-hero-image" src={location.image} alt={`Landscape of ${location.name}`} fetchPriority="high" />
        <div className="nld-hero-shade" />
        <div className="nld-container nld-hero-inner">
          <div className="nld-breadcrumb"><SmartLink href="/locations">Locations</SmartLink><ArrowRight size={13} /><span>{location.name}</span></div>
          <div className="nld-hero-copy" key={location.slug}>
            <span className="nld-hero-kicker"><span /> NESTWELL LOCATION GUIDE</span>
            <h1>Discover <strong>{location.name}.</strong></h1>
            <p>{location.description}</p>
            <div className="nld-hero-actions">
              <SmartLink href="#explore-location" className="nld-button nld-primary">Explore this location <ArrowUpRight size={18} /></SmartLink>
              <SmartLink href="/book-site-visit" className="nld-button nld-outline">Book a site visit <CalendarDays size={18} /></SmartLink>
            </div>
          </div>
          <div className="nld-hero-footer"><span><MapPin size={15} /> ANDHRA PRADESH, INDIA</span><span>DISCOVER THE POSSIBILITIES <ArrowRight size={16} /></span></div>
        </div>
      </section>

      <section className="nld-section nld-intro" id="explore-location">
        <div className="nld-container nld-intro-grid">
          <Reveal className="nld-intro-photo"><img src={location.image} alt={`${location.name} region and surroundings`} loading="lazy" /><div className="nld-photo-badge"><Compass size={25} /><span>EXPLORE WITH<br /><strong>MORE CLARITY</strong></span></div></Reveal>
          <Reveal className="nld-intro-copy" delay={120}>
            <span className="nld-kicker"><span /> WHY THIS LOCATION</span>
            <h2>Find a place that <em>fits your future.</em></h2>
            <p>{location.name} is part of NestWell’s wider Andhra Pradesh portfolio. Explore the local setting, nearby access routes, and available plotted developments with the guidance of our team.</p>
            <p>Every property decision deserves context. A guided site visit helps you see the surroundings and ask the questions that matter to you.</p>
            <div className="nld-detail-features">
              <div><span className="nld-feature-icon"><MapPinned size={22} /></span><div><strong>Understand the surroundings</strong><p>Explore the wider local corridor and accessibility.</p></div></div>
              <div><span className="nld-feature-icon"><Trees size={22} /></span><div><strong>Explore your options</strong><p>Compare available layouts, plot types, and settings.</p></div></div>
              <div><span className="nld-feature-icon"><ShieldCheck size={22} /></span><div><strong>Ask about documentation</strong><p>Request the relevant project details and approval information.</p></div></div>
            </div>
            <SmartLink href="/book-site-visit" className="nld-button nld-dark">Plan your visit <ArrowUpRight size={18} /></SmartLink>
          </Reveal>
        </div>
      </section>

      <section className="nld-section nld-projects">
        <div className="nld-container">
          <Reveal className="nld-section-heading"><div><span className="nld-kicker"><span /> VENTURES IN {location.name.toUpperCase()}</span><h2>{related.length ? <>Discover the <em>possibilities.</em></> : <>More possibilities <em>ahead.</em></>}</h2><p>{related.length ? `Explore the NestWell developments currently listed for ${location.name}.` : `No projects are currently listed here. Contact our team for the latest information about ${location.name}.`}</p></div><SmartLink href="/ventures" className="nld-inline-link">View all ventures <span><ArrowUpRight size={19} /></span></SmartLink></Reveal>
          {related.length ? <div className="nld-project-grid">{related.map((project, index) => <Reveal className="nld-project-item" delay={Math.min(index, 3) * 90} key={project.slug}><ProjectCard project={project} /></Reveal>)}</div> : <Reveal className="nld-empty"><div className="nld-empty-icon"><MapPin size={30} /></div><h3>Let's explore {location.name} together.</h3><p>Our team can help you understand the region and enquire about current or upcoming opportunities.</p><SmartLink href="/contact" className="nld-button nld-primary">Talk to NestWell <ArrowUpRight size={18} /></SmartLink></Reveal>}
        </div>
      </section>

      <section className="nld-visit"><div className="nld-visit-background" style={{ backgroundImage: `url("${location.image}")` }} /><div className="nld-container nld-visit-inner"><Reveal><span className="nld-kicker nld-kicker-light"><span /> SEE IT FOR YOURSELF</span><h2>The best way to know a place <em>is to experience it.</em></h2><p>Explore the roads, surroundings, and available project details in person with a guided site visit.</p><SmartLink href="/book-site-visit" className="nld-button nld-primary"><CalendarDays size={18} /> Book a site visit <ArrowUpRight size={18} /></SmartLink></Reveal></div></section>
      <section className="nld-bottom"><div className="nld-container nld-bottom-inner"><div><span>CONTINUE EXPLORING</span><h2>Find the location that feels right.</h2></div><SmartLink href="/locations" className="nld-button nld-dark">Explore all locations <ArrowUpRight size={18} /></SmartLink></div></section>
      <LocationStyles />
    </main>
  );
}

function LocationStyles() {
  return <style>{`
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
.nld-page{--navy:#081b37;--blue:#2563eb;--muted:#697a90;--pale:#f4f7fc;font-family:'DM Sans',sans-serif;color:var(--navy);background:#fff;overflow:clip}
.nld-page *{box-sizing:border-box}.nld-page h1,.nld-page h2,.nld-page h3,.nld-page p{margin-top:0}.nld-page a{text-decoration:none}.nld-container{width:min(100% - 80px,1320px);margin-inline:auto}.nld-section{padding:110px 0}.nld-page h1,.nld-page h2,.nld-page h3{font-family:'Manrope',sans-serif}.nld-page a:focus-visible{outline:3px solid #83b4ff;outline-offset:4px}
.nld-kicker{display:inline-flex;align-items:center;gap:11px;color:var(--blue);font-size:11px;font-weight:800;letter-spacing:1.8px;margin-bottom:22px}.nld-kicker>span,.nld-hero-kicker>span{width:28px;height:2px;background:currentColor;flex:none}.nld-kicker-light{color:#a7c8ff}
.nld-button{display:inline-flex;align-items:center;justify-content:center;gap:15px;min-height:54px;padding:15px 23px;border-radius:7px;font-size:13px;font-weight:800;transition:transform .3s,background .3s,box-shadow .3s,color .3s}.nld-button:hover{transform:translateY(-4px)}.nld-button svg,.nld-inline-link svg{transition:transform .3s}.nld-button:hover svg,.nld-inline-link:hover svg{transform:translate(3px,-3px)}.nld-primary{background:var(--blue);color:#fff;box-shadow:0 10px 25px #2563eb30}.nld-primary:hover{background:#154dcc;color:#fff;box-shadow:0 16px 32px #2563eb45}.nld-dark{background:var(--navy);color:#fff}.nld-dark:hover{background:var(--blue);color:#fff}.nld-outline{color:#fff;border:1px solid #ffffff80;background:#ffffff14;backdrop-filter:blur(8px)}.nld-outline:hover{background:#fff;color:var(--navy)}
.nld-hero{height:min(760px,88svh);min-height:590px;position:relative;isolation:isolate;background:var(--navy);color:#fff}.nld-hero-image,.nld-hero-shade{position:absolute;inset:0;width:100%;height:100%;z-index:-1}.nld-hero-image{object-fit:cover;animation:nld-zoom 12s ease-out both}.nld-hero-shade{background:linear-gradient(90deg,#06172feb 0%,#06172fc9 44%,#06172f50 100%),linear-gradient(0deg,#06172f90,transparent 55%)}.nld-hero-inner{height:100%;display:flex;flex-direction:column;justify-content:center;position:relative}.nld-breadcrumb{position:absolute;top:42px;left:0;display:flex;align-items:center;gap:10px;font-size:12px;color:#e2e9f5}.nld-breadcrumb a{color:#d4e2f8}.nld-breadcrumb a:hover{color:#91bdff}.nld-hero-copy{max-width:850px;animation:nld-rise .9s ease both}.nld-hero-kicker{display:inline-flex;align-items:center;gap:12px;font-size:11px;font-weight:800;letter-spacing:2px;color:#a6c9ff;margin-bottom:25px}.nld-hero h1{font-size:clamp(48px,6.2vw,91px);line-height:1.12;letter-spacing:-3px;font-weight:700;margin-bottom:25px}.nld-hero h1 strong{color:#8cbaff;font-weight:800}.nld-hero-copy>p{max-width:580px;color:#e2e9f4;font-size:16px;line-height:1.9;margin-bottom:30px}.nld-hero-actions{display:flex;flex-wrap:wrap;gap:13px}.nld-hero-footer{position:absolute;bottom:34px;left:0;right:0;display:flex;justify-content:space-between;gap:20px;font-size:10px;letter-spacing:1.5px;font-weight:800;color:#e5edf8}.nld-hero-footer span{display:inline-flex;align-items:center;gap:10px}
.nld-intro-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(35px,6vw,100px);align-items:center}.nld-intro-photo{height:590px;position:relative;border-radius:14px;overflow:hidden;background:#dce5ef}.nld-intro-photo>img{width:100%;height:100%;object-fit:cover;transition:transform .9s}.nld-intro-photo:hover>img{transform:scale(1.07)}.nld-photo-badge{position:absolute;bottom:28px;right:0;background:var(--blue);color:#fff;display:flex;align-items:center;gap:15px;padding:23px 28px;font-size:10px;letter-spacing:1.3px;line-height:1.8}.nld-photo-badge strong{font-size:13px}.nld-intro-copy h2,.nld-section-heading h2{font-size:clamp(34px,3.5vw,54px);letter-spacing:-1.8px;line-height:1.2;font-weight:800;margin-bottom:23px}.nld-intro-copy h2 em,.nld-section-heading h2 em,.nld-visit h2 em{color:var(--blue);font-style:normal}.nld-intro-copy>p{font-size:15px;color:var(--muted);line-height:1.95;margin-bottom:17px}.nld-detail-features{display:grid;gap:18px;margin:27px 0 33px}.nld-detail-features>div{display:flex;align-items:flex-start;gap:15px}.nld-feature-icon{width:45px;height:45px;display:grid;place-items:center;flex:none;border-radius:10px;color:var(--blue);background:#eaf1ff;transition:transform .3s,background .3s,color .3s}.nld-detail-features>div:hover .nld-feature-icon{transform:translateY(-3px) rotate(-5deg);background:var(--blue);color:#fff}.nld-detail-features strong{font-size:14px}.nld-detail-features p{font-size:12px;color:var(--muted);line-height:1.7;margin:5px 0 0}
.nld-projects{background:var(--pale)}.nld-section-heading{display:flex;justify-content:space-between;align-items:end;gap:30px;margin-bottom:43px}.nld-section-heading h2{margin-bottom:13px}.nld-section-heading p{color:var(--muted);font-size:15px;line-height:1.8;margin:0}.nld-inline-link{display:inline-flex;align-items:center;gap:14px;white-space:nowrap;color:var(--navy);font-size:13px;font-weight:800}.nld-inline-link>span{width:43px;height:43px;border:1px solid #cbd7e9;border-radius:50%;display:grid;place-items:center;transition:background .3s,color .3s}.nld-inline-link:hover>span{background:var(--blue);color:#fff}.nld-project-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}.nld-project-item{min-width:0;transition:filter .35s}.nld-project-item:hover{filter:drop-shadow(0 15px 22px #071b3520)}.nld-project-item>*{height:100%}.nld-empty{text-align:center;max-width:700px;margin:auto;padding:65px 30px;background:#fff;border:1px solid #e5ebf4;border-radius:14px}.nld-empty-icon{width:70px;height:70px;display:grid;place-items:center;margin:0 auto 22px;background:#eaf1ff;color:var(--blue);border-radius:50%}.nld-empty h3{font-size:26px;margin-bottom:12px}.nld-empty p{color:var(--muted);line-height:1.8;margin-bottom:26px}
.nld-visit{position:relative;isolation:isolate;overflow:hidden;background:var(--navy);color:#fff}.nld-visit-background{position:absolute;inset:0;z-index:-1;background-size:cover;background-position:center;transition:transform 1.2s}.nld-visit:before{content:'';position:absolute;inset:0;z-index:0;background:linear-gradient(90deg,#06172ff5,#06172fbd 65%,#06172f70)}.nld-visit:hover .nld-visit-background{transform:scale(1.05)}.nld-visit-inner{position:relative;padding:100px 0}.nld-visit h2{max-width:820px;font-size:clamp(38px,5vw,68px);line-height:1.18;letter-spacing:-2px;margin-bottom:23px}.nld-visit h2 em{color:#93bdff}.nld-visit p{max-width:550px;color:#d8e3f2;line-height:1.9;margin-bottom:30px}.nld-bottom{padding:55px 0;background:#fff}.nld-bottom-inner{display:flex;justify-content:space-between;align-items:center;gap:25px}.nld-bottom-inner span{font-size:10px;letter-spacing:1.8px;font-weight:800;color:var(--blue)}.nld-bottom-inner h2{font-size:clamp(22px,2.5vw,35px);letter-spacing:-1px;margin:10px 0 0}
.nld-reveal{opacity:0;transform:translateY(28px);transition:opacity .75s ease,transform .75s cubic-bezier(.2,.8,.2,1)}.nld-reveal.nld-visible{opacity:1;transform:translateY(0)}@keyframes nld-rise{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}@keyframes nld-zoom{from{transform:scale(1.08)}to{transform:scale(1)}}
@media(max-width:1100px){.nld-container{width:min(100% - 48px,1320px)}.nld-intro-grid{gap:35px}.nld-intro-photo{height:520px}.nld-project-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:767px){.nld-container{width:min(100% - 36px,1320px)}.nld-section{padding:72px 0}.nld-hero{height:auto;min-height:640px}.nld-hero-inner{padding:130px 0 100px}.nld-breadcrumb{top:38px}.nld-hero h1{font-size:clamp(43px,10vw,62px);letter-spacing:-2px}.nld-hero-copy>p{font-size:14px}.nld-hero-actions{flex-direction:column;align-items:stretch}.nld-hero-footer{bottom:25px;font-size:9px}.nld-hero-footer span:last-child{display:none}.nld-intro-grid{grid-template-columns:1fr}.nld-intro-photo{height:380px}.nld-intro-copy h2,.nld-section-heading h2{font-size:38px}.nld-section-heading{flex-direction:column;align-items:flex-start}.nld-project-grid{grid-template-columns:1fr}.nld-visit-inner{padding:75px 0}.nld-visit h2{font-size:40px;letter-spacing:-1.3px}.nld-bottom-inner{flex-direction:column;align-items:flex-start}.nld-bottom-inner .nld-button{width:100%}}
@media(prefers-reduced-motion:reduce){.nld-page *, .nld-page *::before,.nld-page *::after{animation-duration:.01ms!important;transition-duration:.01ms!important}.nld-reveal{opacity:1;transform:none}}
`}</style>;
}
