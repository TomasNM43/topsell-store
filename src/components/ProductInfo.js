'use client';
import { useState } from 'react';
import { FaFacebookF, FaWhatsapp, FaCheck } from 'react-icons/fa';
import { useCart } from '@/context/CartContext'; // <--- 1. IMPORTAR CONTEXTO

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // <--- 2. OBTENER FUNCIÓN
  const [added, setAdded] = useState(false); // Estado visual para feedback

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const handleIncrease = () => setQuantity(quantity + 1);

  // 3. FUNCIÓN PARA AGREGAR
  const handleAddToCart = () => {
    addToCart(product, quantity);
    
    // Feedback visual simple (cambia el texto del botón por 2 seg)
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      {/* Breadcrumb / Categoría */}
      <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">
        {product.category?.name || 'General'}
      </p>

      {/* Título */}
      <h1 className="text-3xl font-extrabold text-secondary mb-2">
        {product.name}
      </h1>

      {/* SKU (Simulado por ahora si no está en BD) */}
      <p className="text-xs text-gray-400 mb-6">SKU: {product.id}9871235</p>

      {/* Descripción Corta */}
      <div className="text-gray-600 text-sm leading-relaxed mb-6">
        {product.shortDescription || product.description}
      </div>

      {/* Descripción Larga */}
      {product.longDescription && (
        <div className="text-gray-600 text-sm leading-relaxed mb-6">
          {product.longDescription}
        </div>
      )}

      {/* Características (Dinámico) */}
      {product.features && product.features.length > 0 && (
        <ul className="list-disc list-inside text-sm text-gray-600 mb-8 space-y-1">
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      )}

      {/* Fila de Acción: Cantidad + Botón Cotizar */}
      <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-100">
        
        {/* Selector Cantidad */}
        <div className="flex items-center border border-gray-300 rounded">
            <button onClick={handleDecrease} className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition">-</button>
            <span className="px-4 py-2 font-bold text-secondary min-w-[40px] text-center">{quantity}</span>
            <button onClick={handleIncrease} className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition">+</button>
        </div>

        {/* Botón Cotizar CONECTADO */}
        <button 
            onClick={handleAddToCart}
            className={`flex-grow font-bold py-3 px-8 rounded transition uppercase tracking-wide shadow-md 
                ${added ? 'bg-green-600 text-white' : 'bg-primary hover:bg-primary-hover text-white'}
            `}
        >
            {added ? (
                <span className="flex items-center justify-center gap-2"><FaCheck /> Agregado</span>
            ) : (
                "Cotizar"
            )}
        </button>
      </div>

    </div>
  );
}