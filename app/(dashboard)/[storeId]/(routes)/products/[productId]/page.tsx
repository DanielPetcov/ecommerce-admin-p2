import prismadb from "@/lib/prismadb";
import ProductForm from "./components/product-form";

export default async function ProductPage({
  params,
}: {
  params: { storeId: string; productId: string };
}) {
  const param = await params;

  const product = await prismadb.product.findUnique({
    where: {
      id: param.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: param.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: param.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: param.storeId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={
            product
              ? { ...product, price: parseFloat(String(product?.price)) }
              : null
          }
          categories={categories}
          colors={colors}
          sizes={sizes}
        />
      </div>
    </div>
  );
}
