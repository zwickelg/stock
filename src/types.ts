export interface Product {
  id: number;
  name: string;
  type: string;
  barcodes: string[]; // a product can have multiple barcodes
  desiredCount: number;
}

export interface StockItem {
  id: number;
  productId: number;
  count: number;
}
