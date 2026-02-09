import Image from 'next/image';
import Link from 'next/link';

export default function ShopProductCard({ product }) {
  // Solo lógica de stock, quitamos lógica de oferta por precio
  const isOutOfStock = product.stock === 0; 

  return (
    <div className="group flex flex-col items-center text-center">
      
      {/* Imagen + Badge */}
      <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg bg-gray-50">
        
        {/* Badge (Solo Agotado) */}
        <div className="absolute top-2 left-2 z-10">
            {isOutOfStock && (
                <span className="bg-gray-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm">
                    Agotado
                </span>
            )}
        </div>

        <Image
          src={product.imageUrl} 
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition duration-500"
          unoptimized
        />
      </div>

      {/* Info (SIN PRECIO) */}
      <div className="space-y-2 w-full px-2">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
            {product.category?.name || 'General'}
        </p>
        
        <h3 className="text-gray-800 font-medium text-sm line-clamp-2 min-h-[40px]">
            {product.name}
        </h3>
        
        {/* Enlace limpio */}
        <Link 
            href={`/producto/${product.slug}`} 
            className="inline-block text-xs font-bold text-primary hover:text-secondary border-b border-primary/30 hover:border-secondary transition pb-0.5"
        >
            Ver Características
        </Link>
      </div>
    </div>
  );
}