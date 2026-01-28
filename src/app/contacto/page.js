import Image from "next/image";

export default function ContactoPage() {
  return (
    <main className="bg-white min-h-screen flex items-center">
      
      <div className="container mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 py-16">
        
        {/* Grid de 2 Columnas (Izquierda: Imagen/Mapa, Derecha: Formulario) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* --- COLUMNA IZQUIERDA (Imagen o Mapa) --- */}
          <div className="relative w-full h-[500px] md:h-[600px] bg-gray-200 rounded-3xl overflow-hidden shadow-inner">
            {/* Aquí podrías poner un Google Map iframe en el futuro */}
            <Image
              src="https://placehold.co/800x800?text=Mapa+o+Imagen+Contacto" 
              alt="Ubicación Topsell"
              fill
              className="object-cover opacity-50"
              unoptimized
            />
          </div>

          {/* --- COLUMNA DERECHA (Formulario) --- */}
          <div className="md:pl-8">
            <h2 className="text-6xl font-extrabold text-primary mb-4">Hablemos</h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Siéntete libre de dejarnos cualquier mensaje sobre tus recomendaciones o inconvenientes que has tenido con nuestra tienda.
            </p>

            <form className="space-y-5">
              
              {/* Nombres */}
              <div>
                <label htmlFor="nombres" className="block text-lg font-bold text-secondary mb-2 pl-1">
                  Nombres
                </label>
                <input 
                  type="text" 
                  id="nombres"
                  placeholder="" 
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>

              {/* Apellidos */}
              <div>
                <label htmlFor="apellidos" className="block text-lg font-bold text-secondary mb-2 pl-1">
                  Apellidos
                </label>
                <input 
                  type="text" 
                  id="apellidos"
                  placeholder="" 
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>

              {/* Correo */}
              <div>
                <label htmlFor="correo" className="block text-lg font-bold text-secondary mb-2 pl-1">
                  Correo
                </label>
                <input 
                  type="email" 
                  id="correo"
                  placeholder="" 
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>

              {/* Mensaje */}
              <div>
                <label htmlFor="mensaje" className="block text-lg font-bold text-secondary mb-2 pl-1">
                  Mensaje
                </label>
                <textarea 
                  id="mensaje"
                  rows="4"
                  placeholder="Escríbenos algo..." 
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none"
                ></textarea>
              </div>

              {/* Botón de Envío */}
              <div className="pt-2 text-right">
                <button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition transform active:scale-95"
                >
                  Envía tu mensaje
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </main>
  );
}