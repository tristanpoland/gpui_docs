"use client"

import { useEffect, useState, memo, ClassAttributes, HTMLAttributes, JSX, OlHTMLAttributes, LiHTMLAttributes, BlockquoteHTMLAttributes, TableHTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import { notFound } from 'next/navigation'

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
  </div>
)

interface StabilityBadgeProps {
  stability: 'stable' | 'in-dev' | 'experimental';
}

const StabilityBadge = memo(({ stability }: StabilityBadgeProps) => {
  const colors = {
    stable: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    "in-dev": "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    experimental: "bg-violet-500/10 text-violet-500 border-violet-500/20"
  }

  return (
    <span className={`px-2 py-1 text-xs rounded-md border ${colors[stability]}`}>
      {stability}
    </span>
  )
})

interface DocContentProps {
  initialDoc: {
    title: string;
    image?: string;
    tags: string[];
    stability: 'stable' | 'in-dev' | 'experimental';
    excerpt: string;
  };
  slug: string;
}

export default function DocContent({ initialDoc, slug }: DocContentProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>> | null>(null)
  const [metadata, setMetadata] = useState(initialDoc)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (mdxSource && window.Prism) {
      try {
        window.Prism.highlightAll()
      } catch (error) {
        console.error('Failed to highlight code:', error)
      }
    }
  }, [mdxSource])

  useEffect(() => {
    const loadDoc = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch(`/docs/${slug}.md`)
        if (!response.ok) {
          throw new Error(
            response.status === 404 
              ? 'Document not found'
              : `Failed to load document (${response.status})`
          )
        }
        
        const text = await response.text()
        const normalizedText = text.replace(/\r\n/g, '\n')
        const match = normalizedText.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)
        
        if (!match) throw new Error('Invalid document format')

        const [_, frontmatter, content] = match
        const metadata = parseYAML(frontmatter)
        
        const mdxSource = await serialize(content, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            format: 'mdx'
          },
          parseFrontmatter: false,
        })
        
        setMetadata(metadata)
        setMdxSource(mdxSource)

        setTimeout(() => {
          if (window.Prism) window.Prism.highlightAll()
        }, 0)
      } catch (error) {
        console.error('Failed to load document:', error)
        setError(error instanceof Error ? error.message : 'Failed to load document')
        if (error instanceof Error && error.message === 'Document not found') {
          notFound()
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadDoc()
  }, [slug])

  const components = {
    pre: ({ className, ...props }: { className?: string; [key: string]: any }) => {
      const languageMatch = className?.match(/language-(\w+)/)
      const language = languageMatch ? languageMatch[1] : ''
      
      return (
        <div className="relative group">
          {language && (
            <div className="absolute right-4 top-2 px-2 py-1 text-xs font-mono text-gray-400 bg-gray-900/80 rounded-md opacity-75 group-hover:opacity-100 transition-opacity">
              {language}
            </div>
          )}
          <pre 
            className={`${className} p-4 rounded-lg bg-gray-900 overflow-x-auto`}
            {...props} 
          />
        </div>
      )
    },
    code: ({ className, ...props }: { className?: string; [key: string]: any }) => {
      const isInline = !className?.includes('language-')
      return (
        <code 
          className={`${className} ${
            isInline 
              ? 'px-1 py-0.5 rounded-md text-emerald-400 bg-gray-900/50 font-mono text-sm' 
              : 'block text-sm'
          }`} 
          {...props} 
        />
      )
    },
    h1: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-3xl font-bold mt-8 mb-4 bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent" {...props} />,
    h2: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-100" {...props} />,
    h3: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-200" {...props} />,
    p: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLParagraphElement> & HTMLAttributes<HTMLParagraphElement>) => <p className="my-4 leading-7 text-gray-300" {...props} />,
    ul: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLUListElement> & HTMLAttributes<HTMLUListElement>) => <ul className="list-disc list-inside my-4 space-y-2 text-gray-300" {...props} />,
    ol: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLOListElement> & OlHTMLAttributes<HTMLOListElement>) => <ol className="list-decimal list-inside my-4 space-y-2 text-gray-300" {...props} />,
    li: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLLIElement> & LiHTMLAttributes<HTMLLIElement>) => <li className="ml-4 text-gray-300" {...props} />,
    a: ({ href, ...props }: { href?: string; [key: string]: any }) => {
      const isExternal = href?.startsWith('http')
      return (
        <a 
          className="text-cyan-400 hover:text-cyan-300 underline"
          href={href}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...props} 
        />
      )
    },
    blockquote: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLQuoteElement> & BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
      <blockquote className="border-l-4 border-emerald-500/30 pl-4 my-4 italic text-gray-300" {...props} />
    ),
    table: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLTableElement> & TableHTMLAttributes<HTMLTableElement>) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse" {...props} />
      </div>
    ),
    th: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLTableHeaderCellElement> & ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
      <th className="border border-gray-800 px-4 py-2 bg-gray-900 text-gray-200" {...props} />
    ),
    td: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLTableDataCellElement> & TdHTMLAttributes<HTMLTableDataCellElement>) => (
      <td className="border border-gray-800 px-4 py-2 text-gray-300" {...props} />
    ),
  }

  if (isLoading) return <LoadingSpinner />
  if (error) return <div className="py-8 text-center text-red-500">{error}</div>
  if (!metadata || !mdxSource) return notFound()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <div className="flex justify-between items-start gap-4 mb-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
              {metadata.title}
            </h1>
            <StabilityBadge stability={metadata.stability} />
          </div>
          
          <div className="flex gap-2 flex-wrap mb-4">
            {metadata.tags.map(tag => (
              <span 
                key={tag}
                className="px-2 py-1 text-xs rounded-full bg-gray-800/50 backdrop-blur-sm text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <p className="text-lg text-gray-400">
            {metadata.excerpt}
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <article className="min-w-full p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700">
            <MDXRemote {...mdxSource} components={components} />
          </article>
        </div>
      </div>
    </div>
  )
}

function parseYAML(yaml: string) {
  const lines = yaml.trim().split('\n')
  const result: { [key: string]: any } = {}

  for (const line of lines) {
    const [key, ...values] = line.split(':')
    const trimmedKey = key.trim()
    
    if (trimmedKey) {
      const value = values.join(':').trim()
      
      if (!value) {
        result[trimmedKey] = undefined
        continue
      }
      
      if (value === '[]') {
        result[trimmedKey] = []
        continue
      }
      
      if (value.startsWith('[') && value.endsWith(']')) {
        result[trimmedKey] = value
          .slice(1, -1)
          .split(',')
          .map(item => item.trim())
          .filter(Boolean)
        continue
      }
      
      result[trimmedKey] = value
    }
  }

  return {
    title: result.title || '',
    image: result.image,
    tags: Array.isArray(result.tags) ? result.tags : [],
    stability: result.stability || 'experimental',
    excerpt: result.excerpt || ''
  }
}