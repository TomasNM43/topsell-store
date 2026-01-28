'use client';
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-secondary text-gray-300 pt-16 pb-8 text-base">
      <div className="container mx-auto max-w-[1800px] px-6 sm:px-8 lg:px-12">
        
        {/* --- SECCIÓN SUPERIOR: SUSCRIPCIÓN --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 pb-12 border-b border-gray-700">
          
          {/* Logo en Caja Blanca */}
          <div className="bg-white p-3 rounded w-48 h-16 flex items-center justify-center relative">
             <div className="relative w-50 h-12">
               <Image 
                 src="/logo.png" 
                 alt="TopSell Logo" 
                 fill
                 className="object-contain"
               />
             </div>
          </div>

          {/* Texto de Suscripción */}
          <div className="text-center lg:text-left max-w-md">
            <h3 className="text-white font-bold text-xl mb-1">Suscríbete a nuestra página</h3>
            <p className="text-gray-400 text-sm">
              Para enviarte a tu correo todas nuestras ofertas exclusivas y novedades.
            </p>
          </div>

          {/* Input y Botón */}
          <form className="flex w-full lg:w-auto">
            <input 
              type="email" 
              placeholder="Ingresa tu correo aquí..." 
              className="w-full lg:w-64 px-4 py-3 text-gray-800 bg-white border-none focus:ring-2 focus:ring-primary outline-none"
            />
            <button 
              type="button" // Cambiar a submit cuando tengas lógica
              className="bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 transition uppercase tracking-wider"
            >
              Suscribirse
            </button>
          </form>
        </div>

        {/* --- SECCIÓN MEDIA: COLUMNAS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
          
          {/* Columna 1: Contacto */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Contacto</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>ventas@topsell.com</li> {/* Correo ficticio basado en imagen */}
              <li>
                <p>Lunes - Viernes: 9:00AM - 5:00PM</p>
                <p>Sábado: 9:00AM - 12:00PM</p>
              </li>
            </ul>
            
            {/* Botones de WhatsApp */}
            <div className="flex gap-4 mt-6">
              <div className="flex flex-col items-center gap-1 cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-xl group-hover:bg-green-600 transition">
                  <FaWhatsapp />
                </div>
                <span className="text-xs text-gray-400">Ventas</span>
              </div>
              <div className="flex flex-col items-center gap-1 cursor-pointer group">
                 <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-xl group-hover:bg-green-600 transition">
                  <FaWhatsapp />
                </div>
                <span className="text-xs text-gray-400">Marketing</span>
              </div>
            </div>
          </div>

          {/* Columna 2: Mi Cuenta */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Mi Cuenta</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-primary transition">Libro de Reclamaciones</a></li>
              <li><a href="#" className="hover:text-primary transition">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-primary transition">Política y Privacidad</a></li>
            </ul>
          </div>

          {/* Columna 3: Más Información */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Más Información</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition">Carrito</a></li>
              
              {/* Imagen Libro Reclamaciones (Simulada) */}
              <li>
                <div className="border border-white/30 rounded p-1 inline-block w-32 h-20 relative bg-gray-800 hover:border-white transition cursor-pointer">
                    {/* Placeholder visual para el libro */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-xs font-bold text-blue-400">Libro de</span>
                        <span className="text-xs font-bold text-blue-400">Reclamaciones</span>
                        <div className="w-8 h-5 border border-white mt-1"></div>
                    </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Redes Sociales</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition text-lg">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-lg">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-lg">
                <FaWhatsapp />
              </a>
            </div>
          </div>

        </div>

        {/* --- SECCIÓN INFERIOR: COPYRIGHT --- */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-500">
            Topsell © 2025. Todos los Derechos Reservados
          </p>
        </div>

      </div>
    </footer>
  );
}