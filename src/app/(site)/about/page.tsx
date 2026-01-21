import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const aboutImage = PlaceHolderImages.find(img => img.id === 'about-us-image');

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About Inspira
            </h1>
            <p className="text-lg text-muted-foreground">
              Inspira was founded on a simple yet powerful idea: that the best brand-creator collaborations are built on trust, respect, and shared values. In a world of automated marketplaces and vanity metrics, we chose a different path.
            </p>
            <p className="text-muted-foreground">
              We are a team of marketers, strategists, and creator economy enthusiasts who believe in the power of authentic storytelling. Our mission is to move beyond transactional relationships and foster genuine partnerships that create lasting impact for both brands and creators.
            </p>
            <p className="text-muted-foreground">
              Our vetting process is at the heart of what we do. We take the time to understand each creator's unique voice and each brand's specific goals to ensure every match is not just a good fit, but the right one.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                data-ai-hint={aboutImage.imageHint}
                width={800}
                height={600}
                className="rounded-lg shadow-xl"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
