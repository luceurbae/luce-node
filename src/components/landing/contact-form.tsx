"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { contactFormAICompletion } from '@/ai/flows/contact-form-ai-completion';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  services: z.array(z.string()).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export default function ContactForm() {
  const { toast } = useToast();
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isAiThinking, setIsAiThinking] = useTransition();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      services: [],
    },
  });

  const messageValue = form.watch('message');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (messageValue && messageValue.length > 20) {
        setIsAiThinking(async () => {
          const result = await contactFormAICompletion({ message: messageValue });
          if (result && result.suggestedServices) {
            setAiSuggestions(result.suggestedServices);
          }
        });
      } else {
        setAiSuggestions([]);
      }
    }, 1000); // 1-second debounce

    return () => {
      clearTimeout(handler);
    };
  }, [messageValue]);

  async function onSubmit(data: FormSchema) {
    // This would be a server action call in a real app
    console.log('Form submitted:', data);
    toast({
      title: 'Message Sent!',
      description: "Thanks for reaching out. We'll get back to you shortly.",
    });
    form.reset();
    setAiSuggestions([]);
  }

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
            <CardDescription>Our AI assistant will help suggest services based on your message.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us how we can help..." className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                { (isAiThinking || aiSuggestions.length > 0) && (
                  <FormField
                    control={form.control}
                    name="services"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base">
                                Interested Services {isAiThinking && <span className="text-sm text-muted-foreground">(AI is thinking...)</span>}
                            </FormLabel>
                        </div>
                        <div className="flex flex-wrap gap-2">
                        {aiSuggestions.map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="services"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), item])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <SubmitButton />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
