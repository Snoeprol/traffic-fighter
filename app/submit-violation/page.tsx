'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '@/app/firebase/config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SubmitViolation() {
  const [user, loading] = useAuthState(auth);
  const [violationType, setViolationType] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [fineAmount, setFineAmount] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert('You must be logged in to submit a violation');
      router.push('/auth');
      return;
    }

    setSubmitting(true)

    try {
      const docRef = await addDoc(collection(db, 'violations'), {
        userId: user.uid,
        type: violationType,
        date,
        location,
        amount: Number(fineAmount),
        description,
        status: 'active',
        createdAt: new Date()
      });
      
      console.log("Document written with ID: ", docRef.id);

      // Reset form
      setViolationType('');
      setDate('');
      setLocation('');
      setFineAmount('');
      setDescription('');

      alert('Violation submitted successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting violation:', error);
      console.log(error)
      alert('Error submitting violation. Please try again.');
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div>Loading...</div>;

  if (!user) {
    router.push('/auth');
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Submit a Violation</h1>
      <Card>
        <CardHeader>
          <CardTitle>Violation Details</CardTitle>
          <CardDescription>Please provide information about your traffic violation</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="violationType">Violation Type</Label>
              <Select onValueChange={setViolationType} value={violationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select violation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="speeding">Speeding</SelectItem>
                  <SelectItem value="parking">Parking</SelectItem>
                  <SelectItem value="redLight">Red Light</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Date of Violation</Label>
              <Input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter location of violation" />
            </div>
            <div>
              <Label htmlFor="fineAmount">Fine Amount (€)</Label>
              <Input type="number" id="fineAmount" value={fineAmount} onChange={(e) => setFineAmount(e.target.value)} placeholder="Enter fine amount" />
            </div>
            <div>
              <Label htmlFor="description">Additional Details</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Provide any additional details about the violation" />
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Violation'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}