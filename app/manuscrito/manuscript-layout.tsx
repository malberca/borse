import Link from "next/link";

import { ChapterSection } from "./chapter-section";
import { manuscriptChapters, manuscriptIntro } from "./manuscript-content";
import { ManuscriptDivider } from "./manuscript-divider";

export function ManuscriptLayout() {
  return (
    <main className="manuscriptPage">
      <div className="manuscriptVignette" aria-hidden="true" />
      <div className="manuscriptTexture" aria-hidden="true" />

      <aside className="manuscriptAudioWidget" aria-label="Musica recomendada para la lectura">
        <div className="manuscriptAudioCard">
          <span className="manuscriptAudioLabel">Musica recomendada</span>
          <strong>Para leer este manuscrito</strong>
          <div className="manuscriptAudioFrame">
            <iframe
              src="https://www.youtube.com/embed/YuS2Vy5Z-rA"
              title="Musica recomendada para leer el manuscrito"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </aside>

      <header className="manuscriptTopbar">
        <Link className="manuscriptBackLink" href="/">
          Volver al portal del proyecto
        </Link>
      </header>

      <article className="manuscriptBook">
        <header className="manuscriptHero">
          <span className="manuscriptLabel">{manuscriptIntro.label}</span>
          <h1>{manuscriptIntro.title}</h1>
          <p>{manuscriptIntro.subtitle}</p>
          <div className="manuscriptHeroBody">
            {manuscriptIntro.paragraphs.map((paragraph) => (
              <p className="manuscriptHeroParagraph" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </header>

        {manuscriptChapters.map((chapter, index) => (
          <div key={chapter.id}>
            {index > 0 ? <ManuscriptDivider /> : null}
            <ChapterSection chapter={chapter} index={index} dropCap={index === 0} />
          </div>
        ))}

        <footer className="manuscriptFooter">
          <Link className="manuscriptBackLink manuscriptBackLinkBottom" href="/">
            Volver al portal del proyecto
          </Link>
        </footer>
      </article>
    </main>
  );
}
