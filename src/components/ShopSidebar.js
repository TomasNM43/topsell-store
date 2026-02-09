'use client';
import { useState, useEffect } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

export default function ShopSidebar({ 
  categories, 
  selectedCategory, 
  selectedSubCategory,
  onSelectCategory,
  onSelectSubCategory,
  onClearFilters
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubCategories, setOpenSubCategories] = useState({});

  // Abrir automáticamente la categoría cuando hay una subcategoría seleccionada
  useEffect(() => {
    if (selectedSubCategory && categories.length > 0) {
      // Encontrar la categoría padre de la subcategoría seleccionada
      const parentCategory = categories.find(cat => 
        cat.subCategories?.some(sub => sub.slug === selectedSubCategory)
      );
      
      if (parentCategory) {
        setOpenSubCategories(prev => ({
          ...prev,
          [parentCategory.slug]: true
        }));
      }
    }
  }, [selectedSubCategory, categories]);

  const toggleSubCategory = (categorySlug) => {
    setOpenSubCategories(prev => ({
      ...prev,
      [categorySlug]: !prev[categorySlug]
    }));
  };

  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      
      {/* Cabecera de Filtros */}
      <div className="flex justify-between items-center mb-6">
        <div className="border border-primary text-primary font-bold text-xs px-4 py-2 uppercase tracking-widest">
            Filtrar
        </div>
        <button 
            onClick={onClearFilters} 
            className="text-xs text-gray-500 hover:text-primary underline decoration-gray-300 hover:decoration-primary transition"
        >
            Limpiar todo
        </button>
      </div>

      {/* Bloque de Categorías */}
      <div className="border-t border-gray-100 py-4">
        <div 
            className="flex justify-between items-center cursor-pointer mb-4"
            onClick={() => setIsOpen(!isOpen)}
        >
            <h3 className="font-bold text-secondary text-sm">Categorías</h3>
            <span className="text-gray-400 text-xs">{isOpen ? <FaMinus /> : <FaPlus />}</span>
        </div>

        {/* Lista Desplegable */}
        {isOpen && (
            <ul className="space-y-3">
                {categories.map((cat) => (
                    <li key={cat.id}>
                        <div className="space-y-2">
                            {/* Categoría Principal */}
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => onSelectCategory(cat.slug)}
                                    className={`flex-grow text-left text-sm group ${
                                        selectedCategory === cat.slug ? 'text-primary font-bold' : 'text-gray-500 hover:text-secondary'
                                    }`}
                                >
                                    <span>{cat.name}</span>
                                </button>
                                
                                {/* Botón para expandir subcategorías */}
                                {cat.subCategories && cat.subCategories.length > 0 && (
                                    <button
                                        onClick={() => toggleSubCategory(cat.slug)}
                                        className="text-gray-400 hover:text-gray-600 text-xs p-1"
                                    >
                                        {openSubCategories[cat.slug] ? <FaMinus /> : <FaPlus />}
                                    </button>
                                )}
                            </div>

                            {/* Subcategorías */}
                            {cat.subCategories && cat.subCategories.length > 0 && openSubCategories[cat.slug] && (
                                <ul className="ml-4 space-y-2 border-l-2 border-gray-100 pl-3">
                                    {cat.subCategories.map((subCat) => (
                                        <li key={subCat.id}>
                                            <button
                                                onClick={() => onSelectSubCategory(subCat.slug)}
                                                className={`text-xs w-full text-left ${
                                                    selectedSubCategory === subCat.slug 
                                                        ? 'text-primary font-bold' 
                                                        : 'text-gray-400 hover:text-secondary'
                                                }`}
                                            >
                                                {subCat.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        )}
      </div>
    </aside>
  );
}