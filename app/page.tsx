"use client";

import { FormEvent, useEffect, useState } from "react";

import { AccessGate } from "./access-gate";
import { processTrackNav, projectTimeline, tracks } from "./borse-data";
const stickyNavItems = [
  { id: "cuatro-enemigos", label: "Cuatro Enemigos", short: "CE", href: "/proceso-creativo/cuatro-enemigos" },
  { id: "los-giles", label: "Los Giles", short: "LG", href: "/proceso-creativo/los-giles" },
  { id: "nunca-mas", label: "Nunca Más", short: "NM", href: "/proceso-creativo/nunca-mas" },
  { id: "vestigios", label: "Vestigios", short: "V", href: "/proceso-creativo/vestigios" },
];

function TrackCard({
  slug,
  title,
  subtitle,
  descriptor,
  status,
  image,
  reviewer,
  lastUpdate,
}: {
  slug: string;
  title: string;
  subtitle: string;
  descriptor: string;
  status: string;
  image: string | null;
  reviewer: string;
  lastUpdate: string;
}) {
  const storageKey = `borse-review-${slug}`;
  const [isFlipped, setIsFlipped] = useState(false);
  const [approval, setApproval] = useState<"approved" | "rejected" | null>(null);
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState(false);
  const [rowId, setRowId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const isLocked = saved;

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;

    async function loadReview() {
      try {
        const response = await fetch(`/api/reviews?slug=${encodeURIComponent(slug)}`, {
          cache: "no-store",
        });
        const data = await response.json();

        if (!cancelled && response.ok && data.ok && data.record) {
          setApproval(data.record.approval ?? null);
          setComment(data.record.reviewer_comment ?? "");
          setRowId(data.record.id ?? null);
          setSaved(Boolean(data.record.approval || data.record.reviewer_comment));
          setSubmitMessage("Cargado desde Baserow.");
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
  }, [storageKey]);

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

  return (
    <article className={`trackCard ${isFlipped ? "trackCardFlipped" : ""}`}>
      <div className="trackCardInner">
        <div className="trackCardFace trackCardFaceFront">
          <button className="trackFlipHotspot" type="button" aria-label={`Revisar ${title}`} onClick={() => setIsFlipped(true)} />
          {saved && approval ? (
            <span
              className={`trackReviewRibbon ${
                approval === "approved" ? "trackReviewRibbonApproved" : "trackReviewRibbonRejected"
              }`}
            >
              {approval === "approved" ? "Aprobado" : "Rechazado"}
            </span>
          ) : null}
          <div className="trackCardHead">
            <div>
              <h3>{title}</h3>
              <p className="trackMeta">{subtitle}</p>
            </div>
            <span className={`trackStatus ${status === "Final" ? "trackStatusFinal" : "trackStatusPending"}`}>
              {status}
            </span>
          </div>
          <div className="trackArtwork">
            {image ? (
              <>
                <img src={image} alt={`${title} artwork`} />
                <div className="trackArtworkOverlay">
                  <p>{descriptor}</p>
                </div>
              </>
            ) : (
              <div className="trackPlaceholder">
                <span>En proceso</span>
                <div className="trackArtworkOverlay">
                  <p>{descriptor}</p>
                </div>
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
            />

            <div className="trackReviewMeta">
              <span>{lastUpdate}</span>
              {saved ? <span>{submitMessage ?? "Review enviada"}</span> : <span>Sin enviar</span>}
            </div>

            {isLocked ? (
              <div className="trackLockedNote">Revision cerrada. Esta card ya no admite nuevos cambios.</div>
            ) : (
              <button className="trackSubmitButton" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Submit"}
              </button>
            )}
          </form>
        </div>
      </div>
    </article>
  );
}

export default function Page() {
  return (
    <AccessGate>
      <main className="page">
      <div className="marquee" aria-label="Estado de actualización">
        <div className="marqueeTrack">
          <span>Proyecto en desarrollo. Próxima actualización estimada 09/03/2026 10pm aprox.</span>
          <span>Proyecto en desarrollo. Próxima actualización estimada 09/03/2026 10pm aprox.</span>
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
        <a className="controlButton" href="/proceso-creativo/cuatro-enemigos">Cuatro Enemigos</a>
        <a className="controlButton" href="/proceso-creativo/los-giles">Los Giles</a>
        <a className="controlButton" href="/proceso-creativo/nunca-mas">Nunca Más</a>
        <a className="controlButton" href="/proceso-creativo/vestigios">Vestigios</a>
        <a className="controlButton" href="/proceso-creativo#archivos-finales">Descargas</a>
      </nav>

      <aside className="stickyDock" aria-label="Navegación rápida">
        <div className="stickyDockRail">
          {processTrackNav.map((item) => (
            <a
              key={item.slug}
              className={`stickyDockButton stickyDockButton${item.tone[0].toUpperCase()}${item.tone.slice(1)}`}
              href={item.href}
              aria-label={item.label}
              title={item.label}
            >
              {item.image ? <img src={item.image} alt="" /> : <span>{item.short}</span>}
              <small>{item.label}</small>
            </a>
          ))}
        </div>
      </aside>

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
              <li>Presioná `Submit` para guardar la decisión. Una vez enviada, la review queda cerrada.</li>
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

      <section className="heroLayout merchLayout" id="merch">
        <article className="visualCard reveal reveal-5">
          <img src="/img/mockup1.webp" alt="BORSE EP concepto visual" />
          <div className="visualOverlay">
            <span className="eyebrow">Proyecto activo</span>
            <strong>Borse visual concept</strong>
          </div>
        </article>
        <article className="visualCard reveal reveal-5">
          <img src="/img/mockup2.webp" alt="BORSE merch visual 01" />
          <div className="visualOverlay">
            <span className="eyebrow">Merch</span>
            <strong>Merch 01</strong>
          </div>
        </article>
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
