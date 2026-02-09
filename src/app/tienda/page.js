'use client';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCategories, getProducts } from '@/services/api';
import ShopSidebar from '@/components/ShopSidebar';
import ShopProductCard from '@/components/ShopProductCard';

export default function TiendaPage() {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 12;

  // Carga inicial de datos
  useEffect(() => {
    const fetchData = async () => {
      const [catsData, prodsData] = await Promise.all([
        getCategories(),
        getProducts()
      ]);
      setCategories(catsData);
      setAllProducts(prodsData);
    };
    fetchData();
  }, []);

  // Leer parámetros de URL al cargar
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const subcategoryParam = searchParams.get('subcategory');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (subcategoryParam) {
      setSelectedSubCategory(subcategoryParam);
      
      // Si hay subcategoría pero no categoría, encontrar la categoría padre
      if (!categoryParam && categories.length > 0) {
        const parentCategory = categories.find(cat => 
          cat.subCategories?.some(sub => sub.slug === subcategoryParam)
        );
        if (parentCategory) {
          setSelectedCategory(parentCategory.slug);
        }
      }
    }
  }, [searchParams, categories]);

  // Calcular productos filtrados usando useMemo
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;
    
    // Filtrar por subcategoría (tiene prioridad si está seleccionada)
    if (selectedSubCategory) {
      filtered = filtered.filter(p => p.subCategory?.slug === selectedSubCategory);
    } 
    // Filtrar por categoría (muestra todos los productos de esa categoría, incluidas sus subcategorías)
    else if (selectedCategory) {
      filtered = filtered.filter(p => p.category?.slug === selectedCategory);
    }
    
    return filtered;
  }, [selectedCategory, selectedSubCategory, allProducts]);

  // Calcular páginas
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Limpiar filtros
  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setCurrentPage(1);
  };

  // Manejar selección de categoría
  const handleSelectCategory = (slug) => {
    setSelectedCategory(slug);
    // Si se selecciona una categoría diferente, limpiar la subcategoría
    if (slug !== selectedCategory) {
      setSelectedSubCategory(null);
    }
    setCurrentPage(1);
  };

  // Manejar selección de subcategoría
  const handleSelectSubCategory = (slug) => {
    setSelectedSubCategory(slug);
    setCurrentPage(1);
    
    // Encontrar y establecer la categoría padre automáticamente
    const parentCategory = categories.find(cat => 
      cat.subCategories?.some(sub => sub.slug === slug)
    );
    if (parentCategory) {
      setSelectedCategory(parentCategory.slug);
    }
  };

  // Navegación de páginas
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="container mx-auto max-w-[1800px] px-6 sm:px-8 lg:px-12 py-12">
        
        {/* LAYOUT: Sidebar (Izquierda) - Contenido (Derecha) */}
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* 1. BARRA LATERAL */}
          <ShopSidebar 
            categories={categories} 
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory}
            onSelectCategory={handleSelectCategory}
            onSelectSubCategory={handleSelectSubCategory}
            onClearFilters={handleClearFilters}
          />

          {/* 2. CONTENIDO PRINCIPAL */}
          <div className="flex-grow">
            
            {/* Cabecera Móvil (Solo visible en pantallas pequeñas) */}
            <div className="md:hidden mb-6 flex justify-between items-center">
                <span className="text-sm text-gray-500">{filteredProducts.length} Productos</span>
                {/* Aquí podría ir un botón de "Filtrar" móvil */}
            </div>

            {/* GRILLA DE PRODUCTOS */}
            {currentProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {currentProducts.map((product) => (
                        <ShopProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No se encontraron productos en esta categoría.</p>
                    <button onClick={handleClearFilters} className="text-primary mt-2 font-bold hover:underline">
                        Ver todos los productos
                    </button>
                </div>
            )}

            {/* PAGINACIÓN */}
            {filteredProducts.length > 0 && (
              <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-base font-medium">
                  <span className="text-gray-500">
                      Mostrando {startIndex + 1}–{Math.min(endIndex, filteredProducts.length)} de {filteredProducts.length} Productos
                  </span>
                  
                  {totalPages > 1 && (
                    <div className="flex items-center gap-2">
                        <button 
                          onClick={handlePrevPage}
                          disabled={currentPage === 1}
                          className="text-gray-800 hover:text-primary px-2 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          Prev
                        </button>
                        
                        {[...Array(totalPages)].map((_, index) => {
                          const page = index + 1;
                          // Mostrar solo páginas cercanas a la actual
                          if (
                            page === 1 || 
                            page === totalPages || 
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageClick(page)}
                                className={`w-8 h-8 flex items-center justify-center border transition ${
                                  currentPage === page
                                    ? 'border-primary text-primary font-bold'
                                    : 'border-transparent text-gray-500 hover:border-gray-200'
                                }`}
                              >
                                {page}
                              </button>
                            );
                          } else if (page === currentPage - 2 || page === currentPage + 2) {
                            return <span key={page} className="text-gray-400">…</span>;
                          }
                          return null;
                        })}
                        
                        <button 
                          onClick={handleNextPage}
                          disabled={currentPage === totalPages}
                          className="text-gray-800 hover:text-primary px-2 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                    </div>
                  )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}