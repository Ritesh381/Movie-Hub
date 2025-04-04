import React, { useContext, useEffect, useState } from "react";
import ChatbotIcon from "../../assets/chatbot";
import Message from "./Message";
import { InitialPrompt } from "../../assets/chatbot";
import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../../assets/key";
import { MyBotContext } from "../Context/BotMessageContext";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

function BotInterface({ height = 700, setActive }) {
  const [message, setMessage] = useState("");
  const { messageHistory, setMessageHistory } = useContext(MyBotContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const obj = {
      user: "Popcorn Pilot",
      msg: {
        movieIds: [],
        message:
          "Hey there! 🍿 I'm Popcorn Pilot, your movie navigator.\nAsk me anything about movies, from recommendations to details!\nJust a heads-up, even pilots hit turbulence sometimes, so bear with me if I encounter a few bumps along the way 😵‍💫\n🎬✨ What movie adventure are we embarking on today?",
      },
    };
    if (messageHistory.length == 0) setMessageHistory([obj]);
  }, []);

  const fetchData = async (userPrompt) => {
    setIsLoading(true);
    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: InitialPrompt + userPrompt,
      });

      const responseJson = JSON.parse(
        result.text.replace(/```json|```/g, "").trim()
      );

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
          msg: {
            movieIds: [],
            message: "Oops! Something went wrong. Try again later.",
          },
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = () => {
    if (message.trim() === "" || isLoading) return;
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
      className={`bg-white w-[500px] rounded-2xl shadow-lg p-4 flex flex-col`}
      style={{ height: `${height}px` }}
    >
      <div className="flex justify-between">
        <div className="flex justify-center items-center p-1 h-15 w-15">
          <ChatbotIcon />
        </div>

        <img
          src="https://media.tenor.com/NGFeo-Nn7WQAAAAi/milk-and-mocha-popcorn.gif"
          alt="watchingTV"
          className="absolute h-20 top-0 left-1/2 -translate-x-1/2"
        />

        <div>
          <button
            className="text-2xl font-bold hover:scale-150 duration-300 hover:text-red-600"
            onClick={() => setActive(false)}
          >
            X
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div
        className={`h-${
          height - 100
        }px bg-gray-100 flex-grow rounded-xl overflow-auto p-3`}
      >
        {messageHistory.map((msg, index) => (
          <Message key={index} msgObj={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start my-2">
            <div className="bg-white p-3 rounded-lg max-w-xs">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
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
          disabled={isLoading}
        />
        <button
          className={`ml-2 ${
            isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-full w-10 h-10 flex items-center justify-center`}
          onClick={sendMessage}
          disabled={isLoading}
        >
          {isLoading ? "..." : "⬆️"}
        </button>
      </div>
    </div>
  );
}

export default BotInterface;
