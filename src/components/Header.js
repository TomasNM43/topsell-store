'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaChevronRight, FaTrash, FaSignOutAlt, FaUserCircle, FaSearch, FaSpinner } from 'react-icons/fa';
import { getCategories, searchProducts } from '@/services/api'; // <--- IMPORTAR searchProducts
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isStoreHovered, setIsStoreHovered] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  
  // --- ESTADOS PARA BÚSQUEDA EN VIVO ---
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]); // Resultados previos
  const [isSearching, setIsSearching] = useState(false); // Loading de búsqueda
  const [showPreview, setShowPreview] = useState(false); // Mostrar/Ocultar dropdown
  const searchRef = useRef(null); // Para detectar clics fuera y cerrar

  const router = useRouter();

  // Estados para dropdowns
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { cart, removeFromCart, totalItems } = useCart();
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchCats = async () => {
      const data = await getCategories();
      setCategories(data);
      if(data.length > 0) setActiveCategory(data[0]);
    };
    fetchCats();

    // Event listener para cerrar el buscador si hago clic fuera
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowPreview(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  // --- EFECTO DEBOUCE PARA BÚSQUEDA ---
  useEffect(() => {
    // Si el término es muy corto, limpiamos y no buscamos
    if (searchTerm.length < 2) {
        setSearchResults([]);
        setShowPreview(false);
        return;
    }

    // Esperamos 300ms antes de llamar a la API
    const delayDebounceFn = setTimeout(async () => {
        setIsSearching(true);
        setShowPreview(true);
        try {
            const results = await searchProducts(searchTerm);
            // Limitamos a 5 resultados para la previsualización
            setSearchResults(results.slice(0, 5));
        } catch (error) {
            console.error(error);
        } finally {
            setIsSearching(false);
        }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);


  // --- MANEJAR SUBMIT (ENTER) ---
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowPreview(false); // Ocultar preview
    if (searchTerm.trim()) {
      router.push(`/tienda?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100 font-sans">
      <div className="container mx-auto max-w-[1800px] px-6 sm:px-8 lg:px-12 relative">
        <div className="flex justify-between items-center h-24 gap-4">

          {/* 1. LOGO */}
          <div className="flex-shrink-0 z-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-32 h-24">
                <Image src="/logo.png" alt="TopSell Logo" fill className="object-contain" priority />
              </div>
            </Link>
          </div>

          {/* 2. BÚSQUEDA CON PREVISUALIZACIÓN */}
          <div className="hidden lg:flex flex-1 max-w-md ml-4 mr-auto z-20 relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input 
                    type="text" 
                    placeholder="Buscar productos..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => { if(searchResults.length > 0) setShowPreview(true); }}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-full pl-5 pr-12 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
                <button 
                    type="submit"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-hover text-white p-2 rounded-full w-8 h-8 flex items-center justify-center transition"
                >
                    {isSearching ? <FaSpinner className="animate-spin text-xs" /> : <FaSearch className="text-xs" />}
                </button>
            </form>

            {/* --- DROPDOWN DE RESULTADOS --- */}
            {showPreview && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {searchResults.length > 0 ? (
                        <>
                            {searchResults.map((product) => (
                                <Link 
                                    key={product.id} 
                                    href={`/producto/${product.slug}`}
                                    onClick={() => { setShowPreview(false); setSearchTerm(''); }}
                                    className="flex items-center gap-3 p-3 hover:bg-gray-50 transition border-b border-gray-50 last:border-0"
                                >
                                    <div className="relative w-10 h-10 flex-shrink-0 border border-gray-100 rounded bg-white">
                                        <Image 
                                            src={product.imageUrl || product.image || 'https://placehold.co/100x100'} 
                                            alt={product.name} 
                                            fill 
                                            className="object-contain p-1"
                                            unoptimized
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-gray-700 truncate">{product.name}</p>
                                        <p className="text-[10px] text-gray-400 uppercase">{product.category?.name || 'Producto'}</p>
                                    </div>
                                </Link>
                            ))}
                            <button 
                                onClick={handleSearchSubmit}
                                className="w-full text-center py-2 text-xs font-bold text-primary hover:bg-gray-50 transition"
                            >
                                Ver todos los resultados
                            </button>
                        </>
                    ) : (
                        !isSearching && searchTerm.length >= 2 && (
                            <div className="p-4 text-center text-gray-400 text-sm">
                                No encontramos productos que coincidan.
                            </div>
                        )
                    )}
                </div>
            )}
          </div>

          {/* 3. MENÚ DE NAVEGACIÓN */}
          <nav className="hidden xl:flex space-x-8 absolute left-1/2 transform -translate-x-1/2 h-full items-center z-10">
             <div 
                className="relative h-full flex items-center"
                onMouseEnter={() => setIsStoreHovered(true)}
                onMouseLeave={() => setIsStoreHovered(false)}
            >
                <Link href="/tienda" className="text-base font-bold text-secondary hover:text-primary transition uppercase tracking-wide cursor-pointer h-full flex items-center">
                  Tienda
                </Link>
                {isStoreHovered && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[600px] bg-white shadow-xl border border-gray-100 rounded-b-xl flex overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-1/3 bg-gray-50 py-4">
                            {categories.map((cat) => (
                                <div key={cat.id} onMouseEnter={() => setActiveCategory(cat)} className={`px-6 py-3 cursor-pointer text-base font-semibold flex justify-between items-center transition ${activeCategory?.id === cat.id ? 'bg-white text-primary border-l-4 border-primary shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>
                                    {cat.name} {activeCategory?.id === cat.id && <FaChevronRight className="text-xs" />}
                                </div>
                            ))}
                        </div>
                        <div className="w-2/3 p-6 bg-white">
                            {activeCategory && activeCategory.subCategories && (
                                <div>
                                    <h3 className="text-xl font-bold text-secondary mb-4 border-b pb-2">{activeCategory.name}</h3>
                                    <ul className="grid grid-cols-2 gap-4">
                                        {activeCategory.subCategories.map((sub) => (
                                            <li key={sub.id}>
                                                <Link href={`/categoria/${activeCategory.slug}/${sub.slug}`} className="text-gray-500 hover:text-primary text-base transition hover:underline">{sub.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Link href="/nosotros" className="text-base font-bold text-secondary hover:text-primary transition uppercase tracking-wide">Nosotros</Link>
            <Link href="/contacto" className="text-base font-bold text-secondary hover:text-primary transition uppercase tracking-wide">Contacto</Link>
          </nav>

          {/* 4. ACCIONES (Login + Carrito) */}
          <div className="flex items-center gap-6 z-20 ml-auto">
            {user ? (
                <div className="relative hidden md:block">
                    <button 
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        onBlur={() => setTimeout(() => setIsUserMenuOpen(false), 200)}
                        className="flex items-center gap-2 text-base font-bold text-secondary hover:text-primary transition focus:outline-none"
                    >
                        <FaUserCircle className="text-xl" />
                        <span className="truncate max-w-[100px]">Hola, {user.firstName || user.nombres}</span>
                        <FaChevronRight className={`text-xs transition-transform ${isUserMenuOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {isUserMenuOpen && (
                        <div className="absolute right-0 top-full mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="px-4 py-3 border-b border-gray-50 bg-gray-50">
                                <p className="text-xs text-gray-500">Conectado como</p>
                                <p className="text-xs font-bold text-secondary truncate">{user.email}</p>
                            </div>
                            <button 
                                onClick={logout}
                                className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 transition"
                            >
                                <FaSignOutAlt /> Cerrar Sesión
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <Link href="/login" className="hidden md:flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition">
                    <FaUser className="text-lg" />
                    <span>Iniciar Sesión</span>
                </Link>
            )}

            <div className="hidden md:block h-6 w-px bg-gray-200"></div>
            
            <div className="relative">
              <button 
                className="relative group focus:outline-none"
                onClick={() => setIsCartOpen(!isCartOpen)} 
                onBlur={() => setTimeout(() => setIsCartOpen(false), 200)}
              >
                <div className={`p-2 rounded-full transition ${isCartOpen ? 'bg-primary/10' : 'bg-gray-100 group-hover:bg-primary/10'}`}>
                  <FaShoppingCart className={`text-xl transition ${isCartOpen ? 'text-primary' : 'text-secondary group-hover:text-primary'}`} />
                </div>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce-short">
                    {totalItems}
                  </span>
                )}
              </button>
              {isCartOpen && (
                <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-secondary">Mi Lista ({totalItems})</h3>
                    <Link href="/carrito" className="text-xs text-primary font-bold hover:underline">Ver todo</Link>
                  </div>
                  {cart.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 text-sm">Tu lista está vacía</div>
                  ) : (
                    <div className="max-h-64 overflow-y-auto">
                      {cart.slice(0, 3).map((item) => (
                        <div key={item.id} className="p-4 flex gap-3 border-b border-gray-50">
                           <div className="w-12 h-12 relative border border-gray-100 rounded overflow-hidden flex-shrink-0">
                             <Image src={item.imageUrl || item.image || 'https://placehold.co/100x100'} alt={item.name} fill className="object-contain" unoptimized />
                           </div>
                           <div className="flex-grow min-w-0">
                             <h4 className="text-xs font-bold text-secondary truncate">{item.name}</h4>
                             <p className="text-xs text-gray-500">Cant: {item.quantity}</p>
                           </div>
                           <button onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }} className="text-gray-400 hover:text-red-500"><FaTrash className="text-xs" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="p-4 bg-white border-t border-gray-100">
                    <Link href="/carrito" className="block w-full bg-secondary hover:bg-black text-white text-center py-3 rounded-lg font-bold text-sm transition uppercase tracking-wide">Ir a Cotizar</Link>
                  </div>
                </div>
              )}
            </div>

            <button className="xl:hidden text-2xl text-secondary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
         <div className="xl:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg p-4">
             {/* Búsqueda en móvil (simplificada sin preview para no tapar toda la pantalla) */}
             <form onSubmit={handleSearchSubmit} className="mb-4 relative">
                <input 
                    type="text" 
                    placeholder="Buscar..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:border-primary"
                />
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary">
                    <FaSearch />
                </button>
             </form>
             {user ? (
                 <div className="mb-4 pb-4 border-b border-gray-100">
                     <p className="font-bold text-secondary">Hola, {user.firstName}</p>
                     <button onClick={logout} className="text-red-500 text-sm mt-1">Cerrar Sesión</button>
                 </div>
             ) : (
                 <Link href="/login" className="block mb-4 font-bold text-secondary">Iniciar Sesión</Link>
             )}
             <Link href="/tienda" className="block py-2 text-secondary">TIENDA</Link>
             <Link href="/nosotros" className="block py-2 text-secondary">NOSOTROS</Link>
             <Link href="/contacto" className="block py-2 text-secondary">CONTACTO</Link>
         </div>
      )}
    </header>
  );
}