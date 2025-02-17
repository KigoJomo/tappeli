import { ProductService } from "@/lib/supabase/products";
import { Product } from "@/lib/supabase/types";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
} : {
  params: {slug: string}
}){
  const slug = (await params).slug;
  const product: Product = await ProductService.getBySlug(slug)

  if (!product) return notFound()

  return(
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-24">
      <div className="w-full aspect-square">
        {product.images.map((image) => (
          <Image
            key={image.url}
            src={image.url}
            alt={image.alt}
            height={800}
            width={800}
            objectFit="cover"
          />
        ))}
      </div>

      <div className="w-full flex flex-col gap-4">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>${product.price}</p>
      </div>
    </section>
  )
}