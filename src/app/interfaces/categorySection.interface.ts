import { Metadata } from "next";

export interface CategoryRoot {
  results: number;
  metadata: Metadata;
  data: CategoryArray[];
}
export interface CategoryArray {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
