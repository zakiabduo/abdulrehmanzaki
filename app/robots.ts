import { profile } from "@/data/content";
export default function robots() { return { rules: { userAgent: "*", allow: "/" }, sitemap: `${profile.siteUrl}/sitemap.xml` }; }
