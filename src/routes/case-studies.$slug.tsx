import { createFileRoute, notFound } from "@tanstack/react-router";
import Page from "@/pages/CaseStudyDetailPage";
import { getCaseStudyBySlug } from "@/data/researchData";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudyBySlug(params.slug);
    if (!study) throw notFound();
    return {
      title: study.title,
      description: study.description,
    };
  },
  head: ({ params, loaderData }) => {
    const title = loaderData?.title ?? "Case Study";
    const description = loaderData?.description ?? "EnviroBiotics case study.";
    const fullTitle = `${title} | Case Study | EnviroBiotics`;
    const url = `https://envirobiotics.com/case-studies/${params.slug}`;
    return {
      meta: [
        { title: fullTitle },
        { name: "description", content: description },
        { property: "og:title", content: fullTitle },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { name: "twitter:title", content: fullTitle },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: Page,
});
