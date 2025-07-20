'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { usePortfolioData } from '@/hooks/usePortfolioData';

const Gallery = () => {
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<{ src: string; alt: string } | null>(null);
  const { siteConfig } = usePortfolioData();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { fetchGalleryImages } = await import('@/lib/firestore');
        const galleryImages = await fetchGalleryImages();
        setImages(galleryImages.map(img => ({ src: img.src, alt: img.alt })));
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };
    fetchImages();
  }, []);

  const openLightbox = (image: { src: string; alt: string }) => {
    setCurrentImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
  };

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-16 mt-24">
        <h1 className="text-4xl font-extrabold text-white text-center mb-4">
          Photo Gallery
        </h1>
        <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          {siteConfig?.tagline || "Capturing moments and memories through photography"}
        </p>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="break-inside-avoid rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => openLightbox(image)}
            >
              <Image
                src={image.src}
                alt={image.alt || `Gallery Image ${index + 1}`}
                width={400}
                height={300}
                className="w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxOpen && currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl mx-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl z-10"
              onClick={closeLightbox}
            >
              &times;
            </button>
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              width={800}
              height={600}
              className="rounded-lg object-contain max-h-screen"
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Gallery;
