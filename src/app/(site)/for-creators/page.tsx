import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PenTool, Sparkles } from "lucide-react";
import Link from "next/link";

const benefits = [
    {
        icon: <Sparkles className="h-8 w-8 text-primary" />,
        title: "Work with Respectful Brands",
        description: "We partner with brands that value your creative freedom and provide clear, constructive briefs."
    },
    {
        icon: <DollarSign className="h-8 w-8 text-primary" />,
        title: "Fair Compensation",
        description: "No more lowball offers. We advocate for your value and ensure you're compensated fairly for your work."
    },
    {
        icon: <PenTool className="h-8 w-8 text-primary" />,
        title: "Focus on Creativity",
        description: "We handle the contracts, negotiations, and logistics so you can focus on what you do best: creating."
    }
]

export default function ForCreatorsPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Meaningful Partnerships for Creators
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your creativity is your currency. We help you partner with brands who respect and value it.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {benefits.map(benefit => (
              <Card key={benefit.title} className="transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
                  <CardHeader>
                      <CardTitle className="flex items-center gap-4">
                          {benefit.icon}
                          <span className="text-xl">{benefit.title}</span>
                      </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
              </Card>
          ))}
        </div>
        <div className="mt-16 text-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                <Link href="/contact?type=creator">Join Our Network</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
