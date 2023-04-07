import React from "react";

export default function CorrectGuess({
  word,
  definition,
  onPlayAgain,
}): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-4 text-3xl font-bold">You Guessed Correctly!</h1>
      <p className="mb-8 text-xl font-medium">
        {word}: {definition}
      </p>
      <button
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={onPlayAgain}
      >
        Play Again
      </button>
    </div>
  );
}
