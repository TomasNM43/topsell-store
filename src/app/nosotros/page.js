import Image from "next/image";
import { FaCubes, FaGem, FaShieldAlt, FaHandshake, FaSearch, FaChessKnight } from "react-icons/fa";

export default function NosotrosPage() {
  return (
    <main className="bg-white min-h-screen">
      
      {/* CONTENEDOR PRINCIPAL */}
      <div className="container mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 py-16 space-y-24">

        {/* 1. SECCIÓN ¿QUIÉNES SOMOS? (Centrado) */}
        <section className="text-center flex flex-col items-center">
          <h2 className="text-5xl md:text-6xl font-extrabold text-secondary mb-10">¿Quiénes somos?</h2>
          
          <div className="relative w-full max-w-3xl h-64 md:h-96 rounded-3xl overflow-hidden mb-10 shadow-lg">
             <Image 
               src="https://placehold.co/800x500?text=Equipo+Topsell" // Reemplaza luego con tu foto de manos juntas
               alt="Equipo Topsell"
               fill
               className="object-cover"
               unoptimized
             />
          </div>

          <p className="text-gray-500 max-w-3xl mx-auto leading-relaxed text-lg md:text-xl text-justify md:text-center">
            Corporación Topsell S.A.C. es un grupo corporativo que consolida la experiencia acumulada por más de 13 años en el rubro de iluminación, eléctricos y ferretería del equipo fundador Grupo Celux, dedicada a la importación y distribución mayorista de diversos productos con las marcas Celux, Stronglight y Bemlux. Y así mismo, sigue desarrollando nuevas propuestas que respondan a las necesidades del mercado, con atención cercana, transparencia y calidad.
          </p>
        </section>


        {/* 2. SECCIÓN VISIÓN (Texto Izquierda - Imagen Derecha) */}
        <section className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-6">Visión</h2>
            <p className="text-gray-500 leading-relaxed text-lg md:text-xl text-justify">
              Ser líderes en el mercado peruano en la venta de productos innovadores para el hogar, mejorando la calidad de vida de nuestros clientes a través de soluciones prácticas, accesibles y confiables, y consolidándonos como referentes en el comercio digital.
            </p>
          </div>
          <div className="md:w-1/2 relative w-full h-64 md:h-80 rounded-3xl overflow-hidden shadow-md">
             <Image 
               src="https://placehold.co/600x400?text=Vision" 
               alt="Visión"
               fill
               className="object-cover"
               unoptimized
             />
          </div>
        </section>


        {/* 3. SECCIÓN MISIÓN (Imagen Izquierda - Texto Derecha) */}
        <section className="flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="md:w-1/2 relative w-full h-64 md:h-80 rounded-3xl overflow-hidden shadow-md">
             <Image 
               src="https://placehold.co/600x400?text=Mision" 
               alt="Misión"
               fill
               className="object-cover"
               unoptimized
             />
          </div>
          <div className="md:w-1/2 text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-6">Misión</h2>
            <p className="text-gray-500 leading-relaxed text-lg md:text-xl text-justify">
              Ofrecer productos en tendencia para el hogar que combinen funcionalidad, innovación y diseño, utilizando principalmente canales digitales para brindar una experiencia de compra sencilla, segura y personalizada, mientras fomentamos la sostenibilidad y la accesibilidad tecnológica.
            </p>
          </div>
        </section>


        {/* 4. SECCIÓN NUESTROS VALORES (Grid) */}
        <section className="text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold text-secondary mb-12">Nuestros Valores</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
    <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center text-center h-full hover:shadow-lg transition duration-300">
      <div className="text-3xl text-secondary mb-4 border-2 border-secondary rounded-full p-2">
        {icon}
      </div>
      <h3 className="font-bold text-secondary mb-2 text-lg">{title}</h3>
      <p className="text-sm text-gray-500 leading-tight">
        {desc}
      </p>
    </div>
  );
}