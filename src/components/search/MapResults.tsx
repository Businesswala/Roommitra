'use client'

import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

// Fix for default marker icons in Leaflet with Next.js
const createIcon = (color: string) => L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 12px; display: flex; items-center; justify-content: center; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border: 2px solid white; transform: rotate(45deg);">
          <div style="transform: rotate(-45deg); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 10px;">
            R
          </div>
        </div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30]
});

const icons = {
  ROOM: createIcon('#2563eb'), // Blue
  PG: createIcon('#f97316'),   // Orange
  TIFFIN: createIcon('#10b981'), // Green
  LAUNDRY: createIcon('#8b5cf6') // Purple
};

interface Property {
  id: string;
  title: string;
  price: number;
  latitude: number | null;
  longitude: number | null;
  images: string; // JSON string from DB
  type: string;
}

export default function MapResults({ properties }: { properties: any[] }) {
  const center: [number, number] = [12.9716, 77.5946]; // Bangalore center fallback

  return (
    <div className="h-full w-full">
      <MapContainer 
        center={center} 
        zoom={12} 
        scrollWheelZoom={true} 
        className="h-full w-full z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map(p => {
          const lat = p.latitude || 12.9716 + (Math.random() - 0.5) * 0.05; // Mock jitter for demo if missing
          const lng = p.longitude || 77.5946 + (Math.random() - 0.5) * 0.05;
          const images = JSON.parse(p.images || "[]");
          const thumbnail = images[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop";
          const icon = (icons as any)[p.type] || icons.ROOM;

          return (
            <Marker key={p.id} position={[lat, lng]} icon={icon}>
              <Popup className="leaflet-popup-custom">
                <div className="w-[200px] p-0 overflow-hidden bg-white rounded-2xl shadow-2xl border border-slate-100">
                  <div className="relative h-28 w-full overflow-hidden">
                    <img src={thumbnail} alt={p.title} className="w-full h-full object-cover" />
                    <Badge className="absolute top-2 left-2 bg-white/90 text-slate-900 border-none text-[9px] font-black uppercase tracking-widest px-2 py-0.5 shadow-md">
                      {p.type}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h4 className="font-black text-slate-900 text-sm line-clamp-1 mb-1 tracking-tight">{p.title}</h4>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50">
                       <p className="text-blue-600 font-black text-sm">₹{p.price.toLocaleString()}</p>
                       <Link href={`/listing/${p.id}`} className="text-[10px] font-black uppercase text-slate-400 hover:text-blue-600 transition-colors">Details →</Link>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  )
}
