// lib/docs-data.ts
export interface DocMetadata {
    title: string
    excerpt: string
    tags: string[]
    stability: 'stable' | 'in-dev' | 'experimental'
    slug: string
  }
  
  export const docsData: DocMetadata[] = [
    {
      title: "About GPUI",
      excerpt: "A quick statr guide to working with GPUI",
      tags: ["basics", "tutorial"],
      stability: "stable",
      slug: "about"
    }
  ]