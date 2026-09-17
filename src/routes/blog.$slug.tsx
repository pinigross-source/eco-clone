import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import Page from "@/pages/BlogPostPage";
import { getPostBySlug } from "@/data/blogData";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    if (params.slug === "ba-2080-review-6-months") {
      throw redirect({ href: "/blog/biotica-800-review", statusCode: 301 });
    }
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return {
      title: post.metaTitle ?? post.title,
      description: post.description,
    };
  },
  head: ({ params, loaderData }) => {
    const title = loaderData?.title ?? "Blog";
    const description = loaderData?.description ?? "EnviroBiotics blog post.";
    const fullTitle = `${title} | EnviroBiotics`;
    const url = `https://envirobiotics.com/blog/${params.slug}`;
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
