import type { Metadata } from "next"
import { LocationSetup } from "@/components/location-setup"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Location Setup | CivicChain Finance",
  description: "Set your location to connect with your local community",
}

export default function LocationSetupPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <MapPin className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Set Your Location</CardTitle>
          <CardDescription>
            Connect with your local community and find nearby opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LocationSetup />
        </CardContent>
      </Card>
    </div>
  )
} 