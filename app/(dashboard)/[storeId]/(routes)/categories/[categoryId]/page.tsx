import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/category-form";

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) {
  const param = await params;

  const category = await prismadb.category.findUnique({
    where: {
      id: param.categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: param.storeId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
}
