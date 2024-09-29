import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin } from "lucide-react"

export default function Contact() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>We're here to help with your traffic fine concerns.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">If you have any questions or need assistance, please don't hesitate to reach out to us.</p>
            <p className="mb-2"><strong>Email:</strong> support@trafficfinefighter.com</p>
            <p className="mb-2"><strong>Phone:</strong> +31 20 123 4567</p>
            <p className="mb-2"><strong>Address:</strong> Prinsengracht 123, 1015 Amsterdam, Netherlands</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Connect with Our Expert</CardTitle>
            <CardDescription>Reach out to Mario van Rooij on LinkedIn</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Mario van Rooij is our lead traffic fine expert. Connect with him on LinkedIn for professional insights and advice.</p>
            <Button asChild>
              <a href="https://www.linkedin.com/in/mario-van-rooij" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Linkedin className="mr-2 h-4 w-4" /> Connect on LinkedIn
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}