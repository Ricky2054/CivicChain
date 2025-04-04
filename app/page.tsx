import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Shield, Landmark, Users, Heart, Award, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <section className="w-full py-8 md:py-12 lg:py-16 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Financial Inclusion for All Citizens
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-lg">
                  CivicChain Finance connects citizens with secure financial services 
                  and government benefits through verified digital identity.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/signup">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[250px] w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-4">
                    <Shield className="h-16 w-16 mx-auto mb-4 text-primary" />
                    <p className="text-lg font-medium">Secure, Transparent & Inclusive</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="w-full py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Key Features</h2>
              <p className="max-w-[700px] text-muted-foreground">
                Our platform provides comprehensive services designed to empower citizens
                and enhance financial transparency.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <Card>
              <CardHeader className="pb-2">
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Secure Identity</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Verify your identity securely using Aadhaar and advanced computer vision technology.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <Landmark className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Direct Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Receive government subsidies with full transparency and real-time tracking.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Community Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Participate in local development initiatives and community-driven projects.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <Heart className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Financial Inclusion</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access banking services regardless of your socioeconomic background.
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
                  Build trust through a transparent reputation system that rewards positive behavior.
                </CardDescription>
              </CardContent>
            </Card>
            <div className="flex items-center justify-center">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                <div className="flex flex-col items-center text-center space-y-2">
                  <h3 className="text-lg font-semibold">And more...</h3>
                  <p className="text-sm text-muted-foreground">
                    Discover all the features designed to enhance your financial well-being.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/about" className="group">
                      Explore All Features
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-8 md:py-12 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Join the Financial Revolution</h2>
              <p className="max-w-[700px] text-muted-foreground">
                Create your account today and experience secure, transparent, and inclusive financial services.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
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
          </div>
        </div>
      </section>
    </div>
  )
}

