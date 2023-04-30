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
    <div className="flex flex-col items-center justify-center h-screen px-8 bg-lingualist-background gap-y-8">
      {props.didUserGuessWord && (
        <h1 className="text-3xl font-bold text-lingualist-primary">
          You Guessed Correctly!
        </h1>
      )}
      <p className="mb-4 text-xl font-medium text-lingualist-text">
        {props.definition}
      </p>

      <div
        onClick={onSpeakWord}
        className="flex flex-col items-center p-3 mb-8 border-2 rounded cursor-pointer border-lingualist-primary hover:shadow-lg text-lingualist-primary"
      >
        <img src={hearIcon} alt="" className="w-20 mb-2" />
        <span className="font-semibold">{props.word}</span>
      </div>

      <button
        className="px-4 py-2 font-bold text-white rounded bg-lingualist-primary-action hover:bg-lingualist-primary-action-hover"
        onClick={props.onPlayAgain}
      >
        Play Again
      </button>
    </div>
  );
}
