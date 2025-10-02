export interface user {
  data: userData;
}

export interface userData {
  role: string;
  active: boolean;
  wishlist: string[];
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  addresses: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
