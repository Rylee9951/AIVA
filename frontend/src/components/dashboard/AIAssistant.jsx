import React, {useState, useEffect} from "react";
import { Bot, Send, Sparkles } from 'lucide-react';
import { askAiva } from "../../api/api";

const AIAssistant = () => {
	const [prompt, setPrompt] = useState('');
	useEffect(() => {
		async function getAnswer() {
			const answer = await askAiva("What are my top 3 spending categories?");
			console.log("Answer",answer);
			// now you can use answer to set state, render, etc.
		}

		getAnswer();
	}, []);

  // const [response, setResponse] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

	// const handleSubmit = async () => {
  //   if (!prompt.trim()) return;
    
  //   setIsLoading(true);
    // try {
    //   const contextPrompt = `
    //     You are a professional personal finance advisor. The user has asked: "${prompt}"
        
    //     Here's their financial context:
    //     - Recent transactions: ${JSON.stringify(transactions?.slice(0, 5) || [])}
    //     - Financial goals: ${JSON.stringify(goals || [])}
        
    //     Provide helpful, actionable financial advice in a friendly but professional tone. Keep it concise and practical.
    //   `;
      
    //   const result = await InvokeLLM({ prompt: contextPrompt });
    //   setResponse(result);
    // } catch (error) {
    //   setResponse('I apologize, but I encountered an error. Please try again.');
    // }
    // setIsLoading(false);
  // };


	return (
		<div className="w-full p-4 bg-[rgb(251,252,253)] rounded-lg shadow-md mt-6">
			<div className="flex items-center mb-4">
				<div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
					<Bot className="w-5 h-5" />
				</div>
				<h1 className="text-left font-bold ml-2">AI Financial Assistant</h1>
			</div>
			<textarea
				className="w-full p-2 rounded-lg mt-4 bg-[rgb(254,254,255)]"
				id="my-textarea"
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
				placeholder="Ask me anything about your finances..."
				rows="3"
				cols="50"
			/>
			<button 
				// onClick={handleSubmit}
				disabled={!prompt.trim()}
				className="w-full mt-2 p-2 rounded-lg mt-4 font-bold flex justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
				>
				<div className="flex items-center gap-2">
					<Send className="w-4 h-4" />
					Ask AI
				</div>
			</button>
			<div className="grid grid-flow-col grid-rows-2 gap-4 mt-4">
				<button	className="mt-2 ml-2 p-2 border border-gray-200 text-gray-800 rounded-md text-left flex items-center"><Sparkles className="w-3 h-3 mr-2 text-purple-500" /> How can I reduce my spending this month?</button>
				<button	className="mt-2 ml-2 p-2 border border-gray-200 text-gray-800 rounded-md text-left flex items-center"><Sparkles className="w-3 h-3 mr-2 text-purple-500" /> What's the best way to reach my savings goal?</button>
				<button	className="mt-2 ml-2 p-2 border border-gray-200 text-gray-800 rounded-md text-left flex items-center"><Sparkles className="w-3 h-3 mr-2 text-purple-500" /> Should I be worried about my spending patterns?</button>
				<button	className="mt-2 ml-2 p-2 border border-gray-200 text-gray-800 rounded-md text-left flex items-center"><Sparkles className="w-3 h-3 mr-2 text-purple-500" /> How much should I budget for emergencies?</button>
			</div>
		</div>
	);
};

export default AIAssistant;
