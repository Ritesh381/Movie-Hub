import React, { useEffect, useState } from "react";
import ChatbotIcon from "../../assets/chatbot";
import Message from "./Message";
import { InitialPrompt } from "../../assets/chatbot";
import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../../assets/key";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

function BotInterface({ height = 700, setActive }) {
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);

  useEffect(() => {
    // Initial bot message
    const obj = {
      user: "Popcorn Pilot",
      msg: {
        movieIds: [],
        message:
          "Hey there! 🍿 I'm Popcorn Pilot, your movie navigator.\nAsk me anything about movies, from recommendations to details!\nJust a heads-up, even pilots hit turbulence sometimes, so bear with me if I encounter a few bumps along the way 😵‍💫. \n🎬✨ What movie adventure are we embarking on today?",
      },
    };
    setMessageHistory([obj]);
  }, []);

  const fetchData = async (userPrompt) => {
    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: InitialPrompt + userPrompt,
      });
    
      const responseJson = JSON.parse(result.text.replace(/```json|```/g, "").trim());
    
      setMessageHistory((prev) => [
        ...prev,
        {
          user: "Popcorn Pilot",
          msg: {
            movieIds: responseJson.movieIds || [], 
            message: responseJson.message || "I couldn't understand that!",
          },
        },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessageHistory((prev) => [
        ...prev,
        {
          user: "Popcorn Pilot",
          msg: { movieIds: [], message: "Oops! Something went wrong. Try again later." },
        },
      ]);
    }
    
  };

  const sendMessage = () => {
    if (message.trim() === "") return;
    const newMessage = { user: "user", msg: { movieIds: [], message } };
    setMessageHistory((prev) => [...prev, newMessage]);
    fetchData(message);
    setMessage("");
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div
      className="bg-white w-[500px] rounded-2xl shadow-lg p-4 flex flex-col"
      style={{ height: `${height}px` }}
    >
      <div className="flex justify-center items-center p-1 h-15 w-15">
        <ChatbotIcon />
      </div>
      <button
        className="absolute top-2 right-5 text-2xl font-bold"
        onClick={() => setActive(false)}
      >
        X
      </button>

      {/* Messages Area */}
      <div
        className={`h-${
          height - 100
        }px bg-gray-100 flex-grow rounded-xl overflow-auto p-3`}
      >
        {messageHistory.map((msg, index) => (
          <Message key={index} msgObj={msg} />
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center mt-3 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
        <input
          type="text"
          className="flex-grow outline-none bg-transparent"
          placeholder="Type a message..."
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        />
        <button
          className="ml-2 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600"
          onClick={sendMessage}
        >
          ⬆️
        </button>
      </div>
    </div>
  );
}

export default BotInterface;
