import { notFound } from "next/navigation";

import { processTrackPages, processTrackPagesBySlug } from "../../borse-data";
import { ProcessTrackPageView } from "../process-track-page";

export function generateStaticParams() {
  return processTrackPages.map((page) => ({ slug: page.slug }));
}

export default async function ProcessTrackRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = processTrackPagesBySlug[slug];

  if (!page) {
    notFound();
  }

  return <ProcessTrackPageView page={page} />;
}
