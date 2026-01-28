'use client';
import { useState, useEffect } from 'react';
import { getCategories, getProducts } from '@/services/api';
import ShopSidebar from '@/components/ShopSidebar';
import ShopProductCard from '@/components/ShopProductCard';

export default function TiendaPage() {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Carga inicial de datos
  useEffect(() => {
    const fetchData = async () => {
      const [catsData, prodsData] = await Promise.all([
        getCategories(),
        getProducts()
      ]);
      setCategories(catsData);
      setAllProducts(prodsData);
      setFilteredProducts(prodsData); // Al inicio mostramos todo
    };
    fetchData();
  }, []);

  // Efecto de filtrado
  useEffect(() => {
    if (!selectedCategory) {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter(p => p.category?.slug === selectedCategory));
    }
  }, [selectedCategory, allProducts]);

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="container mx-auto max-w-[1800px] px-6 sm:px-8 lg:px-12 py-12">
        
        {/* LAYOUT: Sidebar (Izquierda) - Contenido (Derecha) */}
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* 1. BARRA LATERAL */}
          <ShopSidebar 
            categories={categories} 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* 2. CONTENIDO PRINCIPAL */}
          <div className="flex-grow">
            
            {/* Cabecera Móvil (Solo visible en pantallas pequeñas) */}
            <div className="md:hidden mb-6 flex justify-between items-center">
                <span className="text-sm text-gray-500">{filteredProducts.length} Productos</span>
                {/* Aquí podría ir un botón de "Filtrar" móvil */}
            </div>

            {/* GRILLA DE PRODUCTOS */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {filteredProducts.map((product) => (
                        <ShopProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No se encontraron productos en esta categoría.</p>
                    <button onClick={() => setSelectedCategory(null)} className="text-primary mt-2 font-bold hover:underline">
                        Ver todos los productos
                    </button>
                </div>
            )}

            {/* PAGINACIÓN (Estática por ahora, visual) */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-base font-medium">
                <span className="text-gray-500">
                    Mostrando 1–{filteredProducts.length} de {filteredProducts.length} Productos
                </span>
                
                <div className="flex items-center gap-2">
                    <button className="text-gray-400 hover:text-black px-2 disabled:opacity-50">Prev</button>
                    <button className="w-8 h-8 flex items-center justify-center border border-primary text-primary">1</button>
                    <button className="w-8 h-8 flex items-center justify-center border border-transparent text-gray-500 hover:border-gray-200">2</button>
                    <button className="text-gray-800 hover:text-primary px-2">Next</button>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}