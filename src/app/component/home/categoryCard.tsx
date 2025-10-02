import Image from "next/image";
import { CategoryArray } from "@/app/interfaces/categorySection.interface";
import Link from "next/link";

export default function CategoryCard({ cat }: { cat: CategoryArray }) {
  return (
    <>
    <div>
      <div className="bg-gray-300 mb-7">
        <Link href={`categories/${cat._id}`}>
          <Image
            alt={cat.name}
            height={256}
            width={162}
            src={cat.image}
            className="w-full h-64"
          />
        </Link >
        </div>
        <div className="py-2 px-1.5 bg-white">
          <Link href={`categories/${cat._id}`}>
            <h2>{cat.name}</h2>
          </Link>
        </div>
      </div>
      
   
    </>
  );
}
