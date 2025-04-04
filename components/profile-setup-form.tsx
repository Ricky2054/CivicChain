"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { User, Loader2, ChevronRight } from "lucide-react"

// Define validation schema for profile form
const profileFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must have at least 10 digits.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  occupation: z.string().min(2, {
    message: "Occupation must be at least 2 characters.",
  }),
  education: z.string().min(2, {
    message: "Education must be at least 2 characters.",
  }),
  interests: z.string().optional(),
  bio: z.string().max(500, {
    message: "Bio must not exceed 500 characters.",
  }).optional(),
  avatarUrl: z.string().optional(),
})

// Type for form values inferred from schema
type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileSetupForm() {
  const router = useRouter()
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [aadhaarData, setAadhaarData] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get Aadhaar data from local storage on mount
  useEffect(() => {
    try {
      const storedAadhaarData = localStorage.getItem('aadhaarVerification')
      if (storedAadhaarData) {
        const data = JSON.parse(storedAadhaarData)
        setAadhaarData(data)
      } else {
        // If no Aadhaar data, redirect back to verification
        toast({
          title: "Verification required",
          description: "Please complete Aadhaar verification first.",
          variant: "destructive",
        })
        router.push('/signup')
      }
    } catch (error) {
      console.error("Error fetching stored Aadhaar data:", error)
    }
  }, [router])

  // Default values for the form
  const defaultValues: Partial<ProfileFormValues> = {
    fullName: aadhaarData?.name || "",
    phoneNumber: "",
    email: "",
    occupation: "",
    education: "",
    interests: "",
    bio: "",
    avatarUrl: "",
  }

  // Initialize form with React Hook Form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  })

  // Update form values when Aadhaar data loads
  useEffect(() => {
    if (aadhaarData?.name) {
      form.setValue('fullName', aadhaarData.name)
    }
  }, [aadhaarData, form])

  // Handle avatar upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      })
      return
    }

    // File size check (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      })
      return
    }

    // Read file as data URL for preview
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setAvatarPreview(event.target.result as string)
        form.setValue('avatarUrl', event.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  // Handle form submission
  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true)
    
    try {
      // In a real application, we would upload the image to a server 
      // and get back a URL to store. For this demo, we'll just use the
      // local file preview if it exists.
      
      // Extract only the essential profile data
      const essentialProfileData = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        occupation: data.occupation
      };
      
      try {
        // Try to store the data in localStorage
        localStorage.setItem('userProfile', JSON.stringify(essentialProfileData));
      } catch (storageError) {
        console.error("localStorage quota exceeded:", storageError);
        
        // If quota is exceeded, store only the bare minimum
        const bareMinimumData = {
          fullName: data.fullName,
          email: data.email
        };
        
        localStorage.setItem('userProfile', JSON.stringify(bareMinimumData));
      }
      
      toast({
        title: "Profile saved",
        description: "Your profile information has been saved successfully.",
      });
      
      // Navigate to location setup
      router.push('/signup/location');
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "There was a problem saving your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Profile Information</CardTitle>
            <CardDescription>
              Let us know more about you to personalize your experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-6">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 cursor-pointer" onClick={() => document.getElementById('avatar-upload')?.click()}>
                  {avatarPreview ? (
                    <AvatarImage src={avatarPreview} alt="Avatar preview" />
                  ) : (
                    <AvatarFallback>
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
                <Button 
                  type="button" 
                  variant="link" 
                  className="mt-2"
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                >
                  Upload photo
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="personal">Personal</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4 mt-4">
                {/* Full Name Field */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Phone Number Field */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="professional" className="space-y-4 mt-4">
                {/* Occupation Field */}
                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation</FormLabel>
                      <FormControl>
                        <Input placeholder="What do you do?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Education Field */}
                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your highest education" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="highschool">High School</SelectItem>
                          <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                          <SelectItem value="master">Master's Degree</SelectItem>
                          <SelectItem value="doctorate">Doctorate</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="personal" className="space-y-4 mt-4">
                {/* Interests Field */}
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interests</FormLabel>
                      <FormControl>
                        <Input placeholder="What are your interests? (e.g. Education, Environment)" {...field} />
                      </FormControl>
                      <FormDescription>
                        Separate multiple interests with commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Bio Field */}
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a bit about yourself"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Maximum 500 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Continue to Location Setup
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
} 