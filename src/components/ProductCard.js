import Image from 'next/image';
import Link from 'next/link';
import { FaEye } from 'react-icons/fa';

export default function ProductCard({ product }) {
  return (
    <div className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      
      {/* Imagen */}
      <div className="relative w-full h-64 bg-gray-50">
        <Image 
          src={product.imageUrl} 
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        
        {/* Etiqueta (Opcional: Solo si es nuevo o destacado, ya no por precio) */}
        {product.isNew && (
            <span className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                Nuevo
            </span>
        )}
      </div>

      {/* Información (SIN PRECIO) */}
      <div className="p-4 text-center">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">
          {product.category?.name || 'General'}
        </p>
        
        <h3 className="text-secondary font-bold text-sm line-clamp-2 min-h-[40px] mb-4">
          {product.name}
        </h3>

        {/* Botón de Acción */}
        <Link 
          href={`/producto/${product.slug}`}
          className="inline-flex items-center gap-2 text-primary text-xs font-bold border-b border-primary/20 pb-0.5 hover:border-primary transition uppercase tracking-wide"
        >
          <FaEye /> Ver Detalle
        </Link>
      </div>
    </div>
  );
}