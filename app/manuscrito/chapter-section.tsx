import type { ManuscriptChapter } from "./manuscript-content";

const chapterLabels = ["Capitulo I", "Capitulo II", "Capitulo III", "Capitulo IV", "Capitulo V"];

export function ChapterSection({
  chapter,
  index,
  dropCap = false,
}: {
  chapter: ManuscriptChapter;
  index: number;
  dropCap?: boolean;
}) {
  return (
    <section className="manuscriptChapter" id={chapter.id}>
      <header className="manuscriptChapterHeader">
        <span className="manuscriptChapterCount">{chapterLabels[index] ?? "Capitulo"}</span>
        <h2>{chapter.title}</h2>
        <p className="manuscriptChapterSubtitle">{chapter.subtitle}</p>
      </header>

      <div className="manuscriptChapterBody">
        {chapter.paragraphs.map((paragraph, index) => (
          <p className={dropCap && index === 0 ? "manuscriptParagraph manuscriptParagraphDropCap" : "manuscriptParagraph"} key={paragraph}>
            {paragraph}
          </p>
        ))}
        {chapter.emphasis ? <p className="manuscriptEmphasis">{chapter.emphasis}</p> : null}
      </div>
    </section>
  );
}
