'use client'

import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Star, MapPin, Wifi, Wind, Coffee, Bath, List, Map as MapIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import Map component to avoid SSR issues with Leaflet
const MapResults = dynamic(() => import('@/components/search/MapResults'), { ssr: false })

const mockProperties = [
  { 
    id: 1, 
    title: "Luxury Studio near MG Road", 
    type: "ROOM", 
    price: 15000, 
    rating: 4.8, 
    reviews: 124, 
    lat: 12.9716, 
    lng: 77.5946,
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop"],
    amenities: ["WiFi", "AC", "Attached Washroom"]
  },
  { 
    id: 2, 
    title: "Comfy PG for Students", 
    type: "PG", 
    price: 8500, 
    rating: 4.5, 
    reviews: 56, 
    lat: 12.9352, 
    lng: 77.6245,
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop"],
    amenities: ["WiFi", "Food Included"]
  },
  { 
    id: 3, 
    title: "Executive Apartment", 
    type: "ROOM", 
    price: 25000, 
    rating: 4.9, 
    reviews: 32, 
    lat: 12.9562, 
    lng: 77.7011,
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop"],
    amenities: ["WiFi", "AC", "Gym"]
  }
];

const amenitiesList = [
  { id: 'wifi', label: 'WiFi', icon: <Wifi className="h-4 w-4" /> },
  { id: 'ac', label: 'AC', icon: <Wind className="h-4 w-4" /> },
  { id: 'food', label: 'Food Included', icon: <Coffee className="h-4 w-4" /> },
  { id: 'bath', label: 'Attached Washroom', icon: <Bath className="h-4 w-4" /> },
];

import { Suspense } from 'react'

function SearchContent() {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<'LIST' | 'MAP'>('LIST')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const filteredProperties = useMemo(() => {
    let results = [...mockProperties];
    
    // Simple filter logic
    if (selectedAmenities.length > 0) {
      results = results.filter(p => 
        selectedAmenities.every(a => p.amenities.some(pa => pa.toLowerCase().includes(a.toLowerCase())))
      );
    }

    if (sortBy === 'price-low') results.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') results.sort((a, b) => b.price - a.price);
    if (sortBy === 'top-rated') results.sort((a, b) => b.rating - a.rating);

    return results;
  }, [selectedAmenities, sortBy]);

  const toggleAmenity = (id: string) => {
    setSelectedAmenities(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Search Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Search Results</h1>
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            {filteredProperties.length} spaces found
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === 'LIST' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setViewMode('LIST')}
            className="rounded-full px-4"
          >
            <List className="h-4 w-4 mr-2" /> List
          </Button>
          <Button 
            variant={viewMode === 'MAP' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setViewMode('MAP')}
            className="rounded-full px-4"
          >
            <MapIcon className="h-4 w-4 mr-2" /> Map
          </Button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* 🟢 Sidebar Filters */}
        <aside className="w-[300px] border-r p-6 hidden lg:block bg-slate-50/30 overflow-y-auto">
          <div className="space-y-8">
            <div>
              <h3 className="font-bold mb-4">Sort By</h3>
              <Select value={sortBy} onValueChange={(val) => { if (val) setSortBy(val) }}>
                <SelectTrigger className="w-full bg-white rounded-xl">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="top-rated">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="font-bold mb-4">Amenities</h3>
              <div className="space-y-3">
                {amenitiesList.map(amenity => (
                  <div key={amenity.id} className="flex items-center space-x-3 group cursor-pointer" onClick={() => toggleAmenity(amenity.id)}>
                    <Checkbox id={amenity.id} checked={selectedAmenities.includes(amenity.id)} />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 cursor-pointer">
                      <span className="text-slate-400 group-hover:text-blue-600 transition-colors">{amenity.icon}</span>
                      {amenity.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* 🔵 Content Area */}
        <main className="flex-1 overflow-y-auto bg-white">
          {viewMode === 'LIST' ? (
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProperties.map(p => (
                <Card key={p.id} className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all group rounded-3xl ring-1 ring-slate-100">
                  <div className="relative h-56 w-full overflow-hidden">
                    <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <Badge className="absolute top-4 left-4 bg-white/90 text-slate-900 border-none shadow-lg">
                      {p.type}
                    </Badge>
                  </div>
                  <CardHeader className="p-6 pb-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-black text-xl line-clamp-1">{p.title}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      Bangalore, KA
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {p.amenities.map(a => (
                        <Badge key={a} variant="outline" className="text-[10px] uppercase tracking-wider font-bold bg-slate-50 border-slate-200">
                          {a}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex flex-col">
                        <span className="text-2xl font-black text-blue-600">₹{p.price.toLocaleString()}</span>
                        <span className="text-[10px] uppercase font-bold text-slate-400">per month</span>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-xl border border-yellow-100">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-500" />
                        <span className="font-bold text-sm text-yellow-700">{p.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="h-[calc(100vh-140px)] w-full">
              <MapResults properties={filteredProperties} />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
