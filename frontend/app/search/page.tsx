import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import {
  BedDoubleIcon,
  CoffeeIcon,
  FilterIcon,
  MapPinIcon,
  SearchIcon,
  StarIcon,
  WifiIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { DatePickerWithRange } from "@/components/date-range-picker"


import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';


export default function HotelsPage() {
  return (
    <main className="min-h-screen bg-muted/30">

        <Navbar />
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Find Your Perfect Hotel</h1>
          <div className="bg-white/10 border border-white/20 rounded-lg p-4">
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
              <Button className="w-full md:w-auto">Search Hotels</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg">Filters</h2>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    Clear all
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <FilterIcon className="h-4 w-4" />
                      Price Range
                    </h3>
                    <div className="space-y-4">
                      <Slider defaultValue={[100, 500]} min={0} max={1000} step={10} />
                      <div className="flex items-center justify-between">
                        <div className="border rounded-md px-2 py-1 text-sm">$100</div>
                        <div className="text-sm text-muted-foreground">to</div>
                        <div className="border rounded-md px-2 py-1 text-sm">$500</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-3">Hotel Chain</h3>
                    <div className="space-y-2">
                      {[
                        "Luxury Resorts International",
                        "Grand Hotels & Suites",
                        "Comfort Inn Collection",
                        "Urban Stay Hotels",
                        "Mountain View Resorts",
                      ].map((chain) => (
                        <div key={chain} className="flex items-center space-x-2">
                          <Checkbox id={`chain-${chain}`} />
                          <Label htmlFor={`chain-${chain}`} className="text-sm font-normal">
                            {chain}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-3">Star Rating</h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <Checkbox id={`rating-${rating}`} />
                          <Label htmlFor={`rating-${rating}`} className="text-sm font-normal flex">
                            {Array(rating)
                              .fill(0)
                              .map((_, i) => (
                                <StarIcon key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-3">Amenities</h3>
                    <div className="space-y-2">
                      {[
                        { label: "Wi-Fi", icon: <WifiIcon className="h-3.5 w-3.5 mr-1.5" /> },
                        { label: "Breakfast", icon: <CoffeeIcon className="h-3.5 w-3.5 mr-1.5" /> },
                        { label: "Air Conditioning", icon: null },
                        { label: "Swimming Pool", icon: null },
                        { label: "Gym", icon: null },
                        { label: "Parking", icon: null },
                      ].map((amenity) => (
                        <div key={amenity.label} className="flex items-center space-x-2">
                          <Checkbox id={`amenity-${amenity.label}`} />
                          <Label htmlFor={`amenity-${amenity.label}`} className="text-sm font-normal flex items-center">
                            {amenity.icon}
                            {amenity.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-3">Room Type</h3>
                    <div className="space-y-2">
                      {[
                        { label: "Single", icon: <BedDoubleIcon className="h-3.5 w-3.5 mr-1.5" /> },
                        { label: "Double", icon: <BedDoubleIcon className="h-3.5 w-3.5 mr-1.5" /> },
                        { label: "Suite", icon: <BedDoubleIcon className="h-3.5 w-3.5 mr-1.5" /> },
                        { label: "Family Room", icon: <BedDoubleIcon className="h-3.5 w-3.5 mr-1.5" /> },
                      ].map((room) => (
                        <div key={room.label} className="flex items-center space-x-2">
                          <Checkbox id={`room-${room.label}`} />
                          <Label htmlFor={`room-${room.label}`} className="text-sm font-normal flex items-center">
                            {room.icon}
                            {room.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full">Apply Filters</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">24 Hotels Found</h2>
              <div className="flex items-center gap-2">
                <Label htmlFor="sort" className="text-sm">
                  Sort by:
                </Label>
                <select id="sort" className="text-sm border rounded-md px-2 py-1">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((hotel) => (
                <Card key={hotel} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="relative h-48 md:h-full">
                        <Image
                          src={`/placeholder.svg?height=300&width=400`}
                          alt={`Hotel ${hotel}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 md:col-span-2 flex flex-col">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">Grand Hotel {hotel}</h3>
                            <div className="flex items-center gap-1 mb-1">
                              {Array(Math.floor(Math.random() * 3) + 3)
                                .fill(0)
                                .map((_, i) => (
                                  <StarIcon key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <MapPinIcon className="h-3.5 w-3.5 mr-1" />
                              Downtown, New York
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">From</div>
                            <div className="text-xl font-bold">${Math.floor(Math.random() * 300) + 100}</div>
                            <div className="text-xs text-muted-foreground">per night</div>
                          </div>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {["Wi-Fi", "Breakfast", "Pool", "Parking"].map((amenity) => (
                            <span key={amenity} className="bg-muted px-2 py-0.5 rounded-full text-xs">
                              {amenity}
                            </span>
                          ))}
                        </div>

                        <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                          Experience luxury and comfort in the heart of the city. Our spacious rooms offer stunning
                          views and modern amenities for a perfect stay.
                        </p>

                        <div className="mt-auto pt-4 flex justify-between items-center">
                          <div className="text-sm">
                            <span className="font-medium text-green-600">Available</span> for your dates
                          </div>
                          <Button asChild>
                            <Link href={`/hotels/${hotel}`}>View Rooms</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <nav className="flex items-center gap-1">
                <Button variant="outline" size="icon" disabled>
                  <span className="sr-only">Previous page</span>
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 bg-primary text-primary-foreground">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  3
                </Button>
                <Button variant="outline" size="icon">
                  <span className="sr-only">Next page</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

