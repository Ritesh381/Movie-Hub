import React from "react";

function Pagination({ pageNo, setPageNo, totalPages = 500 }) {
  if (totalPages == 1) return (<></>)
  return (
    <div className="text-white flex gap-6 items-center justify-center py-8 mt-8">
      <button
        onClick={() => { pageNo > 1 && setPageNo(pageNo - 1); }}
        className="w-14 h-14 flex items-center justify-center floating-action rounded-full 
               transition duration-200 active:scale-75 text-3xl font-bold neon-glow-purple"
      >
        👈
      </button>

      <input
        type="number"
        className="text-2xl font-bold text-white bg-white/10 backdrop-blur-md border border-white/20 p-3 m-0 w-24 text-center rounded-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus:outline-none focus:ring-2 focus:ring-white/30"
        value={pageNo}
        onChange={(e) => {
          let value = Number(e.target.value);
          if (value < 1) value = 1;
          if (value > totalPages) value = totalPages;
          setPageNo(value);
        }}
      />

      <button
        onClick={() => { pageNo < totalPages && setPageNo(pageNo + 1) }}
        className="w-14 h-14 flex items-center justify-center floating-action rounded-full 
               transition duration-200 active:scale-75 text-3xl font-bold neon-glow-blue"
      >
        👉
      </button>
    </div>
  );
}

export default Pagination;
