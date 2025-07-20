"use client";

import { SiteConfig } from '@/lib/firestore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminButton from '@/components/AdminButton';
import Image from 'next/image';

interface AdminGalleryPreviewProps {
  localSiteConfig: Partial<SiteConfig>;
  setLocalSiteConfig: (data: Partial<SiteConfig> | ((prev: Partial<SiteConfig>) => Partial<SiteConfig>)) => void;
  saving: boolean;
  handleSave: (
    section: string,
    data: Partial<SiteConfig>,
    updateFunction: (data: Partial<SiteConfig>) => Promise<boolean>
  ) => Promise<void>;
  updateConfig: (data: Partial<SiteConfig>) => Promise<boolean>;
  galleryImages: { src: string; alt: string; name: string }[];
  galleryError: string | null;
  handleGalleryImageUpload: (file: File) => Promise<void>;
  handleGalleryImageDelete: (name: string) => Promise<void>;
}

export default function AdminGalleryPreview({
  localSiteConfig,
  setLocalSiteConfig,
  saving,
  handleSave,
  updateConfig,
  galleryImages,
  galleryError,
  handleGalleryImageUpload,
  handleGalleryImageDelete
}: AdminGalleryPreviewProps) {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-16 mt-24">
        <h1 
          contentEditable
          suppressContentEditableWarning
          className="text-4xl font-extrabold text-white text-center mb-4 outline-none border-2 border-transparent hover:border-red-500/50 rounded p-2 transition-colors focus:border-red-500"
          onBlur={(e) => setLocalSiteConfig(prev => ({ ...prev, siteName: e.target.textContent || "" }))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              (e.target as HTMLElement).blur();
            }
          }}
        >
          Photo Gallery
        </h1>
        <p 
          contentEditable
          suppressContentEditableWarning
          className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto outline-none border-2 border-transparent hover:border-red-500/50 rounded p-2 transition-colors focus:border-red-500"
          onBlur={(e) => setLocalSiteConfig(prev => ({ ...prev, tagline: e.target.textContent || "" }))}
        >
          {localSiteConfig.tagline || "Capturing moments and memories through photography"}
        </p>

        {/* Gallery Error */}
        {galleryError && (
          <div className="mb-4 text-center text-red-400">{galleryError}</div>
        )}

        {/* Gallery Upload */}
        <div className="mb-8 text-center">
          <label htmlFor="gallery-upload" className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-700 transition-colors font-semibold mb-4">
            Upload Images
          </label>
          <input
            id="gallery-upload"
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={e => {
              if (e.target.files && e.target.files.length > 0) {
                Array.from(e.target.files).forEach(file => handleGalleryImageUpload(file));
                e.target.value = '';
              }
            }}
            disabled={saving}
          />
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.length === 0 && (
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700 break-inside-avoid mb-4 text-gray-400 text-center">
              No gallery images found. Upload images to display here.
            </div>
          )}
          {galleryImages.map(img => (
            <div key={img.name} className="bg-black/30 backdrop-blur-sm rounded-lg border border-gray-700 break-inside-avoid mb-4 relative group">
              {/* Use next/image for optimized images */}
              <div className="w-full h-auto rounded-lg object-cover overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto rounded-lg object-cover"
                  loading="lazy"
                  layout="responsive"
                  objectFit="cover"
                  width={400}
                  height={300}
                  style={{ display: 'block', width: '100%' }}
                />
              </div>
              <button
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleGalleryImageDelete(img.name)}
                disabled={saving}
                title="Delete image"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="mt-12 text-center">
          <AdminButton
            onClick={() => handleSave('config', localSiteConfig, updateConfig)}
            loading={saving}
          >
            Save Gallery Page Changes
          </AdminButton>
        </div>
      </main>
      <Footer />
    </>
  );
}
