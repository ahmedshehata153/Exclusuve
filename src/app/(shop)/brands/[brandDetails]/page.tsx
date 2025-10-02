import { BrandArray } from "@/app/interfaces/brandSection.interface";
import { getBrandsDetails } from "@/app/services/brandsSEctionApi";
import Image from "next/image";
import { Star } from "lucide-react";
import Title from "@/app/component/home/title";

export default async function BrandDetails({
  params: { brandDetails },
}: {
  params: { brandDetails: string };
}) {
  console.log(brandDetails);
  const { data }: { data: BrandArray } = await getBrandsDetails(brandDetails);
  return (
    <section className="py-10">
      <div className="container mx-auto px-2 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3">
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
            <h2 className="font-bold text-4xl mb-5 t">{data.name}</h2>
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
        <div className="grid grid-cols-1 md:grid-cols-2 mt-4 md:mt-0 gap-y-11 gap-x-9">
          <div className="col-span-1">
            <Title sectionName1="About US" sectionName2="Here We are" />
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id,
              laudantium pariatur in molestiae suscipit veniam! Similique
              accusamus repellat dolore. Accusamus maiores facilis non adipisci
              dicta veritatis laudantium rem enim placeat.
            </p>
            <p className="mt-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae
              explicabo illo dolor consectetur corrupti, odio provident
              voluptatibus atque obcaecati optio ad exercitationem minima
              veritatis corporis odit nulla vel quam aperiam.
            </p>
          </div>
          <div className="col-span-1 bg-gray-200">
            <Image
              alt={data.image}
              height={400}
              width={1000}
              src={data.image}
              className="h-[315px] object-contain "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
