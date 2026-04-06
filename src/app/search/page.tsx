'use client'

import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Star, MapPin, Wifi, Wind, Coffee, Bath, List, Map as MapIcon, 
  ChevronLeft, ChevronRight, Search as SearchIcon, RotateCcw 
} from 'lucide-react'
import dynamic from 'next/dynamic'
import { searchListings } from '@/app/actions/search'
import { ListingCard } from '@/components/explore/ListingCard'
import { toast } from 'sonner'

// Dynamically import Map component to avoid SSR issues with Leaflet
const MapResults = dynamic(() => import('@/components/search/MapResults'), { ssr: false })

const amenitiesList = [
  { id: 'wifi', label: 'WiFi', icon: <Wifi className="h-4 w-4" /> },
  { id: 'ac', label: 'AC', icon: <Wind className="h-4 w-4" /> },
  { id: 'food', label: 'Food Included', icon: <Coffee className="h-4 w-4" /> },
  { id: 'bath', label: 'Attached Washroom', icon: <Bath className="h-4 w-4" /> },
];

import { Suspense } from 'react'

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [viewMode, setViewMode] = useState<'LIST' | 'MAP'>('LIST')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState<any[]>([])
  const [total, setTotal] = useState(0)

  // 1. Sync Filters from URL
  useEffect(() => {
    const amenities = searchParams.get('amenities')?.split(',') || [];
    setSelectedAmenities(amenities.filter(a => a !== ''));
  }, [searchParams]);

  // 2. Fetch Live Data
  const performSearch = useCallback(async () => {
    setLoading(true);
    const type = searchParams.get('type') || 'ALL';
    const minPrice = parseInt(searchParams.get('minPrice') || '0');
    const maxPrice = parseInt(searchParams.get('maxPrice') || '1000000');

    const result = await searchListings({
      type,
      minPrice,
      maxPrice,
      amenities: selectedAmenities,
      limit: 20
    });

    const searchResult = result as any;
    if (searchResult.error) {
      toast.error(searchResult.error);
    } else {
      setResults(searchResult.data?.items || []);
      setTotal(searchResult.data?.total || 0);
    }
    setLoading(false);
  }, [searchParams, selectedAmenities]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  const toggleAmenity = (id: string) => {
    setSelectedAmenities(prev => {
      const next = prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id];
      // update URL implicitly in next render via performSearch
      return next;
    });
  };

  const clearFilters = () => {
    setSelectedAmenities([]);
    router.push('/search');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      {/* Search Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-8 py-5 flex items-center justify-between shadow-2xl shadow-slate-200/20 dark:shadow-none">
        <div className="flex items-center gap-6">
           <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter flex items-center gap-2">
              <SearchIcon size={24} className="text-blue-600" /> Live Grid
           </h1>
           <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30 font-black uppercase text-[10px] px-3 py-1 tracking-widest animate-pulse">
             {loading ? "Scanning..." : `${total} Assets Mapping`}
           </Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
             <button 
               onClick={() => setViewMode('LIST')}
               className={`flex items-center gap-2 px-5 h-10 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${viewMode === 'LIST' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
             >
               <List size={16} /> Matrix
             </button>
             <button 
               onClick={() => setViewMode('MAP')}
               className={`flex items-center gap-2 px-5 h-10 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${viewMode === 'MAP' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
             >
               <MapIcon size={16} /> Perimeter
             </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* 🟢 Sidebar Filters */}
        <aside className="w-[340px] border-r border-slate-200 dark:border-slate-800 p-8 hidden lg:block bg-white dark:bg-slate-900/50 sticky top-[89px] h-[calc(100vh-89px)] overflow-y-auto z-20">
          <div className="space-y-12">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-slate-900 dark:text-white text-[10px] uppercase tracking-widest">Global Sequence</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 gap-1 active:scale-95">
                  <RotateCcw size={12} /> Reset
                </Button>
              </div>
              <Select value={sortBy} onValueChange={(val) => setSortBy(val || 'newest')}>
                <SelectTrigger className="w-full h-14 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-2xl font-bold focus:ring-2 focus:ring-blue-600">
                  <SelectValue placeholder="Sort Parameters" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-200 dark:border-slate-800">
                  <SelectItem value="newest">Latest Deployment</SelectItem>
                  <SelectItem value="price-low">Price: Ascending</SelectItem>
                  <SelectItem value="price-high">Price: Descending</SelectItem>
                  <SelectItem value="top-rated">Peak Efficiency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-[10px] uppercase tracking-widest mb-6">Amenity Filters</h3>
              <div className="space-y-4">
                {amenitiesList.map(amenity => (
                  <div 
                    key={amenity.id} 
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedAmenities.includes(amenity.label) 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/30' 
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`} 
                    onClick={() => toggleAmenity(amenity.label)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl border ${selectedAmenities.includes(amenity.label) ? 'bg-white dark:bg-slate-800 text-blue-600 border-blue-100' : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-slate-800'}`}>
                        {amenity.icon}
                      </div>
                      <span className={`text-xs font-bold ${selectedAmenities.includes(amenity.label) ? 'text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}>
                        {amenity.label}
                      </span>
                    </div>
                    <Checkbox checked={selectedAmenities.includes(amenity.label)} className="rounded-md border-slate-300 dark:border-slate-700 data-[state=checked]:bg-blue-600" />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
               <div className="p-6 rounded-3xl bg-slate-900 text-white dark:bg-slate-800 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl -translate-y-4 translate-x-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Platform Notice</p>
                  <p className="text-xs leading-relaxed font-medium">All listed assets are verified by the Roommitra Super Admin perimeter. Ensure your booking intent is logged for secure transactions.</p>
               </div>
            </div>
          </div>
        </aside>

        {/* 🔵 Content Area */}
        <main className="flex-1 relative bg-slate-50 dark:bg-slate-950 overflow-hidden">
          {viewMode === 'LIST' ? (
            <div className="h-full overflow-y-auto px-8 md:px-12 py-10">
               {loading ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
                    {[1,2,3,4,5,6].map(i => (
                       <div key={i} className="h-[400px] bg-white dark:bg-slate-900 rounded-[40px] animate-pulse border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none" />
                    ))}
                 </div>
               ) : results.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    {results.map(p => (
                       <ListingCard key={p.id} data={p} />
                    ))}
                 </div>
               ) : (
                 <div className="h-[60vh] flex flex-col items-center justify-center text-center p-12">
                   <div className="w-32 h-32 rounded-[40px] bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-800 mb-8">
                      <SearchIcon size={48} className="text-slate-300" />
                   </div>
                   <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">No Asset Matches</h3>
                   <p className="text-slate-500 max-w-sm mb-10 font-medium">Your search criteria resulted in zero matches across the known Roommitra grid. Try broadening your parameters.</p>
                   <Button onClick={clearFilters} className="h-14 px-10 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-blue-500/30 active:scale-[0.98]">Reset Grid Tracking</Button>
                 </div>
               )}
            </div>
          ) : (
            <div className="h-[calc(100vh-89px)] w-full">
              {!loading && <MapResults properties={results} />}
              {loading && (
                 <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                       <div className="h-12 w-12 rounded-2xl border-4 border-blue-600/20 border-t-blue-600 animate-spin" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Recalibrating Perimeter...</span>
                    </div>
                 </div>
              )}
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="h-16 w-16 rounded-[2.5rem] bg-white shadow-2xl border border-slate-100 flex items-center justify-center animate-bounce">
           <div className="h-8 w-8 rounded-full border-4 border-blue-600/20 border-t-blue-600 animate-spin" />
        </div>
        <p className="mt-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Grid Interface</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
