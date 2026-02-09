'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Iniciamos vacío
  const [cart, setCart] = useState([]);
  
  // Estado para saber si ya cargamos los datos del navegador (evita errores de hidratación)
  const [isLoaded, setIsLoaded] = useState(false);

  // 2. CARGAR: Al iniciar, leemos del LocalStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('topsell_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error cargando el carrito:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 3. GUARDAR: Cada vez que 'cart' cambie, lo guardamos en LocalStorage
  useEffect(() => {
    if (isLoaded) { // Solo guardamos si ya terminó de cargar la primera vez
      localStorage.setItem('topsell_cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // Solo calculamos el total si ya cargó
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // --- FUNCIONES ---
  const addToCart = (product, quantity) => {
    setCart(prev => {
      // Nos aseguramos que product.id sea consistente (string o number)
      const productId = product.id; 
      
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      // Aseguramos tener una imagen válida para mostrar en el carrito
      const imageToSave = product.imageUrl;
      
      return [...prev, { ...product, imageUrl: imageToSave, quantity }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + amount;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Evitamos mostrar nada hasta que el carrito haya cargado para no tener saltos visuales
  // Opcional: Puedes retornar null si prefieres que no se vea nada hasta cargar
  
  return (
    <CartContext.Provider value={{ 
        cart, addToCart, updateQuantity, removeFromCart, totalItems 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);