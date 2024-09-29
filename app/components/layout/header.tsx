'use client'

import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { Button } from "@/components/ui/button"
import { Scale, Menu } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [user] = useAuthState(auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Scale className="h-6 w-6 text-primary" />
            <Link href="/" className="text-xl font-bold">
              Traffic Fine Fighter
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
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
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden py-2">
            {user ? (
              <>
                <Link href="/dashboard" className="block py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                  Dashboard
                </Link>
                <Link href="/submit-violation" className="block py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                  Submit Violation
                </Link>
                <Link href="/user" className="block py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth" className="block py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                  Sign In / Sign Up
                </Link>
                <Button asChild className="w-full mt-2">
                  <Link href="/auth">Get Started</Link>
                </Button>
              </>
            )}
            <Link href="/contact" className="block py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}