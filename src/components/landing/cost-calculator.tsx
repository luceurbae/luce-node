"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calculator } from 'lucide-react';

const networks = [
  { id: 'ethereum', name: 'Ethereum', multiplier: 1.5 },
  { id: 'solana', name: 'Solana', multiplier: 1.2 },
  { id: 'cosmos', name: 'Cosmos Hub', multiplier: 1.0 },
  { id: 'polkadot', name: 'Polkadot', multiplier: 1.1 },
];

const redundancyLevels = [
    { id: 'basic', name: 'Basic', cost: 0 },
    { id: 'high-availability', name: 'High Availability', cost: 50 },
    { id: 'geo-redundant', name: 'Geo-Redundant', cost: 150 },
]

const BASE_NODE_COST = 100; // Cost per node

export default function CostCalculator() {
  const [nodes, setNodes] = useState(1);
  const [networkId, setNetworkId] = useState('cosmos');
  const [redundancyId, setRedundancyId] = useState('basic');

  const estimatedCost = useMemo(() => {
    const network = networks.find(n => n.id === networkId);
    const redundancy = redundancyLevels.find(r => r.id === redundancyId);
    
    if (!network || !redundancy) return 0;
    
    const totalBaseCost = BASE_NODE_COST * nodes;
    const totalRedundancyCost = redundancy.cost * nodes;
    
    return (totalBaseCost + totalRedundancyCost) * network.multiplier;
  }, [nodes, networkId, redundancyId]);

  return (
    <section id="calculator" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Estimate Your Costs
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Get a transparent, upfront cost estimate for your specific validation needs.
          </p>
        </div>
        <Card className="max-w-4xl mx-auto mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Calculator className="h-6 w-6" />
              Cost Calculator
            </CardTitle>
            <CardDescription>Adjust the parameters to see your estimated monthly cost.</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div>
                <Label htmlFor="network">Network</Label>
                <Select value={networkId} onValueChange={setNetworkId}>
                  <SelectTrigger id="network" className="w-full">
                    <SelectValue placeholder="Select a network" />
                  </SelectTrigger>
                  <SelectContent>
                    {networks.map(network => (
                      <SelectItem key={network.id} value={network.id}>{network.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="nodes">Number of Validators/Nodes: {nodes}</Label>
                <Slider
                  id="nodes"
                  min={1}
                  max={50}
                  step={1}
                  value={[nodes]}
                  onValueChange={(value) => setNodes(value[0])}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Redundancy Level</Label>
                <RadioGroup value={redundancyId} onValueChange={setRedundancyId} className="mt-2 space-y-2">
                    {redundancyLevels.map(level => (
                        <div key={level.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={level.id} id={level.id} />
                            <Label htmlFor={level.id} className="font-normal">{level.name}</Label>
                        </div>
                    ))}
                </RadioGroup>
              </div>
            </div>
            
            <div className="bg-secondary rounded-lg flex flex-col items-center justify-center p-8 text-center">
              <p className="text-lg text-muted-foreground">Estimated Monthly Cost</p>
              <p className="font-headline text-5xl font-bold text-primary mt-2">
                ${estimatedCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-muted-foreground mt-2">per month</p>
              <p className="text-xs text-muted-foreground mt-4 max-w-xs">
                This is an estimate. Actual costs may vary based on specific requirements and network conditions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
