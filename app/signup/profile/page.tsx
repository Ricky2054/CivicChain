import type { Metadata } from "next"
import { ProfileSetupForm } from "@/components/profile-setup-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Profile Setup | CivicChain Finance",
  description: "Complete your profile to get started with CivicTrust",
}

export default function ProfileSetupPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <UserCircle className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Create Your Profile</CardTitle>
          <CardDescription>
            Tell us a bit about yourself to personalize your experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileSetupForm />
        </CardContent>
      </Card>
    </div>
  )
} 