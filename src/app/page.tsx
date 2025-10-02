import MainSlider from "./component/home/mainslider";
import CategoriesSection from "./component/home/categoriesSection";
import ProductsSection from "./component/home/productsSection";
import BrandsSection from "./component/home/brandsSection";
export default function Home() {
  return (
    <>
      <main className="py-5 min-h-screen">
        <MainSlider />
        <CategoriesSection />
        <ProductsSection />
        <BrandsSection />
      </main>
    </>
  );
}
