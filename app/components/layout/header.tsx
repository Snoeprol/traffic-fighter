'use client'

import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { Button } from "@/components/ui/button"
import { Scale } from 'lucide-react'

export function Header() {
  const [user] = useAuthState(auth);

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <nav className="container mx-auto flex justify-between items-center h-16">
        <div className="flex items-center space-x-2 ml-4">
          <Scale className="h-6 w-6 text-primary" />
          <Link href="/" className="text-2xl font-bold">
            Traffic Fine Fighter
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Dashboard
              </Link>
              <Link href="/submit-violation" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Submit Violation
              </Link>
              <Link href="/user" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Sign In / Sign Up
              </Link>
              <Button asChild>
                <Link href="/auth">Get Started</Link>
              </Button>
            </>
          )}
          <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  )
}