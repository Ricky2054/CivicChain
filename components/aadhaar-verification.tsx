"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import {
  Camera,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight
} from "lucide-react"

export function AadhaarVerification() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [step, setStep] = useState<"upload" | "processing" | "verified" | "error">("upload")
  const [activeTab, setActiveTab] = useState<"upload" | "camera">("upload")
  const [image, setImage] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [aadhaarData, setAadhaarData] = useState<{
    number: string;
    name: string;
    dob: string;
    gender: string;
    verified: boolean;
  } | null>(null)

  // Clean up camera when component unmounts
  const cleanup = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop())
    }
  }

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string)
        processAadhaarCard(event.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "environment",
          width: { ideal: 1024 },
          height: { ideal: 576 }
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setMediaStream(stream)
        setIsCameraActive(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to use this feature.",
        variant: "destructive",
      })
    }
  }

  // Capture image from camera
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return
    
    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    if (!context) return
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    
    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    
    // Convert canvas to data URL
    const imageData = canvas.toDataURL('image/jpeg', 0.8)
    setImage(imageData)
    
    // Stop camera
    stopCamera()
    
    // Process the captured image
    processAadhaarCard(imageData)
  }

  // Stop camera
  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop())
      setMediaStream(null)
    }
    setIsCameraActive(false)
  }

  // Process Aadhaar card image 
  const processAadhaarCard = (imageDataUrl: string) => {
    setStep("processing")
    setProgress(0)
    setIsProcessing(true)
    
    // Simplified verification process for better performance
    simulateVerification(imageDataUrl);
  }
  
  // Simulate verification process
  const simulateVerification = (imageDataUrl: string) => {
    const img = new Image();
    img.onload = () => {
      // Start progress simulation using less frequent updates
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 10;
        setProgress(Math.min(currentProgress, 100));
        
        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          
          // 80% chance of success for demo
          const isVerified = Math.random() < 0.8;
          
          // Mock Aadhaar data
          const mockData = {
            number: "1234 5678 9012",
            name: "John Doe",
            dob: "01/01/1990",
            gender: "Male",
            verified: isVerified
          };
          
          if (isVerified) {
            setAadhaarData(mockData);
            setStep("verified");
            
            // Save minimal verification data to localStorage to avoid quota issues
            try {
              const minimalData = {
                verified: true,
                number: mockData.number.replace(/\s/g, ''),
                name: mockData.name,
                verifiedAt: new Date().toISOString()
              };
              
              // Store minimal data
              localStorage.setItem('aadhaarVerification', JSON.stringify(minimalData));
            } catch (error) {
              console.error("Error storing aadhaar verification data:", error);
              
              // If storing fails, try with bare minimum data
              try {
                const bareMinimum = {
                  verified: true,
                  number: mockData.number.replace(/\s/g, '')
                };
                localStorage.setItem('aadhaarVerification', JSON.stringify(bareMinimum));
              } catch (innerError) {
                console.error("Failed to store even minimal aadhaar data:", innerError);
                toast({
                  title: "Storage issue",
                  description: "There was a problem storing verification data, but you can continue.",
                  variant: "destructive"
                });
              }
            }
          } else {
            setStep("error");
            setErrorMessage("Could not verify Aadhaar card. Please ensure the image is clear and try again.");
          }
          
          setIsProcessing(false);
        }
      }, 200); // Slower progress updates for better performance
    };
    
    img.onerror = () => {
      setStep("error");
      setErrorMessage("Could not load the image. Please try again with a different image.");
      setIsProcessing(false);
    };
    
    img.src = imageDataUrl;
  }

  // Reset the verification process
  const resetVerification = () => {
    setStep("upload")
    setImage(null)
    setProgress(0)
    setErrorMessage("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Continue to next step in signup
  const handleContinue = () => {
    router.push('/signup/profile')
  }

  return (
    <div className="space-y-6">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Canvas for image capture (hidden) */}
      <canvas ref={canvasRef} className="hidden"></canvas>

      {step === "upload" && (
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as "upload" | "camera")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
              <TabsTrigger value="camera">Use Camera</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4 pt-4">
              <div 
                className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={handleUploadClick}
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-sm font-medium mb-1">Click to upload Aadhaar card</h3>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG or JPEG format (max. 5MB)
                </p>
              </div>

              <div className="flex justify-center">
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={handleUploadClick}
                  className="w-full max-w-xs"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Browse Files
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="camera" className="space-y-4 pt-4">
              {isCameraActive ? (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden border">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      className="w-full h-auto"
                    />
                  </div>
                  
                  <div className="flex justify-center gap-2">
                    <Button 
                      type="button" 
                      variant="destructive" 
                      onClick={stopCamera}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="button" 
                      onClick={captureImage}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Capture
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div 
                    className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={startCamera}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Camera className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-sm font-medium mb-1">Click to start camera</h3>
                    <p className="text-xs text-muted-foreground">
                      Ensure good lighting and that all text is visible
                    </p>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      type="button" 
                      variant="secondary" 
                      onClick={startCamera}
                      className="w-full max-w-xs"
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Start Camera
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}

      {step === "processing" && (
        <div className="space-y-6 py-4">
          {image && (
            <div className="relative rounded-lg overflow-hidden border mb-6">
              <img src={image} alt="Aadhaar card" className="w-full h-auto max-h-[250px] object-contain" />
              <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex flex-col items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <h3 className="text-sm font-medium mb-2">Verifying Aadhaar card</h3>
                <div className="w-full max-w-xs px-4">
                  <Progress value={progress} className="h-2" />
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Verification in progress</h3>
            <p className="text-xs text-muted-foreground">
              We are processing your Aadhaar card. Please do not close or refresh this page.
            </p>
          </div>
          
          {/* Simplified steps display */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className={`h-5 w-5 rounded-full flex items-center justify-center ${progress >= 25 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {progress >= 25 ? '✓' : '1'}
              </div>
              <span>Image processing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`h-5 w-5 rounded-full flex items-center justify-center ${progress >= 50 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {progress >= 50 ? '✓' : '2'}
              </div>
              <span>Text extraction</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`h-5 w-5 rounded-full flex items-center justify-center ${progress >= 100 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {progress >= 100 ? '✓' : '3'}
              </div>
              <span>Verification</span>
            </div>
          </div>
        </div>
      )}

      {step === "verified" && (
        <div className="space-y-6 py-4">
          <div className="flex flex-col items-center justify-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="rounded-full bg-green-100 dark:bg-green-900/40 p-3 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Verification Complete!</h3>
            <p className="text-sm text-center text-muted-foreground mb-4">
              Your Aadhaar card has been successfully verified.
            </p>
            
            {/* Display verification details */}
            {aadhaarData && (
              <div className="w-full max-w-xs bg-card border rounded-md p-4 text-sm space-y-2">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground col-span-1">Name:</span>
                  <span className="font-medium col-span-2">{aadhaarData.name}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground col-span-1">Aadhaar:</span>
                  <span className="font-medium col-span-2">{aadhaarData.number.replace(/(\d{4})/g, '$1 ').trim()}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground col-span-1">Status:</span>
                  <span className="text-green-600 dark:text-green-400 font-medium col-span-2">Verified</span>
                </div>
              </div>
            )}
            
            <Button 
              className="mt-6 w-full max-w-xs" 
              onClick={handleContinue}
            >
              Continue to Profile Setup
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === "error" && (
        <div className="space-y-6 py-4">
          <div className="flex flex-col items-center justify-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="rounded-full bg-red-100 dark:bg-red-900/40 p-3 mb-4">
              <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Verification Failed</h3>
            <p className="text-sm text-center text-muted-foreground mb-4">
              {errorMessage}
            </p>
            
            {/* Display image that failed (small version) */}
            {image && (
              <div className="relative rounded-lg overflow-hidden border mb-6 max-w-[200px]">
                <img src={image} alt="Aadhaar card" className="w-full h-auto" />
              </div>
            )}
            
            <Button 
              variant="default" 
              className="mt-2 w-full max-w-xs" 
              onClick={resetVerification}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      )}

      {/* Verification tips (only shown in upload step) */}
      {step === "upload" && (
        <div className="rounded-lg border bg-card p-4 mt-4">
          <h4 className="text-sm font-medium mb-2">Tips for successful verification:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li className="flex items-start gap-2">
              <span className="bg-primary/10 text-primary rounded-full p-0.5 text-[10px] mt-0.5">✓</span>
              Ensure the entire Aadhaar card is visible
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary/10 text-primary rounded-full p-0.5 text-[10px] mt-0.5">✓</span>
              Make sure the image is clear and well-lit
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary/10 text-primary rounded-full p-0.5 text-[10px] mt-0.5">✓</span>
              All text on the card should be readable
            </li>
          </ul>
        </div>
      )}
    </div>
  )
} 