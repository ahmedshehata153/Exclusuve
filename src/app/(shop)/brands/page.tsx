import { BrandArray } from "@/app/interfaces/brandSection.interface";
import { getBrands } from "@/app/services/brandsSEctionApi";
import BrandCard from "@/app/component/home/brandCard";

export default async function brands() {
  const { data: brands }: { data: BrandArray[] } = await getBrands();
  return (
    <>
      <section className="py-28  mx-auto">
        <div className="container mx-auto px-2 lg:px-0">
          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {brands &&
              brands.map((brand) => {
                return <BrandCard key={brand._id} brand={brand} />;
              })}
          </div>
        </div>
      </section>
    </>
  );
}
