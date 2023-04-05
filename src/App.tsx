import logo from "./logo.svg";
import React from "react";
import "./App.css";

function App(): JSX.Element {
  return (
    <div className="App">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center mb-20">
          <p className="text-sm font-bold mb-1">Vocabulary Words</p>
          <ul className="list-disc">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-bold mb-4">
            Pick a word to complete the sentence:
          </p>
          <input
            className="w-full max-w-lg rounded-lg border-gray-400 border-2 p-2 mb-4"
            type="text"
            placeholder="Vocabulary Word"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
