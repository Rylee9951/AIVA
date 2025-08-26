import React, {useState} from "react";
import { Bot, Send, Sparkles } from 'lucide-react';

const AIAssistant = () => {
	
		const [text, setText] = useState('');
	
		const handleChange = (event) => {
			setText(event.target.value);
		};

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
				value={text}
				onChange={handleChange}
				placeholder="Ask me anything about your finances..."
				rows="5" // Optional: specify the number of visible text lines
				cols="50" // Optional: specify the visible width of the text area
			/>
			<button 
				// onClick={handleSubmit}
				// disabled={isLoading || !prompt.trim()}
				className="w-full mt-2 p-2 rounded-lg mt-4 font-bold flex justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg">
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
