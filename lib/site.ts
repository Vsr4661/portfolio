/** The public address of the deployed portfolio. */
export const productionUrl = "https://portfolio-vsr4661s-projects.vercel.app";

/**
 * Canonical site URL used for metadata, sitemap and robots.
 * Set NEXT_PUBLIC_SITE_URL to override it (for example with a custom domain).
 * Any Vercel deployment, including previews, points canonical links at the
 * production address; local builds use localhost.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL ? productionUrl : "http://localhost:3000");

export const siteName = "VAIBHAV ORIGINALS";

export const siteDescription =
  "Portfolio of Vaibhav Singh Rathore, a software developer who builds web and mobile applications with React, React Native and TypeScript.";
