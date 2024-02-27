import s from "./Buttons.module.scss";

import React from "react";

const Buttons = ({ page, productsIdLength, onPrevPage, onNextPage }) => {
  return (
    <div className={s.button__wrapper}>
      <button className={s.button} disabled={page < 1} onClick={onPrevPage}>
        {page}
      </button>
      <button
        className={s.button}
        disabled={productsIdLength < 10}
        onClick={onNextPage}
      >
        {page + 1}
      </button>
    </div>
  );
};

export default Buttons;
