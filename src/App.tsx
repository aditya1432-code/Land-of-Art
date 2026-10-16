import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";

const navigation = [
  ["Home", "home"],
  ["About", "about"],
  ["Team", "founders"],
  ["Gallery", "gallery"],
] as const;

const divisions = [
  {
    name: "Explore the Showcase",
    description: "Explore Kolaahal & Rangotsav visual collections.",
    button: "View Showcase",
    href: "/showcase",
  },
  {
    name: "Creators Unveiled",
    description: "Meet the artists, designers, and visionaries behind our events.",
    button: "Meet the Creators",
    href: "#founders",
  },
  {
    name: "Our Legacy",
    description: "Discover the spirit of our Land Of Art.",
    button: "Discover Our Story",
    href: "#about",
  },
  {
    name: "Our Foundations",
    description: "Meet the foundations and previous members of our club.",
    button: "Meet Our Members",
    href: "/foundations",
  },
];

type Founder = { name: string; mark?: string; image?: string };

const teamPhotos: Record<string, string> = {
  "Arnav Chaudhary": "/Teams/arnav.jpg",
  "Deepak Yadav": "/Teams/deepak.jpg",
  "Anshika Verma": "/Teams/anshika-verma.jpg",
  "Tapan Mishra": "/Teams/tapan.jpg",
  "Tanisha Soni": "/Teams/tanisha.jpg",
  "Tanuraj Sirohi": "/Teams/tanuraj.jpg",
  "Anubhav Kumar Singh": "/Teams/anubhav.jpg",
  "Vansh Mittal": "/Teams/vansh-mittal.jpg",
  "Saianshi Saxena": "/Teams/saianshi.jpg",
  "Aditi Chaudhary": "/Teams/aditi-chaudhary.jpg",
  "Aditya Sharma": "/Teams/aditya-sharma.jpg",
  "Anushka Agarwal": "/Teams/anushka-agarwal.jpg",
  "Jagrati Gupta": "/Teams/jagriti.jpg",
  "Nitish Tomar": "/Teams/nitish.jpg",
  "Priyanshi Chauhan": "/Teams/priyanshi.jpg",
  "Sarthak Rana": "/Teams/sarthak.jpg",
  "Vasu Upadhyay": "/Teams/vasu.jpg",
  "Areeb Siddiqui": "/Teams/areeb-siddiqui.jpeg",
  "Vansh Kumar": "/Teams/vansh-kumar.jpg",
  "Serena Bentham": "/Teams/serena.jpg",
  "Lakshit Sharma": "/Teams/lakshit.jpg",
  "Vidhi Dhaka": "/Teams/vidhi.jpg",
  "Anushka": "/Teams/anushka.jpg",
  "Aniket Rathi": "/Teams/aniket.jpg",
  "Anushka Latiyan": "/Teams/anushka-latiyan.jpg",
  "Aditya Kumar": "/Teams/aditya-kumar.png",
  "Priyanshu Baudh": "/Teams/priyanshu.jpeg",
  "Lavi Kashyap": "/Teams/lavi.jpg",
  "Vansh": "/Teams/vansh.jpg",
  "Manvi": "/Teams/manvi.jpg",
  "Tamanna": "/Teams/tamanna.jpg",
  "Rupal Agarwal": "/Teams/rupal.jpg",
  "Ansh Dhankar": "/Teams/ansh.jpg",
  "Aayushi Chaudhary": "/Teams/aayushi.jpg",
  "Arjun Sharma": "/Teams/arjun.jpg",
  "Aditi Dhiman": "/Teams/aditi-dhiman.jpg",
};

const makeBatchMembers = (names: string[]): Founder[] =>
  names.map((name, index) => ({ name, image: teamPhotos[name], mark: String(index + 1).padStart(2, "0") }));

const batch2023Members = makeBatchMembers([
  "Arnav Chaudhary",
  "Deepak Yadav",
  "Anshika Verma",
  "Tapan Mishra",
  "Tanisha Soni",
  "Tanuraj Sirohi",
  "Anubhav Kumar Singh",
  "Vansh Mittal",
]);

const batch2024Members = makeBatchMembers([
  "Saianshi Saxena",
  "Aditi Chaudhary",
  "Aditya Sharma",
  "Anushka Agarwal",
  "Jagrati Gupta",
  "Nitish Tomar",
  "Priyanshi Chauhan",
  "Sarthak Rana",
  "Vasu Upadhyay",
  "Areeb Siddiqui",
  "Vansh Kumar",
]);

const batch2025Members = makeBatchMembers([
  "Serena Bentham",
  "Lakshit Sharma",
  "Vidhi Dhaka",
  "Aditya Kumar",
  "Anushka",
  "Aniket Rathi",
  "Anushka Latiyan",
  "Priyanshu Baudh",
  "Lavi Kashyap",
  "Vansh",
  "Manvi",
  "Tamanna",
  "Rupal Agarwal",
  "Ansh Dhankar",
  "Aayushi Chaudhary",
  "Arjun Sharma",
  "Aditi Dhiman",
]);

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = navigation
      .map(([, target]) => document.getElementById(target))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header>
      <div className="nav">
        <a className="brand" href="#home" aria-label="The Land of Art home">
          <img src="/LOA%20logo.png" alt="" className="logo" />
          <span>The Land of Art</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "×" : "☰"}
        </button>
        <nav id="site-menu" className={menuOpen ? "open" : undefined}>
          {navigation.map(([label, target]) => (
            <a
              href={`#${target}`}
              key={target}
              aria-current={activeSection === target ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  useEffect(() => {
    const page = document.querySelector(".home-page");
    if (!page || !("IntersectionObserver" in window)) return;

    const revealTargets = page.querySelectorAll<HTMLElement>(
      "main > section.card, main > section.card2, main > section.inspiration-section, main > #teams > .card, .inspiration-card",
    );
    revealTargets.forEach((target) => target.classList.add("scroll-reveal"));
    page.classList.add("reveal-ready");

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="container home-page" id="top">
      <Header />
      <main>
        <section id="home" className="hero">
          <div>
            <div className="eyebrow">Welcome to</div>
            <h1>THE <em>LAND</em> OF ART</h1>
            <p className="lead">Where creativity meets legacy and every moment becomes art.<br />Where ideas bloom into masterpieces.</p>
            <div className="hero-actions">
              <a href="#gallery" className="cta">Explore Gallery</a>
              <a href="#founders" className="cta cta-secondary">Meet Our Team</a>
            </div>
          </div>
        </section>

        <section id="about" className="card">
          <h2>Our Creative Identity</h2>
          <p>We are a vibrant community of artists, designers, and creators driven by creativity, storytelling, and cultural expression. Through Rangotsav and Kolaahal, we transform ideas into immersive experiences that bring people together. Guided by our faculty coordinators and the vision of our founders, we nurture a collaborative space where creativity flourishes, talent evolves, and artistic boundaries are redefined.</p>
          <div className="identity-stats" aria-label="Creative Identity at a glance">
            <div className="identity-stat"><strong>7+</strong><span>Years</span></div>
            <div className="identity-stat"><strong>20+</strong><span>Events</span></div>
            <div className="identity-stat"><strong>50+</strong><span>Artists</span></div>
            <div className="identity-stat"><strong>100+</strong><span>Members</span></div>
          </div>
        </section>

        <section id="teams" className="grid-2" aria-label="Our teams">
          {divisions.map((division) => (
            <article className="card" key={division.name}>
              <h3>{division.name}</h3>
              <p>{division.description}</p>
              <a className="cta division-cta" href={division.href}>{division.button}</a>
            </article>
          ))}
        </section>

        <section id="founders" className="card2">
          <h2>Minds that Create</h2>
          <p className="founder-batch">Batch 2023-27</p>
          <AutoMovingTrack label="Batch 2023-27 members">
            <FounderGroup />
            <FounderGroup duplicate />
          </AutoMovingTrack>
          <BatchCardTrack batch="Batch 2024-2028" members={batch2024Members} />
          <BatchCardTrack batch="Batch 2025-2029" members={batch2025Members} />
        </section>

        <section className="inspiration-section" aria-labelledby="inspiration-title">
          <h2 id="inspiration-title">The Minds that Inspire</h2>
          <div className="inspiration-grid">
            <article className="inspiration-card">
              <div className="inspiration-image inspiration-image-vishi" role="img" aria-label="Mrs. Vishi Khattri">
                <img src="/vishi.jpg" alt="Mrs. Vishi Khattri" loading="lazy" />
              </div>
              <h3>MRS.VISHI KHATTRI</h3>
              <h4>Faculty Coordinator</h4>
              <p>Guiding the artistic vision and nurturing creativity across all events.</p>
            </article>
            <article className="inspiration-card">
              <div className="inspiration-image inspiration-image-akansha" role="img" aria-label="Dr. Akansha Jain">
                <img src="/akansha.jpeg" alt="Dr. Akansha Jain" loading="lazy" />
              </div>
              <h3>DR. AKANSHA JAIN</h3>
              <h4>Co-Coordinator</h4>
              <p>Supporting innovation and ensuring smooth execution of all initiatives.</p>
            </article>
          </div>
        </section>

        <section className="inspiration-section inspiration-architects" aria-labelledby="architects-title">
          <h2 id="architects-title">The Minds that Architects</h2>
          <div className="inspiration-grid">
            <article className="inspiration-card">
              <div className="inspiration-image inspiration-image-shubham" role="img" aria-label="Mr. Shubham Shukla">
                <img src="/Foundations/shubham-shukla-2018-22.jpg" alt="Mr. Shubham Shukla" loading="lazy" />
              </div>
              <h3>MR. SHUBHAM SHUKLA</h3>
              <h4>Founder</h4>
              <p>The visionary who laid the foundation of Land of Art.</p>
            </article>
            <article className="inspiration-card">
              <div className="inspiration-image inspiration-image-kunal" role="img" aria-label="Mr. Kunal Kapoor">
                <img src="/Foundations/kunal-kapoor-2017-21.jpg" alt="Mr. Kunal Kapoor" loading="lazy" />
              </div>
              <h3>MR. KUNAL KAPOOR</h3>
              <h4>Co-Founder</h4>
              <p>The driving force behind execution and expansion.</p>
            </article>
          </div>
        </section>

        <section id="gallery" className="card">
          <h2>Captured Creativity</h2>
          <div className="gallery">
            <GalleryImage src="/Showcase/RANG-2025/RANG1-2025.jpeg" alt="Rangotsav 2025 moment 1" />
            <GalleryImage src="/Showcase/RANG-2025/RANG2-2025.jpeg" alt="Rangotsav 2025 moment 2" />
            <GalleryImage src="/Showcase/RANG-2025/RANG3-2025.jpeg" alt="Rangotsav 2025 moment 3" />
          </div>
        </section>

      </main>
      <footer>
        <div className="footer-main">
          <a className="footer-brand" href="#top" aria-label="The Land of Art home">
            <img src="/LOA%20logo.png" alt="The Land of Art logo" className="footer-logo" />
          </a>
          <div className="footer-details">
            <h2>THE LAND OF ART</h2>
            <p>"The best reason to paint is that, there is no reason to paint."</p>
            <address><strong>Art Room, Admin-Block, MIET, Meerut</strong></address>
            <a className="footer-link" href="mailto:thelandofart14@gmail.com">
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z" /><path d="m4 6 8 7 8-7" /></svg>
              thelandofart14@gmail.com
            </a>
            <a className="footer-link" href="https://land-of-art.vercel.app">
              <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
              land-of-art.vercel.app
            </a>
            <a className="footer-link" href="https://www.instagram.com/the_land_of_art__/" target="_blank" rel="noreferrer">
              <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle className="footer-icon-dot" cx="17.5" cy="6.5" r=".8" /></svg>
              @the_land_of_art__
            </a>
          </div>
        </div>
        <div className="footer-bottom">© 2026 Land of Art</div>
      </footer>
    </div>
  );
}

function AutoMovingTrack({ label, children }: { label: string; children: ReactNode }) {
  const windowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const groupWidthRef = useRef(0);
  const dragRef = useRef<{ pointerId: number; startX: number; startPosition: number } | null>(null);

  useEffect(() => {
    const viewport = windowRef.current;
    const track = trackRef.current;
    const firstGroup = track?.firstElementChild as HTMLElement | null;
    if (!viewport || !track || !firstGroup) return;

    const applyPosition = () => {
      const width = groupWidthRef.current;
      if (width <= 0) return;
      positionRef.current = ((positionRef.current % width) + width) % width;
      track.style.transform = `translate3d(${-positionRef.current}px, 0, 0)`;
    };
    const measure = () => {
      groupWidthRef.current = firstGroup.getBoundingClientRect().width;
      applyPosition();
    };

    measure();
    window.addEventListener("resize", measure);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frameId = 0;
    let previousTime = 0;
    const animate = (time: number) => {
      if (!previousTime) previousTime = time;
      const elapsed = Math.min(time - previousTime, 50);
      previousTime = time;
      if (!dragRef.current && !reducedMotion) {
        positionRef.current += elapsed * (groupWidthRef.current / 42000);
        applyPosition();
      }
      frameId = window.requestAnimationFrame(animate);
    };
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", measure);
    };
  }, []);

  function applyManualPosition(nextPosition: number) {
    const track = trackRef.current;
    const width = groupWidthRef.current;
    if (!track || width <= 0) return;
    positionRef.current = ((nextPosition % width) + width) % width;
    track.style.transform = `translate3d(${-positionRef.current}px, 0, 0)`;
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const viewport = windowRef.current;
    if (!viewport) return;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startPosition: positionRef.current };
    viewport.setPointerCapture(event.pointerId);
    if (event.pointerType === "mouse") event.preventDefault();
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    applyManualPosition(drag.startPosition - (event.clientX - drag.startX));
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    const viewport = windowRef.current;
    if (viewport?.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    applyManualPosition(positionRef.current + (event.key === "ArrowRight" ? -120 : 120));
  }

  return (
    <div
      className="founders-window"
      ref={windowRef}
      role="region"
      aria-label={label}
      aria-roledescription="card carousel"
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      onDragStart={(event) => event.preventDefault()}
    >
      <div className="founders-track" ref={trackRef}>{children}</div>
    </div>
  );
}

function FounderGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="founder-group" aria-hidden={duplicate || undefined}>
      {batch2023Members.map((founder) => (
        <article className="person" key={`${duplicate ? "copy-" : ""}${founder.name}`}>
          <FounderPortrait founder={founder} decorative={duplicate} />
          <h4>{founder.name}</h4>
        </article>
      ))}
    </div>
  );
}

function FounderPortrait({ founder, decorative }: { founder: Founder; decorative: boolean }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (founder.image && !imageFailed) {
    return (
      <div className="founder-portrait">
        <img src={founder.image} alt={decorative ? "" : founder.name} loading="lazy" draggable={false} onError={() => setImageFailed(true)} />
      </div>
    );
  }

  return (
    <div className="founder-portrait" aria-hidden="true">
      <span className="founder-placeholder">
        {founder.mark ?? founder.name.split(" ").map((part) => part[0]).join("")}
      </span>
    </div>
  );
}

function BatchCardTrack({ batch, members }: { batch: string; members: Founder[] }) {
  return (
    <div className="batch-cohort">
      <p className="batch-label">{batch}</p>
      <AutoMovingTrack label={`${batch} members`}>
        <BatchCardGroup batch={batch} members={members} />
        <BatchCardGroup batch={batch} members={members} duplicate />
      </AutoMovingTrack>
    </div>
  );
}

function BatchCardGroup({ batch, members, duplicate = false }: { batch: string; members: Founder[]; duplicate?: boolean }) {
  return (
    <div className="founder-group" aria-hidden={duplicate || undefined}>
      {members.map((member) => (
        <article className="person" key={`${duplicate ? "copy-" : ""}${batch}-${member.name}`}>
          <FounderPortrait founder={member} decorative={duplicate} />
          <h4>{member.name}</h4>
        </article>
      ))}
    </div>
  );
}

type GalleryImageProps = { src: string; alt: string };

function GalleryImage({ src, alt }: GalleryImageProps) {
  return (
    <div className="thumb">
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}
