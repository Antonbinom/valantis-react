import { useEffect, useState } from "react";
import { fetchData } from "./hooks/fetchData.ts";
import Container from "./components/Container/Container.jsx";
import ProductTable from "./components/ProductTable/ProductTable.jsx";
import Buttons from "./components/Buttons/Buttons.jsx";
import Spinner from "./components/Spinner/Spinner.jsx";

function App() {
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);
  const [brands, setBrands] = useState([]);
  const [productNames, setProductNames] = useState([]);
  const [prices, setPrices] = useState([]);
  const [selectedProductName, setSelectedProductName] = useState();
  const [selectedPrice, setSelectedPrice] = useState();
  const [selectedBrand, setSelectedBrand] = useState();

  const [productsId, setProductsId] = useState([]);
  const [products, setProducts] = useState([]);

  // get fileds
  useEffect(() => {
    getFields("brand", setBrands);
    getFields("product", setProductNames);
    getFields("price", setPrices);
  }, []);

  // filter items
  useEffect(() => {
    const params = {
      ...(selectedProductName && { product: selectedProductName }),
      ...(selectedPrice && { price: +selectedPrice }),
      ...(selectedBrand && { brand: selectedBrand }),
    };

    if (Object.keys(params).length === 0) {
      fetchData("get_ids", { offset, limit: 50 }).then((res) => {
        res?.data?.result && setProductsId(res.data?.result);
      });
    }

    fetchData("filter", params).then((res) => {
      if (res?.data?.result) setProductsId(res.data.result);
    });

    setOffset(0);
    setPage(0);
  }, [selectedBrand, selectedPrice, selectedProductName]);

  // get ids
  useEffect(() => {
    fetchData("get_ids", { offset, limit: 50 }).then((res) => {
      if (res?.data?.result) {
        setProductsId(res.data?.result);
      }
    });
  }, [page]);

  // get items
  useEffect(() => {
    if (!loading) setLoading(true);

    if (!productsId.length) return;

    fetchData("get_items", {
      ids: productsId,
    }).then((res) => {
      if (res?.data?.result) {
        const uniqueProducts = res.data.result.filter(
          (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
        );
        setProducts(uniqueProducts);
        setLoading(false);
      }
    });
  }, [productsId]);

  function onNextPage() {
    setLoading(true);
    setOffset(offset + 50);
    setPage(page + 1);
  }

  function onPrevPage() {
    setLoading(true);
    if (offset < 50 || page === 0) return;
    setOffset(offset - 50);
    setPage(page - 1);
  }

  function onSelectChange(selectedValue, method) {
    setLoading(true);
    setSelectedProductName();
    setSelectedPrice();
    setSelectedBrand();
    eval(`${method}`)(selectedValue);
  }

  function getFields(field, setter) {
    fetchData("get_fields", { field: field }).then((res) => {
      if (res?.data?.result) {
        const filteredFields = [...new Set(res.data.result)]
          .filter((field) => field !== null)
          .sort((a, b) => {
            if (typeof a === "string" && typeof b === "string") {
              return a.localeCompare(b);
            }
            if (typeof a === "number" && typeof b === "number") {
              return a - b;
            }
            return 0;
          });
        setter(filteredFields);
      }
    });
  }

  return (
    <div className="App">
      <Container>
        {loading && <Spinner />}
        <ProductTable
          loading={loading}
          products={products}
          brands={brands}
          productNames={productNames}
          prices={prices}
          onSelectChange={onSelectChange}
          selectedProductName={selectedProductName}
          selectedPrice={selectedPrice}
          selectedBrand={selectedBrand}
        />
        {products.length && productsId.length === 50 && (
          <Buttons
            page={page}
            productsIdLength={productsId.length}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
