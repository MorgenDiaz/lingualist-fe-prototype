import React from "react";
import hearIcon from "./hear-svgrepo-com.svg";

interface CorrectGuessProps {
  word: string;
  definition: string;
  didUserGuessWord: boolean;
  onPlayAgain: () => void;
}

export default function CorrectGuess(props: CorrectGuessProps): JSX.Element {
  const synth = window.speechSynthesis;

  const onSpeakWord = () => {
    if (synth.speaking) return;

    const utterance = new SpeechSynthesisUtterance(props.word);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    synth.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      {props.didUserGuessWord && (
        <h1 className="mb-4 text-3xl font-bold">You Guessed Correctly!</h1>
      )}
      <p className="mb-8 text-xl font-medium">{props.definition}</p>

      <div
        onClick={onSpeakWord}
        className="flex flex-col items-center p-3 mb-12 border-2 border-black rounded cursor-pointer hover:bg-gray-100"
      >
        <img src={hearIcon} alt="" className="mb-2 w-14" />
        <span className="font-semibold">{props.word}</span>
      </div>

      <button
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={props.onPlayAgain}
      >
        Play Again
      </button>
    </div>
  );
}
