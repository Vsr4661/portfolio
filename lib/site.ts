/**
 * Canonical site URL used for metadata, sitemap and robots.
 * Set NEXT_PUBLIC_SITE_URL once a custom domain exists; on Vercel the
 * production domain is picked up automatically.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteName = "VAIBHAV ORIGINALS";

export const siteDescription =
  "Portfolio of Vaibhav Singh Rathore, a software developer who builds web and mobile applications with React, React Native and TypeScript.";
