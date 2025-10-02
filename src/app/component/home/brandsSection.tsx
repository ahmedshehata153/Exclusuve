import { BrandArray } from "@/app/interfaces/brandSection.interface"
import { getBrands } from "@/app/services/brandsSEctionApi"
import BrandsSlides from "./brandsSlides";


export default async function BrandsSection(){
     const { data: brands }: { data: BrandArray[] } = await getBrands(10);
    return (
      <>
        <section className="py-28 overflow-x-hidden">

            <BrandsSlides brands={brands}/>
        </section>
      </>
    );
}