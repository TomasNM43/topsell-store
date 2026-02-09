import Image from "next/image";
import { FaCubes, FaGem, FaShieldAlt, FaHandshake, FaSearch, FaChessKnight } from "react-icons/fa";

export default function NosotrosPage() {
  return (
    <main className="bg-white min-h-screen">
      
      {/* CONTENEDOR PRINCIPAL */}
      <div className="container mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 py-20 space-y-32">

        {/* 1. SECCIÓN ¿QUIÉNES SOMOS? (Centrado) */}
        <section className="text-center flex flex-col items-center py-8">
          <h2 className="text-5xl md:text-6xl font-extrabold text-secondary mb-12">¿Quiénes somos?</h2>
          
          <div className="relative w-full max-w-4xl h-72 md:h-[450px] rounded-3xl overflow-hidden mb-12 shadow-xl">
             <Image 
               src="/nosotros.jpg"
               alt="Equipo Topsell"
               fill
               className="object-cover"
               unoptimized
             />
          </div>

          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed text-lg md:text-xl text-justify px-4">
            Corporación Topsell S.A.C. es un grupo corporativo que consolida la experiencia acumulada por más de 13 años en el rubro de iluminación, eléctricos y ferretería del equipo fundador Grupo Celux, dedicada a la importación y distribución mayorista de diversos productos con las marcas Celux, Stronglight y Bemlux. Y así mismo, sigue desarrollando nuevas propuestas que respondan a las necesidades del mercado, con atención cercana, transparencia y calidad.
          </p>
        </section>

        {/* DIVISOR VISUAL */}
        <div className="border-t border-gray-200 max-w-md mx-auto"></div>

        {/* 2. SECCIÓN VISIÓN (Texto Izquierda - Imagen Derecha) */}
        <section className="flex flex-col md:flex-row items-center gap-16 py-8">
          <div className="md:w-1/2 text-left space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-secondary">Visión</h2>
            <p className="text-gray-600 leading-relaxed text-lg md:text-xl text-justify pr-0 md:pr-8">
              Ser líderes en el mercado peruano en la venta de productos innovadores para el hogar, mejorando la calidad de vida de nuestros clientes a través de soluciones prácticas, accesibles y confiables, y consolidándonos como referentes en el comercio digital.
            </p>
          </div>
          <div className="md:w-1/2 relative w-full h-72 md:h-96 rounded-3xl overflow-hidden shadow-xl">
             <Image 
               src="/vision.jpg"
               alt="Visión"
               fill
               className="object-cover"
               unoptimized
             />
          </div>
        </section>

        {/* 3. SECCIÓN MISIÓN (Imagen Izquierda - Texto Derecha) */}
        <section className="flex flex-col-reverse md:flex-row items-center gap-16 py-8">
          <div className="md:w-1/2 relative w-full h-72 md:h-96 rounded-3xl overflow-hidden shadow-xl">
             <Image 
               src="/mision.jpg" 
               alt="Misión"
               fill
               className="object-cover"
               unoptimized
             />
          </div>
          <div className="md:w-1/2 text-left space-y-6 md:pl-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-secondary">Misión</h2>
            <p className="text-gray-600 leading-relaxed text-lg md:text-xl text-justify">
              Ofrecer productos en tendencia para el hogar que combinen funcionalidad, innovación y diseño, utilizando principalmente canales digitales para brindar una experiencia de compra sencilla, segura y personalizada, mientras fomentamos la sostenibilidad y la accesibilidad tecnológica.
            </p>
          </div>
        </section>

        {/* DIVISOR VISUAL */}
        <div className="border-t border-gray-200 max-w-md mx-auto"></div>

        {/* 4. SECCIÓN NUESTROS VALORES (Grid) */}
        <section className="text-center py-8">
          <h2 className="text-5xl md:text-6xl font-extrabold text-secondary mb-16">Nuestros Valores</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
            {/* Valor 1 */}
            <ValueCard 
              icon={<FaCubes />} 
              title="Innovación" 
              desc="Promovemos el desarrollo de nuevas marcas y productos que respondan a las necesidades cambiantes."
            />
            {/* Valor 2 */}
            <ValueCard 
              icon={<FaGem />} 
              title="Calidad" 
              desc="Nos comprometemos con estándares altos en todos nuestros procesos, desde la selección de productos."
            />
            {/* Valor 3 */}
            <ValueCard 
              icon={<FaShieldAlt />} 
              title="Integridad" 
              desc="Actuamos con transparencia, ética y responsabilidad en todas nuestras relaciones comerciales."
            />
            {/* Valor 4 */}
            <ValueCard 
              icon={<FaHandshake />} 
              title="Compromiso" 
              desc="Escuchamos y entendemos a nuestros clientes para ofrecerles soluciones que realmente agreguen valor."
            />
            {/* Valor 5 */}
            <ValueCard 
              icon={<FaSearch />} 
              title="Transparencia" 
              desc="Actuamos con claridad y honestidad en nuestras comunicaciones y relaciones comerciales."
            />
            {/* Valor 6 */}
            <ValueCard 
              icon={<FaChessKnight />} 
              title="Estrategia" 
              desc="Impulsamos el desarrollo de marcas que atienden distintos segmentos y necesidades del mercado."
            />
          </div>
        </section>

      </div>
    </main>
  );
}

// Componente pequeño interno para las tarjetas de valores
function ValueCard({ icon, title, desc }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl flex flex-col items-center text-center h-full hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200">
      <div className="text-4xl text-secondary mb-5 border-2 border-secondary rounded-full p-4 bg-white shadow-sm">
        {icon}
      </div>
      <h3 className="font-extrabold text-secondary mb-3 text-xl">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
