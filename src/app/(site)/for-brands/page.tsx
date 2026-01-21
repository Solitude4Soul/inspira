import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, ShieldCheck } from "lucide-react";
import Link from "next/link";

const benefits = [
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary" />,
        title: "Access Vetted Talent",
        description: "Gain access to a curated network of high-performing creators who are ready to deliver exceptional content."
    },
    {
        icon: <Target className="h-8 w-8 text-primary" />,
        title: "Reach Your Target Audience",
        description: "We match you with creators whose followers are your ideal customers, ensuring authentic engagement and reach."
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: "Managed Campaigns",
        description: "From strategy and contracts to campaign reporting, we provide end-to-end support for a seamless experience."
    }
]

export default function ForBrandsPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Amplify Your Brand with Trusted Voices
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Connect with creators who genuinely resonate with your brand and can drive real results.
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
            <Button asChild size="lg" variant="secondary">
                <Link href="/contact?type=brand">Start a Campaign</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
