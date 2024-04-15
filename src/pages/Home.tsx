import { useMemo, useState } from "react";
import { useGetAllProductsQuery } from "../action";
import ProductCard from "../components/productCard/ProductCard";
import Loader from "../components/ui/Loader";
import SearchIcon from "../components/ui/SearchIcon";
import Select from "../components/ui/Select";
import { useDebounce } from "../hooks/useDebounce";
import { Product } from "../types/product";

export default function Home() {
  const [data, setData] = useState<Product[] | null>(null);
  const [selectList, setSelectList] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 200);
  const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const { allProducts, isLoading } = useGetAllProductsQuery();

  const filteredProductCategory = useMemo(() => {
    if (!allProducts) return [];
    const tmp = selectedCategory
      ? allProducts.filter((item) => item.category === selectedCategory)
      : allProducts;
    return debouncedSearchValue
      ? tmp.filter(
          (item) =>
            item.description.toLowerCase().includes(debouncedSearchValue) ||
            item.title.toLowerCase().includes(debouncedSearchValue)
        )
      : tmp;
  }, [selectedCategory, allProducts, debouncedSearchValue]);
  if (error) console.log(error);

  return (
    <>
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center my-32">
          <Loader />
        </div>
      ) : (
        <section className="flex flex-col h-full mx-auto max-w-4xl justify-center mt-2">
          <div className="flex w-full justify-between p-2">
            <div className="bg-gray-200 h-9 flex items-center gap-1 text-gray-700 rounded-sm p-2">
              <SearchIcon width={25} height={25} color="gray" />
              <input
                type="text"
                className="outline-none bg-transparent"
                placeholder="Search..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchValue(e.currentTarget.value)
                }
              />
            </div>
            <div>
              <Select
                defaultValue="Select category..."
                options={selectList}
                handleChange={setSelectedCategory}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-4 m-4">
            {filteredProductCategory
              ? filteredProductCategory.map((item) => (
                  <ProductCard
                    key={item.id}
                    data={item}
                    style="max-w-[350px]"
                  />
                ))
              : null}
          </div>
        </section>
      )}
    </>
  );
}
