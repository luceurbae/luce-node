
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactForm() {

  const handleEmailClick = () => {
    const name = (document.getElementById('name') as HTMLInputElement)?.value || 'No name provided';
    const message = (document.getElementById('message') as HTMLTextAreaElement)?.value || 'No message provided';
    const subject = `Message from ${name} via Luce Node Website`;
    const body = `Name: ${name}\n\nMessage:\n${message}`;
    window.location.href = `mailto:izaann25@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Have questions or ready to get started? Drop us a line.
          </p>
        </div>
        <Card className="max-w-2xl mx-auto mt-12">
          <CardHeader>
            <CardTitle className="font-headline">Contact Us</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground">Full Name</label>
                  <input id="name" type="text" placeholder="John Doe" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">Email Address</label>
                    <input id="email" type="email" placeholder="you@example.com" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground">Your Message</label>
                    <textarea id="message" placeholder="Tell us how we can help..." className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1"></textarea>
                </div>
                <Button onClick={handleEmailClick} className="w-full">
                    Send Message
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
