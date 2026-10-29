
import { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  MapPin,
  Search,
  ShieldCheck,
  Building2,
  Compass,
  CheckCircle2,
  Handshake,
  Trees,
  CalendarDays,
  ChevronDown,
  Play,
  Pause,
  MoveUpRight,
  Sparkles,
  MousePointer2,
  Layers3,
  BadgeCheck,
  Maximize2,
} from "lucide-react";

import { blogPosts } from "@/data/blogPosts";
import { locations } from "@/data/locations";
import { projects } from "@/data/projects";
import { siteContent } from "@/data/siteContent";
import { ProjectCard } from "@/components/ProjectCard";
import { SmartLink } from "@/components/SiteChrome";

/* =========================================
   HERO SLIDER DATA
========================================= */

const heroSlides = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920",
    tag: "WELCOME TO NESTWELL DEVELOPERS",
    title: "Your Future",
    highlight: "Begins Here.",
    description:
      "Discover thoughtfully planned open plot ventures in Andhra Pradesh's most promising destinations.",
    button: "Explore Our Ventures",
    href: "/ventures",
    location: "ANDHRA PRADESH",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/16005938/pexels-photo-16005938.jpeg?auto=compress&cs=tinysrgb&w=1920",
    tag: "DISCOVER NEW POSSIBILITIES",
    title: "A Place To",
    highlight: "Call Your Own.",
    description:
      "Find a space that reflects your aspirations, with clear information and guidance along the way.",
    button: "Discover Locations",
    href: "/locations",
    location: "VISAKHAPATNAM",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/11201060/pexels-photo-11201060.jpeg?auto=compress&cs=tinysrgb&w=1920",
    tag: "THOUGHTFULLY PLANNED DEVELOPMENTS",
    title: "Invest In",
    highlight: "Possibilities.",
    description:
      "Explore plotted developments with the location details, layout information, and support you need.",
    button: "View Our Projects",
    href: "/ventures",
    location: "VIZIANAGARAM",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&w=1920",
    tag: "YOUR NEXT CHAPTER AWAITS",
    title: "More Than Land.",
    highlight: "A New Beginning.",
    description:
      "Take the first step toward your dream plot. Experience the location before you decide.",
    button: "Book A Site Visit",
    href: "/book-site-visit",
    location: "RAJAHMUNDRY",
  },
];

/* =========================================
   REUSABLE REVEAL COMPONENT
========================================= */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      element.classList.add("nw-show");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target?.classList.add("nw-show");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -35px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`nw-reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* =========================================
   HOMEPAGE
========================================= */

export function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const totalSlides = heroSlides.length;

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % totalSlides);
  };

  const previousSlide = () => {
    setActiveSlide(
      (current) => (current - 1 + totalSlides) % totalSlides
    );
  };

  /* AUTO SLIDER */
  useEffect(() => {
    if (!isPlaying || isHeroHovered) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % totalSlides);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [isPlaying, isHeroHovered, totalSlides]);

  /* SEARCH PARAMETERS */
  const params = new URLSearchParams();

  if (location) params.set("location", location);
  if (category) params.set("category", category);

  const searchUrl = `/ventures${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  /* PROJECT FILTERS */
  const filters = [
    "All",
    "Visakhapatnam",
    "Vizianagaram",
    "Rajahmundry",
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) =>
          JSON.stringify(project)
            .toLowerCase()
            .includes(activeFilter.toLowerCase())
        );

  return (
    <main className="nestwell-v2">

      {/* =====================================
          HERO SLIDER
      ===================================== */}

      <section
        className="nw-hero"
        aria-label="Featured destinations"
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
      >
        {/* SLIDE IMAGES */}
        <div className="nw-slides">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`nw-slide ${
                index === activeSlide ? "active" : ""
              }`}
              aria-hidden={index !== activeSlide}
            >
              <img
                src={slide.image}
                alt={slide.location}
                className="nw-slide-image"
                fetchPriority={index === 0 ? "high" : undefined}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        <div className="nw-hero-overlay" />
        <div className="nw-hero-grid-pattern" />

        {/* HERO CONTENT */}
        <div className="nw-container nw-hero-inner">
          <div
            key={activeSlide}
            className="nw-hero-copy"
          >
            <div className="nw-hero-tag">
              <span className="nw-tag-dot" />
              {heroSlides[activeSlide].tag}
            </div>

            <h1>
              {heroSlides[activeSlide].title}
              <br />
              <span>{heroSlides[activeSlide].highlight}</span>
            </h1>

            <p>{heroSlides[activeSlide].description}</p>

            <div className="nw-hero-actions">
              <SmartLink
                href={heroSlides[activeSlide].href}
                className="nw-btn nw-btn-primary"
              >
                {heroSlides[activeSlide].button}
                <span className="nw-btn-icon">
                  <ArrowUpRight size={19} />
                </span>
              </SmartLink>

              <SmartLink
                href="/about"
                className="nw-btn nw-btn-glass"
              >
                Discover NestWell
                <ArrowRight size={18} />
              </SmartLink>
            </div>
          </div>

          {/* HERO FOOTER */}
          <div className="nw-hero-footer">
            <div className="nw-slide-counter">
              <span>
                {String(activeSlide + 1).padStart(2, "0")}
              </span>
              <div className="nw-counter-line" />
              <span className="nw-total">
                {String(totalSlides).padStart(2, "0")}
              </span>
            </div>

            <div className="nw-slide-progress">
              {heroSlides.map((slide, index) => (
                <button
                  type="button"
                  key={slide.id}
                  className={`nw-progress-item ${
                    index === activeSlide ? "active" : ""
                  }`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show slide ${index + 1}`}
                  aria-current={index === activeSlide ? "true" : undefined}
                >
                  <span
                    className={
                      index === activeSlide && isPlaying && !isHeroHovered
                        ? "nw-progress-fill running"
                        : "nw-progress-fill"
                    }
                    key={`${activeSlide}-${isPlaying}-${isHeroHovered}`}
                  />
                </button>
              ))}
            </div>

            <div className="nw-slider-controls">
              <button
                type="button"
                onClick={() => setIsPlaying((v) => !v)}
                aria-label={isPlaying ? "Pause slides" : "Play slides"}
              >
                {isPlaying ? <Pause size={17} /> : <Play size={17} />}
              </button>

              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous slide"
              >
                <ArrowLeft size={20} />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="nw-hero-side-label">
          {heroSlides[activeSlide].location}
        </div>
      </section>

      {/* =====================================
          PROPERTY SEARCH
      ===================================== */}

      <section className="nw-search-section">
        <div className="nw-container">
          <Reveal className="nw-search-box">
            <div className="nw-search-title">
              <span className="nw-overline">FIND YOUR IDEAL SPACE</span>
              <h2>Discover Your Next Property</h2>
            </div>

            <div className="nw-search-controls">
              <div className="nw-search-field">
                <label htmlFor="nw-location">
                  LOCATION
                </label>
                <div className="nw-input-row">
                  <MapPin size={19} />
                  <select
                    id="nw-location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">All Locations</option>
                    <option value="Visakhapatnam">Visakhapatnam</option>
                    <option value="Vizianagaram">Vizianagaram</option>
                    <option value="Rajahmundry">Rajahmundry</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>

              <div className="nw-search-field">
                <label htmlFor="nw-property-type">
                  PROPERTY TYPE
                </label>
                <div className="nw-input-row">
                  <Building2 size={19} />
                  <select
                    id="nw-property-type"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">All Property Types</option>
                    <option value="Coastal plots">Coastal Plots</option>
                    <option value="Gated community">Gated Community</option>
                    <option value="Township layout">Township Layout</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>

              <SmartLink
                href={searchUrl}
                className="nw-search-submit"
              >
                <Search size={19} />
                Search Properties
                <ArrowUpRight size={18} />
              </SmartLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================
          INTRO SECTION
      ===================================== */}

      <section className="nw-section nw-intro">
        <div className="nw-container nw-intro-grid">
          <Reveal>
            <div className="nw-section-label">
              <span className="nw-label-line" />
              ABOUT NESTWELL DEVELOPERS
            </div>

            <h2 className="nw-heading">
              Spaces Designed
              <br />
              For <span>Better Tomorrows.</span>
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="nw-intro-description">
              At NestWell Developers, we believe every great
              future begins with the right foundation.
              We bring together thoughtfully selected locations,
              transparent information, and a people-first
              approach to help you find a place to call your own.
            </p>

            <SmartLink href="/about" className="nw-arrow-link">
              Explore Our Story
              <span><ArrowUpRight size={19} /></span>
            </SmartLink>
          </Reveal>
        </div>
      </section>

      {/* =====================================
          LOCATIONS
      ===================================== */}

      <section className="nw-section nw-locations">
        <div className="nw-container">
          <Reveal className="nw-section-header">
            <div>
              <div className="nw-section-label">
                <span className="nw-label-line" />
                EXPLORE DESTINATIONS
              </div>

              <h2 className="nw-heading">
                Discover Places.
                <br />
                <span>Discover Possibilities.</span>
              </h2>
            </div>

            <SmartLink
              href="/locations"
              className="nw-arrow-link"
            >
              All Locations
              <span><ArrowUpRight size={19} /></span>
            </SmartLink>
          </Reveal>

          <div className="nw-location-grid">
            {locations.map((item, index) => (
              <Reveal
                key={item.slug}
                className={`nw-location-wrap nw-location-${index + 1}`}
                delay={index * 100}
              >
                <SmartLink
                  href={`/locations/${item.slug}`}
                  className="nw-location-card"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                  />

                  <div className="nw-location-overlay" />

                  <div className="nw-location-top">
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="nw-location-top-icon">
                      <ArrowUpRight size={22} />
                    </span>
                  </div>

                  <div className="nw-location-content">
                    <span className="nw-location-kicker">
                      {item.kicker}
                    </span>

                    <h3>{item.name}</h3>
                    <p>{item.description}</p>

                    <div className="nw-location-explore">
                      EXPLORE LOCATION
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </SmartLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================
          FEATURED PROJECTS
      ===================================== */}

      <section className="nw-section nw-projects">
        <div className="nw-container">
          <Reveal className="nw-section-header">
            <div>
              <div className="nw-section-label">
                <span className="nw-label-line" />
                FEATURED DEVELOPMENTS
              </div>

              <h2 className="nw-heading">
                Exceptional Spaces.
                <br />
                <span>Extraordinary Potential.</span>
              </h2>
            </div>

            <p className="nw-header-description">
              Explore our plotted developments across
              Andhra Pradesh, with useful details to
              support your property search.
            </p>
          </Reveal>

          <Reveal className="nw-project-filters">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`nw-filter ${
                  activeFilter === filter ? "active" : ""
                }`}
              >
                {filter}
                {activeFilter === filter && (
                  <ArrowUpRight size={15} />
                )}
              </button>
            ))}
          </Reveal>

          <div className="nw-project-grid">
            {filteredProjects.map((project, index) => (
              <Reveal
                key={project.slug}
                delay={Math.min(index, 3) * 90}
                className="nw-project-wrap"
              >
                <ProjectCard
                  project={project}
                  featured={false}
                />
              </Reveal>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="nw-empty-projects">
              <Compass size={35} />
              <h3>No ventures found</h3>
              <p>
                Explore our complete collection of developments.
              </p>
              <button
                type="button"
                onClick={() => setActiveFilter("All")}
              >
                Show All Ventures
              </button>
            </div>
          )}

          <Reveal className="nw-project-footer">
            <SmartLink
              href="/ventures"
              className="nw-btn nw-btn-dark"
            >
              Explore All Ventures
              <span className="nw-btn-icon">
                <ArrowUpRight size={19} />
              </span>
            </SmartLink>
          </Reveal>
        </div>
      </section>

      {/* =====================================
          ABOUT / EXPERIENCE
      ===================================== */}

      <section className="nw-experience">
        <div className="nw-experience-grid">
          <Reveal className="nw-experience-image">
            <img
              src="https://images.pexels.com/photos/11201060/pexels-photo-11201060.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="Open green landscape"
              loading="lazy"
            />

            <div className="nw-image-badge">
              <Compass size={27} />
              <div>
                <span>BUILT ON</span>
                <strong>TRUST & CLARITY</strong>
              </div>
            </div>
          </Reveal>

          <div className="nw-experience-content">
            <Reveal>
              <div className="nw-section-label nw-label-white">
                <span className="nw-label-line" />
                THE NESTWELL EXPERIENCE
              </div>

              <h2>
                We Don't Just
                <br />
                Develop Land.
                <br />
                <span>We Shape Futures.</span>
              </h2>

              <p>
                Choosing a plot is an important decision.
                We make that journey more meaningful through
                thoughtful planning, useful project information,
                and guidance that puts your needs first.
              </p>

              <div className="nw-experience-features">
                <div>
                  <span className="nw-feature-icon">
                    <ShieldCheck size={23} />
                  </span>
                  <div>
                    <strong>Transparent Information</strong>
                    <p>
                      Understand project details and available
                      approval documentation.
                    </p>
                  </div>
                </div>

                <div>
                  <span className="nw-feature-icon">
                    <MapPin size={23} />
                  </span>
                  <div>
                    <strong>Selected Locations</strong>
                    <p>
                      Discover promising destinations
                      across Andhra Pradesh.
                    </p>
                  </div>
                </div>

                <div>
                  <span className="nw-feature-icon">
                    <Handshake size={23} />
                  </span>
                  <div>
                    <strong>Personal Guidance</strong>
                    <p>
                      Ask questions, visit the site,
                      and decide with confidence.
                    </p>
                  </div>
                </div>
              </div>

              <SmartLink
                href="/about"
                className="nw-btn nw-btn-white"
              >
                Know More About Us
                <span className="nw-btn-icon">
                  <ArrowUpRight size={18} />
                </span>
              </SmartLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================
          WHY CHOOSE US
      ===================================== */}

      <section className="nw-section nw-why">
        <div className="nw-container">
          <Reveal className="nw-centered-header">
            <div className="nw-section-label">
              <span className="nw-label-line" />
              WHY NESTWELL
            </div>

            <h2 className="nw-heading">
              Built Around <span>Your Confidence.</span>
            </h2>

            <p>
              A thoughtful approach to property discovery,
              from your first search to your site visit.
            </p>
          </Reveal>

          <div className="nw-benefits-grid">
            {[
              {
                icon: ShieldCheck,
                title: "Approval Clarity",
                description:
                  "Review relevant layout approvals and documentation with clear guidance.",
              },
              {
                icon: MapPin,
                title: "Strategic Locations",
                description:
                  "Discover plotted developments in selected Andhra Pradesh growth corridors.",
              },
              {
                icon: Layers3,
                title: "Thoughtful Planning",
                description:
                  "Explore project layouts, access roads, and surroundings in detail.",
              },
              {
                icon: Handshake,
                title: "Human Guidance",
                description:
                  "Get personal assistance and answers at every stage of your journey.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal
                  key={item.title}
                  delay={index * 100}
                  className="nw-benefit-card"
                >
                  <div className="nw-benefit-top">
                    <span className="nw-benefit-icon">
                      <Icon size={29} strokeWidth={1.6} />
                    </span>

                    <span className="nw-benefit-number">
                      0{index + 1}
                    </span>
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                  <span className="nw-benefit-arrow">
                    <ArrowUpRight size={22} />
                  </span>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================
          SITE VISIT
      ===================================== */}

      <section className="nw-site-visit">
        <div className="nw-visit-image" />
        <div className="nw-visit-overlay" />

        <div className="nw-container nw-visit-inner">
          <Reveal>
            <div className="nw-section-label nw-label-white">
              <span className="nw-label-line" />
              EXPERIENCE THE LOCATION
            </div>

            <h2>
              See The Place.
              <br />
              <span>Feel The Possibility.</span>
            </h2>

            <p>
              Explore the surroundings, understand the
              development, and experience your future
              plot before making a decision.
            </p>

            <SmartLink
              href="/book-site-visit"
              className="nw-btn nw-btn-primary"
            >
              <CalendarDays size={19} />
              Schedule Your Site Visit
              <span className="nw-btn-icon">
                <ArrowUpRight size={19} />
              </span>
            </SmartLink>
          </Reveal>
        </div>
      </section>

      {/* =====================================
          BLOGS
      ===================================== */}

      <section className="nw-section nw-blogs">
        <div className="nw-container">
          <Reveal className="nw-section-header">
            <div>
              <div className="nw-section-label">
                <span className="nw-label-line" />
                INSIGHTS & KNOWLEDGE
              </div>

              <h2 className="nw-heading">
                Ideas. Insights.
                <br />
                <span>Better Decisions.</span>
              </h2>
            </div>

            <SmartLink
              href="/blog"
              className="nw-arrow-link"
            >
              View All Articles
              <span><ArrowUpRight size={19} /></span>
            </SmartLink>
          </Reveal>

          <div className="nw-blog-grid">
            {blogPosts.slice(0, 3).map((post, index) => (
              <Reveal
                key={post.slug}
                delay={index * 100}
              >
                <SmartLink
                  href={`/blog/${post.slug}`}
                  className="nw-blog-card"
                >
                  <div className="nw-blog-image">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                    />

                    <span className="nw-blog-category">
                      {post.category}
                    </span>

                    <span className="nw-blog-hover-icon">
                      <ArrowUpRight size={23} />
                    </span>
                  </div>

                  <div className="nw-blog-content">
                    <span className="nw-blog-date">
                      {post.date}
                    </span>

                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>

                    <div className="nw-blog-link">
                      READ ARTICLE
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </SmartLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================
          FINAL CTA
      ===================================== */}

      <section className="nw-final-cta">
        <div className="nw-container nw-final-inner">
          <Reveal>
            <div className="nw-section-label nw-label-white">
              <span className="nw-label-line" />
              START YOUR JOURNEY
            </div>

            <h2>
              Your Next Chapter
              <br />
              <span>Starts With NestWell.</span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <SmartLink
              href="/book-site-visit"
              className="nw-btn nw-btn-primary"
            >
              Let's Find Your Place
              <span className="nw-btn-icon">
                <ArrowUpRight size={19} />
              </span>
            </SmartLink>
          </Reveal>
        </div>
      </section>

      {/* =====================================
          ALL CSS IN SAME FILE
      ===================================== */}

      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .nestwell-v2 {
          --nw-navy: #071b35;
          --nw-dark: #091e38;
          --nw-blue: #2463eb;
          --nw-blue-light: #4d91ff;
          --nw-white: #ffffff;
          --nw-bg: #f5f7fb;
          --nw-text: #10223b;
          --nw-muted: #718096;
          --nw-border: #e5eaf2;

          font-family: 'Plus Jakarta Sans', sans-serif;
          color: var(--nw-text);
          background: white;
          overflow: clip;
        }

        .nestwell-v2 *,
        .nestwell-v2 *::before,
        .nestwell-v2 *::after {
          box-sizing: border-box;
        }

        .nestwell-v2 h1,
        .nestwell-v2 h2,
        .nestwell-v2 h3,
        .nestwell-v2 p {
          margin-top: 0;
        }

        .nestwell-v2 a {
          text-decoration: none;
        }

        .nestwell-v2 button,
        .nestwell-v2 select {
          font: inherit;
        }

        .nestwell-v2 button {
          cursor: pointer;
        }

        .nw-container {
          width: min(100% - 80px, 1360px);
          margin: auto;
        }

        .nw-section {
          padding: 115px 0;
        }

        /* ==================================
           TYPOGRAPHY
        ================================== */

        .nw-section-label {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
          color: var(--nw-blue);
          margin-bottom: 24px;
        }

        .nw-label-line {
          display: inline-block;
          width: 30px;
          height: 2px;
          background: currentColor;
        }

        .nw-label-white {
          color: #a7c7ff;
        }

        .nw-heading {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(39px, 4.7vw, 70px);
          font-weight: 600;
          line-height: 1.13;
          letter-spacing: -2.5px;
          color: var(--nw-navy);
          margin: 0;
        }

        .nw-heading span {
          color: var(--nw-blue);
        }

        .nw-section-header {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 35px;
          margin-bottom: 48px;
        }

        .nw-header-description {
          max-width: 350px;
          font-size: 15px;
          line-height: 1.9;
          color: var(--nw-muted);
          margin-bottom: 5px;
        }

        /* ==================================
           BUTTONS
        ================================== */

        .nw-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 10px 11px 10px 25px;
          min-height: 59px;
          font-size: 13px;
          font-weight: 700;
          border-radius: 8px;
          overflow: hidden;
          transition:
            transform .35s ease,
            background .35s ease,
            box-shadow .35s ease,
            color .35s ease;
        }

        .nw-btn:hover {
          transform: translateY(-4px);
        }

        .nw-btn-icon {
          width: 39px;
          height: 39px;
          display: grid;
          place-items: center;
          border-radius: 6px;
          transition: transform .35s, background .35s;
        }

        .nw-btn:hover .nw-btn-icon {
          transform: rotate(45deg);
        }

        .nw-btn-primary {
          background: var(--nw-blue);
          color: white;
          box-shadow: 0 10px 25px #2463eb35;
        }

        .nw-btn-primary .nw-btn-icon {
          background: #ffffff25;
        }

        .nw-btn-primary:hover {
          background: #1552d9;
          color: white;
          box-shadow: 0 16px 35px #2463eb55;
        }

        .nw-btn-dark {
          background: var(--nw-navy);
          color: white;
        }

        .nw-btn-dark .nw-btn-icon {
          background: #ffffff20;
        }

        .nw-btn-dark:hover {
          background: var(--nw-blue);
          color: white;
        }

        .nw-btn-white {
          background: white;
          color: var(--nw-navy);
        }

        .nw-btn-white .nw-btn-icon {
          background: #eaf1ff;
        }

        .nw-btn-white:hover {
          background: #dceaff;
          color: var(--nw-navy);
        }

        .nw-btn-glass {
          background: #ffffff12;
          color: white;
          border: 1px solid #ffffff50;
          padding: 17px 24px;
          backdrop-filter: blur(12px);
        }

        .nw-btn-glass:hover {
          background: white;
          color: var(--nw-navy);
        }

        .nw-arrow-link {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          color: var(--nw-navy);
          font-size: 13px;
          font-weight: 800;
          white-space: nowrap;
        }

        .nw-arrow-link > span {
          display: grid;
          place-items: center;
          width: 43px;
          height: 43px;
          border-radius: 50%;
          border: 1px solid #cbd6e5;
          transition: .35s;
        }

        .nw-arrow-link:hover > span {
          background: var(--nw-blue);
          color: white;
          border-color: var(--nw-blue);
          transform: rotate(45deg);
        }

        /* ==================================
           HERO SLIDER
        ================================== */

        .nw-hero {
          position: relative;
          height: min(900px, 94svh);
          min-height: 720px;
          background: var(--nw-navy);
          color: white;
          isolation: isolate;
          overflow: hidden;
        }

        .nw-slides {
          position: absolute;
          inset: 0;
          z-index: -3;
        }

        .nw-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          visibility: hidden;
          transition:
            opacity 1.3s ease,
            visibility 1.3s ease;
        }

        .nw-slide.active {
          opacity: 1;
          visibility: visible;
          z-index: 1;
        }

        .nw-slide-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.1);
          transition: transform 8s linear;
        }

        .nw-slide.active .nw-slide-image {
          transform: scale(1);
        }

        .nw-hero-overlay {
          position: absolute;
          inset: 0;
          z-index: -2;
          background:
            linear-gradient(
              90deg,
              rgba(4,17,36,.94) 0%,
              rgba(4,17,36,.75) 38%,
              rgba(4,17,36,.15) 100%
            ),
            linear-gradient(
              0deg,
              rgba(4,17,36,.6),
              transparent 45%
            );
        }

        .nw-hero-grid-pattern {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background-image:
            linear-gradient(#ffffff07 1px, transparent 1px),
            linear-gradient(90deg, #ffffff07 1px, transparent 1px);
          background-size: 110px 110px;
          mask-image: linear-gradient(90deg, black, transparent 75%);
        }

        .nw-hero-inner {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          padding-top: 30px;
        }

        .nw-hero-copy {
          max-width: 900px;
          animation: nwHeroContent .85s ease both;
        }

        .nw-hero-tag {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2.5px;
          color: #b8d2ff;
          margin-bottom: 28px;
        }

        .nw-tag-dot {
          width: 9px;
          height: 9px;
          background: var(--nw-blue-light);
          border-radius: 50%;
          box-shadow: 0 0 0 6px #4d91ff25;
        }

        .nw-hero h1 {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(66px, 8vw, 122px);
          line-height: 1.04;
          letter-spacing: -5px;
          font-weight: 600;
          margin-bottom: 30px;
        }

        .nw-hero h1 span {
          color: #83b4ff;
        }

        .nw-hero-copy > p {
          max-width: 570px;
          font-size: 16px;
          line-height: 1.95;
          color: #d6e0ed;
          margin-bottom: 35px;
        }

        .nw-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .nw-hero-footer {
          position: absolute;
          bottom: 48px;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nw-slide-counter {
          display: flex;
          align-items: center;
          gap: 15px;
          font-family: 'Outfit', sans-serif;
          font-size: 20px;
          font-weight: 600;
        }

        .nw-counter-line {
          width: 35px;
          height: 1px;
          background: #ffffff60;
        }

        .nw-total {
          color: #ffffff80;
          font-size: 14px;
        }

        .nw-slide-progress {
          display: flex;
          gap: 9px;
          flex: 1;
          max-width: 350px;
        }

        .nw-progress-item {
          width: 100%;
          height: 4px;
          padding: 0;
          border: 0;
          background: #ffffff45;
          overflow: hidden;
          border-radius: 5px;
        }

        .nw-progress-fill {
          display: block;
          height: 100%;
          width: 0;
          background: #75aaff;
        }

        .nw-progress-item.active .nw-progress-fill:not(.running) {
          width: 100%;
        }

        .nw-progress-fill.running {
          animation: nwProgress 6s linear forwards;
        }

        .nw-slider-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: auto;
        }

        .nw-slider-controls button {
          width: 47px;
          height: 47px;
          display: grid;
          place-items: center;
          border: 1px solid #ffffff65;
          background: #ffffff10;
          color: white;
          border-radius: 50%;
          transition: .35s;
          backdrop-filter: blur(10px);
        }

        .nw-slider-controls button:hover {
          background: var(--nw-blue);
          border-color: var(--nw-blue);
          transform: translateY(-3px);
        }

        .nw-hero-side-label {
          position: absolute;
          right: 25px;
          top: 50%;
          writing-mode: vertical-rl;
          transform: translateY(-50%);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 4px;
          color: #ffffffb0;
        }

        @keyframes nwHeroContent {
          from {
            opacity: 0;
            transform: translateY(35px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes nwProgress {
          from { width: 0; }
          to { width: 100%; }
        }

        /* ==================================
           SEARCH
        ================================== */

        .nw-search-section {
          background: var(--nw-bg);
          padding-bottom: 15px;
        }

        .nw-search-box {
          position: relative;
          z-index: 5;
          background: white;
          padding: 35px 42px;
          border-radius: 16px;
          margin-top: -55px;
          box-shadow: 0 25px 70px #0b23421c;
          border: 1px solid #e9edf5;
        }

        .nw-search-title {
          margin-bottom: 27px;
        }

        .nw-overline {
          color: var(--nw-blue);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .nw-search-title h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 27px;
          font-weight: 600;
          letter-spacing: -.7px;
          margin: 7px 0 0;
        }

        .nw-search-controls {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 20px;
          align-items: stretch;
        }

        .nw-search-field {
          border: 1px solid #e1e7f0;
          border-radius: 9px;
          padding: 13px 17px;
          transition: .3s;
          min-width: 0;
        }

        .nw-search-field:hover,
        .nw-search-field:focus-within {
          border-color: var(--nw-blue);
          box-shadow: 0 0 0 3px #2463eb10;
        }

        .nw-search-field label {
          display: block;
          color: #8591a3;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 9px;
        }

        .nw-input-row {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--nw-blue);
        }

        .nw-input-row select {
          appearance: none;
          border: 0;
          background: transparent;
          color: var(--nw-navy);
          outline: none;
          flex: 1;
          min-width: 0;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .nw-input-row > svg:last-child {
          color: #8290a2;
          pointer-events: none;
        }

        .nw-search-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 20px 27px;
          border-radius: 9px;
          background: var(--nw-blue);
          color: white;
          font-size: 13px;
          font-weight: 800;
          white-space: nowrap;
          transition: .35s;
        }

        .nw-search-submit:hover {
          background: var(--nw-navy);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 12px 25px #071b3530;
        }

        /* ==================================
           INTRO
        ================================== */

        .nw-intro {
          background: var(--nw-bg);
          padding-top: 105px;
        }

        .nw-intro-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 100px;
          align-items: end;
        }

        .nw-intro-description {
          color: #64748b;
          font-size: 16px;
          line-height: 2;
          margin-bottom: 28px;
        }

        /* ==================================
           LOCATIONS
        ================================== */

        .nw-locations {
          background: white;
        }

        .nw-location-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 23px;
        }

        .nw-location-wrap {
          min-width: 0;
        }

        .nw-location-card {
          display: block;
          height: 540px;
          position: relative;
          overflow: hidden;
          border-radius: 14px;
          background: var(--nw-navy);
          color: white;
          transition: box-shadow .45s, transform .45s;
        }

        .nw-location-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px #0a23432c;
        }

        .nw-location-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .9s cubic-bezier(.2,.8,.2,1);
        }

        .nw-location-card:hover img {
          transform: scale(1.12);
        }

        .nw-location-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            #071b3520,
            #071b3550 40%,
            #071b35ed 100%
          );
          transition: .4s;
        }

        .nw-location-card:hover .nw-location-overlay {
          background: linear-gradient(
            180deg,
            #071b3520,
            #071b35aa 50%,
            #071b35f5
          );
        }

        .nw-location-top {
          position: absolute;
          top: 25px;
          left: 25px;
          right: 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .nw-location-top-icon {
          display: grid;
          place-items: center;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: #ffffff25;
          border: 1px solid #ffffff70;
          backdrop-filter: blur(10px);
          transition: .35s;
        }

        .nw-location-card:hover .nw-location-top-icon {
          background: var(--nw-blue);
          border-color: var(--nw-blue);
          transform: rotate(45deg);
        }

        .nw-location-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 30px;
        }

        .nw-location-kicker {
          color: #9ec3ff;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.7px;
          text-transform: uppercase;
        }

        .nw-location-content h3 {
          font-family: 'Outfit', sans-serif;
          color: white;
          font-size: 36px;
          font-weight: 600;
          letter-spacing: -1px;
          margin: 12px 0;
        }

        .nw-location-content p {
          color: #dce6f3;
          font-size: 13px;
          line-height: 1.85;
          margin-bottom: 24px;
        }

        .nw-location-explore {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 20px;
          border-top: 1px solid #ffffff60;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.2px;
        }

        .nw-location-explore svg {
          transition: transform .35s;
        }

        .nw-location-card:hover .nw-location-explore svg {
          transform: translateX(7px);
        }

        /* ==================================
           PROJECTS
        ================================== */

        .nw-projects {
          background: var(--nw-bg);
        }

        .nw-project-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 35px;
        }

        .nw-filter {
          border: 1px solid #dbe3ee;
          background: white;
          color: #53657c;
          border-radius: 8px;
          padding: 13px 21px;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: .3s;
        }

        .nw-filter:hover,
        .nw-filter.active {
          background: var(--nw-blue);
          border-color: var(--nw-blue);
          color: white;
          box-shadow: 0 8px 20px #2463eb25;
        }

        .nw-project-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 25px;
        }

        .nw-project-wrap {
          min-width: 0;
        }

        .nw-project-wrap > * {
          height: 100%;
          transition: transform .4s, filter .4s;
        }

        .nw-project-wrap:hover > * {
          transform: translateY(-9px);
          filter: drop-shadow(0 16px 25px #0b23421a);
        }

        .nw-project-footer {
          text-align: center;
          margin-top: 48px;
        }

        .nw-empty-projects {
          text-align: center;
          padding: 70px 20px;
          background: white;
          border-radius: 14px;
          color: var(--nw-blue);
        }

        .nw-empty-projects h3 {
          color: var(--nw-navy);
          margin: 15px 0;
        }

        .nw-empty-projects p {
          color: var(--nw-muted);
        }

        .nw-empty-projects button {
          border: 0;
          background: var(--nw-blue);
          color: white;
          border-radius: 6px;
          padding: 12px 22px;
        }

        /* ==================================
           EXPERIENCE
        ================================== */

        .nw-experience {
          background: var(--nw-navy);
          color: white;
        }

        .nw-experience-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 720px;
        }

        .nw-experience-image {
          position: relative;
          overflow: hidden;
          min-height: 650px;
        }

        .nw-experience-image > img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1s;
        }

        .nw-experience-image:hover > img {
          transform: scale(1.07);
        }

        .nw-image-badge {
          position: absolute;
          bottom: 50px;
          right: 0;
          background: var(--nw-blue);
          color: white;
          padding: 27px 35px;
          display: flex;
          align-items: center;
          gap: 18px;
          box-shadow: 0 15px 30px #0003;
        }

        .nw-image-badge div {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .nw-image-badge span {
          font-size: 10px;
          letter-spacing: 2px;
        }

        .nw-image-badge strong {
          font-size: 13px;
          letter-spacing: 1px;
        }

        .nw-experience-content {
          padding: 90px clamp(35px, 6vw, 110px);
          display: flex;
          align-items: center;
        }

        .nw-experience-content h2 {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(42px, 4.6vw, 68px);
          font-weight: 600;
          line-height: 1.13;
          letter-spacing: -2.5px;
          margin-bottom: 27px;
        }

        .nw-experience-content h2 span {
          color: #83b4ff;
        }

        .nw-experience-content > div {
          width: 100%;
        }

        .nw-experience-content p {
          color: #b8c7dc;
          font-size: 15px;
          line-height: 1.95;
          margin-bottom: 32px;
        }

        .nw-experience-features {
          display: grid;
          gap: 22px;
          margin-bottom: 38px;
        }

        .nw-experience-features > div {
          display: flex;
          align-items: flex-start;
          gap: 17px;
        }

        .nw-feature-icon {
          width: 46px;
          height: 46px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          background: #ffffff12;
          border: 1px solid #ffffff25;
          border-radius: 9px;
          color: #8ab9ff;
          transition: .35s;
        }

        .nw-experience-features > div:hover .nw-feature-icon {
          background: var(--nw-blue);
          color: white;
          transform: rotate(-7deg);
        }

        .nw-experience-features strong {
          display: block;
          font-size: 14px;
          margin-bottom: 6px;
        }

        .nw-experience-features p {
          font-size: 12px;
          margin: 0;
          line-height: 1.7;
        }

        /* ==================================
           WHY CHOOSE
        ================================== */

        .nw-why {
          background: white;
        }

        .nw-centered-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 55px;
        }

        .nw-centered-header p {
          color: var(--nw-muted);
          line-height: 1.9;
          max-width: 520px;
          margin: 22px auto 0;
        }

        .nw-benefits-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
        }

        .nw-benefit-card {
          position: relative;
          padding: 34px 27px;
          min-height: 310px;
          border: 1px solid #e4eaf3;
          border-radius: 13px;
          background: white;
          overflow: hidden;
          transition:
            transform .4s,
            background .4s,
            box-shadow .4s,
            border-color .4s;
        }

        .nw-benefit-card::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 4px;
          background: var(--nw-blue);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .45s;
        }

        .nw-benefit-card:hover {
          transform: translateY(-10px);
          background: #f8fbff;
          border-color: #bfd4ff;
          box-shadow: 0 22px 45px #0b234215;
        }

        .nw-benefit-card:hover::before {
          transform: scaleX(1);
        }

        .nw-benefit-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 38px;
        }

        .nw-benefit-icon {
          width: 63px;
          height: 63px;
          display: grid;
          place-items: center;
          background: #eaf1ff;
          color: var(--nw-blue);
          border-radius: 12px;
          transition: .4s;
        }

        .nw-benefit-card:hover .nw-benefit-icon {
          background: var(--nw-blue);
          color: white;
          transform: rotate(-7deg);
        }

        .nw-benefit-number {
          color: #b1bccb;
          font-size: 12px;
          font-weight: 700;
        }

        .nw-benefit-card h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 23px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .nw-benefit-card p {
          font-size: 13px;
          color: #77869a;
          line-height: 1.85;
          margin: 0;
        }

        .nw-benefit-arrow {
          position: absolute;
          right: 22px;
          bottom: 19px;
          color: var(--nw-blue);
          opacity: 0;
          transform: translate(-8px, 8px);
          transition: .35s;
        }

        .nw-benefit-card:hover .nw-benefit-arrow {
          opacity: 1;
          transform: translate(0, 0);
        }

        /* ==================================
           SITE VISIT
        ================================== */

        .nw-site-visit {
          position: relative;
          min-height: 580px;
          display: flex;
          align-items: center;
          background: var(--nw-navy);
          isolation: isolate;
          overflow: hidden;
        }

        .nw-visit-image {
          position: absolute;
          inset: 0;
          z-index: -2;
          background-image: url('https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&w=1920');
          background-size: cover;
          background-position: center;
          transition: transform 1.2s;
        }

        .nw-site-visit:hover .nw-visit-image {
          transform: scale(1.06);
        }

        .nw-visit-overlay {
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(
            90deg,
            #071b35f5,
            #071b35c7 55%,
            #071b3555
          );
        }

        .nw-visit-inner {
          padding-block: 90px;
          color: white;
        }

        .nw-visit-inner h2 {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(48px, 6vw, 86px);
          font-weight: 600;
          letter-spacing: -3px;
          line-height: 1.12;
          margin-bottom: 25px;
        }

        .nw-visit-inner h2 span {
          color: #8abaff;
        }

        .nw-visit-inner p {
          max-width: 550px;
          color: #d2dfed;
          font-size: 15px;
          line-height: 1.95;
          margin-bottom: 35px;
        }

        /* ==================================
           BLOGS
        ================================== */

        .nw-blogs {
          background: var(--nw-bg);
        }

        .nw-blog-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 25px;
        }

        .nw-blog-card {
          display: block;
          height: 100%;
          overflow: hidden;
          background: white;
          color: var(--nw-navy);
          border: 1px solid #e6ebf2;
          border-radius: 13px;
          transition: transform .4s, box-shadow .4s;
        }

        .nw-blog-card:hover {
          transform: translateY(-9px);
          box-shadow: 0 20px 45px #10294718;
        }

        .nw-blog-image {
          height: 260px;
          position: relative;
          overflow: hidden;
          background: #e5eaf2;
        }

        .nw-blog-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .75s;
        }

        .nw-blog-card:hover img {
          transform: scale(1.1);
        }

        .nw-blog-category {
          position: absolute;
          bottom: 18px;
          left: 18px;
          background: white;
          color: var(--nw-blue);
          padding: 9px 13px;
          border-radius: 5px;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .nw-blog-hover-icon {
          position: absolute;
          right: 18px;
          top: 18px;
          width: 45px;
          height: 45px;
          display: grid;
          place-items: center;
          background: var(--nw-blue);
          color: white;
          border-radius: 50%;
          transform: translateY(-12px);
          opacity: 0;
          transition: .35s;
        }

        .nw-blog-card:hover .nw-blog-hover-icon {
          opacity: 1;
          transform: translateY(0) rotate(45deg);
        }

        .nw-blog-content {
          padding: 29px;
        }

        .nw-blog-date {
          color: #8a98ab;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .6px;
        }

        .nw-blog-content h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 23px;
          font-weight: 600;
          line-height: 1.4;
          margin: 13px 0;
          transition: color .3s;
        }

        .nw-blog-card:hover h3 {
          color: var(--nw-blue);
        }

        .nw-blog-content p {
          font-size: 13px;
          line-height: 1.9;
          color: #758398;
          margin-bottom: 25px;
        }

        .nw-blog-link {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--nw-blue);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .nw-blog-link svg {
          transition: transform .3s;
        }

        .nw-blog-card:hover .nw-blog-link svg {
          transform: translateX(7px);
        }

        /* ==================================
           FINAL CTA
        ================================== */

        .nw-final-cta {
          background:
            radial-gradient(circle at 90% 10%, #2563eb35, transparent 40%),
            linear-gradient(120deg, #071b35, #102d54);
          padding: 85px 0;
          color: white;
        }

        .nw-final-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
        }

        .nw-final-inner h2 {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(40px, 4.8vw, 70px);
          font-weight: 600;
          letter-spacing: -2px;
          line-height: 1.15;
          margin: 0;
        }

        .nw-final-inner h2 span {
          color: #89b8ff;
        }

        /* ==================================
           SCROLL REVEAL
        ================================== */

        .nw-reveal {
          opacity: 0;
          transform: translateY(35px);
          transition:
            opacity .8s ease,
            transform .8s cubic-bezier(.2,.8,.2,1);
        }

        .nw-reveal.nw-show {
          opacity: 1;
          transform: translateY(0);
        }

        .nw-search-box.nw-reveal {
          transform: translateY(-20px);
        }

        .nw-search-box.nw-show {
          transform: translateY(0);
        }

        /* ==================================
           TABLET
        ================================== */

        @media (max-width: 1100px) {
          .nw-container {
            width: min(100% - 48px, 1360px);
          }

          .nw-hero h1 {
            font-size: clamp(64px, 8vw, 95px);
          }

          .nw-intro-grid {
            gap: 45px;
          }

          .nw-location-card {
            height: 460px;
          }

          .nw-location-content {
            padding: 23px;
          }

          .nw-location-content h3 {
            font-size: 29px;
          }

          .nw-project-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .nw-experience-content {
            padding: 65px 35px;
          }

          .nw-benefits-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .nw-search-controls {
            grid-template-columns: 1fr 1fr;
          }

          .nw-search-submit {
            grid-column: 1 / -1;
          }
        }

        /* ==================================
           MOBILE
        ================================== */

        @media (max-width: 767px) {
          .nw-container {
            width: min(100% - 36px, 1360px);
          }

          .nw-section {
            padding: 75px 0;
          }

          .nw-hero {
            min-height: 680px;
            height: 88svh;
          }

          .nw-slide-image {
            object-position: 58% center;
          }

          .nw-hero-overlay {
            background: linear-gradient(
              90deg,
              #06172fe8,
              #06172f99
            );
          }

          .nw-hero-grid-pattern {
            background-size: 65px 65px;
          }

          .nw-hero h1 {
            font-size: clamp(49px, 10vw, 73px);
            letter-spacing: -2.5px;
          }

          .nw-hero-tag {
            font-size: 9px;
            letter-spacing: 1.5px;
          }

          .nw-hero-copy > p {
            font-size: 14px;
            line-height: 1.85;
          }

          .nw-hero-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .nw-hero-footer {
            bottom: 26px;
            gap: 15px;
          }

          .nw-slide-counter {
            font-size: 16px;
            gap: 9px;
          }

          .nw-counter-line {
            width: 18px;
          }

          .nw-slide-progress {
            display: none;
          }

          .nw-slider-controls {
            gap: 6px;
          }

          .nw-slider-controls button {
            width: 38px;
            height: 38px;
          }

          .nw-hero-side-label {
            display: none;
          }

          .nw-search-box {
            padding: 26px 22px;
            margin-top: -35px;
          }

          .nw-search-title h2 {
            font-size: 23px;
          }

          .nw-search-controls {
            grid-template-columns: 1fr;
          }

          .nw-search-submit {
            grid-column: auto;
          }

          .nw-intro {
            padding-top: 80px;
          }

          .nw-intro-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .nw-heading {
            font-size: clamp(37px, 8vw, 52px);
            letter-spacing: -1.5px;
          }

          .nw-section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 25px;
          }

          .nw-location-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .nw-location-card {
            height: 440px;
          }

          .nw-location-content {
            padding: 27px;
          }

          .nw-location-content h3 {
            font-size: 34px;
          }

          .nw-project-grid {
            grid-template-columns: 1fr;
          }

          .nw-project-filters {
            gap: 8px;
          }

          .nw-filter {
            padding: 11px 14px;
            font-size: 11px;
          }

          .nw-experience-grid {
            grid-template-columns: 1fr;
          }

          .nw-experience-image {
            min-height: 390px;
          }

          .nw-experience-content {
            padding: 70px 25px;
          }

          .nw-experience-content h2 {
            font-size: 44px;
          }

          .nw-benefits-grid {
            grid-template-columns: 1fr;
          }

          .nw-benefit-card {
            min-height: 260px;
          }

          .nw-site-visit {
            min-height: 530px;
          }

          .nw-visit-inner h2 {
            font-size: 48px;
            letter-spacing: -1.5px;
          }

          .nw-blog-grid {
            grid-template-columns: 1fr;
          }

          .nw-final-inner {
            flex-direction: column;
            align-items: flex-start;
          }

          .nw-final-cta {
            padding: 70px 0;
          }

          .nw-final-inner h2 {
            font-size: 43px;
          }
        }

        @media (max-width: 380px) {
          .nw-hero h1 {
            font-size: 45px;
          }

          .nw-hero-tag {
            font-size: 8px;
          }

          .nw-location-card {
            height: 410px;
          }
        }

        /* ==================================
           REDUCED MOTION
        ================================== */

        @media (prefers-reduced-motion: reduce) {
          .nestwell-v2 *,
          .nestwell-v2 *::before,
          .nestwell-v2 *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
            scroll-behavior: auto !important;
          }

          .nw-reveal {
            opacity: 1;
            transform: none;
          }
        }

      `}</style>
    </main>
  );
}
