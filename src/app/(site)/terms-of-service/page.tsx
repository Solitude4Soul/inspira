"use client";

import { useState, useEffect } from 'react';

export default function TermsOfServicePage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="py-16 sm:py-24">
      <div className="container max-w-4xl">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Last Updated: {lastUpdated}
            </p>
          </div>

          <div className="space-y-6 text-left text-muted-foreground">
            <p>
              Please read these Terms of Service carefully before using our website operated by Inspira. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>

            <h2 className="font-headline text-2xl font-bold text-foreground pt-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>

            <h2 className="font-headline text-2xl font-bold text-foreground pt-4">2. Our Services</h2>
            <p>
              Inspira provides a platform to connect brands with vetted content creators for marketing campaigns. We facilitate introductions, manage contracts, and provide strategic guidance. We reserve the right to refuse service to anyone for any reason at any time.
            </p>

            <h2 className="font-headline text-2xl font-bold text-foreground pt-4">3. User Conduct</h2>
            <p>
              You agree not to use the Service for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the Service in any way that could damage the Service, the business of Inspira, or any other person.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>You will not harass, abuse, or threaten others or otherwise violate any person's legal rights.</li>
              <li>You will not violate any intellectual property rights of the Company or any third party.</li>
              <li>You will not upload or otherwise disseminate any computer viruses or other software that may damage the property of another.</li>
            </ul>

            <h2 className="font-headline text-2xl font-bold text-foreground pt-4">4. Limitation of Liability</h2>
            <p>
              In no event shall Inspira, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>

             <h2 className="font-headline text-2xl font-bold text-foreground pt-4">5. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which our company is established, without regard to its conflict of law provisions.
            </p>

            <h2 className="font-headline text-2xl font-bold text-foreground pt-4">6. Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
