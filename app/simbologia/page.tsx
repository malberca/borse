import { AccessGate } from "../access-gate";
import { processTrackNav, symbologySystem } from "../borse-data";

const symbologyNav = [
  { href: "/", label: "Home" },
  { href: "/proceso-creativo", label: "Proceso creativo" },
  { href: "/manuscrito", label: "Manuscrito" },
  { href: "/simbologia", label: "Simbología" },
];

export default function SimbologiaPage() {
  return (
    <AccessGate>
      <main className="page processPage">
        <div className="marquee" aria-label="Estado de actualización">
          <div className="marqueeTrack">
            <span>Simbología del disco · sistema de iconos por track · BORSE · acceso privado para revisión</span>
            <span>Simbología del disco · sistema de iconos por track · BORSE · acceso privado para revisión</span>
          </div>
        </div>

        <header className="panel processHeader">
          <div className="processHeroGrid">
            <div className="sectionIntro">
              <span className="eyebrow">Nueva sección</span>
              <h1 className="processTitle">Simbología</h1>
              <p className="processLead">
                Desarrollo del sistema de iconos del disco. Cada track empieza a tener una marca propia dentro de un mismo lenguaje ritual.
              </p>
            </div>
            <div className="processStatusBlock">
              <span className="metaChip">Sistema en construcción</span>
            </div>
          </div>
        </header>

        <aside className="processStickyDock" aria-label="Navegación rápida">
          <div className="processStickyRail">
            {processTrackNav.map((item) => {
              const active = item.slug === "simbologia";
              return (
                <a
                  key={item.slug}
                  className={`processStickyButton processStickyButton${item.tone[0].toUpperCase()}${item.tone.slice(1)} ${active && item.slug === "simbologia" ? "processStickyButtonActive" : ""}`}
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
          {symbologyNav.map((item) => (
            <a className={`controlButton ${item.href === "/simbologia" ? "controlButtonActive" : ""}`} href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <section className="panel reveal reveal-3">
          <div className="sectionIntro">
            <span className="eyebrow">Sistema</span>
            <h2>Iconos por track</h2>
          </div>
          <div className="symbologyGrid">
            {symbologySystem.map((item) => (
              <article className="symbologyCard" key={item.track}>
                <div className="symbologyIconWrap">
                  <img className="symbologyIcon" src={item.icon} alt={item.title} />
                </div>
                <span>{item.track}</span>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="processSplitGrid">
          <article className="panel reveal reveal-4">
            <div className="sectionIntro">
              <span className="eyebrow">Criterio</span>
              <h2>Línea visual</h2>
            </div>
            <div className="processTextBlock">
              <p>El objetivo es que cada track tenga una marca propia sin perder unidad con el resto del EP.</p>
              <p>Los iconos trabajan como signos rituales: geometría simple, eje central y una lectura simbólica inmediata.</p>
              <p>La idea no es ilustrar literalmente cada canción, sino condensar su fuerza en un lenguaje reusable para portada, piezas y motion.</p>
            </div>
          </article>

          <article className="panel reveal reveal-5">
            <div className="sectionIntro">
              <span className="eyebrow">Siguiente etapa</span>
              <h2>Próximos pasos</h2>
            </div>
            <div className="processBulletGrid">
              <div className="processBulletCard">
                <span className="downloadDot" />
                <p>Definir una retícula común para todo el sistema simbólico.</p>
              </div>
              <div className="processBulletCard">
                <span className="downloadDot" />
                <p>Explorar versiones monocromas y aplicaciones sobre tapa, merch y piezas digitales.</p>
              </div>
              <div className="processBulletCard">
                <span className="downloadDot" />
                <p>Expandir el set con variaciones secundarias si cada track lo pide.</p>
              </div>
            </div>
          </article>
        </section>
      </main>
    </AccessGate>
  );
}
