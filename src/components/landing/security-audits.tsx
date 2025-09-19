import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const audits = [
  {
    firm: 'CertiK',
    date: 'June 2024',
    focus: 'Infrastructure & Key Management',
    reportUrl: '#',
  },
  {
    firm: 'Trail of Bits',
    date: 'March 2024',
    focus: 'Penetration Testing',
    reportUrl: '#',
  },
  {
    firm: 'Quantstamp',
    date: 'December 2023',
    focus: 'Validator Client Hardening',
    reportUrl: '#',
  },
];

export default function SecurityAudits() {
  return (
    <section id="security" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Committed to Security
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Our infrastructure undergoes regular third-party security audits to ensure the highest level of protection.
          </p>
        </div>
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="font-headline">Security Audit History</CardTitle>
            <CardDescription>Review our latest security assessments from industry-leading firms.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Audit Firm</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead>Focus</TableHead>
                  <TableHead className="text-right">Report</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {audits.map((audit) => (
                  <TableRow key={audit.firm}>
                    <TableCell className="font-medium">{audit.firm}</TableCell>
                    <TableCell className="hidden sm:table-cell">{audit.date}</TableCell>
                    <TableCell>{audit.focus}</TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={audit.reportUrl} target="_blank">
                          View <ArrowUpRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
