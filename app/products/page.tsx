import { ProductService } from "@/lib/supabase/products";
import ProductGrid from "../components/ProductGrid";

export default async function ProductsPage(){
  try{
    const products = await ProductService.getAll();
    return <ProductGrid products={products} />
  } catch(error){
    <div className="">
      <h1>Something went wrong</h1>
    </div>
    return console.log(error)
  }
}

