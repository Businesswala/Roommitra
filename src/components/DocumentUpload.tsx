"use client";
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';
import { PlusCircle, X, FileText } from 'lucide-react';

export default function DocumentUpload({ onUpload, value }: { onUpload: (url: string) => void, value?: string }) {
  const [url, setUrl] = useState<string>(value || "");

  const handleRemove = () => {
    setUrl("");
    onUpload("");
  };

  return (
    <div className="p-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-950/20 text-center transition-all hover:border-indigo-400 dark:hover:border-indigo-500/50">
      {!url ? (
        <CldUploadWidget 
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          options={{ multiple: false, maxFiles: 1 }}
          onSuccess={(result) => {
            const uploadedUrl = typeof result.info === 'object' && 'secure_url' in result.info 
              ? result.info.secure_url 
              : "";
            
            if (uploadedUrl) {
              setUrl(uploadedUrl);
              onUpload(uploadedUrl);
            }
          }}
        >
          {({ open }) => {
            return (
              <button 
                type="button"
                className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition-all font-semibold shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center gap-2 mx-auto"
                onClick={() => open()}
              >
                <PlusCircle className="h-5 w-5" />
                Upload ID
              </button>
            );
          }}
        </CldUploadWidget>
      ) : (
        <div className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold truncate max-w-[150px]">ID_Proof.jpg</p>
              <p className="text-xs text-muted-foreground">Document uploaded</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors shadow-sm"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
