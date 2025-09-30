"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Card, CardContent } from '@/components/ui/card';
import { Twitter, Send, Globe } from 'lucide-react';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';

type TeamMember = {
  name: string;
  role: string;
  description: string;
  imageId: string;
  socials: {
    twitter?: string;
    telegram?: string;
    website?: string;
    linkedin?: string;
  };
};

type TeamMemberCardProps = {
  member: TeamMember;
};

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const cardRef = useRef(null);
  const image = PlaceHolderImages.find(p => p.id === member.imageId) as ImagePlaceholder;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut', duration: 0.4 } });
    
    tl.to(card, { y: -10, scale: 1.03 });

    card.addEventListener('mouseenter', () => tl.play());
    card.addEventListener('mouseleave', () => tl.reverse());

    return () => {
      card.removeEventListener('mouseenter', () => tl.play());
      card.removeEventListener('mouseleave', () => tl.reverse());
    }
  }, []);

  return (
    <Card ref={cardRef} className="overflow-hidden h-full flex flex-col">
      <div className="relative aspect-square w-full">
        <Image 
            src={image.imageUrl} 
            alt={`Portrait of ${member.name}`} 
            fill
            className="object-cover"
            data-ai-hint={image.imageHint} />
      </div>
      <CardContent className="p-6 flex-grow flex flex-col">
        <div>
            <p className="text-sm text-muted-foreground">{member.role}</p>
            <h3 className="text-xl font-bold font-headline mt-1">{member.name}</h3>
            <p className="text-sm text-muted-foreground mt-2 flex-grow">{member.description}</p>
        </div>
        <div className="flex space-x-3 mt-4 items-center">
          {member.socials.twitter && (
            <Link href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
            </Link>
          )}
          {member.socials.telegram && (
            <Link href={member.socials.telegram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Send className="h-5 w-5" />
            </Link>
          )}
          {member.socials.website && (
            <Link href={member.socials.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Globe className="h-5 w-5" />
            </Link>
          )}
           {member.socials.linkedin && (
            <Link href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
