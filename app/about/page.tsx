import type { Metadata } from "next"
import Link from "next/link"
import { 
  Heart, Shield, Handshake, Users, Landmark, Award,
  ArrowRight, Code, Database, Lock
} from "lucide-react"

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "About | CivicChain Finance",
  description: "Learn about CivicChain Finance - Building trust, transparency and financial inclusion for all citizens."
}

export default function AboutPage() {
  return (
    <div className="container py-8 space-y-8">
      {/* Hero section */}
      <section className="text-center space-y-3">
        <h1 className="text-3xl font-bold">About CivicChain Finance</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Building a transparent, secure, and accessible financial ecosystem for all citizens
        </p>
      </section>

      {/* Mission section */}
      <section className="grid gap-6 md:grid-cols-2 items-center">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-muted-foreground">
            CivicChain Finance is committed to revolutionizing how citizens interact with financial 
            services and government programs. We aim to create a more transparent, efficient, and 
            inclusive system that empowers everyone, regardless of their socioeconomic background.
          </p>
          <p className="text-muted-foreground">
            By leveraging blockchain technology and secure digital identity verification, we're
            building a platform that ensures trust, reduces corruption, and streamlines access
            to essential financial services and government benefits.
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-8 flex items-center justify-center">
          <div className="text-center">
            <Database className="h-16 w-16 mx-auto mb-3 text-primary" />
            <p className="text-lg font-medium">Blockchain-Powered Trust</p>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Key Features</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Secure Identity Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Advanced Aadhaar verification and computer vision technology for secure, tamper-proof identity verification.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <Landmark className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Transparent Fund Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track government subsidies in real-time with complete transparency, eliminating intermediaries.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Community Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Connect with local communities to participate in crowdfunding and collective investments.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <Handshake className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Financial Inclusion</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access to banking services and financial education for underserved populations.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <Heart className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Social Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Facilitate donations with complete transparency on how funds are allocated and used.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <Award className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Reputation System</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Build a trust score based on financial behavior and community participation.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Technology section */}
      <section className="bg-muted p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold">Our Technology</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Code className="h-8 w-8 text-primary" />
            <h3 className="text-lg font-semibold">Blockchain Backbone</h3>
            <p className="text-muted-foreground text-sm">
              Secure, scalable blockchain infrastructure that ensures transparency and immutability.
            </p>
          </div>
          
          <div className="space-y-2">
            <Database className="h-8 w-8 text-primary" />
            <h3 className="text-lg font-semibold">Smart Contracts</h3>
            <p className="text-muted-foreground text-sm">
              Automated contracts that distribute funds according to predefined criteria.
            </p>
          </div>
          
          <div className="space-y-2">
            <Lock className="h-8 w-8 text-primary" />
            <h3 className="text-lg font-semibold">End-to-End Encryption</h3>
            <p className="text-muted-foreground text-sm">
              Military-grade encryption protecting all personal data and transactions.
            </p>
          </div>
        </div>
      </section>

      {/* Impact statistics */}
      <section className="py-6">
        <div className="grid gap-4 md:grid-cols-4 text-center">
          <div className="space-y-1">
            <p className="text-3xl font-bold text-primary">10M+</p>
            <p className="text-sm font-medium">Citizens Served</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-primary">₹500Cr</p>
            <p className="text-sm font-medium">Funds Distributed</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-primary">1000+</p>
            <p className="text-sm font-medium">Community Projects</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-primary">95%</p>
            <p className="text-sm font-medium">User Satisfaction</p>
          </div>
        </div>
      </section>

      <Separator />

      {/* CTA section */}
      <section className="text-center space-y-4 py-6">
        <h2 className="text-2xl font-bold">Join the Financial Revolution</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Be part of a movement transforming financial access through technology.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/signup">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
} 