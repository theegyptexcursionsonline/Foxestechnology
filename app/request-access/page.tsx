import type { Metadata } from "next";
import { RequestAccessForm } from "./RequestAccessForm";
import { SOLUTIONS, solutionFrom, sourceFrom, type SearchParams } from "./solutions";

// Rendered on the server for each visit (30 Oct 2026). The page used to read ?solution= in the
// browser, which kept the whole page out of the HTML: nothing painted until the script ran and the
// heading and form had faded in, 2.9–4.8 s after the click. Reading it here sends the right heading
// and the first step with the page.
export async function generateMetadata({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<Metadata> {
  const solution = solutionFrom((await searchParams).solution);
  return {
    // A title of its own under the site's template, instead of the home page's "Booking Systems & POS".
    title: solution ? `Request access to ${SOLUTIONS[solution].label}` : "Request access",
    description: "Request access to a Foxes solution. Every request is reviewed by our team.",
    // Every ?solution= variant is the same page for search engines.
    alternates: { canonical: "https://foxestechnology.com/request-access" },
  };
}

export default async function RequestAccessPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  return <RequestAccessForm solution={solutionFrom(params.solution)} source={sourceFrom(params)} />;
}
