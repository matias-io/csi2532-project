"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
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
// import Link from "next/link"
import Footer from '@/components/Footer'
import { useUser } from "@clerk/nextjs"

type Hotel = {
  id: number
  name: string
  chain: string
  rating: number
  location: string
  price: number
  amenities: string[]
  roomType: string
  capacity: number
  size: number
  image: string
  description: string
}

type Filters = {
  priceRange: [number, number]
  chains: string[]
  ratings: number[]
  amenities: string[]
  roomTypes: string[]
  capacities: number[]
  sizeRange: [number, number]
}

export default function HotelsPage() {
  const searchParams = useSearchParams()
  const { user } = useUser()
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)
  const [bookingStatus, setBookingStatus] = useState<{
    success: boolean
    message: string
    bookingId?: string
  } | null>(null)

  // Initialize filters state
  const [filters, setFilters] = useState<Filters>({
    priceRange: [100, 500],
    chains: [],
    ratings: [],
    amenities: [],
    roomTypes: [],
    capacities: [],
    sizeRange: [25, 75]
  })

  // Get dates from URL params or use defaults (today +1 day)
  const defaultStart = new Date()
  const defaultEnd = new Date()
  defaultEnd.setDate(defaultEnd.getDate() + 1)

  const [dates, setDates] = useState({
    from: searchParams?.get('from') 
      ? new Date(searchParams?.get('from') as string)
      : defaultStart,
    to: searchParams?.get('to') 
      ? new Date(searchParams?.get('to') as string)
      : defaultEnd
  })

  // Fetch hotels on mount
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true)
        const response = await fetch('/data/search/hotels.json')
        const data = await response.json()
        setHotels(data.hotels)
        applyFilters(data.hotels, searchParams?.get('location') || '')
      } catch (error) {
        console.error("Failed to load hotels", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [])

  // Apply all filters to hotels
  const applyFilters = (hotelsToFilter: Hotel[], locationQuery: string) => {
    const filtered = hotelsToFilter.filter(hotel => {
      // Location filter
      if (locationQuery && !hotel.location.toLowerCase().includes(locationQuery.toLowerCase())) {
        return false
      }

      // Price filter
      if (hotel.price < filters.priceRange[0] || hotel.price > filters.priceRange[1]) {
        return false
      }

      // Chain filter
      if (filters.chains.length > 0 && !filters.chains.includes(hotel.chain)) {
        return false
      }

      // Rating filter
      if (filters.ratings.length > 0 && !filters.ratings.includes(Math.floor(hotel.rating))) {
        return false
      }

      // Amenities filter
      if (filters.amenities.length > 0 && !filters.amenities.every(a => hotel.amenities.includes(a))) {
        return false
      }

      // Room type filter
      if (filters.roomTypes.length > 0 && !filters.roomTypes.includes(hotel.roomType)) {
        return false
      }

      // Capacity filter
      if (filters.capacities.length > 0 && !filters.capacities.includes(hotel.capacity)) {
        return false
      }

      // Size filter
      if (hotel.size < filters.sizeRange[0] || hotel.size > filters.sizeRange[1]) {
        return false
      }

      return true
    })

    setFilteredHotels(filtered)
  }

  // Handle filter changes
  const handleFilterChange = (filterType: keyof Filters, value: unknown) => {
    const newFilters = {
      ...filters,
      [filterType]: value
    }
    setFilters(newFilters)
    applyFilters(hotels, searchParams?.get('location') || '')
  }

  // Handle booking
  const handleBookNow = async (hotelId: number) => {
    if (!user) {
      setBookingStatus({
        success: false,
        message: "Please sign in to book a room"
      })
      return
    }

    try {
      setLoading(true)
      setBookingStatus(null)

      // Calculate total price
      const hotel = hotels.find(h => h.id === hotelId)
      const nights = Math.ceil(
        (dates.to.getTime() - dates.from.getTime()) / (1000 * 60 * 60 * 24)
      )
      const totalPrice = hotel ? hotel.price * nights : 0

      //! Mock API call to backend for booking
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          hotelId,
          startDate: dates.from.toISOString(),
          endDate: dates.to.toISOString(),
          totalPrice
        }),
      })

      //? format of response from backend
      const result = await response.json()
      setBookingStatus({
        success: result.success,
        message: result.message,
        bookingId: result.bookingId
      })
    } catch (error) {
      setBookingStatus({
        success: false,
        message: "Booking failed. Please try again." + error
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading && hotels.length === 0) {
    return (
      <main className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div>Loading hotels...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-muted/30">
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
                    defaultValue={searchParams?.get('location') || ''}
                    className="pl-8 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="dates" className="text-primary-foreground">
                  Dates
                </Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div>
                    <Input
                      id="check-in"
                      type="date"
                      value={dates.from.toISOString().split('T')[0]}
                      onChange={(e) => {
                        const from = e.target.value ? new Date(e.target.value) : defaultStart
                        setDates({
                          from,
                          to: dates.to < from ? defaultEnd : dates.to
                        })
                      }}
                      className="bg-white/10 border-white/20 text-primary-foreground"
                    />
                  </div>
                  <div>
                    <Input
                      id="check-out"
                      type="date"
                      value={dates.to.toISOString().split('T')[0]}
                      min={dates.from.toISOString().split('T')[0]}
                      onChange={(e) => {
                        const to = e.target.value ? new Date(e.target.value) : defaultEnd
                        setDates({
                          from: dates.from,
                          to
                        })
                      }}
                      className="bg-white/10 border-white/20 text-primary-foreground"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {bookingStatus && (
          <div className={`p-4 rounded-md mb-6 ${
            bookingStatus.success 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {bookingStatus.message}
            {bookingStatus.bookingId && (
              <div className="mt-2 font-medium">
                Booking ID: {bookingStatus.bookingId}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-xs"
                    onClick={() => {
                      setFilters({
                        priceRange: [100, 500],
                        chains: [],
                        ratings: [],
                        amenities: [],
                        roomTypes: [],
                        capacities: [],
                        sizeRange: [25, 75]
                      })
                      applyFilters(hotels, searchParams?.get('location') || '')
                    }}
                  >
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
                      <Slider 
                        defaultValue={filters.priceRange}
                        min={0} 
                        max={1000} 
                        step={10}
                        onValueChange={(value) => handleFilterChange('priceRange', value as [number, number])}
                      />
                      <div className="flex items-center justify-between">
                        <div className="border rounded-md px-2 py-1 text-sm">${filters.priceRange[0]}</div>
                        <div className="text-sm text-muted-foreground">to</div>
                        <div className="border rounded-md px-2 py-1 text-sm">${filters.priceRange[1]}</div>
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
                          <Checkbox 
                            id={`chain-${chain}`}
                            checked={filters.chains.includes(chain)}
                            onCheckedChange={(checked) => {
                              const newChains = checked 
                                ? [...filters.chains, chain]
                                : filters.chains.filter(c => c !== chain)
                              handleFilterChange('chains', newChains)
                            }}
                          />
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
                          <Checkbox
                            id={`rating-${rating}`}
                            checked={filters.ratings.includes(rating)}
                            onCheckedChange={(checked) => {
                              const newRatings = checked
                                ? [...filters.ratings, rating]
                                : filters.ratings.filter(r => r !== rating)
                              handleFilterChange('ratings', newRatings)
                            }}
                          />
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
                          <Checkbox
                            id={`amenity-${amenity.label}`}
                            checked={filters.amenities.includes(amenity.label)}
                            onCheckedChange={(checked) => {
                              const newAmenities = checked
                                ? [...filters.amenities, amenity.label]
                                : filters.amenities.filter(a => a !== amenity.label)
                              handleFilterChange('amenities', newAmenities)
                            }}
                          />
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
                          <Checkbox
                            id={`room-${room.label}`}
                            checked={filters.roomTypes.includes(room.label)}
                            onCheckedChange={(checked) => {
                              const newRoomTypes = checked
                                ? [...filters.roomTypes, room.label]
                                : filters.roomTypes.filter(r => r !== room.label)
                              handleFilterChange('roomTypes', newRoomTypes)
                            }}
                          />
                          <Label htmlFor={`room-${room.label}`} className="text-sm font-normal flex items-center">
                            {room.icon}
                            {room.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-3">Room Capacity</h3>
                    <div className="space-y-2">
                      {[
                        { label: "1 Person", value: 1 },
                        { label: "2 People", value: 2 },
                        { label: "3 People", value: 3 },
                        { label: "4+ People", value: 4 },
                      ].map((capacity) => (
                        <div key={capacity.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`capacity-${capacity.value}`}
                            checked={filters.capacities.includes(capacity.value)}
                            onCheckedChange={(checked) => {
                              const newCapacities = checked
                                ? [...filters.capacities, capacity.value]
                                : filters.capacities.filter(c => c !== capacity.value)
                              handleFilterChange('capacities', newCapacities)
                            }}
                          />
                          <Label htmlFor={`capacity-${capacity.value}`} className="text-sm font-normal">
                            {capacity.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-3">Room Size</h3>
                    <div className="space-y-4">
                      <Slider 
                        defaultValue={filters.sizeRange}
                        min={15} 
                        max={150} 
                        step={5}
                        onValueChange={(value) => handleFilterChange('sizeRange', value as [number, number])}
                      />
                      <div className="flex items-center justify-between">
                        <div className="border rounded-md px-2 py-1 text-sm">{filters.sizeRange[0]} m²</div>
                        <div className="text-sm text-muted-foreground">to</div>
                        <div className="border rounded-md px-2 py-1 text-sm">{filters.sizeRange[1]} m²</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {filteredHotels.length} {filteredHotels.length === 1 ? 'Hotel' : 'Hotels'} Found
              </h2>
              <div className="flex items-center gap-2">
                <Label htmlFor="sort" className="text-sm">
                  Sort by:
                </Label>
                <select 
                  id="sort" 
                  className="text-sm border rounded-md px-2 py-1"
                  onChange={(e) => {
                    const sorted = [...filteredHotels]
                    switch(e.target.value) {
                      case 'Price: Low to High':
                        sorted.sort((a, b) => a.price - b.price)
                        break
                      case 'Price: High to Low':
                        sorted.sort((a, b) => b.price - a.price)
                        break
                      case 'Rating':
                        sorted.sort((a, b) => b.rating - a.rating)
                        break
                      default:
                        // Recommended (default sort)
                        break
                    }
                    setFilteredHotels(sorted)
                  }}
                >
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {filteredHotels.map((hotel) => (
                <Card key={hotel.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="relative h-48 md:h-full">
                        <Image
                          src={hotel.image || "/placeholder.svg"}
                          alt={hotel.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 md:col-span-2 flex flex-col">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{hotel.name}</h3>
                            <div className="flex items-center gap-1 mb-1">
                              {Array(Math.floor(hotel.rating))
                                .fill(0)
                                .map((_, i) => (
                                  <StarIcon key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <MapPinIcon className="h-3.5 w-3.5 mr-1" />
                              {hotel.location}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">From</div>
                            <div className="text-xl font-bold">${hotel.price}</div>
                            <div className="text-xs text-muted-foreground">per night</div>
                            <div className="text-sm mt-1">
                              Total: ${hotel.price * Math.ceil(
                                (dates.to.getTime() - dates.from.getTime()) / (1000 * 60 * 60 * 24)
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {hotel.amenities.slice(0, 4).map((amenity) => (
                            <span key={amenity} className="bg-muted px-2 py-0.5 rounded-full text-xs">
                              {amenity}
                            </span>
                          ))}
                        </div>

                        <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                          {hotel.description}
                        </p>

                        <div className="mt-auto pt-4 flex justify-between items-center">
                          <div className="text-sm">
                            <span className="font-medium text-green-600">Available</span> for your dates
                          </div>
                          <Button 
                            onClick={() => handleBookNow(hotel.id)}
                            disabled={loading}
                          >
                            {loading ? 'Processing...' : 'Book Now'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredHotels.length > 0 && (
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
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}