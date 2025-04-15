import apiClient from "@/app/apiClient";

export interface Product {
  product_id: number;
  supplier_id: number;
  product_name: string;
  product_description: string;
  purchase_price: number;
  product_discount: number;
  sale_price: number;
  profit_margin: number;
  vat: number;
}

type ProductResponse = {
  message: string;
  product: Product;
}

export const createProductRequest = async (
  supplier_id: number,
  product_name: string,
  product_description: string,
  purchase_price: number,
  product_discount: number,
  sale_price: number,
  vat: number
) =>{
  try {
    const response = await apiClient.post<ProductResponse>("/product/create-product", {
      supplier_id,
      product_name,
      product_description,
      purchase_price,
      product_discount,
      sale_price,
      vat,
    })
    return response;
  }catch (error) {
    console.error("Product creation failed:", error);
    throw new Error(
      "Product creation failed. Please check your credentials and try again."
    );
  }
}