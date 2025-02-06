import React from 'react';
import { Heart, Github, Twitter } from 'lucide-react';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <a href={href} className="text-neutral-400 hover:text-neutral-100 transition-colors">
    {children}
  </a>
);

export const Footer = () => {
  return (
    <footer className="border-t border-neutral-800 py-8 mt-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-neutral-400 text-sm text-center md:text-left">
            © 2024 Zed GPUI
          </div>
          
          <div className="text-center text-neutral-400">
            Made with <Heart className="w-4 h-4 inline-block text-red-500" /> by{' '}
            <a href="https://github.com/tjpoland" className="text-emerald-500 hover:text-emerald-400 transition-colors">
              Tristan J. Poland
            </a>{' '}
            and the Rust community
          </div>

          <div className="flex justify-center md:justify-end gap-6">
            <FooterLink href="https://github.com/zed-industries/zed">
              <Github className="w-5 h-5" />
            </FooterLink>
            <FooterLink href="https://twitter.com/zeddotdev">
              <Twitter className="w-5 h-5" />
            </FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;