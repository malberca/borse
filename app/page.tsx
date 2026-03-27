"use client";

import { FormEvent, KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { AccessGate } from "./access-gate";
import { processTrackNav, projectTimeline, tracks } from "./borse-data";

const trackProgressSchedule: Record<string, { start: string; end: string }> = {
  "cuatro-enemigos": {
    start: "2026-03-18T10:00:00-03:00",
    end: "2026-03-27T23:00:00-03:00",
  },
  "los-giles": {
    start: "2026-03-18T10:00:00-03:00",
    end: "2026-03-27T23:00:00-03:00",
  },
  "nunca-mas": {
    start: "2026-03-18T10:00:00-03:00",
    end: "2026-03-27T23:00:00-03:00",
  },
  vestigios: {
    start: "2026-03-18T10:00:00-03:00",
    end: "2026-03-27T23:00:00-03:00",
  },
  "asi-veras": {
    start: "2026-03-18T10:00:00-03:00",
    end: "2026-03-27T23:00:00-03:00",
  },
};

const merchSlides: Array<{ src: string; alt: string; cardClassName?: string }> = [
  { src: "/img/remera1.webp", alt: "BORSE remera visual 01" },
  { src: "/img/remera2.webp", alt: "BORSE remera visual 02" },
  { src: "/img/remera3.webp", alt: "BORSE remera visual 03" },
  { src: "/img/lp-nobg.webp", alt: "BORSE LP visual", cardClassName: "lpMiniCard" },
];

function getTrackProgress(slug: string) {
  const schedule = trackProgressSchedule[slug];
  if (!schedule) return 0;

  const start = new Date(schedule.start).getTime();
  const end = new Date(schedule.end).getTime();
  const now = Date.now();

  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return 0;
  if (now <= start) return 0;
  if (now >= end) return 100;

  return ((now - start) / (end - start)) * 100;
}

function TrackCard({
  slug,
  title,
  subtitle,
  status,
  image,
  reviewer,
  lastUpdate,
  featured = false,
}: {
  slug: string;
  title: string;
  subtitle: string;
  status: string;
  image: string | null;
  reviewer: string;
  lastUpdate: string;
  featured?: boolean;
}) {
  const storageKey = `borse-review-${slug}`;
  const [isFlipped, setIsFlipped] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [approval, setApproval] = useState<"approved" | "rejected" | null>(null);
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState(false);
  const [rowId, setRowId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [progress, setProgress] = useState(() => getTrackProgress(slug));
  const isLocked = saved;
  const progressValue = Math.round(progress);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;

    async function loadReview() {
      try {
        const response = await fetch(`/api/reviews?slug=${encodeURIComponent(slug)}`, {
          cache: "no-store",
        });
        const data = await response.json();

        if (!cancelled && response.ok && data.ok) {
          if (data.record) {
            setApproval(data.record.approval ?? null);
            setComment(data.record.reviewer_comment ?? "");
            setRowId(data.record.id ?? null);
            setSaved(Boolean(data.record.approval || data.record.reviewer_comment));
            window.localStorage.setItem(
              storageKey,
              JSON.stringify({
                approval: data.record.approval ?? null,
                comment: data.record.reviewer_comment ?? "",
                rowId: data.record.id ?? null,
              }),
            );
            setSubmitMessage("Cargado desde Baserow.");
          } else {
            setApproval(null);
            setComment("");
            setRowId(null);
            setSaved(false);
            window.localStorage.removeItem(storageKey);
            setSubmitMessage("Sin review en Baserow.");
          }
          return;
        }
      } catch {}

      const raw = window.localStorage.getItem(storageKey);
      if (!raw || cancelled) return;

      try {
        const parsed = JSON.parse(raw) as { approval?: "approved" | "rejected" | null; comment?: string; rowId?: number | null };
        setApproval(parsed.approval ?? null);
        setComment(parsed.comment ?? "");
        setRowId(parsed.rowId ?? null);
        setSaved(Boolean(parsed.approval || parsed.comment));
      } catch {}
    }

    void loadReview();

    return () => {
      cancelled = true;
    };
  }, [storageKey, slug]);

  useEffect(() => {
    setProgress(getTrackProgress(slug));

    const interval = window.setInterval(() => {
      setProgress(getTrackProgress(slug));
    }, 60000);

    return () => {
      window.clearInterval(interval);
    };
  }, [slug]);

  useEffect(() => {
    if (!isImageOpen || typeof window === "undefined") return;

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsImageOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isImageOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (typeof window === "undefined") return;
    if (isLocked) return;

    setIsSubmitting(true);
    setSubmitMessage(null);

    const reviewedAt = new Date().toISOString();
    const payload = {
      rowId,
      client: "BORSE",
      project: "EP Concept",
      slug,
      title,
      piece_type: "track-card",
      status: status.toLowerCase(),
      approval,
      reviewer_comment: comment,
      reviewer,
      reviewed_at: reviewedAt,
      updated_at: reviewedAt,
      version: lastUpdate,
    };

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        window.localStorage.setItem(
          storageKey,
          JSON.stringify({
            approval,
            comment,
            rowId,
          }),
        );
        setSaved(true);
        setSubmitMessage("Guardado local. Falta configurar Baserow.");
        return;
      }

      setRowId(data.rowId ?? null);
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({
          approval,
          comment,
          rowId: data.rowId ?? null,
        }),
      );
      setSaved(true);
      setSubmitMessage("Review guardada.");
    } catch {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({
          approval,
          comment,
          rowId,
        }),
      );
      setSaved(true);
      setSubmitMessage("Guardado local. Sin conexión con Baserow.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCommentKeyDown(event: ReactKeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Enter" || !event.shiftKey) return;
    event.preventDefault();
    if (isLocked || isSubmitting) return;
    event.currentTarget.form?.requestSubmit();
  }

  return (
    <article className={`trackCard ${featured ? "trackCardFeatured" : ""} ${isFlipped ? "trackCardFlipped" : ""}`}>
      <div className="trackCardInner">
        <div
          className="trackCardFace trackCardFaceFront"
          role="button"
          tabIndex={0}
          aria-label={`Revisar ${title}`}
          onClick={() => setIsFlipped(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setIsFlipped(true);
            }
          }}
        >
          {approval ? (
            <span className={`trackReviewRibbon ${approval === "approved" ? "trackReviewRibbonApproved" : "trackReviewRibbonRejected"}`}>
              {approval === "approved" ? "Aprobado" : "Rechazado"}
            </span>
          ) : null}
          <div className="trackCardHead">
            <div>
              <h3>{title}</h3>
              <p className="trackMeta">{subtitle}</p>
            </div>
          </div>
          <div className="trackArtwork">
            {image ? (
              <>
                <button
                  className="trackEnlargeButton"
                  type="button"
                  aria-label={`Ampliar ${title}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsImageOpen(true);
                  }}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
                  </svg>
                </button>
                <img src={image} alt={`${title} artwork`} />
                <div className="trackProgressPillCopy">
                  <span>COMPLETED</span>
                  <strong>{progressValue}%</strong>
                </div>
                <div className="trackProgressPill" aria-hidden="true">
                  <span className="trackProgressPillFill" style={{ width: `${progress}%` }} />
                </div>
              </>
            ) : (
              <div className="trackPlaceholder">
                <span>En proceso</span>
              </div>
            )}
          </div>
        </div>

        <div className="trackCardFace trackCardFaceBack">
          <div className="trackReviewHead">
            <div>
              <h3>{title}</h3>
              <p className="trackMeta">Panel de revisión · {reviewer}</p>
            </div>
            <button className="trackBackButton" type="button" onClick={() => setIsFlipped(false)}>
              Volver
            </button>
          </div>

          <form className="trackReviewForm" onSubmit={handleSubmit}>
            <div className="trackApprovalRow">
              <button
                className={`trackApprovalButton trackApprovalButtonApprove ${
                  approval === "approved" ? "trackApprovalButtonActive" : ""
                }`}
                type="button"
                disabled={isLocked}
                onClick={() => setApproval("approved")}
              >
                Approve
              </button>
              <button
                className={`trackApprovalButton trackApprovalButtonReject ${approval === "rejected" ? "trackApprovalButtonActive" : ""}`}
                type="button"
                disabled={isLocked}
                onClick={() => setApproval("rejected")}
              >
                Reject
              </button>
            </div>

            <textarea
              className="trackCommentBox"
              placeholder="Comentario de revisión"
              value={comment}
              readOnly={isLocked}
              onChange={(event) => setComment(event.target.value)}
              onKeyDown={handleCommentKeyDown}
            />
            <p className="trackShortcutHint">Guardar review: `Shift + Enter`</p>

            <div className="trackReviewMeta">
              <span>{lastUpdate}</span>
              {saved ? <span>{submitMessage ?? "Review enviada"}</span> : <span>Sin enviar</span>}
            </div>

            <div className="trackProgressCopy">
              <span>COMPLETED</span>
              <strong>{progressValue}%</strong>
            </div>
            <div className="trackProgressBar" aria-hidden="true">
              <span className="trackProgressBarFill" style={{ width: `${progress}%` }} />
            </div>

            {isLocked ? <div className="trackLockedNote">Revision cerrada. Esta card ya no admite nuevos cambios.</div> : null}
          </form>
        </div>
      </div>
      {image && isImageOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              className="trackLightbox"
              role="dialog"
              aria-modal="true"
              aria-label={`${title} ampliado`}
              onClick={() => setIsImageOpen(false)}
            >
              <div className="trackLightboxShell" onClick={(event) => event.stopPropagation()}>
                <div className="trackLightboxToolbar">
                  <div className="trackLightboxMeta">
                    <span>Gallery View</span>
                    <strong>{title}</strong>
                  </div>
                  <button
                    className="trackLightboxClose"
                    type="button"
                    aria-label={`Cerrar ampliacion de ${title}`}
                    onClick={() => setIsImageOpen(false)}
                  >
                    Cerrar
                  </button>
                </div>
                <figure className="trackLightboxFigure">
                  <div className="trackLightboxStage">
                    <img src={image} alt={`${title} ampliado`} />
                  </div>
                  <figcaption>{title}</figcaption>
                </figure>
              </div>
            </div>,
            document.body,
          )
        : null}
    </article>
  );
}

export default function Page() {
  const merchViewportRef = useRef<HTMLDivElement | null>(null);
  const [isMerchPaused, setIsMerchPaused] = useState(false);

  function moveMerch(direction: 1 | -1) {
    const viewport = merchViewportRef.current;
    if (!viewport) return;

    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    if (maxScroll <= 0) return;

    const step = Math.max(viewport.clientWidth * 0.78, 280);
    const nextLeft = viewport.scrollLeft + step * direction;

    if (direction > 0 && viewport.scrollLeft >= maxScroll - 8) {
      viewport.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    if (direction < 0 && viewport.scrollLeft <= 8) {
      viewport.scrollTo({ left: maxScroll, behavior: "smooth" });
      return;
    }

    viewport.scrollTo({
      left: Math.min(maxScroll, Math.max(0, nextLeft)),
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (isMerchPaused) return;
      moveMerch(1);
    }, 4200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isMerchPaused]);

  return (
    <AccessGate>
      <main className="page">
      <div className="marquee marqueeLime" aria-label="Estado de actualización">
        <div className="marqueeTrack">
          <span>Entrega del proyecto Pendiente de revision para generar archivos finales y exportar a Repositorio.</span>
          <span>Entrega del proyecto Pendiente de revision para generar archivos finales y exportar a Repositorio.</span>
        </div>
      </div>

      <header className="masthead reveal reveal-1" id="overview">
        <div className="heroScene" aria-hidden="true">
          <img className="heroSceneSpotify" src="/img/spotify.png" alt="" />
          <img className="heroSceneApple" src="/img/applemusic.png" alt="" />
        </div>

        <div className="brandRow">
          <div className="brandMark">
            <img src="/img/logo_hands.webp" alt="MA-NO" />
          </div>
          <div>
            <span className="workspaceLabel">PRIVATE WORKSPACE</span>
            <h1>Proceso Creativo</h1>
            <p>Dirección visual y narrativa del proyecto.</p>
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
        <a className="controlButton" href="#estado-proyecto">Timeline</a>
        <a className="controlButton" href="#revisados">Revisados</a>
        <a className="controlButton" href="#merch">Merch</a>
        <a className="controlButton" href="/manuscrito">Manuscrito</a>
        <a className="controlButton" href="/proceso-creativo/cuatro-enemigos">Cuatro Enemigos</a>
        <a className="controlButton" href="/proceso-creativo/los-giles">Los Giles</a>
        <a className="controlButton" href="/proceso-creativo/nunca-mas">Nunca más me iré</a>
        <a className="controlButton" href="/proceso-creativo/vestigios">Vestigios</a>
        <a className="controlButton" href="/proceso-creativo#archivos-finales">Descargas</a>
      </nav>

      <aside className="stickyDock" aria-label="Navegación rápida">
        <div className="stickyDockRail">
          {processTrackNav.map((item) => {
            const isAsiVerasButton = item.slug === "asi-veras";

            return item.disabled ? (
              <span
                key={item.slug}
                className={`stickyDockButton stickyDockButton${item.tone[0].toUpperCase()}${item.tone.slice(1)} stickyDockButtonDisabled`}
                aria-label={`${item.label} desactivado`}
                title={`${item.label} desactivado`}
              >
                {item.image ? <img src={item.image} alt="" /> : <span>{item.short}</span>}
                <small>{item.label}</small>
                {isAsiVerasButton ? <span className="dockNewTag">[New]</span> : null}
              </span>
            ) : (
              <a
                key={item.slug}
                className={`stickyDockButton stickyDockButton${item.tone[0].toUpperCase()}${item.tone.slice(1)}`}
                href={item.href}
                aria-label={item.label}
                title={item.label}
              >
                {item.image ? <img src={item.image} alt="" /> : <span>{item.short}</span>}
                <small>{item.label}</small>
                {isAsiVerasButton ? <span className="dockNewTag">[New]</span> : null}
              </a>
            );
          })}
        </div>
      </aside>

      <section className="projectTimelinePanel reveal reveal-3" id="estado-proyecto">
        <div className="projectTimelineHead">
          <div>
            <span className="eyebrow">Seguimiento</span>
            <h2>Estado del proyecto</h2>
          </div>
          <span className="timelineBadge">Pre-entrega de iconografía y tapa final · 27/03/2026 · 23:00</span>
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
              <span className="projectMilestoneIndex">{String.fromCharCode(65 + index)}</span>
              <span className="projectMilestoneDot" />
              <span className="projectMilestoneDate">{item.date}</span>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel reveal reveal-4 tracksSection" id="revisados">
        <div className="sectionIntro">
          <span className="eyebrow">Tracks del EP</span>
          <h2>Revisados</h2>
          <p className="tracksIntro">
            El EP avanza desde el conflicto interno hacia una forma de percepción más precisa:
            lucha, ruptura, rastro y revelación dentro de un mismo sistema.
          </p>
          <div className="tracksGuide">
            <strong>Cómo validar y guardar</strong>
            <ol>
              <li>Hacé click sobre una card para darla vuelta y abrir el panel de revisión.</li>
              <li>Elegí `Approve` o `Reject` y dejá tu comentario antes de enviar.</li>
                  <li>Para guardar la decisión usá `Shift + Enter`. Una vez enviada, la review queda cerrada.</li>
            </ol>
            <p>
              Para ver cada imagen en grande y leer el proceso completo, usá el menú flotante de la derecha:
              cada cuadrado corresponde a un track del EP. Cualquier duda: martin@ma-no.work
            </p>
          </div>
        </div>
        <div className="tracksGrid">
          {tracks.map((track) => (
            <TrackCard key={track.title} {...track} />
          ))}
        </div>
      </section>

      <section className="panel reveal reveal-5 asiVerasSection" id="asi-veras">
        <div className="sectionIntro symbolsIntro">
          <span className="eyebrow">Sistema visual</span>
          <h2>Simbología</h2>
        </div>
        <div className="symbolsGrid">
          <article className="symbolsCard">
            <img src="/img/4simbolos.webp" alt="Sistema de cuatro símbolos" />
          </article>
          <article className="symbolsCard symbolsCardFeatured">
            <img src="/img/symbol-asiveras.webp" alt="Símbolo ASÍ VERÁS" />
            <div className="symbolsOverlay">
              <h3>Símbolo central del EP.</h3>
              <p>
                Nacido de la fusión de los cuatro emblemas, este signo no representa: invoca.
                Es la síntesis del ritual, el punto donde las fuerzas se alinean y dejan de ser fragmentos para convertirse en visión.
              </p>
              <p>
                Cada trazo es una runa.
                <br />
                Cada runa, una etapa atravesada.
                <br />
                Cada etapa, una transformación.
              </p>
              <p>
                No es un símbolo decorativo.
                <br />
                Es un umbral.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="panel reveal reveal-5 asiVerasSection" id="asi-veras">
        <div className="sectionIntro">
          <span className="eyebrow">Sección central</span>
          <h2>ASÍ VERÁS</h2>
        </div>

        <article className="asiVerasManifesto">
          <p>No es un concepto.</p>
          <p>No es una estética.</p>
          <p>No es una historia.</p>
          <p>Es un proceso.</p>
          <p>Durante todo el recorrido, nada aparece por azar.</p>
          <p>Cada símbolo, cada escena, cada fragmento responde a una misma estructura invisible: un ritual.</p>
          <p>El umbral abre.</p>
          <p>La espiral prepara.</p>
          <p>La energía irrumpe.</p>
          <p>El círculo contiene.</p>
          <p>Y en el centro... alguien cambia.</p>
          <p>No se trata de entender lo que ves. Se trata de atravesarlo.</p>
          <p>Porque lo que parecía separado -las canciones, los símbolos, las imágenes- en realidad forma parte de un mismo acto.</p>
          <p>Una secuencia.</p>
          <p>Una activación.</p>
          <p>El cuerpo no representa.</p>
          <p>El cuerpo evidencia.</p>
          <p>Algo ocurrió.</p>
          <p>Algo se sostuvo.</p>
          <p>Algo emergió.</p>
          <p>Al final no hay explicación.</p>
          <p>Hay una certeza:</p>
          <p>Nunca fue una suma de partes.</p>
          <p>Siempre fue un ritual.</p>
          <p>Y una vez que lo ves... ya no podés volver atrás.</p>
        </article>
      </section>

      <section className="merchCarousel reveal reveal-6" id="merch" aria-label="Carrusel de merch">
        <div
          ref={merchViewportRef}
          className="merchSlider"
          onMouseEnter={() => setIsMerchPaused(true)}
          onMouseLeave={() => setIsMerchPaused(false)}
          onFocusCapture={() => setIsMerchPaused(true)}
          onBlurCapture={() => setIsMerchPaused(false)}
        >
          {merchSlides.map((slide, index) => (
            <article
              key={slide.src}
              className={`visualCard ${slide.cardClassName ?? ""} reveal ${index < 2 ? "reveal-5" : "reveal-6"}`.trim()}
            >
              <img src={slide.src} alt={slide.alt} />
            </article>
          ))}
        </div>
        <div className="merchCarouselControls" aria-label="Controles del carrusel">
          <button
            className="merchCarouselButton"
            type="button"
            aria-label="Ver imagen anterior"
            onClick={() => moveMerch(-1)}
          >
            ‹
          </button>
          <button
            className="merchCarouselButton"
            type="button"
            aria-label="Ver imagen siguiente"
            onClick={() => moveMerch(1)}
          >
            ›
          </button>
        </div>
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
