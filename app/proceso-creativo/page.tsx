import { AccessGate } from "../access-gate";
import { covers, finalFiles, materials, pieces, processModules, processTrackNav } from "../borse-data";

export default function ProcesoCreativoPage() {
  return (
    <AccessGate>
      <main className="page processPage">
        <div className="marquee" aria-label="Estado de actualización">
          <div className="marqueeTrack">
            <span>Proceso creativo de BORSE · sistema visual en desarrollo · acceso privado para revisión</span>
            <span>Proceso creativo de BORSE · sistema visual en desarrollo · acceso privado para revisión</span>
          </div>
        </div>

        <header className="panel processHeader">
          <div className="sectionIntro">
            <span className="eyebrow">Segunda página</span>
            <h1 className="processTitle">Proceso creativo</h1>
            <p className="processLead">
              Desarrollo visual y conceptual del universo de BORSE. Cada módulo expande una capa del mismo viaje.
            </p>
          </div>
        </header>

        <aside className="processStickyDock" aria-label="Tracks del EP">
          <div className="processStickyRail">
            {processTrackNav.map((item) => (
              <a
                key={item.slug}
                className={`processStickyButton processStickyButton${item.tone[0].toUpperCase()}${item.tone.slice(1)}`}
                href={item.href}
                aria-label={item.label}
                title={item.label}
              >
                {item.image ? <img src={item.image} alt="" /> : <span>{item.short}</span>}
              </a>
            ))}
          </div>
        </aside>

        <nav className="controlBar" aria-label="Módulos de proceso">
          <a className="controlButton" href="/">Volver al home</a>
          <a className="controlButton controlButtonActive" href="/proceso-creativo">Overview</a>
          <a className="controlButton" href="/proceso-creativo/cuatro-enemigos">Cuatro Enemigos</a>
          <a className="controlButton" href="/proceso-creativo/los-giles">Los Giles</a>
          <a className="controlButton" href="/proceso-creativo/nunca-mas">Nunca Más</a>
          <a className="controlButton" href="/proceso-creativo/vestigios">Vestigios</a>
          <a className="controlButton" href="#archivos-finales">Descargas</a>
        </nav>

        <section className="panel downloadsPanel downloadsStrip reveal reveal-3" id="archivos-finales">
          <div className="sectionIntro downloadsStripIntro">
            <div>
              <span className="eyebrow">Archivos finales</span>
              <h2>Drive</h2>
            </div>
            <p>Entregables organizados por destino y plataforma.</p>
          </div>
          <div className="fileLinkList downloadsStripList">
            {finalFiles.map((item) => (
              <a
                className="fileLinkItem"
                href={item.href}
                key={item.label}
                target="_blank"
                rel="noreferrer"
              >
                <span className="fileLinkArrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" role="presentation">
                    <path
                      d="M3.75 8.25A2.25 2.25 0 0 1 6 6h3.18c.6 0 1.17.24 1.59.66l1.07 1.09c.42.42.99.65 1.58.65H18A2.25 2.25 0 0 1 20.25 10.5v5.25A2.25 2.25 0 0 1 18 18H6a2.25 2.25 0 0 1-2.25-2.25V8.25Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.25 12h7.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <div>
                  <strong>{item.label}</strong>
                  <span>Disponible en Drive</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="processModuleGrid">
          {processModules.map((item, index) => (
            <a
              className={`panel processModuleCard reveal reveal-${Math.min(index + 3, 6)}`}
              href={
                item.id === "viaje-creativo"
                  ? "#viaje-creativo"
                  : `/proceso-creativo/${item.id}`
              }
              key={item.id}
            >
              <span className="eyebrow">{item.eyebrow}</span>
              <strong>{item.title}</strong>
              <p>{item.descriptor}</p>
            </a>
          ))}
        </section>

        <section className="contentGrid processContentGrid">
          <div className="contentMain">
            <article className="panel reveal reveal-4" id="cuatro-enemigos">
              <div className="sectionIntro">
                <span className="eyebrow">Módulo 01</span>
                <h2>Cuatro Enemigos</h2>
              </div>
              <div className="narrativeText">
                <p>Aprendemos a ver por supervivencia. El hombre no nace viendo...</p>
                <p>Primero aparece el miedo. Presencia. Silueta. Ojos que arden en la montaña. No ataca. Observa. Muchos quedan ahí.</p>
                <p>Si atraviesa ese umbral, llega la claridad. Blanco total. Calma. La claridad que puede cegar al torpe. Entender no es lo mismo que ver.</p>
                <p>Luego el poder. No grita. No corre. Mira. El poder no se anuncia: ya decidió.</p>
                <p>Y finalmente, la vejez. No como desgaste, sino como integración. El chamán no compite. No huye. No impone. Observa el tejido completo.</p>
                <blockquote>“Así verás.”</blockquote>
              </div>
              <div className="pieceGrid">
                {pieces.map((piece) => (
                  <article className="pieceCard" key={piece.title}>
                    <img src={piece.image} alt={piece.title} />
                    <div className="pieceMeta">
                      <span>{piece.title}</span>
                      <strong>{piece.display}</strong>
                    </div>
                  </article>
                ))}
              </div>
            </article>

            <article className="panel reveal reveal-5" id="viaje-creativo">
              <div className="sectionIntro">
                <span className="eyebrow">Módulo 02</span>
                <h2>El Viaje Creativo</h2>
              </div>
              <div className="materialGrid">
                {materials.map((item) => (
                  <article className="materialCard" key={item.title}>
                    <img src={item.image} alt={item.label} />
                    <div className="materialMeta">
                      <span>{item.label}</span>
                      <strong>{item.title}</strong>
                      <p>{item.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </article>

            <article className="panel reveal reveal-5" id="vestigios">
              <div className="sectionIntro">
                <span className="eyebrow">Módulo 03</span>
                <h2>Vestigios</h2>
              </div>
              <div className="processPlaceholderPanel">
                <p>
                  Guerra sagrada, no bélica: altar roto, símbolos tallados, plumas, rastros y un cielo alterado por fuerzas primitivas.
                </p>
                <span>En proceso</span>
              </div>
            </article>

            <article className="panel reveal reveal-6" id="los-giles">
              <div className="sectionIntro">
                <span className="eyebrow">Módulo 04</span>
                <h2>Los Giles</h2>
              </div>
              <div className="processPlaceholderPanel">
                <p>
                  Capa humana y tribal del sistema. Soñadores, luchadores y cuerpos que siguen avanzando sin abandonar el honor.
                </p>
                <span>En proceso</span>
              </div>
            </article>

            <article className="panel reveal reveal-6" id="nunca-mas">
              <div className="sectionIntro">
                <span className="eyebrow">Módulo 05</span>
                <h2>Nunca Más</h2>
              </div>
              <div className="processPlaceholderPanel">
                <p>
                  Ruptura, memoria y espíritu animal. El momento donde una parte del ser queda atrás y solo sobrevive el rastro.
                </p>
                <span>En proceso</span>
              </div>
            </article>
          </div>

          <aside className="contentSide">
            <article className="sidePanel reveal reveal-5">
              <div className="sectionIntro">
                <span className="eyebrow">Opciones de tapa</span>
                <h2>Comparativa</h2>
              </div>
              <div className="coverGrid">
                {covers.map((cover) => (
                  <article className="coverCard" key={cover.title}>
                    <img src={cover.image} alt={cover.title} />
                    <div className="coverMeta">
                      <span>{cover.label}</span>
                      <strong>{cover.title}</strong>
                    </div>
                  </article>
                ))}
              </div>
            </article>

            <article className="sidePanel closingPanel reveal reveal-6">
              <div className="sectionIntro">
                <span className="eyebrow">Cierre</span>
                <h2>Último golpe visual</h2>
              </div>
              <p>El ojo siempre estuvo ahí.</p>
              <p>Un último golpe visual: material + atmósfera. No es un final… es la prueba de que la transformación ocurrió.</p>
              <details className="explanationBlock" open>
                <summary>Mostrar explicación (concepto + tapa)</summary>
                <div className="explanationContent">
                  <p>
                    <strong>Concepto:</strong> la tapa fue pensada como una <em>composición por capas</em>
                    {" "}(superposición / collage digital) y una especie de <em>anamorfosis visual</em>:
                    de lejos es legible; de cerca se vuelve textura/materialidad. La imagen no “ilustra”,
                    {" "}<strong>revela</strong>.
                  </p>
                  <p>
                    La serie propone un recorrido: <strong>miedo</strong> → <strong>claridad</strong> →
                    {" "}<strong>poder</strong> → <strong>vejez</strong>. El ojo se abre al final.
                  </p>
                  <p>
                    <strong>Decisión estética:</strong> <em>materia + atmósfera</em>. Montaña como altar.
                    Niebla/humo como transición. Animales como vigías.
                  </p>
                  <p>
                    La tapa sostiene dos lecturas simultáneas: “símbolo” (el ojo) y “territorio”
                    {" "}(la montaña). La tensión entre ambas es el viaje.
                  </p>
                  <div className="enemyList">
                    <strong>Los cuatro enemigos:</strong>
                    <p><strong>MIEDO</strong> — presencia. silueta. “te mira antes de que mires”.</p>
                    <p><strong>CLARIDAD</strong> — blanco total. calma peligrosa. “la claridad que ciega al torpe”.</p>
                    <p><strong>PODER</strong> — mirada fija. decisión silenciosa. “no se anuncia: ya decidió”.</p>
                    <p><strong>VEJEZ</strong> — integración. el chamán no compite: observa el tejido completo. “así verás”.</p>
                  </div>
                  <div className="tagRow">
                    <span>HUMO</span>
                    <span>FUEGO</span>
                    <span>RITUAL</span>
                    <span>MONTAÑA</span>
                    <span>BOSQUE</span>
                    <span>LOBO</span>
                    <span>ÁGUILA</span>
                    <span>PLUMAS</span>
                    <span>PELAJE</span>
                    <span>OJO</span>
                    <span>CAPAS</span>
                  </div>
                </div>
              </details>
            </article>

          </aside>
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
