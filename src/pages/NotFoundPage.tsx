import { ArrowUpRight, MapPinned } from 'lucide-react';
import { SmartLink } from '@/components/SiteChrome';
import { PageIntro } from './PageIntro';
export function NotFoundPage() { return <><PageIntro eyebrow="404" title="This page took a different turn." text="The page you’re looking for is not here, but there are plenty of places to explore." /><section className="section"><div className="shell empty-state"><MapPinned size={28} /><h3>Let’s get you back on track.</h3><SmartLink href="/" className="button button-primary">Go home <ArrowUpRight size={17} /></SmartLink></div></section></>; }
