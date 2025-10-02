import { CategoryArray } from "@/app/interfaces/categorySection.interface";
import { getCategory } from "@/app/services/categoriesSectionApi";
import CategoriesSlides from "./categoriesSlides";
export default async function CategoriesSection() {
  const { data: categories }: { data: CategoryArray[] } = await getCategory();
  return (
    <>
      <section className="py-28 overflow-x-hidden">
        <CategoriesSlides categories={categories} />
      </section>
    </>
  );
}
