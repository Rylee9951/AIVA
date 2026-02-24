import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Bot, Send, Sparkles } from 'lucide-react';
import { askAiva } from "../../api/api";

const AIAssistant = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // useEffect(() => {
  //   async function getAnswer() {
  //     const answer = await askAiva("What are my top 3 spending categories?");
  //     console.log("Answer:", answer);
  //   }
  //   getAnswer();
  // }, []);

  const handleSubmit = async (overridePrompt) => {
    const textToSend = overridePrompt !== undefined ? overridePrompt : prompt;
    if (!String(textToSend || "").trim()) return;

    try {
      setIsLoading(true);
      setResponse("");
      setIsHidden(false);

      const answer = await askAiva(textToSend);
      setResponse(answer);
    } catch (error) {
      console.error("AI Error:", error);
      setResponse("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (text) => {
    setPrompt(text);
    handleSubmit(text);
  };

  return (
    <div className="w-full p-4 bg-[rgb(251,252,253)] rounded-lg shadow-md mt-6">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
          <Bot className="w-5 h-5" />
        </div>
        <h1 className="text-left font-bold ml-2">AI Financial Assistant</h1>
      </div>

      {/* TEXTAREA */}
      <textarea
        className="w-full p-2 rounded-lg mt-4 bg-[rgb(254,254,255)]"
        id="my-textarea"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask me anything about your finances..."
        rows="3"
      />

      {/* SUBMIT BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={!prompt.trim() || isLoading}
        className="w-full p-2 mt-4 rounded-lg font-bold flex justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
      >
        <div className="flex items-center gap-2">
          <Send className="w-4 h-4" />
          {isLoading ? "Thinking..." : "Ask AI"}
        </div>
      </button>

      {/* PRESET QUESTION BUTTONS */}
      <div className="grid grid-flow-col grid-rows-2 gap-4 mt-4">
        <QuickButton
          text="How can I reduce my spending this month?"
          onClick={handleQuickPrompt}
        />
        <QuickButton
          text="What's the best way to reach my savings goal?"
          onClick={handleQuickPrompt}
        />
        <QuickButton
          text="Should I be worried about my spending patterns?"
          onClick={handleQuickPrompt}
        />
        <QuickButton
          text="How much should I budget for emergencies?"
          onClick={handleQuickPrompt}
        />
      </div>
      {/* TOGGLE BUTTON */}
      {response && (
        <button
          onClick={() => setIsHidden(!isHidden)}
          className="w-full p-2 mt-4 rounded-lg font-bold flex justify-center"
        >
          {isHidden ? "View Response" : "Hide Response"}
        </button>
      )}

      {/* RESPONSE BOX */}
      {response && !isHidden && (
        <div className="relative mt-4 p-4 bg-white border rounded-lg shadow-sm">
          {/* Display the question asked */}
          {prompt && (
            <div className="mb-2">
              <h2 className="font-bold text-sm text-gray-700">You asked:</h2>
              <p className="text-gray-900">{prompt}</p>
            </div>
          )}

          {/* AI Response */}
          <h2 className="font-bold mb-1 text-purple-700">AIVA says:</h2>
          <div className="prose">
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

// Small component for quick prompts
const QuickButton = ({ text, onClick }) => (
  <button
    onClick={() => onClick(text)}
    className="mt-2 ml-2 p-2 border border-gray-200 text-gray-800 rounded-md text-left flex items-center"
  >
    <Sparkles className="w-3 h-3 mr-2 text-purple-500" /> {text}
  </button>
);

export default AIAssistant;