"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, MapPinIcon, SearchIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/Footer"
import { HotelChainCarousel } from "@/components/hotel-chain-carousel"
import { SignedIn, SignedOut } from '@clerk/nextjs'

type Destination = {
  name: string
  hotels: number
  image: string
}

type Reservation = {
  id: string
  hotelName: string
  dateRange: { start: string; end: string }
}

export default function Home() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [location, setLocation] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null })
  const [viewingReservations, setViewingReservations] = useState(false)
  const [reservations, setReservations] = useState<Reservation[]>([])

  useEffect(() => {
    fetch("https://test-deployment-iq7z.onrender.com/get/destinations")
      .then(res => res.json())
      .then((data: { destinations: Destination[] }) => {
        if (data?.destinations?.length) {
          const includesMontreal = data.destinations.some(dest => dest.name === "Montreal")
          const allDestinations = includesMontreal
            ? data.destinations
            : [...data.destinations, {
              name: "Montreal",
              hotels: 21,
              image: "https://eircgcvplkpzypudsajc.supabase.co/storage/v1/object/public/hotel-images/destinations/YUL.jpg"
            }]
          setDestinations(allDestinations)
        } else {
          throw new Error("No destinations")
        }
      })
      .catch(() => {
        setDestinations([
          {
            name: "New York City",
            hotels: 45,
            image: "https://eircgcvplkpzypudsajc.supabase.co/storage/v1/object/public/hotel-images/destinations/JFK.jpg"
          },
          {
            name: "Toronto",
            hotels: 32,
            image: "https://eircgcvplkpzypudsajc.supabase.co/storage/v1/object/public/hotel-images/destinations/YYZ.jpg"
          },
          {
            name: "Montreal",
            hotels: 21,
            image: "https://eircgcvplkpzypudsajc.supabase.co/storage/v1/object/public/hotel-images/destinations/YUL.jpg"
          }
        ])
      })
  }, [])

  useEffect(() => {
    if (viewingReservations) {
      fetch("/api/user/reservations") // replace with your actual backend route
        .then(res => res.json())
        .then((data: { reservations: Reservation[] }) => setReservations(data.reservations))
        .catch(() => console.error("Failed to load reservations"))
    }
  }, [viewingReservations])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.append("location", location)
    if (dateRange.from && dateRange.to) {
      params.append("from", dateRange.from.toISOString())
      params.append("to", dateRange.to.toISOString())
    }
    window.location.href = `/search?${params.toString()}`
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Search Section */}
      <section className="bg-primary text-primary-foreground pb-8 pt-2">
        <div className="container mx-auto px-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-xl">Find Your Perfect Stay</CardTitle>
              <CardDescription className="text-primary-foreground/70">
                Search across 5 premium hotel chains with real-time availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="search" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="search">Search Hotels</TabsTrigger>
                  <TabsTrigger value="reservations" onClick={() => setViewingReservations(true)}>My Reservations</TabsTrigger>
                </TabsList>

                <TabsContent value="search">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="pt-4 md:col-span-2">
                      <Label htmlFor="location" className="text-primary-foreground">Location</Label>
                      <div className="relative mt-1">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          value={location}
                          onChange={e => setLocation(e.target.value)}
                          placeholder="City, hotel, or landmark"
                          className="pl-8 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="dates" className="text-primary-foreground">Dates</Label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div>
                          <Label htmlFor="check-in" className="text-xs text-white">Check-in</Label>
                          <Input
                            id="check-in"
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => {
                              const from = e.target.value ? new Date(e.target.value) : null
                              setDateRange(prev => ({ from, to: prev.to }))
                            }}
                            className="bg-white/10 border-white/20 text-primary-foreground"
                          />
                        </div>
                        <div>
                          <Label htmlFor="check-out" className="text-xs text-white">Check-out</Label>
                          <Input
                            id="check-out"
                            type="date"
                            min={dateRange.from ? dateRange.from.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                            onChange={(e) => {
                              const to = e.target.value ? new Date(e.target.value) : null
                              setDateRange(prev => ({ from: prev.from, to }))
                            }}
                            className="bg-white/10 border-white/20 text-primary-foreground"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button className="bg-neutral-500 w-full md:w-auto" onClick={handleSearch}>
                      Search Available Rooms
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="reservations">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <SignedOut>
                      <CalendarIcon className="h-10 w-10 mb-2 opacity-80 color-white" />
                      <h3 className="text-lg font-medium text-white">View Your Reservations</h3>
                      <p className="text-sm text-primary-foreground/70 mt-1 mb-4">
                        Login to see your upcoming and past bookings
                      </p>
                    </SignedOut>

                    <SignedIn>
                      <ul className="text-white text-left max-w-md">
                        {reservations.map(res => (
                          <li key={res.id}>
                            <strong>{res.hotelName}</strong> – {res.dateRange.start} to {res.dateRange.end}
                          </li>
                        ))}
                      </ul>
                    </SignedIn>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Hotel Chains */}
      <section className="py-12 container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Featured Hotel Chains</h2>
        <HotelChainCarousel />
      </section>

      {/* Popular Destinations */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <Link
                href={`/search?location=${encodeURIComponent(destination.name)}`}
                key={destination.name}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-md transition-all group-hover:shadow-lg">
                  <div className="relative h-48">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-xl font-bold">{destination.name}</h3>
                      <p className="text-sm flex items-center gap-1">
                        <MapPinIcon className="h-3.5 w-3.5" />
                        {destination.hotels} hotels
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
