"use client";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    // Aumenté el padding vertical (pt-24 pb-12) para dar más aire
    <footer className="bg-secondary text-gray-300 pt-24 pb-12 text-base">
      <div className="container mx-auto max-w-[1800px] px-6 sm:px-8 lg:px-12">
        
        {/* --- SECCIÓN SUPERIOR: SUSCRIPCIÓN --- */}
        {/* Aumenté el gap a 16 para separar más el logo del texto y del input */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-16 pb-16 border-b border-gray-700">
          
          {/* Logo en Caja Blanca (Ligeramente más grande) */}
          <div className="bg-white p-4 rounded w-56 h-20 flex items-center justify-center relative">
            <div className="relative w-full h-full">
              <Image
                src="/logo.png"
                alt="TopSell Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Texto de Suscripción */}
          <div className="text-center lg:text-left max-w-lg">
            {/* Título más grande (text-2xl) y más margen inferior (mb-3) */}
            <h3 className="text-white font-bold text-2xl mb-3">
              Suscríbete a nuestra página
            </h3>
            {/* Texto descriptivo más grande (text-base en lugar de text-sm) */}
            <p className="text-gray-400 text-base leading-relaxed">
              Para enviarte a tu correo todas nuestras ofertas exclusivas y
              novedades.
            </p>
          </div>

          {/* Input y Botón */}
          <form className="flex w-full lg:w-auto shadow-lg">
            <input
              type="email"
              placeholder="Ingresa tu correo aquí..."
              // Inputs más altos (py-4) y texto más grande
              className="w-full lg:w-80 px-6 py-4 text-gray-800 bg-white border-none focus:ring-2 focus:ring-primary outline-none text-base"
            />
            <button
              type="button" 
              // Botón más grande y fuente más visible
              className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-4 transition uppercase tracking-wider text-base"
            >
              Suscribirse
            </button>
          </form>
        </div>

        {/* --- SECCIÓN MEDIA: COLUMNAS --- */}
        {/* Aumenté el gap entre columnas (gap-12) y el padding vertical (py-16) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          
          {/* Columna 1: Contacto */}
          <div>
            {/* Títulos de columna más grandes (text-xl) y más separación (mb-8) */}
            <h4 className="text-white font-bold mb-8 text-xl tracking-wide">Contacto</h4>
            {/* Listas con texto base y mayor separación vertical (space-y-4) */}
            <ul className="space-y-4 text-base text-gray-400 leading-relaxed">
              <li className="hover:text-white transition cursor-pointer">ventas@topsell.com</li>
              <li>
                <p>Lunes - Viernes: 9:00AM - 6:00PM</p>
                <p>Sábado: 9:00AM - 2:00PM</p>
              </li>
            </ul>

            {/* Botones de WhatsApp un poco más grandes */}
            <div className="flex gap-5 mt-8">
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl group-hover:bg-green-600 transition shadow-md hover:scale-110 duration-300">
                  <FaWhatsapp />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-white transition">Ventas</span>
              </div>
            </div>
          </div>

          {/* Columna 2: Mi Cuenta */}
          <div>
            <h4 className="text-white font-bold mb-8 text-xl tracking-wide">Mi Cuenta</h4>
            <ul className="space-y-5 text-base text-gray-400">
              <li>
                <a href="#" className="hover:text-primary transition hover:pl-2 duration-200 block">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition hover:pl-2 duration-200 block">
                  Libro de Reclamaciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition hover:pl-2 duration-200 block">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition hover:pl-2 duration-200 block">
                  Política y Privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Más Información */}
          <div>
            <h4 className="text-white font-bold mb-8 text-xl tracking-wide">
              Más Información
            </h4>
            <ul className="space-y-6 text-base text-gray-400">
              <li>
                {/* Imagen del libro de reclamaciones un poco más grande */}
                <div className="rounded p-2 inline-block w-40 h-24 relative bg-white hover:border-white transition cursor-pointer overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 duration-300">
                  <Image
                    src="/libro-reclamaciones.png"
                    alt="Libro de Reclamaciones"
                    fill
                    className="object-contain"
                  />
                </div>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales */}
          <div>
            <h4 className="text-white font-bold mb-8 text-xl tracking-wide">
              Redes Sociales
            </h4>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition text-2xl hover:scale-110 duration-200"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition text-2xl hover:scale-110 duration-200"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition text-2xl hover:scale-110 duration-200"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        {/* --- SECCIÓN INFERIOR: COPYRIGHT --- */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-base text-gray-500">
            Topsell © 2025. Todos los Derechos Reservados
          </p>
        </div>
      </div>
    </footer>
  );
}