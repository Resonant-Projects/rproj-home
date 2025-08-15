"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, CheckCircle } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

  const KIT_API_ENDPOINT = 'https://api.kit.com/v4/subscribers';
  const KIT_API_SECRET = process.env.KIT_API_KEY;

  if (!KIT_API_SECRET) {
    console.error('KIT_API_SECRET is not set.');
    return res
      .status(500)
      .json({ error: 'Server configuration error.' });
  }

  try {
    const kitResponse = await fetch(KIT_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authenticate with your Kit API Secret
        'X-Kit-Api-Key': `${KIT_API_SECRET}`,
      },
      body: JSON.stringify({
        email_address: email,
        state: "active",
      }),
    });

    const kitData = await kitResponse.json();

    if (kitResponse.ok) {
      res.status(200).json({ message: 'Subscribed successfully!', data: kitData });
    } else {
      // Log the full error response from Kit for debugging
      console.error('Kit API Error:', kitData);
      res.status(kitResponse.status).json({
        error: kitData.message || 'Failed to subscribe to Kit.',
        details: kitData, // Provide details for frontend debugging
      });
    }
  } catch (error) {
    console.error('API Route Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  } finally {
setIsSubmitted(true)
    setIsLoading(false)
    setEmail("")
    }    
  }

  if (isSubmitted) {
    return (
      <Card className="bg-gradient-to-br from-[#faf9fb] to-[#f3f1f5] border-[#e5d9e3] shadow-lg">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-[#6e2765]" />
          </div>
          <h3 className="text-xl font-semibold text-[#6e2765] mb-2">Thank you for subscribing!</h3>
          <p className="text-[#a87da3]">You'll receive updates and exclusive content in your inbox.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-[#faf9fb] to-[#f3f1f5] border-[#e5d9e3] shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <Mail className="h-8 w-8 text-[#6e2765]" />
          </div>
          <h3 className="text-xl font-semibold text-[#6e2765] mb-2">Stay Updated</h3>
          <p className="text-[#a87da3] text-sm">
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
              className="bg-white border-[#e5d9e3] focus:border-[#6e2765] focus:ring-[#6e2765] text-[#6e2765] placeholder:text-[#a87da3]"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#6e2765] to-[#a87da3] hover:from-[#5a1f54] hover:to-[#956a90] text-white font-medium py-2.5 transition-all duration-300 transform hover:scale-[1.02]"
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

        <p className="text-xs text-[#a87da3] text-center mt-4">No spam, unsubscribe at any time.</p>
      </CardContent>
    </Card>
  )
}
