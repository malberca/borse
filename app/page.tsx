 "use client";

import { FormEvent, useEffect, useState } from "react";

const pieces = [
  { title: "Miedo", display: "MIEDO", image: "/img/miedo.webp" },
  { title: "Claridad", display: "CLARIDAD", image: "/img/claridad.webp" },
  { title: "Poder", display: "PODER", image: "/img/poder.webp" },
  { title: "Vejez", display: "VEJEZ", image: "/img/vejez.webp" },
];

const timeline = [
  { step: "01", title: "Dirección visual", body: "Universo, tono y narrativa general ya definidos." },
  { step: "02", title: "Piezas principales", body: "Los cuatro enemigos ya están presentados en esta versión." },
  { step: "03", title: "Tapas y mockups", body: "Exploración abierta para comparar cierres posibles." },
  { step: "04", title: "Siguiente etapa", body: "Ajustes finos, feedback y definición de entregables finales." },
];

const projectTimeline = [
  {
    date: "02/02/2026",
    title: "Inicio del proyecto",
    body: "Recepción de la seña.",
    status: "done",
  },
  {
    date: "12/02/2026",
    title: "Primera entrega",
    body: "Cuatro Enemigos.",
    status: "done",
  },
  {
    date: "13/02/2026",
    title: "Definición de tapa",
    body: "Se define posible tapa de Vestigios y una idea de tapa general. Se evaluará sistema.",
    status: "done",
  },
  {
    date: "13/02/2026",
    title: "Parte intermedia",
    body: "Recepción de 125.000. Preparar repositorio de archivos en alta.",
    status: "done",
  },
  {
    date: "09/03/2026",
    title: "Pre-entrega acordada",
    body: "Unir todo el sistema. Generar archivos. Estructurar historia.",
    status: "current",
  },
];

const materials = [
  {
    label: "Materialidad — Miedo",
    title: "Piel del miedo",
    image: "/img/mood_animales.webp",
    body: "Textura / tensión. Grano áspero, marcas y sombras. La materia se siente como presencia: algo te mira antes de que vos decidas mirar.",
  },
  {
    label: "Materialidad — Claridad",
    title: "Blanco que ciega",
    image: "/img/mood_montana.webp",
    body: "Luz / vacío. Superficie limpia, casi quirúrgica. La claridad no te salva: te prueba. Entender no alcanza si todavía no ves.",
  },
  {
    label: "Materialidad — Poder",
    title: "Decisión en silencio",
    image: "/img/mood_bosque.webp",
    body: "Peso / control. Material denso, contraste y corte preciso. El poder no se anuncia: ya está. No empuja… sostiene.",
  },
  {
    label: "Materialidad — Vejez",
    title: "Integración",
    image: "/img/mood_chaman.webp",
    body: "Tiempo / tejido. Capas, desgaste noble, unión de partes. No es decadencia: es mapa completo. El chamán ve el sistema entero.",
  },
];

const covers = [
  { label: "Opción I", title: "OPCION PORTADA A", image: "/img/tapa_a.webp" },
  { label: "Opción II", title: "OPCION PORTADA B", image: "/img/tapa_b.webp" },
];

const downloads = ["PDF de concepto", "Tapas finales", "Pack de mockups"];
const tracks = [
  { title: "Cuatro Enemigos", status: "Final", image: true },
  { title: "Los Giles", status: "En proceso", image: false },
  { title: "Nunca Más", status: "En proceso", image: false },
  { title: "Vestigios", status: "En proceso", image: false },
];

const ACCESS_PASSWORD = "BORSE2026";
const ACCESS_STORAGE_KEY = "mano-client-access";

function TrackCard({
  title,
  status,
  image,
}: {
  title: string;
  status: string;
  image: boolean;
}) {
  return (
    <article className="trackCard">
      <div className="trackCardHead">
        <div>
          <h3>{title}</h3>
          <p className="trackMeta">BORSE · EP track</p>
        </div>
        <span className={`trackStatus ${status === "Final" ? "trackStatusFinal" : "trackStatusPending"}`}>
          {status}
        </span>
      </div>
      <div className="trackArtwork">
        {image ? (
          <img src="/img/cuatro_enemigos.png" alt={`${title} artwork`} />
        ) : (
          <div className="trackPlaceholder">En proceso</div>
        )}
      </div>
    </article>
  );
}

export default function Page() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(ACCESS_STORAGE_KEY);
    if (saved === "granted") {
      setIsUnlocked(true);
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.trim() === ACCESS_PASSWORD) {
      window.localStorage.setItem(ACCESS_STORAGE_KEY, "granted");
      setIsUnlocked(true);
      setError("");
      return;
    }

    setError("Password incorrecta.");
  }

  if (!isUnlocked) {
    return (
      <main className="loginScreen">
        <section className="loginCard">
          <div className="loginBrand">
            <img src="/img/mano-logo26-w.svg" alt="MA-NO Consultora" />
          </div>
          <span className="loginEyebrow">Acceso de clientes · MA-NO Consultora</span>
          <span className="loginVersion">version 2.0</span>
          <h1>Ingreso privado</h1>
          <p>Ingresá la password para ver la presentación de Borse.</p>
          <form className="loginForm" onSubmit={handleSubmit}>
            <input
              className="loginInput"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="loginButton" type="submit">Entrar</button>
          </form>
          {error ? <p className="loginError">{error}</p> : null}
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="marquee" aria-label="Estado de actualización">
        <div className="marqueeTrack">
          <span>Proyecto en desarrollo. Próxima actualización estimada 09/03/2026 10pm aprox.</span>
          <span>Proyecto en desarrollo. Próxima actualización estimada 09/03/2026 10pm aprox.</span>
        </div>
      </div>

      <header className="masthead reveal reveal-1">
        <div className="heroScene" aria-hidden="true">
          <img className="heroSceneSpotify" src="/img/spotify.png" alt="" />
          <img className="heroSceneApple" src="/img/applemusic.png" alt="" />
        </div>

        <div className="brandRow">
          <div className="brandMark">
            <img src="/img/logo_hands.webp" alt="MA-NO" />
          </div>
          <div>
            <span className="eyebrow">CUATRO ENEMIGOS · BORSE · EP · Concepto Visual</span>
            <h1>Cuatro Enemigos</h1>
            <p>No es una historia lineal. Es una transformación.</p>
          </div>
        </div>

        <div className="headerMeta">
          <span className="metaChip">borrador</span>
          <span className="metaChip">presentación</span>
          <span className="metaChip">wip</span>
        </div>
      </header>

      <nav className="controlBar reveal reveal-2" aria-label="Secciones">
        <a className="controlButton controlButtonActive" href="#overview">Overview</a>
        <a className="controlButton" href="#timeline">Timeline</a>
        <a className="controlButton" href="#piezas">Piezas</a>
        <a className="controlButton" href="#materialidad">Materialidad</a>
        <a className="controlButton" href="#tapas">Tapas</a>
        <a className="controlButton" href="#descargas">Descargas</a>
      </nav>

      <section className="projectTimelinePanel reveal reveal-3" id="estado-proyecto">
        <div className="projectTimelineHead">
          <div>
            <span className="eyebrow">Seguimiento</span>
            <h2>Estado del proyecto</h2>
          </div>
          <span className="timelineBadge">Pre-entrega · 09/03/2026</span>
        </div>

        <div className="projectTimelineRail" aria-hidden="true">
          <span className="projectTimelineProgress" />
        </div>

        <div className="projectTimelineGrid">
          {projectTimeline.map((item, index) => (
            <article
              className={`projectMilestone ${
                item.status === "current" ? "projectMilestoneCurrent" : "projectMilestoneDone"
              } projectMilestoneReveal projectMilestoneDelay-${index + 1}`}
              key={`${item.date}-${item.title}`}
            >
              <span className="projectMilestoneDot" />
              <span className="projectMilestoneDate">{item.date}</span>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel reveal reveal-4 tracksSection">
        <div className="sectionIntro">
          <span className="eyebrow">Tracks del EP</span>
          <h2>Revisados</h2>
        </div>
        <div className="tracksGrid">
          {tracks.map((track) => (
            <TrackCard key={track.title} {...track} />
          ))}
        </div>
      </section>

      <section className="heroLayout">
        <article className="heroCard reveal reveal-4">
          <div className="sectionIntro">
            <span className="eyebrow">El viaje</span>
            <h2>Lectura general</h2>
          </div>
          <div className="narrativeText">
            <p>Aprendemos a ver por supervivencia. El hombre no nace viendo...</p>
            <p>Primero aparece el miedo. Presencia. Silueta. Ojos que arden en la montaña. No ataca. Observa. Muchos quedan ahí.</p>
            <p>Si atraviesa ese umbral, llega la claridad. Blanco total. Calma. La claridad que puede cegar al torpe. Entender no es lo mismo que ver.</p>
            <p>Luego el poder. No grita. No corre. Mira. El poder no se anuncia: ya decidió.</p>
            <p>Y finalmente, la vejez. No como desgaste, sino como integración. El chamán no compite. No huye. No impone. Observa el tejido completo.</p>
            <blockquote>“Así verás.”</blockquote>
          </div>
        </article>

        <article className="visualCard reveal reveal-5">
          <img src="/img/mockup1.webp" alt="BORSE EP concepto visual" />
          <div className="visualOverlay">
            <span className="eyebrow">Proyecto activo</span>
            <strong>Borse visual concept</strong>
          </div>
        </article>
      </section>

      <section className="contentGrid">
        <div className="contentMain">
          <article className="panel reveal reveal-4" id="piezas">
            <div className="sectionIntro">
              <span className="eyebrow">Piezas</span>
              <h2>Cuatro Enemigos</h2>
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

          <article className="panel reveal reveal-5" id="materialidad">
            <div className="sectionIntro">
              <span className="eyebrow">Materialidad</span>
              <h2>Huellas físicas del viaje</h2>
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

          <article className="panel reveal reveal-6" id="tapas">
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

        </div>

        <aside className="contentSide">
          <article className="sidePanel reveal reveal-5" id="timeline">
            <div className="sectionIntro">
              <span className="eyebrow">Timeline de desarrollo</span>
              <h2>Estado</h2>
            </div>
            <div className="timelineList">
              {timeline.map((item) => (
                <div className="timelineItem" key={item.step}>
                  <span className="timelineStep">{item.step}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="sidePanel reveal reveal-6" id="descargas">
            <div className="sectionIntro">
              <span className="eyebrow">Descargas</span>
              <h2>soon</h2>
            </div>
            <div className="downloadList">
              {downloads.map((item) => (
                <div className="downloadItem" key={item}>
                  <span className="downloadDot" />
                  <span>{item}</span>
                </div>
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
  );
}
