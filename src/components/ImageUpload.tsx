"use client";
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';

export default function ImageUpload({ onUpload }: { onUpload: (urls: string[]) => void }) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleRemove = (urlToRemove: string) => {
    const updated = imageUrls.filter(url => url !== urlToRemove);
    setImageUrls(updated);
    onUpload(updated);
  };

  return (
    <div className="p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-950/20 text-center transition-all hover:border-blue-400 dark:hover:border-blue-500/50">
      <div className="mb-6">
        <h4 className="font-bold text-slate-800 dark:text-slate-200">Property Visuals</h4>
        <p className="text-sm text-slate-500 mt-1">Upload high-resolution images of the room, amenities, and surroundings.</p>
      </div>
      
      <CldUploadWidget 
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{ multiple: true, maxFiles: 10 }}
        onSuccess={(result) => {
          const uploadedUrl = typeof result.info === 'object' && 'secure_url' in result.info 
            ? result.info.secure_url 
            : "";
          
          if (uploadedUrl) {
            const updated = [...imageUrls, uploadedUrl];
            setImageUrls(updated);
            onUpload(updated);
          }
        }}
      >
        {({ open }) => {
          return (
            <button 
              type="button"
              className="bg-blue-600 text-white px-8 py-3 rounded-2xl hover:bg-blue-700 transition-all font-bold shadow-xl shadow-blue-500/20 active:scale-95 flex items-center gap-2 mx-auto"
              onClick={() => open()}
            >
              <PlusCircle className="h-5 w-5" />
              Upload Photos
            </button>
          );
        }}
      </CldUploadWidget>

      {/* Image Preview Grid */}
      {imageUrls.length > 0 && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageUrls.map((url, index) => (
            <div key={url + index} className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
              <img 
                src={url} 
                alt={`Uploaded ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
              />
              <button
                type="button"
                onClick={() => handleRemove(url)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {imageUrls.length === 0 && (
        <div className="mt-4 text-xs text-slate-400 italic">
          No images uploaded yet. (Max 10)
        </div>
      )}
    </div>
  );
}
