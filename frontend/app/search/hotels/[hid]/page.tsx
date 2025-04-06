"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BedDoubleIcon, CheckIcon, CoffeeIcon, MapPinIcon, StarIcon, WifiIcon } from "lucide-react"
import Image from "next/image"

// import { useSearchParams } from 'next/navigation'
// import { useRouter } from 'next/router'
import { use } from 'react'

export default function HotelDetailPage( { params }: { params: Promise<{ hid: string }> }) {
  
  const { hid } = use(params);
  const hotelhid = hid || '1' // Default to '1' if no hid is provided
  // const router = useRouter()
  // const { hotelhid } = router.query


  // This would normally fetch hotel data based on the hid
  // const searchParams = useSearchParams({params})
  

  // if(!searchParams?.has('hid')) {
  //   return <div>No hotel selected</div>
  // } else {
  //   const hotelhid = searchParams.get('hid')


 

  return (
    <main className="min-h-screen">
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex gap-2">
              <h1 className="text-2xl md:text-3xl font-bold">Grand Hotel {hotelhid}</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
                <span className="text-sm">4-star hotel</span>
                <span className="text-sm flex items-center">
                  <MapPinIcon className="h-3.5 w-3.5 mr-1" />
                  Downtown, New York
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="col-span-2 relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=1200"
                  alt="Hotel main image"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-40 rounded-lg overflow-hidden">
                <Image src="/placeholder.svg?height=300&width=400" alt="Hotel image" fill className="object-cover" />
              </div>
              <div className="relative h-40 rounded-lg overflow-hidden">
                <Image src="/placeholder.svg?height=300&width=400" alt="Hotel image" fill className="object-cover" />
              </div>
            </div>

            <Tabs defaultValue="rooms" className="mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
              </TabsList>
              <TabsContent value="rooms" className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
                <div className="space-y-6">
                  {[
                    { name: "Standard Room", price: 120, capacity: "2 guests", size: "25m²", bed: "1 Queen" },
                    { name: "Deluxe Room", price: 180, capacity: "2 guests", size: "35m²", bed: "1 King" },
                    { name: "Junior Suite", price: 250, capacity: "3 guests", size: "45m²", bed: "1 King + 1 Sofa" },
                    { name: "Executive Suite", price: 350, capacity: "4 guests", size: "60m²", bed: "2 Queen" },
                  ].map((room, index) => (
                    <Card key={index}>
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="relative h-48 md:h-full">
                            <Image
                              src={`/placeholder.svg?height=300&width=400`}
                              alt={room.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4 md:col-span-2 flex flex-col">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-lg">{room.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                  <span className="flex items-center">
                                    <BedDoubleIcon className="h-3.5 w-3.5 mr-1" />
                                    {room.bed}
                                  </span>
                                  <span>{room.size}</span>
                                  <span>{room.capacity}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-muted-foreground">Price per night</div>
                                <div className="text-xl font-bold">${room.price}</div>
                              </div>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                              {["Free Wi-Fi", "Breakfast included", "Air conditioning", "TV"].map((amenity) => (
                                <span key={amenity} className="flex items-center text-xs text-muted-foreground">
                                  <CheckIcon className="h-3 w-3 mr-1" />
                                  {amenity}
                                </span>
                              ))}
                            </div>

                            <p className="text-sm text-muted-foreground mt-3">
                              Comfortable and well-appointed room with all essential amenities for a pleasant stay.
                            </p>

                            <div className="mt-auto pt-4 flex justify-between items-center">
                              <div className="text-sm">
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  Available
                                </Badge>
                              </div>
                              <Button>Book Now</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="amenities" className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Hotel Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                  {[
                    { icon: <WifiIcon className="h-4 w-4 mr-2" />, name: "Free Wi-Fi" },
                    { icon: <CoffeeIcon className="h-4 w-4 mr-2" />, name: "Breakfast Available" },
                    { icon: <BedDoubleIcon className="h-4 w-4 mr-2" />, name: "Room Service" },
                    { icon: null, name: "Swimming Pool" },
                    { icon: null, name: "Fitness Center" },
                    { icon: null, name: "Business Center" },
                    { icon: null, name: "Conference Rooms" },
                    { icon: null, name: "Parking" },
                    { icon: null, name: "Restaurant" },
                    { icon: null, name: "Bar/Lounge" },
                    { icon: null, name: "Concierge Service" },
                    { icon: null, name: "Laundry Service" },
                  ].map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      {amenity.icon || <CheckIcon className="h-4 w-4 mr-2" />}
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle>About Grand Hotel {hotelhid}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Located in the heart of downtown, Grand Hotel {hotelhid} offers luxurious accommodations with modern
                  amenities and exceptional service. Our hotel features spacious rooms, a state-of-the-art fitness
                  center, an indoor swimming pool, and multiple dining options.
                </p>
                <p className="text-muted-foreground mt-4">
                  Whether you&apos;re traveling for business or leisure, our dedicated staff is committed to ensuring your
                  stay is comfortable and memorable. The hotel is conveniently located near major attractions, shopping
                  centers, and business districts.
                </p>
              </CardContent>
            </Card>
          </div>

         
        </div>
      </div>
    </main>
  )
}
