import { Twitter, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Logo from './logo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center mb-4 md:mb-0">
            <Logo className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold font-headline">Luce Node</span>
          </div>
          <div className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {year} Luce Node. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
