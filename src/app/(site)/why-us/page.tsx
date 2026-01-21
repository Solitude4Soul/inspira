import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Check, Users, Heart } from "lucide-react";

const features = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Vetted Creator Network",
    description: "Every creator is hand-picked for quality, engagement, and professionalism. No more guesswork.",
  },
  {
    icon: <Check className="h-8 w-8 text-primary" />,
    title: "Strategic Matching",
    description: "We go beyond metrics to match you with creators whose audience and values align perfectly with your brand.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: "Data-Driven Results",
    description: "We provide comprehensive reporting and analytics to measure campaign success and demonstrate real ROI.",
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: "Partnership Focused",
    description: "We facilitate long-term, meaningful relationships, not one-off transactions. We're in it for the long haul.",
  },
];

export default function WhyUsPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Why Choose Inspira?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We're more than a marketplace. We're your strategic partner in the creator economy.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
              <CardHeader>
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {feature.icon}
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
