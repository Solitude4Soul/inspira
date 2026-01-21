import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Handshake, Target, Telescope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

const approachSteps = [
  {
    icon: <Target className="h-10 w-10 text-primary" />,
    title: "You Tell Us Your Goals",
    description: "Share your campaign objectives, target audience, and budget. We listen first.",
  },
  {
    icon: <Telescope className="h-10 w-10 text-primary" />,
    title: "We Curate the Best Matches",
    description: "Our team hand-picks creators who align with your brand values, audience, and campaign goals.",
  },
  {
    icon: <Handshake className="h-10 w-10 text-primary" />,
    title: "We Facilitate the Partnership",
    description: "From introductions to contracts, we're here to make the collaboration smooth and successful.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container text-center">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-gradient bg-gradient-to-r from-primary to-secondary">
                Creator Marketing
              </span>
              <br />
              Built on Trust.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              We're not trying to build the biggest creator marketplace. We're building the most trusted one.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/for-brands">
                  I'm a Brand <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/for-creators">
                  I'm a Creator <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-24">
        <div className="container grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Quality Over Quantity.
              <br />
              Every Single Time.
            </h2>
            <p className="text-lg text-muted-foreground">
              Every creator in our network is personally vetted. We look beyond follower counts to engagement rates, content quality, and brand alignment. When we match you with a creator, we're confident they'll deliver.
            </p>
            <p className="text-lg text-muted-foreground">
              For creators, we only work with brands that respect your time and creative vision. No lowball offers, no endless revisions — just meaningful partnerships.
            </p>
          </div>
          <div className="flex justify-center">
            <Card className="max-w-md bg-accent/50 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" />
                  Our Promise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>✓ Personally Vetted Creators</p>
                <p>✓ Focus on Brand Alignment</p>
                <p>✓ Respect for Creative Vision</p>
                <p>✓ Fair & Transparent Partnerships</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Approach to Matching
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A simple, transparent process designed for success.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {approachSteps.map((step, index) => (
              <Card key={index} className="text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
                <CardHeader>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    {step.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
