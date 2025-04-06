"use client"


import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { SearchIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock user types
type User = {
  id: string;
  role: 'guest' | 'employee' | 'admin';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  ssn?: string;
  hireDate?: string;
  hotelId?: string; // Only for employees
};

type Hotel = {
  id: string;
  name: string;
  chain: string;
  rating: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
  email: string;
  totalRooms: number;
  description: string;
  amenities: string[];
};

type Room = {
  id: string;
  type: string;
  capacity: number;
  size: number;
  price: number;
  status: 'Available' | 'Occupied' | 'Reserved';
};

type Reservation = {
  id: string;
  guestName: string;
  room: string;
  time: string;
  nights: number;
  status: 'Pending' | 'Confirmed';
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  total: number;
};

export default function EmployeeSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEmployee, setIsEmployee] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [hotelData, setHotelData] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState({
    profile: false,
    hotel: false,
    rooms: false,
    reservations: false
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [walkInData, setWalkInData] = useState({
    roomId: '',
    guestId: ''
  });
  const [guestDetails, setGuestDetails] = useState<Reservation | null>(null);

  // Simulate fetching user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(prev => ({...prev, profile: true}));
      try {
        //! ENDPOINT In a real app, this would be an API call to /api/user/{userId} so to add to our backend
        // const response = await fetch('/data/dashboard/recieves/user.json'); //? Local JSON for demo USER
        const response = await fetch('/data/dashboard/recieves/employee.json'); //? Local JSON for demo EMPLOYEE
        const data = await response.json();
        
        setUserData(data);
        setIsEmployee(data.role === 'employee' || data.role === 'admin');
        
        if (data.role === 'employee' || data.role === 'admin') {
          // If user is employee, fetch hotel data
          fetchHotelData(data.hotelId);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setStatusMessage('Failed to load profile data');
      } finally {
        setLoading(prev => ({...prev, profile: false}));
      }
    };

    fetchUserData();
  }, []);

  const fetchHotelData = async (hotelId: string) => {
    setLoading(prev => ({...prev, hotel: true}));
    try {
      //! ANOTHER ENDPOINT
      const response = await fetch(`/data/dashboard/recieves/hotel-${hotelId}.json`); // Local JSON for demo
      const data = await response.json();
      setHotelData(data);
    } catch (error) {
      console.error('Error fetching hotel data:', error);
      setStatusMessage('Failed to load hotel information');
    } finally {
      setLoading(prev => ({...prev, hotel: false}));
    }
  };

  const fetchRoomsData = async (hotelId: string) => {
    setLoading(prev => ({...prev, rooms: true}));
    try {
      //! ANOTHER ENDPOINT
      const response = await fetch(`/data/dashboard/recieves/hotelrooms-${hotelId}.json`);
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms data:', error);
      setStatusMessage('Failed to load room data');
    } finally {
      setLoading(prev => ({...prev, rooms: false}));
      fetchReservationsData(hotelId);
    }
  };

  const fetchReservationsData = async (hotelId: string) => {
    setLoading(prev => ({...prev, reservations: true}));
    try {
      //! ANOTHER ENPOINT  this would be an API call to /api/reservations/{hotelId}/today
      const response = await fetch(`/data/dashboard/recieves/reservations-${hotelId}.json`); 
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('Error fetching reservations data:', error);
      setStatusMessage('Failed to load reservations');
    } finally {
      setLoading(prev => ({...prev, reservations: false}));
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setStatusMessage('');
    
    if (tab === 'rooms' && userData?.hotelId) {
      fetchRoomsData(userData.hotelId);
    }
    
    if (tab === 'check-in' && userData?.hotelId) {
      fetchReservationsData(userData.hotelId);
    }
  };

  const handleSaveProfile = async () => {
    if (!userData) return;
    
    setLoading(prev => ({...prev, profile: true}));
    try {
      //! Mock API SENDING call to update user profile
      // this would be a PUT request to /api/user/{userId}
      const response = await fetch('/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (response.ok) {
        setStatusMessage('Profile updated successfully');
      } else {
        setStatusMessage('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setStatusMessage('Error updating profile');
    } finally {
      setLoading(prev => ({...prev, profile: false}));
    }
  };

  const handleSaveHotel = async () => {
    if (!hotelData) return;
    
    setLoading(prev => ({...prev, hotel: true}));
    try {
      //! Mock API SENDING call to update hotel info
      // this would be a PUT request to /api/hotel/{hotelId}
      const response = await fetch('/api/hotel/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hotelData),
      });
      
      if (response.ok) {
        setStatusMessage('Hotel information updated successfully');
      } else {
        setStatusMessage('Failed to update hotel information');
      }
    } catch (error) {
      console.error('Error updating hotel:', error);
      setStatusMessage('Error updating hotel information');
    } finally {
      setLoading(prev => ({...prev, hotel: false}));
    }
  };

  const handleProcessCheckIn = async (reservationId: string) => {
    setLoading(prev => ({...prev, reservations: true}));
    try {
      //! Mock API SENDING call to process check-in
      // this would be a POST request to /api/reservations/{reservationId}/check-in
      const response = await fetch(`/api/reservations/${reservationId}/check-in`, {
        method: 'POST',
      });
      
      if (response.ok) {
        setStatusMessage('Check-in processed successfully');
        // Refresh reservations
        if (userData?.hotelId) {
          fetchReservationsData(userData.hotelId);
        }
      } else {
        setStatusMessage('Failed to process check-in');
      }
    } catch (error) {
      console.error('Error processing check-in:', error);
      setStatusMessage('Error processing check-in');
    } finally {
      setLoading(prev => ({...prev, reservations: false}));
    }
  };

  const handleFindGuest = async () => {
    if (!walkInData.roomId || !walkInData.guestId) {
      setStatusMessage('Please enter both room and guest IDs');
      return;
    }
    
    setLoading(prev => ({...prev, reservations: true}));
    try {
      //! Mock API call to find guest details
      // GET request to /api/guest/{guestId}
      const response = await fetch(`/data/dashboard/recieves/guest-${walkInData.guestId}.json`); // Local JSON for demo
      const data = await response.json();
      setGuestDetails(data);
      setStatusMessage('Guest details loaded');
    } catch (error) {
      console.error('Error finding guest:', error);
      setStatusMessage('Failed to find guest details');
    } finally {
      setLoading(prev => ({...prev, reservations: false}));
    }
  };

  const handleCompleteWalkIn = async () => {
    if (!guestDetails) {
      setStatusMessage('Please find guest details first');
      return;
    }
    
    setLoading(prev => ({...prev, reservations: true}));
    try {
      //! Mock API SENDING call to create walk-in reservation
      // this would be a POST request to /api/reservations/walk-in
      const response = await fetch('/api/reservations/walk-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...guestDetails,
          roomId: walkInData.roomId,
          guestId: walkInData.guestId,
          status: 'Confirmed'
        }),
      });
      
      if (response.ok) {
        setStatusMessage('Walk-in check-in completed successfully');
        // Clear form
        setWalkInData({ roomId: '', guestId: '' });
        setGuestDetails(null);
      } else {
        setStatusMessage('Failed to complete walk-in check-in');
      }
    } catch (error) {
      console.error('Error completing walk-in:', error);
      setStatusMessage('Error completing walk-in check-in');
    } finally {
      setLoading(prev => ({...prev, reservations: false}));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userData) return;
    
    const { id, value } = e.target;
    setUserData({
      ...userData,
      [id]: value
    });
  };

  const handleHotelInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!hotelData) return;
    
    const { id, value } = e.target;
    setHotelData({
      ...hotelData,
      [id]: id === 'totalRooms' ? parseInt(value) : value
    });
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (!hotelData) return;
    
    setHotelData({
      ...hotelData,
      amenities: checked 
        ? [...hotelData.amenities, amenity]
        : hotelData.amenities.filter(a => a !== amenity)
    });
  };

  return (
    <div className="flex min-h-screen px-8 m-8">
      <div className="flex-1">
        <main className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Manage your profile and hotel information</p>
            </div>
            {statusMessage && (
              <div className={`px-4 py-2 rounded-md ${
                statusMessage.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {statusMessage}
              </div>
            )}
          </div>

          <Tabs defaultValue="profile" value={activeTab} onValueChange={handleTabChange} className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="hotel" disabled={!isEmployee || loading.hotel}>
                Hotel Information
              </TabsTrigger>
              <TabsTrigger value="rooms" disabled={!isEmployee || loading.rooms}>
                Room Management
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Employee Profile</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {loading.profile ? (
                    <div className="flex justify-center py-8">Loading profile data...</div>
                  ) : userData ? (
                    <>
                      <Separator />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="id">Employee ID</Label>
                          <Input id="id" defaultValue={userData.id} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Input 
                            id="role" 
                            defaultValue={
                              userData.role === 'employee' ? 'Front Desk Manager' : 
                              userData.role === 'admin' ? 'Administrator' : 'Guest'
                            } 
                            disabled 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName" 
                            value={userData.firstName} 
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName" 
                            value={userData.lastName} 
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={userData.email} 
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            type="tel" 
                            value={userData.phone} 
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address" 
                            value={userData.address} 
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input 
                            id="city" 
                            value={userData.city} 
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">Zip Code</Label>
                          <Input 
                            id="zip" 
                            value={userData.zip} 
                            onChange={handleInputChange}
                          />
                        </div>
                        {isEmployee && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="ssn">Social Security Number</Label>
                              <Input 
                                id="ssn" 
                                value={userData.ssn || ''} 
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="hireDate">Hire Date</Label>
                              <Input 
                                id="hireDate" 
                                type="date" 
                                value={userData.hireDate || ''} 
                                onChange={handleInputChange}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-red-500">Failed to load profile data</div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button 
                    onClick={handleSaveProfile}
                    disabled={loading.profile || !userData}
                  >
                    {loading.profile ? 'Saving...' : 'Save Changes'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="hotel" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hotel Information</CardTitle>
                  <CardDescription>
                    {hotelData ? `Manage details for ${hotelData.name}` : 'Loading hotel information...'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {loading.hotel ? (
                    <div className="flex justify-center py-8">Loading hotel data...</div>
                  ) : hotelData ? (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Hotel Chain</h3>
                          <p className="text-sm text-muted-foreground">{hotelData.chain}</p>
                        </div>
                        <Badge>{hotelData.rating}</Badge>
                      </div>

                      <Separator />

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Hotel Name</Label>
                          <Input 
                            id="name" 
                            value={hotelData.name} 
                            onChange={handleHotelInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="id">Hotel ID</Label>
                          <Input id="id" value={hotelData.id} disabled />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address" 
                            value={hotelData.address} 
                            onChange={handleHotelInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input 
                            id="city" 
                            value={hotelData.city} 
                            onChange={handleHotelInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">Zip Code</Label>
                          <Input 
                            id="zip" 
                            value={hotelData.zip} 
                            onChange={handleHotelInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Contact Phone</Label>
                          <Input 
                            id="phone" 
                            value={hotelData.phone} 
                            onChange={handleHotelInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Contact Email</Label>
                          <Input 
                            id="email" 
                            value={hotelData.email} 
                            onChange={handleHotelInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="totalRooms">Total Rooms</Label>
                          <Input 
                            id="totalRooms" 
                            value={hotelData.totalRooms} 
                            type="number" 
                            onChange={handleHotelInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rating">Hotel Rating</Label>
                          <select 
                            id="rating" 
                            value={hotelData.rating} 
                            onChange={handleHotelInputChange}
                            className="w-full border rounded-md p-2"
                          >
                            <option>5 Stars</option>
                            <option>4 Stars</option>
                            <option>3 Stars</option>
                            <option>2 Stars</option>
                            <option>1 Star</option>
                          </select>
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="description">Description</Label>
                          <textarea
                            id="description"
                            rows={4}
                            value={hotelData.description}
                            onChange={handleHotelInputChange}
                            className="w-full border rounded-md p-2"
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
                              <input 
                                type="checkbox" 
                                id={`amenity-${amenity}`} 
                                checked={hotelData.amenities.includes(amenity)}
                                onChange={(e) => handleAmenityChange(amenity, e.target.checked)}
                                className="rounded"
                              />
                              <Label htmlFor={`amenity-${amenity}`} className="text-sm font-normal">
                                {amenity}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-red-500">Failed to load hotel data</div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button 
                    onClick={handleSaveHotel}
                    disabled={loading.hotel || !hotelData}
                  >
                    {loading.hotel ? 'Saving...' : 'Save Changes'}
                  </Button>
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
                  {loading.rooms ? (
                    <div className="flex justify-center py-8">Loading room data...</div>
                  ) : rooms.length > 0 ? (
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
                          {rooms.map((room) => (
                            <tr key={room.id} className="border-b">
                              <td className="p-4 align-middle">{room.id}</td>
                              <td className="p-4 align-middle">{room.type}</td>
                              <td className="p-4 align-middle">{room.capacity} people</td>
                              <td className="p-4 align-middle">{room.size} m²</td>
                              <td className="p-4 align-middle">${room.price}/night</td>
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
                  ) : (
                    <div className="text-center py-8 text-red-500">No room data available</div>
                  )}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Room Check-in</CardTitle>
                  <CardDescription>Process guest arrivals and departures</CardDescription>
                </CardHeader>
                <CardContent>
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
                          {loading.reservations ? (
                            <div className="flex justify-center py-8">Loading reservations...</div>
                          ) : reservations.length > 0 ? (
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
                                    <th className="h-12 px-4 text-left align-middle font-medium">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {reservations.map((reservation) => (
                                    <tr key={reservation.id} className="border-b">
                                      <td className="p-4 align-middle">{reservation.id}</td>
                                      <td className="p-4 align-middle">{reservation.guestName}</td>
                                      <td className="p-4 align-middle">{reservation.room}</td>
                                      <td className="p-4 align-middle">{reservation.time}</td>
                                      <td className="p-4 align-middle">{reservation.nights}</td>
                                      <td className="p-4 align-middle">
                                        <Badge variant={reservation.status === "Confirmed" ? "outline" : "secondary"}>
                                          {reservation.status}
                                        </Badge>
                                      </td>
                                      <td className="p-4 align-middle">
                                        <Button 
                                          onClick={() => handleProcessCheckIn(reservation.id)}
                                          disabled={loading.reservations}
                                        >
                                          Process Check-in
                                        </Button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div className="text-center py-8">No reservations arriving today</div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="walk-in" className="pt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Process Walk-in Check-in</CardTitle>
                          <CardDescription>Complete Check-in</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor="roomId">Room ID</Label>
                                <Input 
                                  id="roomId" 
                                  placeholder="Enter room ID" 
                                  value={walkInData.roomId}
                                  onChange={(e) => setWalkInData({...walkInData, roomId: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="guestId">Guest ID</Label>
                                <Input 
                                  id="guestId" 
                                  placeholder="Enter guest ID" 
                                  value={walkInData.guestId}
                                  onChange={(e) => setWalkInData({...walkInData, guestId: e.target.value})}
                                />
                              </div>
                            </div>

                            <Button 
                              variant="outline" 
                              className="w-fit"
                              onClick={handleFindGuest}
                              disabled={!walkInData.roomId || !walkInData.guestId || loading.reservations}
                            >
                              <SearchIcon className="mr-2 h-4 w-4" />
                              {loading.reservations ? 'Searching...' : 'Find User'}
                            </Button>

                            <Separator />

                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <h3 className="font-medium mb-2">Reservation Details</h3>
                                {guestDetails ? (
                                  <div className="space-y-1 text-sm">
                                    <p>
                                      <span className="font-medium">Guest:</span> {guestDetails.guestName}
                                    </p>
                                    <p>
                                      <span className="font-medium">Room:</span> {walkInData.roomId}
                                    </p>
                                    <p>
                                      <span className="font-medium">Check-in:</span> {guestDetails.checkInDate}
                                    </p>
                                    <p>
                                      <span className="font-medium">Check-out:</span> {guestDetails.checkOutDate}
                                    </p>
                                    <p>
                                      <span className="font-medium">Nights:</span> {guestDetails.nights}
                                    </p>
                                    <p>
                                      <span className="font-medium">Guests:</span> {guestDetails.guests} Adults
                                    </p>
                                    <p>
                                      <span className="font-medium">Total:</span> ${guestDetails.total.toFixed(2)}
                                    </p>
                                  </div>
                                ) : (
                                  <div className="text-sm text-muted-foreground">
                                    Enter room and guest IDs and click Find User to load details
                                  </div>
                                )}
                              </div>

                              <div>
                                <h3 className="font-medium mb-2">Check-in Information</h3>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <div className="space-y-2">
                                      <Label htmlFor="check-in-date">Check-in Date</Label>
                                      <Input 
                                        id="check-in-date" 
                                        type="date" 
                                        value={guestDetails?.checkInDate || ''} 
                                        disabled={!guestDetails}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="check-out-date">Check-out Date</Label>
                                      <Input 
                                        id="check-out-date" 
                                        type="date" 
                                        value={guestDetails?.checkOutDate || ''} 
                                        disabled={!guestDetails}
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor="payment-method">Payment Method</Label>
                                    <select 
                                      id="payment-method" 
                                      className="w-full border rounded-md p-2"
                                      disabled={!guestDetails}
                                    >
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
                          <Button 
                            onClick={handleCompleteWalkIn}
                            disabled={!guestDetails || loading.reservations}
                          >
                            {loading.reservations ? 'Processing...' : 'Complete Check-in'}
                          </Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}