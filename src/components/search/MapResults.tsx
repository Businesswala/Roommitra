'use client'

import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Property {
  id: number;
  title: string;
  price: number;
  lat: number;
  lng: number;
  images: string[];
}

export default function MapResults({ properties }: { properties: Property[] }) {
  const center: [number, number] = [12.9716, 77.5946]; // Bangalore center

  return (
    <div className="h-full w-full">
      <MapContainer 
        center={center} 
        zoom={12} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map(p => (
          <Marker key={p.id} position={[p.lat, p.lng]} icon={icon}>
            <Popup className="rounded-xl overflow-hidden shadow-xl border-none">
              <div className="w-[180px] p-0 overflow-hidden">
                <img src={p.images[0]} alt={p.title} className="w-full h-24 object-cover" />
                <div className="p-3">
                  <h4 className="font-bold text-sm line-clamp-1">{p.title}</h4>
                  <p className="text-blue-600 font-black text-sm mt-1">₹{p.price.toLocaleString()}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
