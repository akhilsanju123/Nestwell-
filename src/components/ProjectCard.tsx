import { ArrowUpRight, MapPin } from 'lucide-react';
import type { Project } from '@/data/projects';
import { SmartLink } from './SiteChrome';

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return <article className={`project-card ${featured ? 'project-card-featured' : ''}`}><SmartLink href={`/ventures/${project.slug}`} className="project-image"><img src={project.image} alt={`${project.name} plotted development`} loading="lazy" /><span className="image-badge">{project.approval}</span><span className="image-arrow"><ArrowUpRight size={19} /></span></SmartLink><div className="project-card-body"><div className="eyebrow"><span>{project.category}</span><span><MapPin size={13} /> {project.region}</span></div><SmartLink href={`/ventures/${project.slug}`} className="project-title">{project.name}</SmartLink><p>{project.description}</p><div className="project-meta"><span>{project.specs[0]}</span><strong>{project.price ?? 'Contact for price'}</strong></div><SmartLink href={`/ventures/${project.slug}`} className="text-link">View project <ArrowUpRight size={15} /></SmartLink></div></article>;
}
