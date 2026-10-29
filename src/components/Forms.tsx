import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import { submitEnquiry } from '@/lib/backend';
import { projects } from '@/data/projects';

export function EnquiryForm({ project = '', visit = false }: { project?: string; visit?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setStatus('loading'); setError('');
    const form = new FormData(event.currentTarget);
    try {
      await submitEnquiry({ name: String(form.get('name') || ''), phone: String(form.get('phone') || ''), email: String(form.get('email') || ''), project: String(form.get('project') || project), visit_date: String(form.get('visit_date') || ''), message: String(form.get('message') || ''), source: visit ? 'site-visit' : 'website' });
      setStatus('success'); event.currentTarget.reset();
    } catch (submitError) { setStatus('error'); setError(submitError instanceof Error ? submitError.message : 'Please try again.'); }
  };
  if (status === 'success') return <div className="form-success"><CheckCircle2 size={30} /><h3>Thanks, we’ve got your details.</h3><p>A NestWell relationship manager will reach out soon.</p><button className="button button-outline" onClick={() => setStatus('idle')}>Send another enquiry</button></div>;
  return <form className="enquiry-form" onSubmit={onSubmit}><div className="form-row"><label>Your name<input name="name" required minLength={2} placeholder="Enter your name" /></label><label>Phone number<input name="phone" required minLength={7} placeholder="+91 00000 00000" /></label></div><div className="form-row"><label>Email address<input name="email" type="email" placeholder="you@example.com" /></label>{visit ? <label>Preferred date<input name="visit_date" type="date" required /></label> : <label>Project of interest<select name="project" defaultValue={project}><option value="">Select a venture</option>{projects.map((item) => <option key={item.slug}>{item.name}</option>)}</select></label>}</div>{visit && <label>Project of interest<select name="project" defaultValue={project}><option value="">Select a venture</option>{projects.map((item) => <option key={item.slug}>{item.name}</option>)}</select></label>}<label>How can we help?<textarea name="message" rows={4} placeholder="Tell us what you’re looking for" /></label>{status === 'error' && <p className="form-error">{error}</p>}<button className="button button-primary" disabled={status === 'loading'}>{status === 'loading' ? <><Loader2 className="spin" size={17} /> Sending…</> : <>Send enquiry <ArrowUpRight size={17} /></>}</button><small className="form-note">Your details are only used to respond to this enquiry.</small></form>;
}
