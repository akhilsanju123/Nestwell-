import { useState } from 'react';
import { Plus } from 'lucide-react';
export function Accordion({ items }: { items: { question: string; answer: string }[] }) { const [open, setOpen] = useState(0); return <div className="accordion">{items.map((item, index) => <div className={`accordion-item ${open === index ? 'open' : ''}`} key={item.question}><button onClick={() => setOpen(open === index ? -1 : index)}><span>{item.question}</span><Plus size={19} /></button><div className="accordion-answer"><p>{item.answer}</p></div></div>)}</div>; }
