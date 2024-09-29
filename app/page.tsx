'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Gavel, Calculator } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        {icon}
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
)

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary mb-4">
            Welcome to Traffic Fine Fighter
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Automatically fight Dutch traffic fines and violations with AI assistance.
          </p>
          <Button size="lg" asChild>
            <Link href="/auth">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <Separator className="my-16" />

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-primary" />}
              title="Upload Your Fine"
              description="Securely upload your traffic fine details to our platform."
            />
            <FeatureCard
              icon={<Calculator className="h-6 w-6 text-primary" />}
              title="AI Analysis"
              description="Our AI analyzes your case and prepares the best defense strategy."
            />
            <FeatureCard
              icon={<Gavel className="h-6 w-6 text-primary" />}
              title="Automatic Appeal"
              description="We automatically submit an appeal on your behalf to fight the fine."
            />
          </div>
        </section>

        <section>
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle>Ready to Fight Your Traffic Fine?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Join thousands of satisfied users who have successfully contested their fines using our AI-powered service.</p>
            </CardContent>
            <CardFooter>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/auth">Sign Up Now</Link>
              </Button>
            </CardFooter>
          </Card>
        </section>
      </main>
    </div>
  )
}