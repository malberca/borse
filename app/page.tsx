"use client";

import { FormEvent, KeyboardEvent as ReactKeyboardEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { AccessGate } from "./access-gate";
import { finalFiles, processTrackNav, projectTimeline, tracks } from "./borse-data";

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

const merchTickerSlides = [...merchSlides, ...merchSlides, ...merchSlides];

const lockedTrackReviews: Record<
  string,
  { approval: "approved" | "rejected"; comment: string; submitMessage: string }
> = {
  "cuatro-enemigos": {
    approval: "approved",
    comment: "Aprobada. Logo BORSE validado para esta portada. Pieza cerrada sin más correcciones.",
    submitMessage: "Aprobada por BORSE. Card cerrada.",
  },
  "los-giles": {
    approval: "approved",
    comment: "Aprobada. Logo BORSE validado para esta portada. Pieza cerrada sin más correcciones.",
    submitMessage: "Aprobada por BORSE. Card cerrada.",
  },
  "nunca-mas": {
    approval: "approved",
    comment: "Aprobada. Logo BORSE validado para esta portada. Pieza cerrada sin más correcciones.",
    submitMessage: "Aprobada por BORSE. Card cerrada.",
  },
  vestigios: {
    approval: "approved",
    comment: "Aprobada. Logo BORSE validado para esta portada. Pieza cerrada sin más correcciones.",
    submitMessage: "Aprobada por BORSE. Card cerrada.",
  },
  "asi-veras": {
    approval: "rejected",
    comment:
      "En este caso prefiero que revisemos. Fue una buena propuesta, pero no estoy convencido. Siento que la imagen tiene mucha información, por otro lado tampoco quiero que el yo persona sea el centro de atención. Prefiero enfocar en el proyecto, en darle vida a Borse en todo caso.\n\nSi pensamos en algo más minimalista para la tapa general del EP, veo dos caminos:\n1. Logo Borse + iconografía (individual + fusión de los 4 emblemas), sobre fondo negro o paisaje con menor protagonismo.\n2. Segunda propuesta abierta si aparece una idea superadora.",
    submitMessage: "Rechazada por BORSE. Preparar nueva propuesta.",
  },
};

const DOWNLOAD_PROGRESS_ANIMATION_MS = 60000;
const DOWNLOAD_PROGRESS_POLL_MS = 30000;
const TIMELINE_PROGRESS_PERCENT = 90;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_PROGRESS_TABLE = process.env.NEXT_PUBLIC_DOWNLOAD_PROGRESS_TABLE ?? "download_progress";

function clampProgressValue(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)));
}

function readSupabaseProgress(row: Record<string, unknown>) {
  const raw = row.progress ?? row.percentage ?? row.percent;
  const parsed = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(parsed)) return null;
  return clampProgressValue(parsed);
}

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
  externalProgress,
  featured = false,
}: {
  slug: string;
  title: string;
  subtitle: string;
  status: string;
  image: string | null;
  reviewer: string;
  lastUpdate: string;
  externalProgress?: number;
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
  const lockedReview = lockedTrackReviews[slug];
  const effectiveApproval = approval ?? lockedReview?.approval ?? null;
  const isApprovedCard = effectiveApproval === "approved";
  const isRejectedCard = effectiveApproval === "rejected";
  const isLocked = saved;
  const progressValue = isApprovedCard ? 100 : clampProgressValue(externalProgress ?? progress);
  const activeReviewProgress = 5;

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;

    function applyLockedReviewIfNeeded() {
      const lockedReview = lockedTrackReviews[slug];
      if (!lockedReview || cancelled) return false;
      setApproval(lockedReview.approval);
      setComment(lockedReview.comment);
      setRowId(null);
      setSaved(true);
      setSubmitMessage(lockedReview.submitMessage);
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({
          approval: lockedReview.approval,
          comment: lockedReview.comment,
          rowId: null,
        }),
      );
      return true;
    }

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
            if (!applyLockedReviewIfNeeded()) {
              setApproval(null);
              setComment("");
              setRowId(null);
              setSaved(false);
              window.localStorage.removeItem(storageKey);
              setSubmitMessage("Sin review en Baserow.");
            }
          }
          return;
        }
      } catch {}

      const raw = window.localStorage.getItem(storageKey);
      if (!raw || cancelled) {
        applyLockedReviewIfNeeded();
        return;
      }

      try {
        const parsed = JSON.parse(raw) as { approval?: "approved" | "rejected" | null; comment?: string; rowId?: number | null };
        setApproval(parsed.approval ?? null);
        setComment(parsed.comment ?? "");
        setRowId(parsed.rowId ?? null);
        setSaved(Boolean(parsed.approval || parsed.comment));
      } catch {
        applyLockedReviewIfNeeded();
      }
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

  if (isApprovedCard) {
    return (
      <article className="trackCard trackCardApproved trackCardApprovedStatic">
        <div className="trackClosedArtwork">
          {image ? <img src={image} alt={`${title} artwork`} /> : null}
          <span className="trackReviewRibbon trackReviewRibbonClosed">Cerrado</span>
          <div className="trackClosedProgress" aria-label={`Avance ${title}: ${progressValue}%`}>
            <div className="trackClosedProgressTrack" aria-hidden="true">
              <span className="trackClosedProgressFill" style={{ width: `${progressValue}%` }} />
              <span className="trackClosedProgressLabel">COMPLETED 100%</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`trackCard ${featured ? "trackCardFeatured" : ""} ${isFlipped ? "trackCardFlipped" : ""} ${isApprovedCard ? "trackCardApproved" : ""} ${isRejectedCard ? "trackCardRejected" : ""}`.trim()}
    >
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
          {effectiveApproval ? (
            <span className="trackReviewRibbon trackReviewRibbonRejected">Revision</span>
          ) : null}
          <div className="trackCardHead">
            <div>
              <h3>{title}</h3>
              <p className="trackMeta">{subtitle}</p>
            </div>
          </div>
          <div className={`trackArtwork ${isRejectedCard ? "trackArtworkMuted" : ""}`}>
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
                {isRejectedCard ? (
                  <div className="trackActiveProgress" aria-label={`Avance ${title}: ${activeReviewProgress}%`}>
                    <span className="trackActiveProgressFill" style={{ width: `${activeReviewProgress}%` }} />
                    <span className="trackActiveProgressLabel">{activeReviewProgress}%</span>
                  </div>
                ) : null}
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

            {isRejectedCard ? (
              <div className="trackCommentRead" role="note" aria-label="Comentario de revisión">
                {(comment.trim() ? comment : "Sin comentario")
                  .split("\n")
                  .map((line, index) => (
                    <p key={`${slug}-comment-${index}`}>{line || "\u00A0"}</p>
                  ))}
              </div>
            ) : (
              <>
                <textarea
                  className="trackCommentBox"
                  placeholder="Comentario de revisión"
                  value={comment}
                  readOnly={isLocked}
                  onChange={(event) => setComment(event.target.value)}
                  onKeyDown={handleCommentKeyDown}
                />
                <p className="trackShortcutHint">Guardar review: `Shift + Enter`</p>
              </>
            )}

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
            {isLocked && effectiveApproval === "rejected" ? (
              <div className="trackCorrectionBadge">Change requests</div>
            ) : null}
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
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>(() =>
    finalFiles.reduce<Record<string, number>>((acc, item) => {
      acc[item.slug] = clampProgressValue(item.progress);
      return acc;
    }, {}),
  );

  useEffect(() => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;

    let cancelled = false;
    const supabaseUrl = SUPABASE_URL;
    const supabaseAnonKey = SUPABASE_ANON_KEY;
    const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/${SUPABASE_PROGRESS_TABLE}?select=slug,progress,percentage,percent`;

    async function loadProgressFromSupabase() {
      try {
        const response = await fetch(endpoint, {
          headers: {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
          cache: "no-store",
        });
        if (!response.ok) return;
        const rows = (await response.json()) as Array<Record<string, unknown>>;
        if (cancelled) return;
        setDownloadProgress((previous) => {
          const next = { ...previous };
          let changed = false;
          for (const row of rows) {
            const slug = typeof row.slug === "string" ? row.slug : null;
            if (!slug || !(slug in next)) continue;
            const progressValue = readSupabaseProgress(row);
            if (progressValue === null) continue;
            if (next[slug] !== progressValue) {
              next[slug] = progressValue;
              changed = true;
            }
          }
          return changed ? next : previous;
        });
      } catch {}
    }

    void loadProgressFromSupabase();
    const intervalId = window.setInterval(loadProgressFromSupabase, DOWNLOAD_PROGRESS_POLL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  const activeTrack = tracks.find((track) => track.slug === "asi-veras") ?? tracks[tracks.length - 1];
  const approvedTracks = tracks.filter((track) => track.slug !== activeTrack.slug);

  return (
    <AccessGate>
      <main className="page">
      <div className="marquee marqueeLime" aria-label="Estado de actualización">
        <div className="marqueeTrack">
          <span>Portal activo en modo pre-cierre · entrega final prevista para el lunes 30/03/2026 al final del día.</span>
          <span>Portal activo en modo pre-cierre · entrega final prevista para el lunes 30/03/2026 al final del día.</span>
        </div>
      </div>

      <section className="miniMerchTicker reveal reveal-1" id="merch" aria-label="Merch mini slide">
        <div className="miniMerchTickerTrack">
          <div className="miniMerchTickerGroup">
            {merchTickerSlides.map((slide, index) => (
              <article
                key={`mini-merch-a-${slide.src}-${index}`}
                className={`miniMerchCard ${slide.cardClassName === "lpMiniCard" ? "miniMerchCardLp" : ""}`}
              >
                <img src={slide.src} alt={slide.alt} />
              </article>
            ))}
          </div>
          <div className="miniMerchTickerGroup" aria-hidden="true">
            {merchTickerSlides.map((slide, index) => (
              <article
                key={`mini-merch-b-${slide.src}-${index}`}
                className={`miniMerchCard ${slide.cardClassName === "lpMiniCard" ? "miniMerchCardLp" : ""}`}
              >
                <img src={slide.src} alt="" />
              </article>
            ))}
          </div>
        </div>
      </section>

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

      <aside className="stickyDock stickyDockHidden" aria-label="Navegación rápida">
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
          <span className="timelineBadge">Cierre final en curso · lunes 30/03/2026 · fin del día</span>
        </div>

        <div className="projectTimelineBarWrap" aria-hidden="true">
          <div className="projectTimelineRail">
            <span
              className="projectTimelineProgress"
              style={{ width: `${TIMELINE_PROGRESS_PERCENT}%` }}
            />
          </div>
        </div>

        <div className="projectTimelineRow">
          {projectTimeline.map((item, index) => (
            <article
              className={`timelineStepItem timelineStepItem-${item.status} projectMilestoneReveal projectMilestoneDelay-${index + 1}`}
              key={`${item.date}-${item.title}`}
              tabIndex={0}
            >
              <button className="timelinePoint" type="button" aria-label={`Ver detalle de ${item.title}`}>
                {index + 1}
              </button>
              <div className="timelineStepLabel">
                <strong>{item.title}</strong>
                <span>{item.date}</span>
              </div>
              <div className="timelineStepTooltip" role="note" aria-label={`Detalle ${item.title}`}>
                {item.body}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel downloadsPanel downloadsStrip reveal reveal-4" id="archivos-finales">
        <div className="sectionIntro downloadsStripIntro">
          <div>
            <span className="eyebrow">Archivos finales</span>
            <h2>Descargas</h2>
          </div>
        </div>
        <div className="fileLinkList downloadsStripList">
          {finalFiles.map((item) => {
            const progressValue = clampProgressValue(downloadProgress[item.slug] ?? item.progress);

            return item.href ? (
              <a
                className="fileLinkItem"
                href={item.href}
                key={item.slug}
                target="_blank"
                rel="noreferrer"
              >
                <span className="fileLinkArrow" aria-hidden="true">
                  <img src="/img/gdrive_logo.png" alt="" />
                </span>
                <div>
                  <strong>{item.label}</strong>
                  <p className="fileLinkAvailability">{item.availability}</p>
                  <div className="fileLinkProgress" aria-label={`Avance ${item.label}: ${progressValue}%`}>
                    <div className="fileLinkProgressMeta">
                      <span>Avance</span>
                      <strong>{progressValue}%</strong>
                    </div>
                    <div className="fileLinkProgressTrack" aria-hidden="true">
                      <span
                        className="fileLinkProgressFill"
                        style={{
                          width: `${progressValue}%`,
                          transitionDuration: `${DOWNLOAD_PROGRESS_ANIMATION_MS}ms`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </a>
            ) : (
              <div className="fileLinkItem fileLinkItemDisabled" key={item.slug}>
                <span className="fileLinkArrow" aria-hidden="true">
                  <img src="/img/gdrive_logo.png" alt="" />
                </span>
                <div>
                  <strong>{item.label}</strong>
                  <p className="fileLinkAvailability">{item.availability}</p>
                  <div className="fileLinkProgress" aria-label={`Avance ${item.label}: ${progressValue}%`}>
                    <div className="fileLinkProgressMeta">
                      <span>Avance</span>
                      <strong>{progressValue}%</strong>
                    </div>
                    <div className="fileLinkProgressTrack" aria-hidden="true">
                      <span
                        className="fileLinkProgressFill"
                        style={{
                          width: `${progressValue}%`,
                          transitionDuration: `${DOWNLOAD_PROGRESS_ANIMATION_MS}ms`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
        </div>
        <div className="tracksLayout">
          <div className="tracksApprovedGrid">
            {approvedTracks.map((track) => (
              <TrackCard key={track.title} {...track} externalProgress={downloadProgress[track.slug]} />
            ))}
          </div>
          <div className="tracksActiveSlot">
            <TrackCard key={activeTrack.title} {...activeTrack} externalProgress={downloadProgress[activeTrack.slug]} />
          </div>
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
