import { AccessGate } from "../access-gate";
import { processTrackNav, type ProcessTrackPage } from "../borse-data";

const processNav = [
  { href: "/proceso-creativo", label: "Overview" },
  { href: "/proceso-creativo/cuatro-enemigos", label: "Cuatro Enemigos" },
  { href: "/proceso-creativo/los-giles", label: "Los Giles" },
  { href: "/proceso-creativo/nunca-mas", label: "Nunca Más" },
  { href: "/proceso-creativo/vestigios", label: "Vestigios" },
  { href: "/proceso-creativo#archivos-finales", label: "Descargas" },
];

export function ProcessTrackPageView({ page }: { page: ProcessTrackPage }) {
  return (
    <AccessGate>
      <main className="page processPage">
        <div className="marquee" aria-label="Estado de actualización">
          <div className="marqueeTrack">
            <span>{page.title} · proceso creativo · BORSE · acceso privado para revisión</span>
            <span>{page.title} · proceso creativo · BORSE · acceso privado para revisión</span>
          </div>
        </div>

        <header className="panel processHeader">
          <div className="processHeroGrid">
            <div className="sectionIntro">
              <span className="eyebrow">Proceso creativo</span>
              <h1 className="processTitle">{page.title}</h1>
              <p className="processLead">{page.subtitle}</p>
            </div>
            <div className="processStatusBlock">
              <span className={`trackStatus ${page.status === "FINAL" ? "trackStatusFinal" : "trackStatusPending"}`}>
                {page.status}
              </span>
            </div>
          </div>
        </header>

        <aside className="processStickyDock" aria-label="Tracks del EP">
          <div className="processStickyRail">
            {processTrackNav.map((item) => {
              const active = item.slug === page.slug;
              return (
                <a
                  key={item.slug}
                  className={`processStickyButton processStickyButton${item.tone[0].toUpperCase()}${item.tone.slice(1)} ${active ? "processStickyButtonActive" : ""}`}
                  href={item.href}
                  aria-label={item.label}
                  title={item.label}
                >
                  {item.image ? <img src={item.image} alt="" /> : <span>{item.short}</span>}
                </a>
              );
            })}
          </div>
        </aside>

        <nav className="controlBar" aria-label="Páginas internas">
          <a className="controlButton" href="/">Home</a>
          {processNav.map((item) => (
            <a className={`controlButton ${item.label === page.title ? "controlButtonActive" : ""}`} href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <section className="processTrackLayout">
          <article className="panel reveal reveal-3">
            <div className="sectionIntro">
              <span className="eyebrow">Concepto</span>
              <h2>{page.title}</h2>
            </div>
            <div className="processTextBlock">
              {page.concept.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </article>

          <article className="panel reveal reveal-4">
            <div className="sectionIntro">
              <span className="eyebrow">Frases / letra clave</span>
              <h2>Selección</h2>
            </div>
            <div className="phraseGrid">
              {page.keyLines.map((line) => (
                <span className="phraseChip" key={line}>{line}</span>
              ))}
            </div>
          </article>

          <article className="panel reveal reveal-5">
            <div className="sectionIntro">
              <span className="eyebrow">Exploraciones visuales</span>
              <h2>Dirección</h2>
            </div>
            <div className="processBulletGrid">
              {page.explorations.map((line) => (
                <div className="processBulletCard" key={line}>
                  <span className="downloadDot" />
                  <p>{line}</p>
                </div>
              ))}
            </div>
            {page.gallery?.length ? (
              <div className="processGallery">
                {page.gallery.map((image) => (
                  <article className="processGalleryCard" key={image.src}>
                    <img src={image.src} alt={image.alt} />
                  </article>
                ))}
              </div>
            ) : null}
          </article>

          <section className="processSplitGrid">
            <article className="panel reveal reveal-5">
              <div className="sectionIntro">
                <span className="eyebrow">Estado actual</span>
                <h2>Estado</h2>
              </div>
              <div className="processTextBlock">
                {page.currentState.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </article>

            <article className="panel reveal reveal-6">
              <div className="sectionIntro">
                <span className="eyebrow">Próximos pasos</span>
                <h2>Siguiente etapa</h2>
              </div>
              <div className="processBulletGrid">
                {page.nextSteps.map((line) => (
                  <div className="processBulletCard" key={line}>
                    <span className="downloadDot" />
                    <p>{line}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </section>

        <footer className="footerMarquee reveal reveal-6" aria-label="Footer marquee">
          <div className="footerMarqueeTrack">
            <span>Material exclusivo para Mariano Borserini (BORSE) • Todo el contenido está protegido por derechos de autor • Prohibida la reproducción o distribución total o parcial •</span>
            <span>Material exclusivo para Mariano Borserini (BORSE) • Todo el contenido está protegido por derechos de autor • Prohibida la reproducción o distribución total o parcial •</span>
          </div>
        </footer>
      </main>
    </AccessGate>
  );
}
