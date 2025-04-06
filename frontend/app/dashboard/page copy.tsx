import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
// import { DatePickerWithRange } from "@/components/date-range-picker"
import {
  // CreditCardIcon,
  // UserIcon,
  SearchIcon

} from "lucide-react"
// import Link from "next/link"
import { Badge } from "@/components/ui/badge"
// import { Textarea } from "@/components/ui/textarea"

export default function EmployeeSettings() {
  return (
    <div className="flex min-h-screen px-8 m-8">


      <div className="flex-1">
        

        <main className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Manage your profile and hotel information</p>
            </div>
          </div>

          <Tabs defaultValue="profile" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="hotel">Hotel Information</TabsTrigger>
              <TabsTrigger value="rooms">Room Management</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Employee Profile</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                

                  <Separator />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="employee-id">Employee ID</Label>
                      <Input id="employee-id" defaultValue="EMP-10042" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" defaultValue="Front Desk Manager" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@hotelconnect.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" defaultValue="123 Main St" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" defaultValue="New York" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">Zip Code</Label>
                      <Input id="zip" defaultValue="10001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ssn">Social Security Number</Label>
                      <Input id="ssn" defaultValue="XXX-XX-1234" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hire-date">Hire Date</Label>
                      <Input id="hire-date" type="date" defaultValue="2022-05-15" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="hotel" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hotel Information</CardTitle>
                  <CardDescription>Manage details for Grand Hotel New York</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Hotel Chain</h3>
                      <p className="text-sm text-muted-foreground">Luxury Resorts International</p>
                    </div>
                    <Badge>4-Star</Badge>
                  </div>

                  <Separator />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="hotel-name">Hotel Name</Label>
                      <Input id="hotel-name" defaultValue="Grand Hotel New York" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hotel-id">Hotel ID</Label>
                      <Input id="hotel-id" defaultValue="HTL-1042" disabled />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="hotel-address">Address</Label>
                      <Input id="hotel-address" defaultValue="123 Broadway" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hotel-city">City</Label>
                      <Input id="hotel-city" defaultValue="New York" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hotel-zip">Zip Code</Label>
                      <Input id="hotel-zip" defaultValue="10001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hotel-phone">Contact Phone</Label>
                      <Input id="hotel-phone" defaultValue="+1 (212) 555-1234" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hotel-email">Contact Email</Label>
                      <Input id="hotel-email" defaultValue="info@grandhotelny.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="total-rooms">Total Rooms</Label>
                      <Input id="total-rooms" defaultValue="120" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hotel-rating">Hotel Rating</Label>
                      <select id="hotel-rating" className="w-full border rounded-md p-2">
                        <option>5 Stars</option>
                        <option selected>4 Stars</option>
                        <option>3 Stars</option>
                        <option>2 Stars</option>
                        <option>1 Star</option>
                      </select>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="hotel-description">Description</Label>
                      <textarea
                        id="hotel-description"
                        rows={4}
                        defaultValue="Located in the heart of Manhattan, Grand Hotel New York offers luxury accommodations with modern amenities and exceptional service. Our hotel features spacious rooms, a state-of-the-art fitness center, an indoor swimming pool, and multiple dining options."
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-4">Hotel Amenities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Free Wi-Fi",
                        "Breakfast Available",
                        "Swimming Pool",
                        "Fitness Center",
                        "Business Center",
                        "Conference Rooms",
                        "Restaurant",
                        "Bar/Lounge",
                        "Room Service",
                        "Concierge",
                        "Parking",
                        "Laundry Service",
                      ].map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <input type="checkbox" id={`amenity-${amenity}`} defaultChecked className="rounded" />
                          <Label htmlFor={`amenity-${amenity}`} className="text-sm font-normal">
                            {amenity}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="rooms" className="pt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Room Management</CardTitle>
                    <CardDescription>Manage room information and availability</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="h-12 px-4 text-left align-middle font-medium">Room #</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Capacity</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Size (m²)</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Price</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            id: "101",
                            type: "Standard",
                            capacity: "2",
                            size: "25",
                            price: "$120",
                            status: "Available",
                          },
                          { id: "102", type: "Standard", capacity: "2", size: "25", price: "$120", status: "Occupied" },
                          { id: "201", type: "Deluxe", capacity: "2", size: "35", price: "$180", status: "Available" },
                          {
                            id: "202",
                            type: "Deluxe",
                            capacity: "3",
                            size: "35",
                            price: "$180",
                            status: "Maintenance",
                          },
                          { id: "301", type: "Suite", capacity: "4", size: "50", price: "$250", status: "Reserved" },
                          { id: "302", type: "Suite", capacity: "4", size: "50", price: "$250", status: "Available" },
                          {
                            id: "401",
                            type: "Executive",
                            capacity: "2",
                            size: "40",
                            price: "$220",
                            status: "Occupied",
                          },
                          {
                            id: "402",
                            type: "Executive",
                            capacity: "2",
                            size: "40",
                            price: "$220",
                            status: "Available",
                          },
                        ].map((room) => (
                          <tr key={room.id} className="border-b">
                            <td className="p-4 align-middle">{room.id}</td>
                            <td className="p-4 align-middle">{room.type}</td>
                            <td className="p-4 align-middle">{room.capacity} people</td>
                            <td className="p-4 align-middle">{room.size} m²</td>
                            <td className="p-4 align-middle">{room.price}/night</td>
                            <td className="p-4 align-middle">
                              <Badge
                                variant={
                                  room.status === "Available"
                                    ? "outline"
                                    : room.status === "Occupied"
                                      ? "secondary"
                                      : room.status === "Reserved"
                                        ? "default"
                                        : "destructive"
                                }
                              >
                                {room.status}
                              </Badge>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Room Check-in</CardTitle>
                  <CardDescription>Check-in people</CardDescription>
                </CardHeader>
                <CardContent>
                  
                  <main className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Check-in Guests</h1>
              <p className="text-muted-foreground">Process guest arrivals and departures</p>
            </div>

          </div>

          <Tabs defaultValue="check-in" className="mb-8">
            <TabsList>
              <TabsTrigger value="check-in">Check-in</TabsTrigger>
              <TabsTrigger value="walk-in">Walk-in Registration</TabsTrigger>
            </TabsList>

            <TabsContent value="check-in" className="pt-6">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Today&apos;s Arrivals</CardTitle>
                  <CardDescription>Guests with reservations arriving today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="h-12 px-4 text-left align-middle font-medium">Reservation ID</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Guest Name</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Room</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Check-in Time</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Nights</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            id: "RES-1042",
                            name: "Michael Johnson",
                            room: "201 - Deluxe",
                            time: "12:00 PM",
                            nights: 3,
                            status: "Pending",
                          },
                          {
                            id: "RES-1043",
                            name: "Sarah Williams",
                            room: "305 - Suite",
                            time: "2:30 PM",
                            nights: 2,
                            status: "Confirmed",
                          },
                          {
                            id: "RES-1044",
                            name: "David Brown",
                            room: "118 - Standard",
                            time: "3:00 PM",
                            nights: 1,
                            status: "Pending",
                          },
                          {
                            id: "RES-1045",
                            name: "Emily Davis",
                            room: "420 - Deluxe",
                            time: "4:15 PM",
                            nights: 4,
                            status: "Confirmed",
                          },
                        ].map((checkin, i) => (
                          <tr key={i} className="border-b">
                            <td className="p-4 align-middle">{checkin.id}</td>
                            <td className="p-4 align-middle">{checkin.name}</td>
                            <td className="p-4 align-middle">{checkin.room}</td>
                            <td className="p-4 align-middle">{checkin.time}</td>
                            <td className="p-4 align-middle">{checkin.nights}</td>
                            <td className="p-4 align-middle">
                              <Badge variant={checkin.status === "Confirmed" ? "outline" : "secondary"}>
                                {checkin.status}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">
                              <Button>Process Check-in</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              
            </TabsContent>


            <TabsContent value="walk-in" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Process Walk-in Check-in</CardTitle>
                  <CardDescription>Complete Check-in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="reservation-id">Room ID</Label>
                        <Input id="reservation-id" placeholder="Enter reservation ID" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="guest-name">Guest ID</Label>
                        <Input id="guest-name" placeholder="Enter guest name" />
                      </div>
                    </div>

                    <Button variant="outline" className="w-fit">
                      <SearchIcon className="mr-2 h-4 w-4" />
                      Find User
                    </Button>

                    <Separator />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <h3 className="font-medium mb-2">Reservation Details</h3>
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="font-medium">Guest:</span> Michael Johnson
                          </p>
                          <p>
                            <span className="font-medium">Room:</span> 201 - Deluxe
                          </p>
                          <p>
                            <span className="font-medium">Check-in:</span> April 6, 2025
                          </p>
                          <p>
                            <span className="font-medium">Check-out:</span> April 9, 2025
                          </p>
                          <p>
                            <span className="font-medium">Nights:</span> 3
                          </p>
                          <p>
                            <span className="font-medium">Guests:</span> 2 Adults
                          </p>
                          <p>
                            <span className="font-medium">Total:</span> $540.00
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Check-in Information</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="space-y-2">
                              <Label htmlFor="check-in-date">Check-in Date</Label>
                              <Input id="check-in-date" type="date" defaultValue="2025-04-06" />
                            </div>
                          <div className="space-y-2">
                              <Label htmlFor="check-out-date">Check-out Date</Label>
                              <Input id="check-out-date" type="date" defaultValue="2025-04-09" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="payment-method">Payment Method</Label>
                            <select id="payment-method" className="w-full border rounded-md p-2">
                              <option>Credit Card on File</option>
                              <option>New Credit Card</option>
                              <option>Cash</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button>Complete Check-in</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

