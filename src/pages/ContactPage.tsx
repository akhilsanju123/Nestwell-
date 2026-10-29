import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Compass,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { siteContent } from '@/data/siteContent';
import { EnquiryForm } from '@/components/Forms';
import { SmartLink } from '@/components/SiteChrome';

type ContactPageProps = { booking?: boolean };

function Reveal({ children, className = '', delay = 0 }: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('nc-visible');
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('nc-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`nc-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function ContactPage({ booking = false }: ContactPageProps) {
  const heading = booking ? 'See the place. Feel the possibility.' : 'The right place starts with a conversation.';
  const description = booking
    ? 'Tell us which location or venture you want to explore. Our team can help you plan a visit and understand the setting in person.'
    : 'Have a question about a location, venture, or your next step? We are here to listen, guide, and help you explore with clarity.';

  const contactMethods = [
    {
      icon: Phone,
      label: 'CALL OUR TEAM',
      title: siteContent.phone,
      detail: 'Speak with our property team',
      href: siteContent.phoneHref,
      action: 'Call now',
    },
    {
      icon: Mail,
      label: 'SEND AN EMAIL',
      title: siteContent.email,
      detail: 'Share your questions or requirements',
      href: `mailto:${siteContent.email}`,
      action: 'Write to us',
    },
  ];

  return (
    <main className="nestwell-contact">
      <section className="nc-hero" aria-labelledby="nc-page-title">
        <div className="nc-hero-image" />
        <div className="nc-hero-shade" />
        <div className="nc-container nc-hero-inner">
          <div className="nc-hero-copy">
            <div className="nc-kicker nc-kicker-light"><span />{booking ? 'PLAN YOUR SITE VISIT' : 'CONNECT WITH NESTWELL'}</div>
            <h1 id="nc-page-title">{heading}</h1>
            <p>{description}</p>
            <div className="nc-hero-actions">
              <a href="#enquiry" className="nc-button nc-button-blue">
                {booking ? 'Schedule a visit' : 'Send an enquiry'}
                <span><ArrowUpRight size={18} /></span>
              </a>
              <a href={siteContent.phoneHref} className="nc-button nc-button-outline">
                <Phone size={17} /> Call our team
              </a>
            </div>
          </div>
          <div className="nc-hero-footnote"><Compass size={18} /> VISAKHAPATNAM · VIZIANAGARAM · ANDHRA PRADESH</div>
        </div>
      </section>

      <section className="nc-main-section" id="enquiry">
        <div className="nc-container">
          <div className="nc-section-top">
            <Reveal>
              <div className="nc-kicker"><span />{booking ? 'LET’S PLAN YOUR VISIT' : 'WE’RE EASY TO REACH'}</div>
              <h2>Here to help you <em>move forward.</em></h2>
            </Reveal>
            <Reveal delay={100}>
              <p>Whether you are comparing your options or ready to explore a site, our team is happy to help you make an informed decision.</p>
            </Reveal>
          </div>

          <div className="nc-main-grid">
            <div className="nc-left-column">
              <Reveal className="nc-contact-methods">
                {contactMethods.map(({ icon: Icon, label, title, detail, href, action }, index) => (
                  <a className="nc-method" href={href} key={label}>
                    <span className="nc-method-icon"><Icon size={23} strokeWidth={1.7} /></span>
                    <span className="nc-method-text">
                      <small>{label}</small>
                      <strong>{title}</strong>
                      <span>{detail}</span>
                    </span>
                    <span className="nc-method-arrow" aria-label={action}><ArrowUpRight size={20} /></span>
                    <span className="nc-method-number">0{index + 1}</span>
                  </a>
                ))}
              </Reveal>

              <Reveal delay={100} className="nc-office-card">
                <div className="nc-office-icon"><MapPin size={25} /></div>
                <div className="nc-kicker"><span />VISIT OUR OFFICE</div>
                <h3>Let’s meet in person.</h3>
                <p>{siteContent.address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteContent.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nc-text-link"
                >
                  Get directions <ArrowUpRight size={18} />
                </a>
              </Reveal>

              <Reveal delay={150} className="nc-assurance">
                <div><ShieldCheck size={20} /><span>Clear project information</span></div>
                <div><MessageCircle size={20} /><span>Helpful, personal guidance</span></div>
                <div><CheckCircle2 size={20} /><span>Decide at your own pace</span></div>
              </Reveal>
            </div>

            <Reveal delay={120} className="nc-form-shell">
              <div className="nc-form-heading">
                <div className="nc-form-icon">{booking ? <CalendarDays size={25} /> : <Sparkles size={25} />}</div>
                <div className="nc-kicker"><span />{booking ? 'SITE VISIT REQUEST' : 'PROPERTY ENQUIRY'}</div>
                <h3>{booking ? 'Let’s arrange your visit.' : 'Tell us what you’re looking for.'}</h3>
                <p>{booking ? 'Share your details and preferred visit information below.' : 'Complete the form and our team will follow up with you.'}</p>
              </div>
              <div className="nc-form-content"><EnquiryForm visit={booking} /></div>
              <div className="nc-form-footer"><ShieldCheck size={17} /><span>Your enquiry is shared with the NestWell team for follow-up.</span></div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="nc-process-section">
        <div className="nc-container">
          <Reveal className="nc-process-heading">
            <div className="nc-kicker"><span />WHAT HAPPENS NEXT</div>
            <h2>Simple steps. <em>Clear direction.</em></h2>
            <p>A straightforward journey from your first enquiry to exploring a property in person.</p>
          </Reveal>
          <div className="nc-steps">
            {[
              { icon: MessageCircle, title: 'Share your plans', text: 'Tell us your preferred location, budget, or property requirements.' },
              { icon: Compass, title: 'Explore your options', text: 'Understand the relevant ventures, locations, and available information.' },
              { icon: CalendarDays, title: 'Visit and decide', text: 'Plan a site visit and take your next step when you feel ready.' },
            ].map(({ icon: Icon, title, text }, index) => (
              <Reveal className="nc-step" key={title} delay={index * 100}>
                <div className="nc-step-top"><span className="nc-step-icon"><Icon size={25} strokeWidth={1.7} /></span><span>0{index + 1}</span></div>
                <h3>{title}</h3>
                <p>{text}</p>
                {index < 2 && <ArrowRight className="nc-step-arrow" size={22} />}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="nc-bottom-cta">
        <div className="nc-container nc-cta-inner">
          <Reveal>
            <div className="nc-kicker nc-kicker-light"><span />EXPLORE WITH CONFIDENCE</div>
            <h2>Your next chapter<br /><em>begins with the right place.</em></h2>
            <p>Discover thoughtfully planned ventures and the locations that could suit your future.</p>
          </Reveal>
          <Reveal delay={100} className="nc-cta-actions">
            <SmartLink href="/ventures" className="nc-button nc-button-blue">Explore ventures <span><ArrowUpRight size={18} /></span></SmartLink>
            {!booking && <SmartLink href="/book-site-visit" className="nc-button nc-button-outline">Book a site visit <CalendarDays size={17} /></SmartLink>}
            {booking && <a href={siteContent.phoneHref} className="nc-button nc-button-outline">Call us <Phone size={17} /></a>}
          </Reveal>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
        .nestwell-contact{--nc-navy:#071b35;--nc-deep:#091f3c;--nc-blue:#2463eb;--nc-light:#f4f7fc;--nc-muted:#63738a;--nc-border:#e3eaf3;color:var(--nc-navy);background:#fff;font-family:'DM Sans',sans-serif;overflow:clip}
        .nestwell-contact *,.nestwell-contact *:before,.nestwell-contact *:after{box-sizing:border-box}
        .nestwell-contact h1,.nestwell-contact h2,.nestwell-contact h3,.nestwell-contact p{margin-top:0}
        .nestwell-contact a{text-decoration:none}
        .nc-container{width:min(100% - 80px,1280px);margin-inline:auto}
        .nc-reveal{opacity:0;transform:translateY(27px);transition:opacity .75s ease,transform .75s cubic-bezier(.2,.8,.2,1)}
        .nc-reveal.nc-visible{opacity:1;transform:translateY(0)}
        .nc-kicker{display:flex;align-items:center;gap:11px;color:var(--nc-blue);font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin-bottom:19px}
        .nc-kicker>span{width:28px;height:2px;background:currentColor;flex-shrink:0}
        .nc-kicker-light{color:#a5c8ff}
        .nc-hero{position:relative;min-height:610px;background:var(--nc-navy);color:white;isolation:isolate;overflow:hidden}
        .nc-hero-image{position:absolute;inset:0;z-index:-3;background-image:url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920');background-size:cover;background-position:center 54%;animation:ncHeroZoom 14s ease-out both}
        .nc-hero-shade{position:absolute;inset:0;z-index:-2;background:linear-gradient(90deg,rgba(4,17,36,.96),rgba(4,17,36,.84) 43%,rgba(4,17,36,.30)),linear-gradient(0deg,rgba(4,17,36,.6),transparent 55%)}
        .nc-hero-inner{min-height:610px;display:flex;flex-direction:column;justify-content:center;position:relative;padding:110px 0 100px}
        .nc-hero-copy{max-width:770px;animation:ncIntro .85s ease both}
        .nc-hero h1{font:700 clamp(46px,6vw,83px)/1.12 'Manrope',sans-serif;letter-spacing:-3.7px;margin-bottom:25px;text-wrap:balance}
        .nc-hero-copy>p{max-width:580px;font-size:16px;line-height:1.9;color:#d2deed;margin-bottom:30px}
        .nc-hero-actions{display:flex;gap:13px;flex-wrap:wrap}
        .nc-button{min-height:56px;display:inline-flex;align-items:center;justify-content:center;gap:15px;padding:9px 11px 9px 22px;border-radius:8px;font-size:13px;font-weight:700;transition:transform .3s,box-shadow .3s,background .3s,color .3s}
        .nc-button:hover{transform:translateY(-4px)}
        .nc-button-blue{background:var(--nc-blue);color:white;box-shadow:0 12px 28px #2463eb35}
        .nc-button-blue:hover{background:#1253d6;color:white;box-shadow:0 18px 32px #2463eb55}
        .nc-button-blue>span{width:36px;height:36px;display:grid;place-items:center;border-radius:6px;background:#ffffff27;transition:transform .3s}
        .nc-button-blue:hover>span{transform:rotate(45deg)}
        .nc-button-outline{color:white;border:1px solid #ffffff70;background:#ffffff12;padding:15px 22px;backdrop-filter:blur(8px)}
        .nc-button-outline:hover{color:var(--nc-navy);background:white}
        .nc-hero-footnote{position:absolute;bottom:31px;left:0;display:flex;align-items:center;gap:12px;color:#c7d6ea;font-size:10px;font-weight:700;letter-spacing:1.8px}
        .nc-main-section{padding:105px 0 115px;background:var(--nc-light);scroll-margin-top:60px}
        .nc-section-top{display:grid;grid-template-columns:1.25fr .75fr;gap:70px;align-items:end;margin-bottom:48px}
        .nc-section-top h2,.nc-process-heading h2{font:700 clamp(34px,4vw,57px)/1.2 'Manrope',sans-serif;letter-spacing:-2px;margin:0}
        .nc-section-top h2 em,.nc-process-heading h2 em{font-style:normal;color:var(--nc-blue)}
        .nc-section-top>div:last-child p{color:var(--nc-muted);line-height:1.95;max-width:420px;margin:0}
        .nc-main-grid{display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);align-items:start;gap:34px}
        .nc-left-column{min-width:0;display:grid;gap:23px}
        .nc-contact-methods{display:grid;gap:16px}
        .nc-method{position:relative;display:flex;align-items:center;gap:18px;min-height:132px;background:#fff;border:1px solid var(--nc-border);border-radius:14px;padding:26px 23px;color:var(--nc-navy);overflow:hidden;transition:transform .35s,box-shadow .35s,border-color .35s}
        .nc-method:hover{transform:translateY(-5px);border-color:#a8c3f8;box-shadow:0 18px 35px #102b5314}
        .nc-method-icon{width:54px;height:54px;flex-shrink:0;display:grid;place-items:center;border-radius:12px;background:#edf3ff;color:var(--nc-blue);transition:background .3s,color .3s,transform .3s}
        .nc-method:hover .nc-method-icon{background:var(--nc-blue);color:#fff;transform:rotate(-7deg)}
        .nc-method-text{min-width:0;display:flex;flex-direction:column;gap:5px}
        .nc-method-text small{font-size:10px;letter-spacing:1.6px;font-weight:800;color:var(--nc-blue)}
        .nc-method-text strong{font:750 clamp(15px,1.45vw,19px)/1.4 'Manrope',sans-serif;overflow-wrap:anywhere}
        .nc-method-text>span{font-size:12px;color:var(--nc-muted)}
        .nc-method-arrow{margin-left:auto;flex-shrink:0;color:var(--nc-blue);transition:transform .3s}
        .nc-method:hover .nc-method-arrow{transform:translate(3px,-3px)}
        .nc-method-number{position:absolute;right:18px;top:13px;color:#dce5f3;font-size:10px;font-weight:800}
        .nc-office-card{position:relative;background:var(--nc-navy);color:#fff;border-radius:15px;padding:34px;overflow:hidden}
        .nc-office-card:after{content:'';position:absolute;right:-75px;top:-75px;width:220px;height:220px;border:1px solid #ffffff16;border-radius:50%;pointer-events:none}
        .nc-office-icon{width:52px;height:52px;border-radius:12px;display:grid;place-items:center;background:#ffffff15;color:#a5c8ff;margin-bottom:25px}
        .nc-office-card h3{font:700 27px/1.3 'Manrope',sans-serif;letter-spacing:-.9px;margin-bottom:12px}
        .nc-office-card p{max-width:350px;color:#c4d2e4;line-height:1.85;font-size:14px;margin-bottom:25px}
        .nc-text-link{display:inline-flex;align-items:center;gap:10px;color:#fff;font-weight:700;font-size:13px;border-bottom:1px solid #ffffff60;padding-bottom:9px;transition:color .3s,gap .3s}
        .nc-text-link:hover{color:#91bbff;gap:16px}
        .nc-assurance{display:grid;gap:15px;padding:10px 5px}
        .nc-assurance>div{display:flex;align-items:center;gap:13px;color:#566b83;font-size:13px;font-weight:600}
        .nc-assurance svg{color:var(--nc-blue);flex-shrink:0}
        .nc-form-shell{background:white;border:1px solid var(--nc-border);border-radius:17px;box-shadow:0 22px 70px #102b5312;overflow:hidden;min-width:0}
        .nc-form-heading{padding:34px 37px 26px;border-bottom:1px solid var(--nc-border)}
        .nc-form-icon{display:grid;place-items:center;width:51px;height:51px;border-radius:12px;background:#eaf1ff;color:var(--nc-blue);margin-bottom:23px}
        .nc-form-heading h3{font:750 clamp(24px,2.3vw,33px)/1.3 'Manrope',sans-serif;letter-spacing:-1.1px;margin-bottom:11px}
        .nc-form-heading p{color:var(--nc-muted);font-size:14px;line-height:1.8;margin-bottom:0}
        .nc-form-content{padding:31px 37px 36px}
        .nc-form-content input,.nc-form-content select,.nc-form-content textarea{max-width:100%;transition:border-color .25s,box-shadow .25s}
        .nc-form-content input:focus,.nc-form-content select:focus,.nc-form-content textarea:focus{border-color:var(--nc-blue)!important;box-shadow:0 0 0 3px #2463eb16;outline:none}
        .nc-form-content button[type='submit']{transition:transform .3s,background .3s,box-shadow .3s}
        .nc-form-content button[type='submit']:hover{transform:translateY(-3px);box-shadow:0 12px 24px #2463eb28}
        .nc-form-footer{display:flex;align-items:center;gap:10px;background:#f8faff;border-top:1px solid var(--nc-border);padding:16px 37px;color:#6a7d95;font-size:11px;line-height:1.6}
        .nc-form-footer svg{color:var(--nc-blue);flex-shrink:0}
        .nc-process-section{padding:108px 0 115px;background:#fff}
        .nc-process-heading{text-align:center;max-width:700px;margin:0 auto 55px}
        .nc-process-heading .nc-kicker{justify-content:center}
        .nc-process-heading p{color:var(--nc-muted);font-size:15px;line-height:1.85;margin:19px auto 0;max-width:570px}
        .nc-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
        .nc-step{position:relative;padding:31px;border:1px solid var(--nc-border);border-radius:14px;background:#fff;min-height:260px;transition:transform .35s,box-shadow .35s,border-color .35s}
        .nc-step:hover{transform:translateY(-7px);border-color:#a7c3f7;box-shadow:0 22px 45px #0c244313}
        .nc-step-top{display:flex;justify-content:space-between;align-items:start;margin-bottom:27px}
        .nc-step-top>span:last-child{font:800 13px 'Manrope',sans-serif;color:#b7c8df}
        .nc-step-icon{width:56px;height:56px;display:grid;place-items:center;background:#edf3ff;color:var(--nc-blue);border-radius:12px;transition:transform .3s,background .3s,color .3s}
        .nc-step:hover .nc-step-icon{transform:rotate(-8deg);background:var(--nc-blue);color:white}
        .nc-step h3{font:750 19px/1.35 'Manrope',sans-serif;margin-bottom:13px}
        .nc-step p{font-size:13px;line-height:1.9;color:var(--nc-muted);margin-bottom:0}
        .nc-step-arrow{position:absolute;right:-25px;top:50%;color:#91b4ed;z-index:2}
        .nc-bottom-cta{background:linear-gradient(120deg,#071b35,#0b2b56);color:white;padding:85px 0;position:relative;overflow:hidden}
        .nc-bottom-cta:after{content:'';position:absolute;width:480px;height:480px;border:1px solid #ffffff13;border-radius:50%;right:-140px;top:-210px;pointer-events:none}
        .nc-cta-inner{display:flex;align-items:center;justify-content:space-between;gap:40px;position:relative;z-index:1}
        .nc-cta-inner h2{font:750 clamp(30px,3.6vw,48px)/1.22 'Manrope',sans-serif;letter-spacing:-1.6px;margin-bottom:17px}
        .nc-cta-inner h2 em{font-style:normal;color:#8db9ff}
        .nc-cta-inner p{font-size:14px;line-height:1.85;color:#c5d4e7;max-width:530px;margin-bottom:0}
        .nc-cta-actions{display:flex;flex-wrap:wrap;gap:12px;justify-content:flex-end}
        @keyframes ncHeroZoom{from{transform:scale(1.09)}to{transform:scale(1)}}
        @keyframes ncIntro{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:1024px){.nc-container{width:min(100% - 48px,1280px)}.nc-main-grid{gap:22px}.nc-section-top{gap:35px}.nc-form-heading{padding:29px 26px 23px}.nc-form-content{padding:25px 26px 30px}.nc-form-footer{padding:15px 26px}.nc-method{padding:23px 17px}.nc-method-icon{width:46px;height:46px}.nc-method-arrow{display:none}.nc-step{padding:24px}.nc-cta-inner{align-items:flex-start;flex-direction:column}.nc-cta-actions{justify-content:flex-start}}
        @media(max-width:760px){.nc-container{width:min(100% - 36px,1280px)}.nc-hero,.nc-hero-inner{min-height:590px}.nc-hero-inner{padding:95px 0 85px}.nc-hero h1{font-size:clamp(40px,9vw,62px);letter-spacing:-2px}.nc-hero-copy>p{font-size:14px}.nc-hero-footnote{font-size:9px;letter-spacing:1px}.nc-main-section,.nc-process-section{padding:75px 0}.nc-section-top,.nc-main-grid{grid-template-columns:1fr;gap:28px}.nc-section-top h2,.nc-process-heading h2{font-size:clamp(31px,7vw,43px);letter-spacing:-1.5px}.nc-section-top{margin-bottom:30px}.nc-steps{grid-template-columns:1fr}.nc-step{min-height:auto}.nc-step-arrow{display:none}.nc-process-heading{margin-bottom:35px}.nc-bottom-cta{padding:68px 0}}
        @media(max-width:480px){.nc-hero h1{font-size:39px}.nc-hero-actions{align-items:stretch;flex-direction:column}.nc-hero-actions .nc-button{width:100%}.nc-hero-footnote{max-width:270px;line-height:1.6}.nc-method{gap:12px}.nc-method-text strong{font-size:14px}.nc-method-icon{width:43px;height:43px}.nc-office-card{padding:27px}.nc-form-heading{padding:25px 20px}.nc-form-content{padding:22px 20px 28px}.nc-form-footer{padding:14px 20px}.nc-cta-actions{flex-direction:column;align-items:stretch;width:100%}.nc-cta-actions .nc-button{width:100%}}
        @media(prefers-reduced-motion:reduce){.nc-reveal{opacity:1;transform:none;transition:none}.nc-hero-image,.nc-hero-copy{animation:none}.nestwell-contact *{scroll-behavior:auto!important}}
      `}</style>
    </main>
  );
}
