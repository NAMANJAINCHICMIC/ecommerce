export interface Product {
  available: boolean;
  detail: string;
  pathToPic: string;
  price: string;

//   productId: string;

  productName: string;

  userId: string;
}
export interface Cart {

  items: ItemDetails;
  totalAmt: number;
}

export interface ItemDetails {
[id: string]: {
  addedOn: string;
  quantity: number;
  productId: string;
  userId: string;
  productName: string;
  price: string;
  pathToPic: string;
  
};
}
