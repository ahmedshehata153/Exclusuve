import { getCategoryDetails } from "@/app/services/categoriesSectionApi";
import { CategoryArray } from "@/app/interfaces/categorySection.interface";
import Image from "next/image";
import { Star } from "lucide-react";
import { getSubCategoryDetails } from "@/app/services/categoriesSectionApi";
import SubCategorySection from "@/app/component/home/subCategory";
export default async function CategoryDetails({
  params: { categoryDetails },
}: {
  params: { categoryDetails: string };
}) {
  const { data }: { data: CategoryArray } = await getCategoryDetails(
    categoryDetails
  );
  const {
 data: SubcategoryDetails ,
  }: { data: CategoryArray[] } = await getSubCategoryDetails(categoryDetails);

  return (
    <section className="py-7">
      <div className="container mx-auto px-2 md:px-0">
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <Image
              alt={data.image}
              height={400}
              width={1000}
              src={data.image}
              className="h-[315px] w-full md:object-contain "
            />
          </div>
          <div className="col-span-1">
            <h2 className="font-bold text-4xl mb-5">{data.name}</h2>
            <div className="flex mb-5">
              <Star className="text-yellow-400 fill-yellow-400" />
              <Star className="text-yellow-400 fill-yellow-400" />
              <Star className="text-yellow-400 fill-yellow-400" />
              <Star className="text-yellow-400 fill-yellow-400" />
              <Star className="text-yellow-400 fill-yellow-400" />
              <Star className="text-yellow-400 fill-yellow-400" />
            </div>
            <p className="mb-5">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Perferendis consequatur tenetur fugit numquam optio doloribus ea
              incidunt ullam id, repudiandae laudantium? Magni consequuntur
              numquam velit?
            </p>
            <span className="inline-block w-full h-[1px] bg-gray-400"></span>
          </div>
        </div>
        <SubCategorySection SubCategoryDetails={SubcategoryDetails} />
      </div>
    </section>
  );
}
