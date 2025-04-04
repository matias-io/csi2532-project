import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, MapPinIcon, SearchIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { HotelChainCarousel } from "@/components/hotel-chain-carousel"


import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

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
                  <TabsTrigger value="reservations">My Reservations</TabsTrigger>
                </TabsList>
                <TabsContent value="search">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="location" className="text-primary-foreground">
                        Location
                      </Label>
                      <div className="relative mt-1">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          placeholder="City, hotel, or landmark"
                          className="pl-8 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="dates" className="text-primary-foreground">
                        Dates
                      </Label>
                      <div className="mt-1">
                        <DatePickerWithRange className="bg-white/10 border-white/20" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button className="w-full md:w-auto">
                      <Link href="/search"> Search Available Rooms </Link>
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="reservations">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CalendarIcon className="h-10 w-10 mb-2 opacity-80" />
                    <h3 className="text-lg font-medium">View Your Reservations</h3>
                    <p className="text-sm text-primary-foreground/70 mt-1 mb-4">
                      Login to see your upcoming and past bookings
                    </p>
                    <Button variant="secondary" asChild>
                      <Link href="/auth/login">Login to View</Link>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Featured Hotel Chains</h2>
        <HotelChainCarousel />
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "New York", hotels: 24, image: "/placeholder.svg?height=300&width=400" },
              { name: "Los Angeles", hotels: 18, image: "/placeholder.svg?height=300&width=400" },
              { name: "Chicago", hotels: 15, image: "/placeholder.svg?height=300&width=400" },
              { name: "Toronto", hotels: 12, image: "/placeholder.svg?height=300&width=400" },
              { name: "Vancouver", hotels: 9, image: "/placeholder.svg?height=300&width=400" },
              { name: "Montreal", hotels: 11, image: "/placeholder.svg?height=300&width=400" },
            ].map((destination, index) => (
              <Link href={`/hotels?location=${destination.name}`} key={index} className="group">
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

