import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import Page from "@/pages/SolutionsPage";

function SolutionsRoute() {
  const location = useLocation();

  if (location.pathname !== "/solutions") {
    return <Outlet />;
  }

  return <Page />;
}

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Probiotic Solutions for Every Room | EnviroBiotics" },
      { name: "description", content: "Room-by-room probiotic solutions for bedrooms, nurseries, kitchens, HVAC, and more." },
      { property: "og:title", content: "Probiotic Solutions for Every Room | EnviroBiotics" },
      { property: "og:description", content: "Room-by-room probiotic solutions for bedrooms, nurseries, kitchens, HVAC, and more." },
      { property: "og:url", content: "https://envirobiotics.com/solutions" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Probiotic Solutions for Every Room | EnviroBiotics" },
      { name: "twitter:description", content: "Room-by-room probiotic solutions for bedrooms, nurseries, kitchens, HVAC, and more." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/solutions" },
    ],
  }),
  component: SolutionsRoute,
});
