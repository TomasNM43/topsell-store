import { getBanners, getCategories, getProductsByCategory, getBrands } from "@/services/api";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryCarousel from "@/components/CategoryCarousel";
import ProductCarousel from "@/components/ProductCarousel";
import BrandCarousel from "@/components/BrandCarousel";
import Header from "@/components/Header";
import Footer  from "@/components/Footer";

export default async function Home() {
  const [banners, categories, techProducts, fashionProducts, brands] = await Promise.all([
    getBanners(),
    getCategories(),
    getProductsByCategory('tecnologia'),
    getProductsByCategory('ropa'),
    getBrands()
  ]);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* CONTENEDOR CENTRAL */}
      <div className="flex-grow w-full max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 py-10 space-y-16">
        
        {/* HERO SECTION */}
        <section className="w-full rounded-2xl overflow-hidden shadow-lg">
           <HeroCarousel banners={banners} />
        </section>

        {/* CATEGORIES */}
        <section className="text-center"> {/* <--- AGREGADO: text-center */}
           <CategoryCarousel categories={categories} />
        </section>

        {/* PRODUCTOS TECNOLOGÍA */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden py-8">
           <ProductCarousel title="Lo último en Tecnología" products={techProducts} />
        </section>
        
        {/* PRODUCTOS ROPA */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden py-8">
           <ProductCarousel title="Moda de Temporada" products={fashionProducts} />
        </section>

        {/* BRANDS */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
           <BrandCarousel brands={brands} />
        </section>

      </div>

    </main>
  );
}