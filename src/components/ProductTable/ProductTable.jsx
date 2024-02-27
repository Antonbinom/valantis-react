import Product from "../Product/Product";
import s from "./ProductTable.module.scss";

import React, { useEffect, useRef } from "react";

const ProductTable = ({
  loading,
  products,
  brands,
  prices,
  productNames,
  onSelectChange,
  selectedProductName,
  selectedPrice,
  selectedBrand,
}) => {
  const tableBody = useRef(null);

  useEffect(() => {
    if (!loading) {
      if (tableBody.current.scrollTop !== 0) {
        tableBody.current.scrollTo({
          top: 0,
        });
      }
    }
  }, [loading]);
  const handleSelectChange = (event, method) => {
    const selectedValue = event.target.value;
    onSelectChange(selectedValue, method);
  };
  return (
    <div className={s.table}>
      <div className={`${s.table__header}`}>
        <div className={`${s.table__header__item} ${s.table__number}`}>№</div>
        <div className={`${s.table__header__item} ${s.table__id}`}>ID</div>
        <div className={`${s.table__header__item} ${s.table__product}`}>
          <span>Product</span>
          <select
            onChange={(event) =>
              handleSelectChange(event, "setSelectedProductName")
            }
            value={selectedProductName}
          >
            <option value=""></option>

            {productNames &&
              productNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
          </select>
        </div>
        <div className={`${s.table__header__item} ${s.table__brand}`}>
          <span>Brand</span>
          <select
            onChange={(event) => handleSelectChange(event, "setSelectedBrand")}
            value={selectedBrand}
          >
            <option value=""></option>
            {brands &&
              brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
          </select>
        </div>
        <div className={`${s.table__header__item} ${s.table__price}`}>
          <span>Price</span>
          <select
            onChange={(event) => handleSelectChange(event, "setSelectedPrice")}
            value={selectedPrice}
          >
            <option value=""></option>
            {prices &&
              prices.map((price) => (
                <option key={price} value={price}>
                  {price}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div ref={tableBody} className={`${s.table__body}`}>
        {products.length ? (
          products.map((product, index) => (
            <Product key={product.id} number={index} data={product} />
          ))
        ) : (
          <div>none</div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
