import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { projects } from "@/data/projects";

const knownSlugs = new Set(projects.map((project) => project.slug));

/**
 * Case-study pages stream, so a notFound() inside the page can only send a
 * 200 with a noindex tag. Rejecting unknown slugs here, before rendering,
 * makes them return a real 404 status.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !knownSlugs.has(slug)) {
    return NextResponse.rewrite(new URL("/_project-not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/projects/:slug",
};
