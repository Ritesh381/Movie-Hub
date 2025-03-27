import React from "react";
import "./main.css";

function Pagination({ pageNext, pagePrev, pageNo, setPageNo, totalPages=500 }) {
  return (
    <div className="text-white flex gap-5 items-center justify-center text-3xlpy-4">
      <button
        onClick={pagePrev}
        className="w-14 h-14 flex items-center justify-center border-2 border-white rounded-full 
               transition duration-200 active:scale-75 hover:bg-white hover:text-blue-900 text-3xl font-bold"
      >
        👈
      </button>

      <input
        type="number"
        className="text-2xl font-bold p-0 m-0 w-16 text-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        value={pageNo}
        onChange={(e) => {
          let value = Number(e.target.value);
          if (value < 1) value = 1;
          if (value > totalPages) value = totalPages;
          setPageNo(value);
        }}
      />
  
      <button
        onClick={pageNext}
        className="w-14 h-14 flex items-center justify-center border-2 border-white rounded-full 
               transition duration-200 active:scale-75 hover:bg-white hover:text-blue-900 text-3xl font-bold"
      >
        👉
      </button>
    </div>
  );
}

export default Pagination;
