// app/search/hotels/[hid]/page.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarIcon, MapPinIcon, WifiIcon, CoffeeIcon } from "lucide-react"
// import { DatePickerWithRange } from "@/components/date-range-picker"
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { use } from "react";


type Hotel = {
  id: number | undefined
  name: string | undefined
  description: string | undefined
  rating: number  | undefined
  address: string | undefined
  amenities: string[]
  images: string[]
  rooms: {
    id: number
    type: string
    description: string
    price: number
    size: number
    capacity: number
    amenities: string[]
    available: boolean
  }[]
}

type BookingStatus = {
  success: boolean
  message: string
  bookingId?: string
}

type HotelChain = {
  chain_id: number | undefined;
  central_office_address: string;
  num_hotels: number;
  contact_email: string;
  contact_number: string;
  name: string;
  logo_url: string;
  number_of_hotels: number;
  hotel_chain_classification: number;
  hotel_chain_images_url: string;
};

export default function HotelPage({ params }: { params: Promise<{ hid: string }> }) {
  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null)
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>()
  const [bookingStatus, setBookingStatus] = useState<BookingStatus | null>(null)
  const { user } = useUser()
  const { hid } = use(params);
  // let chain : HotelChain[] = [];


  function findHotelChainByName(chainName: string, chain: HotelChain[]): HotelChain | null {
  for (const hotel of chain as HotelChain[]) {
    if (hotel.chain_id == Number(chainName)) {
      console.log("Hotel found")
      console.log(hotel.chain_id)
      console.log(chainName)
      console.log(hotel)
      return hotel;
    } else{
      console.log(hotel.chain_id)
      console.log(chainName)
      console.log("Hotel not found")
    }
  }
  return null;
}

  //! API RECIEVE Fetch hotel data
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://test-deployment-iq7z.onrender.com/get/hotelchain`)
        if (!response.ok) throw new Error("Hotel not found")
        const chain = await response.json()
        const dataraw = findHotelChainByName(hid, chain)
        const data = {
            id: dataraw?.chain_id,
            name: dataraw?.name,
            description: "Luxury accommodations",
            rating: dataraw?.hotel_chain_classification,
            address: dataraw?.central_office_address,
            amenities: ["Wi-Fi", "Pool", "Gym", "Restaurant", "Spa"],
            images: [`https://eircgcvplkpzypudsajc.supabase.co/storage/v1/object/public/logo/${dataraw?.logo_url}`, 
            `https://eircgcvplkpzypudsajc.supabase.co/storage/v1/object/public/hotel-images/hotel-chain/${dataraw?.hotel_chain_images_url}.jpg`],
            rooms: [
                {
                  "id": 101,
                  "type": "Standard",
                  "description": "Comfortable room with city view",
                  "price": 200,
                  "size": 25,
                  "capacity": 2,
                  "amenities": ["Wi-Fi", "TV", "Air Conditioning"],
                  "available": true
                },
                {
                  "id": 102,
                  "type": "Deluxe",
                  "description": "Spacious room with king bed",
                  "price": 350,
                  "size": 35,
                  "capacity": 2,
                  "amenities": ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar"],
                   "available": false
                }
            ]
        }
        setHotel(data)
      } catch (err) {
        setError(`Failed to load hotel details: ${err instanceof Error ? err.message : String(err)}`)
      } finally {
        setLoading(false)
      }
    }

    fetchHotel()
  }, [hid])

  const handleBookNow = async (roomId: number) => {
    if (!dateRange || !dateRange.from || !dateRange.to) {
      setBookingStatus({
        success: false,
        message: "Please select check-in and check-out dates"
      })
      return
    }

    if (!user) {
      setBookingStatus({
        success: false,
        message: "Please sign in to book a room"
      })
      return
    }

    setSelectedRoom(roomId)
    setBookingStatus(null)

    try {
      setLoading(true)
      
      // Mock API request payload
      const bookingData = {
        userId: user.id,
        hotelId: hid,
        roomId,
        startDate: dateRange.from,
        endDate: dateRange.to,
        guestCount: 1, // Default to 1, could be made configurable
      }


      // For demo, we'll simulate an API call with a timeout
      const response = await simulateBookingApi(bookingData)

      setBookingStatus({
        success: response.success,
        message: response.message,
        bookingId: response.bookingId
      })

      // On success, we could refresh room availability
      if (response.success && hotel) {
        const updatedHotel = {
          ...hotel,
          rooms: hotel.rooms.map(room => 
            room.id === roomId ? { ...room, available: false } : room
          )
        }
        setHotel(updatedHotel)
      }
    } catch (err) {
      setBookingStatus({
        success: false,
        message: "Booking failed. Please try again." + err
      }
      
    )
    } finally {
      setLoading(false)
    }
  }

  const calculateTotalPrice = (roomId: number) => {
    if (!dateRange || !hotel) return 0
    const room = hotel.rooms.find(r => r.id === roomId)
    if (!room) return 0
    
    const nights = Math.ceil(
      (dateRange.to!.getTime() - dateRange.from!.getTime()) / (1000 * 60 * 60 * 24)
    )
    return room.price * nights
  }


//   const bookRoom = async (bookingData: {
//   userId: string;
//   hotelId: string;
//   roomId: number;
//   startDate: Date;
//   endDate: Date;
//   guestCount: number;
// }): Promise<{ success: boolean; bookingId?: string; message?: string }> => {
//   //! This would be the actual API endpoint to book
//   const response = await fetch('/api/bookings', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(bookingData),
//   });
//   return await response.json();
// };




  // Mock API simulation function
  const simulateBookingApi = async (bookingData: {
  userId: string;
  hotelId: string;
  roomId: number;
  startDate: Date;
  endDate: Date;
  guestCount: number;
}): Promise<{
    success: boolean
    message: string
    bookingId?: string
  }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        // Simulate 80% success rate for demo
        const success = Math.random() > 0.2
        
        console.log(bookingData)
        if (success) {
          resolve({
            success: true,
            message: "Booking confirmed! Your reservation ID is BKG-" + Math.random().toString(36).substring(2, 10),
            bookingId: "BKG-" + Math.random().toString(36).substring(2, 10)
          })
        } else {
          resolve({
            success: false,
            message: "Room no longer available. Please select another room or dates."
          })
        }
      }, 1000) // Simulate network delay
    })
  }

  if (loading && !hotel) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
  if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
          <div className="flex items-center gap-1 mb-4">
            {Array(Math.floor(hotel.rating ?? 3)).fill(0).map((_, i) => (
              <StarIcon key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              {(hotel.rating ?? 3).toFixed(1)}
            </span>
          </div>
          <div className="flex items-center text-muted-foreground mb-6">
            <MapPinIcon className="h-4 w-4 mr-1" />
            {hotel.address}
          </div>
          
          {/* Image gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {hotel.images.map((image, index) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`${hotel.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Description */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-black">About This Hotel</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{hotel.description}</p>
            </CardContent>
          </Card>
          
          {/* Amenities */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-black">Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hotel.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center">
                    {amenity === 'Wi-Fi' && <WifiIcon className="h-4 w-4 mr-2" />}
                    {amenity === 'Breakfast' && <CoffeeIcon className="h-4 w-4 mr-2" />}
                    {amenity}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Date Selection */}
<Card className="mb-8">
  <CardHeader>
    <CardTitle className="text-black">Select Dates</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="check-in">Check-in Date</Label>
        <Input
          id="check-in"
          type="date"
          value={dateRange?.from?.toISOString().split('T')[0] || ''}
          onChange={(e) => {
            const from = e.target.value ? new Date(e.target.value) : undefined
            setDateRange(prev => ({
              from,
              to: prev?.to && from && prev.to < from ? undefined : prev?.to
            }))
          }}
          min={new Date().toISOString().split('T')[0]} // Disable past dates
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="check-out">Check-out Date</Label>
        <Input
          id="check-out"
          type="date"
          value={dateRange?.to?.toISOString().split('T')[0] || ''}
          onChange={(e) => {
            const to = e.target.value ? new Date(e.target.value) : undefined
            setDateRange(prev => ({
              from: prev?.from,
              to
            }))
          }}
          min={dateRange?.from?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0]}
          className="mt-1"
        />
      </div>
    </div>
  </CardContent>
</Card>
          
          {/* Booking Status */}
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
          
          {/* Rooms */}
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Available Rooms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {hotel.rooms.map(room => (
                  <Card key={room.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="relative h-48 md:h-full">
                          <Image
                            src="/placeholder.svg"
                            alt={room.type}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4 md:col-span-2 flex flex-col">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">{room.type} Room</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {room.size}m² • {room.capacity} {room.capacity > 1 ? 'people' : 'person'}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold">${room.price}</div>
                              <div className="text-xs text-muted-foreground">per night</div>
                              {dateRange && dateRange.from && dateRange.to && (
                                <div className="text-sm mt-1">
                                  Total: ${calculateTotalPrice(room.id)}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mt-2">{room.description}</p>
                          
                          <div className="mt-4 flex flex-wrap gap-2">
                            {room.amenities.map(amenity => (
                              <span key={amenity} className="bg-muted px-2 py-0.5 rounded-full text-xs">
                                {amenity}
                              </span>
                            ))}
                          </div>
                          
                          <div className="mt-auto pt-4 flex justify-end">
                            <Button 
                              onClick={() => handleBookNow(room.id)}
                              disabled={loading || !room.available || !dateRange}
                            >
                              {loading && selectedRoom === room.id ? (
                                "Processing..."
                              ) : room.available ? (
                                "Book Now"
                              ) : (
                                "Booked"
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}