"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useEffect, useState } from 'react';

const uptimeData = [
  { date: 'Jan', uptime: 99.98 },
  { date: 'Feb', uptime: 99.99 },
  { date: 'Mar', uptime: 99.97 },
  { date: 'Apr', uptime: 100.0 },
  { date: 'May', uptime: 99.99 },
  { date: 'Jun', uptime: 99.99 },
];

const latencyData = [
  { region: 'US-East', latency: 25 },
  { region: 'US-West', latency: 45 },
  { region: 'EU-West', latency: 30 },
  { region: 'Asia-SE', latency: 80 },
];

const chartConfig: ChartConfig = {
  uptime: {
    label: 'Uptime (%)',
    color: 'hsl(var(--primary))',
  },
  latency: {
    label: 'Latency (ms)',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig;


export default function PerformanceDashboard() {
  const [activeNodes, setActiveNodes] = useState(1342);
  const [blocksProduced, setBlocksProduced] = useState(2458901);

  useEffect(() => {
    const nodeInterval = setInterval(() => {
      setActiveNodes(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 3000);
    const blockInterval = setInterval(() => {
      setBlocksProduced(prev => prev + Math.floor(Math.random() * 5));
    }, 1500);

    return () => {
      clearInterval(nodeInterval);
      clearInterval(blockInterval);
    }
  }, []);

  return (
    <section id="dashboard" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Live Performance Dashboard
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Transparency is key. Monitor our network's health and performance in real-time.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="font-headline">Global Uptime</CardTitle>
              <CardDescription>Last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-48 w-full">
                <LineChart data={uptimeData} margin={{ left: -20, right: 10, top: 5, bottom: 5}}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis domain={[99.9, 100]} tickLine={false} axisLine={false} tickMargin={8} />
                  <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Line type="monotone" dataKey="uptime" stroke={chartConfig.uptime.color} strokeWidth={2} dot={true} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="font-headline">Average Latency</CardTitle>
              <CardDescription>Across global regions</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-48 w-full">
                <BarChart data={latencyData} layout="vertical" margin={{ left: -10, right: 30, top: 5, bottom: 5}}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="region" type="category" tickLine={false} axisLine={false} tickMargin={8} />
                  <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Bar dataKey="latency" fill={chartConfig.latency.color} radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium font-body">Active Nodes</CardTitle>
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeNodes}</div>
                <p className="text-xs text-muted-foreground">Validators & collators online</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium font-body">Blocks Produced (24h)</CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{blocksProduced.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+0.2% from yesterday</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
