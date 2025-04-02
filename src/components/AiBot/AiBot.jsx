import React, { useState } from "react";
import ChatbotIcon from "../../assets/chatbot";
import BotInterface from "./BotInterface";


function AiBot() {
  const [active, setActive] = useState(false);

  const handleButton = ()=>{
    setActive(true)
  }

  return (
    <div className="fixed bottom-5 right-5">
      {!active ? (
        <button
          className="flex w-20 h-20 justify-center items-center"
          onClick={handleButton}
        >
          <ChatbotIcon />
        </button>
      ) : (
        <BotInterface setActive={setActive}/>
      )}
    </div>
  );
}

export default AiBot;
