import { useState } from "react";

type EventCollection = { name: string; photos: string[]; comingSoon?: boolean };
type ShowcaseEvent = { year: string; title: string; collections: EventCollection[] };

const folderPhotos = (folder: string, filenames: string[]) =>
  filenames.map((filename) => `/Showcase/${folder}/${filename}`);

const numberedFilenames = (count: number, extension: "jpg" | "jpeg") =>
  Array.from({ length: count }, (_, index) => `${index + 1}.${extension}`);

const collageGrid = (count: number) => {
  const columns = count <= 1 ? 1 : count === 2 ? 2 : count <= 4 ? 2 : count <= 9 ? 3 : 4;
  const rows = Math.ceil(count / columns);
  return { columns, rows };
};

const showcaseEvents: ShowcaseEvent[] = [
  { year: "2026", title: "The Present Canvas", collections: [
    { name: "Kolaahal", photos: folderPhotos("KOLA-2026", Array.from({ length: 7 }, (_, index) => `KOLA${index + 1}-2026.jpeg`)) },
    { name: "Rangotsav", photos: [], comingSoon: true },
  ] },
  { year: "2025", title: "Color of Expression", collections: [
    { name: "Kolaahal", photos: folderPhotos("KOLA-2025", numberedFilenames(5, "jpg")) },
    { name: "Rangotsav", photos: folderPhotos("RANG-2025", Array.from({ length: 12 }, (_, index) => `RANG${index + 1}-2025.jpeg`)) },
  ] },
  { year: "2023", title: "The Evolving Stroke", collections: [
    { name: "Rangotsav", photos: folderPhotos("RANG-2023", ["1..jpg", "2.jpg", "3.jpg", "4.jpg"]) },
  ] },
  { year: "2022", title: "Rising Creativity", collections: [
    { name: "Kolaahal", photos: folderPhotos("KOLA-2022", ["KOLA1-2022.jpg", "KOLA2-2022.jpg"]) },
  ] },
  { year: "2021", title: "First Impressions", collections: [
    { name: "Rangotsav", photos: folderPhotos("RANG-2021", numberedFilenames(12, "jpg")) },
  ] },
  { year: "2018", title: "Where it all begin!", collections: [
    { name: "Rangotsav", photos: folderPhotos("RANG-2018", ["RANG1-2018.jpg", "RANG2-2018.jpg"]) },
  ] },
];

export default function ShowcasePage() {
  const [openYear, setOpenYear] = useState<string | null>(null);

  return (
    <div className="container showcase-container">
      <header>
        <div className="nav">
          <a className="brand" href="/" aria-label="The Land of Art home">
            <img src="/LOA%20logo.png" alt="" className="logo" />
            <span>The Land of Art</span>
          </a>
          <nav aria-label="Showcase navigation">
            <a href="/#home">Home</a>
            <a href="/foundations">Previous Batches</a>
          </nav>
        </div>
      </header>
      <main className="showcase-main">
        <section className="showcase-hero">
          <div className="eyebrow">Kolaahal · Rangotsav</div>
          <h1>Explore the Showcase</h1>
          <p className="lead">A collection of the colors, performances, and creative moments that bring The Land of Art to life.</p>
        </section>
        <section className="showcase-background-section" aria-label="Event collections">
          <div className="showcase-background-inner">
            <div className="showcase-event-list">
              {showcaseEvents.map((event) => {
                const isOpen = openYear === event.year;
                const panelId = `showcase-event-${event.year}`;

                return (
                  <article className={`showcase-event${isOpen ? " is-open" : ""}`} key={event.year}>
                    <button
                      className="showcase-event-toggle"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenYear(isOpen ? null : event.year)}
                    >
                      <span className="showcase-event-year">{event.year}</span>
                      <span className="showcase-event-title">{event.title}</span>
                      <svg className="showcase-event-chevron" aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg>
                    </button>
                    <div className={`showcase-event-panel${isOpen ? " is-open" : ""}`} id={panelId} role="region" aria-label={`${event.year}: ${event.title}`} aria-hidden={!isOpen}>
                      <div className="showcase-event-panel-inner">
                        <div className={`showcase-event-collections${event.collections.length === 2 ? " has-divider" : ""}`}>
                          {event.collections.map((collection, index) => (
                            <div className="showcase-event-collection" key={collection.name}>
                              {index > 0 && <div className="showcase-event-divider" aria-hidden="true" />}
                              <section className="showcase-event-gallery" aria-label={`${collection.name} collage`}>
                                <h3>{collection.name}</h3>
                                {collection.photos.length > 0 ? (
                                  <PhotoCollage photos={collection.photos} category={collection.name} year={event.year} />
                                ) : collection.comingSoon ? (
                                  <div className="showcase-collage-placeholder coming-soon" role="note">
                                    <div className="showcase-photo-tile tile-one">01</div>
                                    <div className="showcase-photo-tile tile-two">02</div>
                                    <div className="showcase-photo-tile tile-three">03</div>
                                    <div className="showcase-photo-tile tile-four">04</div>
                                    <p>(Coming soon...)</p>
                                  </div>
                                ) : null}
                              </section>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function PhotoCollage({ photos, category, year }: { photos: string[]; category: string; year: string }) {
  const { columns, rows } = collageGrid(photos.length);
  const kolaYear = category === "Kolaahal" && (year === "2025" || year === "2026") ? `kola-${year}` : "";

  return (
    <div className={`showcase-collage${kolaYear ? ` ${kolaYear}` : ""}`} style={kolaYear ? undefined : {
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      aspectRatio: `${columns} / ${rows}`,
    }}>
      {photos.map((photo, index) => (
        <img src={photo} alt={`${category} ${year} event moment ${index + 1}`} loading="lazy" decoding="async" key={photo} />
      ))}
    </div>
  );
}
