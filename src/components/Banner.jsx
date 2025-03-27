import React, { useState } from "react";
import "./main.css";
import { useNavigate } from "react-router-dom";

function Banner() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handelSearch = ()=>{
    if(searchQuery.trim()){
      console.log(searchQuery.trim())
      let query = searchQuery.trim().replace(/\s+/g, "+");
      navigate(`/search?q=${query}`)
    }
  }

  const handelKeyDown = (e)=>{
    if(e.key === "Enter"){
      handelSearch()
    }
  }

  return (
    <div className="w-full overflow-hidden relative">
      {/* Background banners swiping part */}
      <div className="opacity-50">
        <img
          src="https://i.pinimg.com/736x/29/7d/e0/297de0761b0c756266d74ca50d03cc1d.jpg"
          alt="Movie Banner"
          className="w-full h-48 md:h-64 lg:h-80 xl:h-[70vh] object-cover"
        />
      </div>
      {/* Searching area */}
      <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 flex text-black text-2xl flex-col">
        <p className="text-orange-300 font-bold text-3xl self-center mb-2 shadow-black">
          What movie are you wondering of ?
        </p>
        <div className="flex">
          <input
            value={searchQuery}
            onKeyDown={handelKeyDown}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search for Movies"
            className="bg-white w-[700px] text-2xl p-4 rounded-l-2xl border-blue-300"
          />
          <button className="bg-gray-200 w-[60px] rounded-r-2xl" onClick={handelSearch}> 🔍 </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
