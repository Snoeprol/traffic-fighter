'use client'

import { useState, useEffect } from 'react'
import { collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/app/firebase/config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Violation {
  id: string;
  type: string;
  date: string;
  location: string;
  amount: number;
  status: 'active' | 'resolved';
  progress: number;
  timeline?: { date: string; event: string }[];
  files?: { name: string; url: string }[];
}

export default function Dashboard() {
  const [user] = useAuthState(auth);
  const [violations, setViolations] = useState<Violation[]>([]);

  useEffect(() => {
    const fetchViolations = async () => {
      if (user) {
        const violationsRef = collection(db, 'violations');
        const q = query(violationsRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const violationsData = await Promise.all(querySnapshot.docs.map(async (doc) => {
          const data = doc.data() as Omit<Violation, 'id'>;
          const fullDoc = await getDoc(doc.ref);
          return { 
            id: doc.id, 
            ...data, 
            ...fullDoc.data() as Omit<Violation, 'id'>
          } as Violation;
        }));
        setViolations(violationsData);
      }
    };

    fetchViolations();
  }, [user]);

  const activeViolations = violations.filter(v => v.status === 'active');
  const resolvedViolations = violations.filter(v => v.status === 'resolved');
  const successRate = resolvedViolations.length / violations.length * 100 || 0;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Violations</CardTitle>
            <CardDescription>Violations currently being processed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeViolations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resolved Violations</CardTitle>
            <CardDescription>Successfully contested violations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{resolvedViolations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Success Rate</CardTitle>
            <CardDescription>Percentage of successfully contested violations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{successRate.toFixed(1)}%</div>
            <Progress value={successRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active Violations</TabsTrigger>
            <TabsTrigger value="resolved">Resolved Violations</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Violations</CardTitle>
                <CardDescription>Details of your current active violations</CardDescription>
              </CardHeader>
              <CardContent>
                {activeViolations.map(violation => (
                  <Dialog key={violation.id}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full mb-4 justify-between">
                        <span>{violation.type}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>{violation.type}</DialogTitle>
                        <DialogDescription>Case Details</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold mb-2">Case Information</h3>
                          <p>Date: {violation.date}</p>
                          <p>Location: {violation.location}</p>
                          <p>Amount: €{violation.amount}</p>
                          <p>Status: {violation.status}</p>
                          <div className="mt-4">
                            <h4 className="font-semibold mb-2">Progress</h4>
                            <Progress value={violation.progress} className="mb-2" />
                            <p>{violation.progress}% Complete</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Timeline</h3>
                          <ScrollArea className="h-[200px]">
                            {violation.timeline && violation.timeline.length > 0 ? (
                              violation.timeline.map((event, index) => (
                                <div key={index} className="mb-2">
                                  <p className="text-sm text-muted-foreground">{event.date}</p>
                                  <p>{event.event}</p>
                                </div>
                              ))
                            ) : (
                              <p>No timeline events available.</p>
                            )}
                          </ScrollArea>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h3 className="font-semibold mb-2">Uploaded Files</h3>
                        {violation.files && violation.files.length > 0 ? (
                          violation.files.map((file, index) => (
                            <Button key={index} variant="outline" className="mr-2 mb-2">
                              <FileText className="mr-2 h-4 w-4" />
                              <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                            </Button>
                          ))
                        ) : (
                          <p>No files uploaded.</p>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="resolved">
            <Card>
              <CardHeader>
                <CardTitle>Resolved Violations</CardTitle>
                <CardDescription>History of your resolved violations</CardDescription>
              </CardHeader>
              <CardContent>
                {resolvedViolations.map(violation => (
                  <Dialog key={violation.id}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full mb-4 justify-between">
                        <span>{violation.type}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>{violation.type}</DialogTitle>
                        <DialogDescription>Case Details</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold mb-2">Case Information</h3>
                          <p>Date: {violation.date}</p>
                          <p>Location: {violation.location}</p>
                          <p>Amount: €{violation.amount}</p>
                          <p>Status: {violation.status}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Timeline</h3>
                          <ScrollArea className="h-[200px]">
                            {violation.timeline && violation.timeline.length > 0 ? (
                              violation.timeline.map((event, index) => (
                                <div key={index} className="mb-2">
                                  <p className="text-sm text-muted-foreground">{event.date}</p>
                                  <p>{event.event}</p>
                                </div>
                              ))
                            ) : (
                              <p>No timeline events available.</p>
                            )}
                          </ScrollArea>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h3 className="font-semibold mb-2">Documents</h3>
                        {violation.documents && violation.documents.length > 0 ? (
                          violation.documents.map((doc, index) => (
                            <Button key={index} variant="outline" className="mr-2 mb-2">
                              <FileText className="mr-2 h-4 w-4" />
                              <a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.name}</a>
                            </Button>
                          ))
                        ) : (
                          <p>No documents available.</p>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-10">
        <Button asChild>
          <a href="/submit-violation">Submit New Violation</a>
        </Button>
      </div>
    </div>
  )
}