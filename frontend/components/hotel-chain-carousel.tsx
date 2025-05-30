"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, MapPinIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

interface HotelChain {
  chain_id: number
  name: string
  logo: string
  hotels: number
  locations: number
  image: string
  rating: number
}
interface APIHotelChain {
  chain_id: number
  name: string
  logo_url: string
  number_of_hotels: number
  number_of_locations: number
  hotel_chain_images_url: string
  hotel_chain_classification: number
}
export function HotelChainCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [, setScrollPosition] = useState(0)
  const [hotelChains, setHotelChains] = useState<HotelChain[]>([])
  const [loading, setLoading] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo =
        direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
      setScrollPosition(scrollTo)
    }
  }

  useEffect(() => {
    const fetchHotelChains = async () => {
      try {
        const response = await fetch("https://test-deployment-iq7z.onrender.com/get/hotelchain")
        const data = await response.json()
        
// https://eircgcvplkpzypudsajc.supabase.co/storage/v1/object/public/hotel-images/hotel-chain/bedroom.jpg


        const formattedChains = data.map((chain: APIHotelChain) => ({
          chain_id: chain.chain_id, // Using chain_id from API response
          name: chain.name,
          logo: `https://eircgcvplkpzypudsajc.supabase.co/storage/v1/object/public/logo/${chain.logo_url}`,
          hotels: chain.number_of_hotels,
          locations: chain.number_of_locations, // Update this if the correct field is different
          image: `https://eircgcvplkpzypudsajc.supabase.co/storage/v1/object/public/hotel-images/hotel-chain/${chain.hotel_chain_images_url}.jpg`, // Placeholder image
          rating: chain.hotel_chain_classification, // Assuming classification corresponds to rating
        }));
        
        setHotelChains(formattedChains)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHotelChains()
  }, [])

  if (loading) return <p className="text-muted">Loading hotel chains...</p>
  if (!hotelChains.length) return <p className="text-muted">No hotel chains found.</p>

  return (
    <div className="relative">
      <div
        className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide scroll-smooth"
        ref={scrollRef}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {hotelChains.map((chain) => (
          <Card
            key={chain.chain_id} // Use chain_id as the unique key
            className="min-w-[300px] max-w-[300px] border shadow-sm hover:shadow-md transition-shadow"
          >
            <CardContent className="p-0">
              <div className="relative h-40">
                <Image
                  src={chain.image || "/placeholder.svg"}
                  alt={chain.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-lg" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-24 relative bg-white rounded p-1">
                    <Image
                      src={chain.logo || "/placeholder.svg"}
                      alt={`${chain.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex">
                    {Array(chain.rating)
                      .fill(0)
                      .map((_, i) => (
                        <StarIcon key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-1">{chain.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="h-3.5 w-3.5" />
                    <span>{chain.locations} locations</span>
                  </div>
                  <div>{chain.hotels} hotels</div>
                </div>
                <Button asChild className="w-full">
                  <Link href={`/search/hotels/${chain.chain_id}`}>View Hotels</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        variant="secondary"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full shadow-md bg-background/80 backdrop-blur-sm z-10"
        onClick={() => scroll("left")}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full shadow-md bg-background/80 backdrop-blur-sm z-10"
        onClick={() => scroll("right")}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </Button>
    </div>
  )
}
