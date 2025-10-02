import { CategoryArray } from "@/app/interfaces/categorySection.interface";
import { getCategory } from "@/app/services/categoriesSectionApi";
import CategoryCard from "@/app/component/home/categoryCard";

export default async function Categories() {
  const { data: categories }: { data: CategoryArray[] } = await getCategory();
  return (
    <>
      <section className="py-28  mx-auto">
        <div className="container mx-auto px-2 lg:px-0">
          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {categories &&
              categories.map((cat) => {
                return (
                  <>
                    <CategoryCard key={cat._id} cat={cat} />
                  </>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
