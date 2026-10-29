import { ArrowUpRight } from 'lucide-react';
import { SmartLink } from './SiteChrome';
export function SectionHeading({ eyebrow, title, text, link, linkLabel = 'View all' }: { eyebrow: string; title: string; text?: string; link?: string; linkLabel?: string }) { return <div className="section-heading"><div><span className="eyebrow eyebrow-green">{eyebrow}</span><h2>{title}</h2></div>{text && <p>{text}</p>}{link && <SmartLink href={link} className="text-link heading-link">{linkLabel} <ArrowUpRight size={15} /></SmartLink>}</div>; }
