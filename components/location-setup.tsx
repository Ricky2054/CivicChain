"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { 
  MapPin, Search, Navigation, Building, 
  Home, Store, ChevronRight, Loader2 
} from "lucide-react"

// Add Google Maps types
declare global {
  interface Window {
    google: any;
    initMap: () => void;
    updateLoginStatus?: () => void;
  }
}

// Hardcoded mock location data for demo
const MOCK_LOCATIONS = [
  {
    address: "Connaught Place, New Delhi, Delhi 110001",
    locality: "Connaught Place",
    city: "New Delhi",
    state: "Delhi",
    postalCode: "110001",
    latitude: 28.6314512,
    longitude: 77.2166672
  },
  {
    address: "100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038",
    locality: "Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560038",
    latitude: 12.9783692,
    longitude: 77.6408356
  },
  {
    address: "Bandra Kurla Complex, Mumbai, Maharashtra 400051",
    locality: "Bandra Kurla Complex",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400051",
    latitude: 19.0662286,
    longitude: 72.8693583
  }
];

// Location type for storing user location data
type LocationData = {
  address: string
  locality: string
  city: string
  state: string
  postalCode: string
  latitude: number
  longitude: number
  placeId?: string
}

export function LocationSetup() {
  const router = useRouter()
  const { toast } = useToast()
  const [mapLoading, setMapLoading] = useState(true);
  const [locationType, setLocationType] = useState<"home" | "work" | "other">("home")
  const [locationData, setLocationData] = useState<LocationData | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLocating, setIsLocating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDemoLocations, setShowDemoLocations] = useState(false)
  
  // For demonstration, use a simplified map approach
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowDemoLocations(e.target.value.length > 2);
  };
  
  // Select location from demo list
  const selectLocation = (location: LocationData) => {
    setLocationData(location);
    setSearchQuery("");
    setShowDemoLocations(false);
  };
  
  // Get current location (demo)
  const getCurrentLocation = () => {
    setIsLocating(true);
    
    // Simulate geolocation delay
    setTimeout(() => {
      // Use a random location from our mock data
      const randomLocation = MOCK_LOCATIONS[Math.floor(Math.random() * MOCK_LOCATIONS.length)];
      setLocationData(randomLocation);
      setIsLocating(false);
    }, 1500);
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!locationData) {
      toast({
        title: "No location selected",
        description: "Please select a location to continue",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get user data from previous steps
      const profileData = JSON.parse(localStorage.getItem('userProfile') || '{}');
      const aadhaarData = JSON.parse(localStorage.getItem('aadhaarVerification') || '{}');
      
      // Extract only the essential location data to reduce storage size
      const essentialLocationData = {
        address: locationData.address,
        city: locationData.city,
        state: locationData.state,
        postalCode: locationData.postalCode,
        type: locationType
      };
      
      // Create a minimal user data object with only essential information
      const minimalUserData = {
        // Basic profile info
        name: profileData.name || profileData.fullName,
        email: profileData.email,
        phone: profileData.phone,
        
        // Essential Aadhaar info
        aadhaar: {
          number: aadhaarData.number,
          verified: aadhaarData.verified,
          verifiedAt: aadhaarData.verifiedAt
        },
        
        // Essential location info
        location: essentialLocationData,
        
        // Status flags
        signupCompleted: true,
        createdAt: new Date().toISOString()
      };
      
      try {
        // Try to store the minimal user data
        localStorage.setItem('userData', JSON.stringify(minimalUserData));
      } catch (storageError) {
        console.error("localStorage quota exceeded:", storageError);
        
        // If storage fails, try with even more minimal data
        const bareMinimumData = {
          name: profileData.name || profileData.fullName,
          email: profileData.email,
          aadhaarVerified: aadhaarData.verified,
          location: locationData.city + ", " + locationData.state,
          signupCompleted: true
        };
        
        // Attempt to store the bare minimum
        localStorage.setItem('userData', JSON.stringify(bareMinimumData));
      }
      
      // Clean up intermediate storage to free space
      try {
        localStorage.removeItem('userProfile');
        localStorage.removeItem('aadhaarVerification');
      } catch (error) {
        console.warn("Could not clean up interim storage:", error);
      }
      
      // Trigger login status update in header if the function exists
      if (typeof window !== "undefined" && window.updateLoginStatus) {
        window.updateLoginStatus();
      }
      
      // Show success toast
      toast({
        title: "Registration complete!",
        description: "Your account has been created successfully.",
        variant: "default"
      });
      
      // Redirect to dashboard page after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (error) {
      console.error("Error saving user data:", error);
      toast({
        title: "Registration error",
        description: "Could not complete your registration. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Map Container - Simplified static map */}
      <div className="rounded-md border overflow-hidden bg-muted">
        {mapLoading ? (
          <div className="w-full h-[250px] flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="w-full h-[250px] relative bg-slate-200">
            {/* Static map background (simulated) */}
            <div className="absolute inset-0 bg-[url('/images/map-placeholder.jpg')] bg-cover bg-center opacity-50"></div>
            
            {/* Map center pin */}
            {locationData && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white animate-pulse">
                  <MapPin className="h-5 w-5" />
                </div>
              </div>
            )}
            
            {/* Map interaction message */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs py-1 px-3 rounded-full">
              Using demo map for better performance
            </div>
          </div>
        )}
      </div>
      
      {/* Location Type Selection */}
      <div className="space-y-2">
        <Label>Location Type</Label>
        <div className="grid grid-cols-3 gap-4">
          <Button
            type="button"
            variant={locationType === "home" ? "default" : "outline"}
            className="justify-start"
            onClick={() => setLocationType("home")}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button
            type="button"
            variant={locationType === "work" ? "default" : "outline"}
            className="justify-start"
            onClick={() => setLocationType("work")}
          >
            <Building className="mr-2 h-4 w-4" />
            Work
          </Button>
          <Button
            type="button"
            variant={locationType === "other" ? "default" : "outline"}
            className="justify-start"
            onClick={() => setLocationType("other")}
          >
            <Store className="mr-2 h-4 w-4" />
            Other
          </Button>
        </div>
      </div>
      
      {/* Search Box */}
      <div className="space-y-2">
        <Label htmlFor="location-search">Search for a location</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            id="location-search"
            type="text"
            placeholder="Search for an address or place"
            className="pl-10 pr-4"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          
          {/* Demo location suggestions */}
          {showDemoLocations && (
            <div className="absolute z-10 mt-1 w-full bg-card shadow-lg rounded-md border overflow-hidden max-h-[200px] overflow-y-auto">
              {MOCK_LOCATIONS.filter(loc => 
                loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                loc.city.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((location, index) => (
                <div 
                  key={index}
                  className="p-2 hover:bg-muted cursor-pointer flex gap-2 items-start"
                  onClick={() => selectLocation(location)}
                >
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{location.address}</p>
                    <p className="text-xs text-muted-foreground">{location.city}, {location.state}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Current Location Button */}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={getCurrentLocation}
        disabled={isLocating}
      >
        {isLocating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Getting your location...
          </>
        ) : (
          <>
            <Navigation className="mr-2 h-4 w-4" />
            Use my current location
          </>
        )}
      </Button>
      
      {/* Location Details */}
      {locationData && (
        <div className="mt-4 p-4 rounded-md border bg-muted/40">
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{locationData.address}</h3>
                {locationData.city && (
                  <Badge variant="outline" className="text-xs">
                    {locationData.city}
                  </Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground grid grid-cols-2 gap-x-4 gap-y-1">
                {locationData.locality && (
                  <div>
                    <span className="font-medium">Locality:</span> {locationData.locality}
                  </div>
                )}
                {locationData.state && (
                  <div>
                    <span className="font-medium">State:</span> {locationData.state}
                  </div>
                )}
                {locationData.postalCode && (
                  <div>
                    <span className="font-medium">PIN:</span> {locationData.postalCode}
                  </div>
                )}
                <div>
                  <span className="font-medium">Coordinates:</span>{" "}
                  {locationData.latitude.toFixed(6)},{" "}
                  {locationData.longitude.toFixed(6)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Submit Button */}
      <Button 
        className="w-full mt-6" 
        onClick={handleSubmit}
        disabled={!locationData || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Completing registration...
          </>
        ) : (
          <>
            Complete Registration
            <ChevronRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  )
} 