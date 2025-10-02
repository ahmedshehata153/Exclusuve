import { BrandArray } from "@/app/interfaces/brandSection.interface";
import Link from "next/link";
import Image from "next/image";
export default function BrandCard({ brand }: { brand: BrandArray }) {
  return (
    <div className=" mb-7">
      <Link href={`/brands/${brand._id}`}>
        <Image
          alt={brand.name}
          height={256}
          width={162}
          src={brand.image}
          className="w-full h-64"
        />
      </Link>
      <div className="py-2 px-1.5 bg-white">
        <Link href={`/brands/${brand._id}`}>
          <h2>{brand.name}</h2>
        </Link>
      </div>
    </div>
  );
}
