import { Metadata } from "next";

export interface BrandRoot {
  results: number;
  metadata: Metadata;
  data: BrandArray[];
}



export interface BrandArray {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
