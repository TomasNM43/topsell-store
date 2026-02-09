'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ mainImage, secondaryImages = [], productName }) {
  // Construir array de imágenes: principal primero, luego las secundarias
  const images = [mainImage, ...secondaryImages].filter(Boolean);

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      
      {/* 1. Tira de Miniaturas (Vertical en Desktop, Horizontal en Mobile) */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
        {images.map((img, index) => (
          <div 
            key={index}
            className={`relative w-20 h-20 border cursor-pointer rounded-md overflow-hidden transition
                ${selectedImage === img ? 'border-primary border-2' : 'border-gray-200 hover:border-gray-300'}
            `}
            onClick={() => setSelectedImage(img)}
          >
            <Image 
                src={img} 
                alt={`Thumb ${index}`} 
                fill 
                className="object-contain p-1"
                unoptimized
            />
          </div>
        ))}
      </div>

      {/* 2. Imagen Principal (Grande) */}
      <div className="relative flex-grow bg-white border border-gray-100 rounded-lg overflow-hidden min-h-[400px] md:min-h-[500px]">
        <Image 
            src={selectedImage} 
            alt={productName} 
            fill 
            className="object-contain p-8 hover:scale-105 transition duration-500"
            unoptimized
        />
      </div>

    </div>
  );
}