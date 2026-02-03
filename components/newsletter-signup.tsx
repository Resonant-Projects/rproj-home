"use client";

import { CheckCircle, EnvelopeSimple } from "@phosphor-icons/react";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setEmail("");
      } else {
        setError(data.error || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Newsletter signup error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="newsletter">
        <Card className="bg-gradient-to-br from-brand-50 to-brand-50 border-brand-200 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-brand-600" />
            </div>
            <h3 className="text-xl font-semibold text-brand-600 mb-2">
              Thank you for subscribing!
            </h3>
            <p className="text-brand-400">
              You'll receive updates and exclusive content in your inbox.
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="newsletter">
      <h2 className="sr-only">Newsletter Signup</h2>
      <Card className="bg-gradient-to-br from-brand-50 to-brand-50 border-brand-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-3">
              <EnvelopeSimple className="h-8 w-8 text-brand-600" />
            </div>
            <h3 className="text-xl font-semibold text-brand-600 mb-2">Stay Updated</h3>
            <p className="text-brand-400 text-sm">
              Get the latest updates, insights, and exclusive content delivered to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-brand-200 focus:border-brand-600 focus:ring-brand-600 text-brand-600 placeholder:text-brand-400"
                required
              />
            </div>

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-brand-600 to-brand-400 hover:from-brand-600/90 hover:to-brand-400/90 text-white font-medium py-2.5 transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Subscribing...
                </div>
              ) : (
                "Subscribe to Newsletter"
              )}
            </Button>
          </form>

          <p className="text-xs text-brand-400 text-center mt-4">
            No spam, unsubscribe at any time.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
