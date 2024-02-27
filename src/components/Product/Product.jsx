import s from "./Product.module.scss";

import React from "react";

const Product = ({ number, data }) => {
  return (
    data && (
      <div className={s.product}>
        <div className={`${s.product__column} ${s.product__number}`}>
          {number}
        </div>
        <div className={`${s.product__column} ${s.product__id}`}>{data.id}</div>
        <div className={`${s.product__column} ${s.product__product}`}>
          {data.product}
        </div>
        <div className={`${s.product__column} ${s.product__brand}`}>
          {data.brand ?? "-"}
        </div>
        <div className={`${s.product__column} ${s.product__price}`}>
          {data.price}
        </div>
      </div>
    )
  );
};

export default Product;
