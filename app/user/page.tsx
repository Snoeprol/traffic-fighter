'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/app/firebase/config'
import { signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, User, Mail, Camera, LogOut } from 'lucide-react'

interface UserProfile {
  name: string
  email: string
  avatar: string
}

export default function UserPage() {
  const [user, loading] = useAuthState(auth)
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    avatar: '',
  })
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    } else if (user) {
      fetchUserProfile()
    }
  }, [user, loading, router])

  const fetchUserProfile = async () => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)
      if (userDoc.exists()) {
        setProfile(userDoc.data() as UserProfile)
      } else {
        const defaultProfile = {
          name: user.displayName || '',
          email: user.email || '',
          avatar: user.photoURL || '',
        }
        await setDoc(userDocRef, defaultProfile)
        setProfile(defaultProfile)
      }
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      const userDocRef = doc(db, 'users', user.uid)
      await setDoc(userDocRef, profile, { merge: true })
      alert('Profile updated successfully!')
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ArrowRight className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-3xl font-bold mb-2">{profile.name}</CardTitle>
              <CardDescription>{profile.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Name
                  </Label>
                  <Input 
                    id="name" 
                    value={profile.name} 
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={profile.email} 
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatar" className="text-sm font-medium flex items-center">
                    <Camera className="w-4 h-4 mr-2" />
                    Profile Picture
                  </Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="avatar" 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onloadend = () => {
                            setProfile({...profile, avatar: reader.result as string})
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleLogout}
                      className="flex-shrink-0"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Save Changes <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}