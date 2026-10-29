export type Project = {
  slug: string;
  name: string;
  location: string;
  region: 'Visakhapatnam' | 'Vizianagaram' | 'Rajahmundry';
  category: 'Coastal plots' | 'Gated community' | 'Township layout';
  image: string;
  gallery: string[];
  description: string;
  specs: string[];
  approval: string;
  status: string;
  price?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'ocean-view-heights',
    name: 'Ocean View Heights',
    location: 'Bheemili Beach Road, Visakhapatnam',
    region: 'Visakhapatnam',
    category: 'Coastal plots',
    image: 'https://nestwelldevelopers.com/images/project-farmland.png',
    gallery: ['https://nestwelldevelopers.com/images/project-farmland.png', 'https://images.pexels.com/photos/7104646/pexels-photo-7104646.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'https://images.pexels.com/photos/11201060/pexels-photo-11201060.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
    description: 'Luxury sea-breeze villa layout plots on the six-lane Visakhapatnam–Bheemili coastal corridor.',
    specs: ['200–600 Sq.Yds', '40 & 60 Ft blacktop roads', 'Ready for construction'],
    approval: 'VMRDA L.P. No. 45/2024',
    status: 'Ready for construction',
    price: '₹24,000 / Sq.Yd',
    featured: true,
  },
  {
    slug: 'cyber-hills-enclave',
    name: 'Cyber Hills Enclave',
    location: 'Madhurawada IT SEZ Corridor, Vizag',
    region: 'Visakhapatnam',
    category: 'Gated community',
    image: 'https://nestwelldevelopers.com/images/project-apartment.png',
    gallery: ['https://nestwelldevelopers.com/images/project-apartment.png', 'https://images.pexels.com/photos/2516858/pexels-photo-2516858.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'https://images.pexels.com/photos/14173845/pexels-photo-14173845.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
    description: 'Premium gated community plots next to the Rushikonda IT Hill and education hub.',
    specs: ['167–400 Sq.Yds', 'Underground power & water', '24/7 gated security'],
    approval: 'VMRDA approved',
    status: 'Bank loans: HDFC / SBI approved',
    price: '₹28,500 / Sq.Yd',
    featured: true,
  },
  {
    slug: 'golden-county-layout',
    name: 'Golden County Layout',
    location: 'NH-16 Junction & Ring Road, Vizianagaram',
    region: 'Vizianagaram',
    category: 'Township layout',
    image: 'https://nestwelldevelopers.com/images/project-villa.png',
    gallery: ['https://nestwelldevelopers.com/images/project-villa.png', 'https://images.pexels.com/photos/37860385/pexels-photo-37860385.png?auto=compress&cs=tinysrgb&h=650&w=940', 'https://images.pexels.com/photos/16754490/pexels-photo-16754490.png?auto=compress&cs=tinysrgb&h=650&w=940'],
    description: 'A considered township layout with a grand entrance, clubhouse, avenue plantation, and sports park.',
    specs: ['150–500 Sq.Yds', '60, 40 & 33 Ft BT roads', 'Underground storm drains'],
    approval: 'VMRDA approved · 100% Vastu',
    status: '5 mins from Cantt Station',
    price: '₹14,500 / Sq.Yd',
    featured: true,
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
