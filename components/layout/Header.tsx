"use client"

import React from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';

const NavLink = ({ href, children, target }: { href: string; children: React.ReactNode; target?: string }) => (
  <Link href={href} target={target} className="text-neutral-300 hover:text-neutral-100 transition-colors">
    {children}
  </Link>
);

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-sm bg-gray-950 border-b border-neutral-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              Zed GPUI
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/docs">Documentation</NavLink>
            <NavLink href="/examples">Examples</NavLink>
            <NavLink href="https://github.com/zed-industries/zed" target="_">Community</NavLink>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="https://github.com/zed-industries/zed" 
              className="text-neutral-300 hover:text-neutral-100 transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link href="/docs/getting-started">
              <button className="px-4 py-2 text-sm bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity">
                Get Started
              </button>
            </Link>
          </div>

          <button 
            className="md:hidden p-2 text-neutral-300 hover:text-neutral-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg">
          <div className="px-4 py-2 space-y-1">
            {[
              ['Documentation', '/docs'],
              ['Examples', '/examples'],
              ['Community', '/community'],
              ['Blog', '/blog']
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="block px-3 py-2 text-base text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;