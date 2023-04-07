import React, { useState } from "react";
import "./App.css";
import WordContextSentenceChallenge from "./WordContextSentenceChallenge";
import CorrectGuess from "./CorrectGuess";

function App(): JSX.Element {
  const [didUserGuessWord, setDidUserGuessWord] = useState(false);
  const [word, setWord] = useState<string>("");
  const [definition, setDefinition] = useState<string>("second");

  const handleCorrectSubmission = (word: string, definition: string) => {
    setWord(word);
    setDefinition(definition);
    setDidUserGuessWord(true);
  };

  const handlePlayAgain = () => {
    setDidUserGuessWord(false);
  };

  return (
    <div className="App">
      {didUserGuessWord ? (
        <CorrectGuess
          word={word}
          definition={definition}
          onPlayAgain={handlePlayAgain}
        />
      ) : (
        <WordContextSentenceChallenge
          onCorrectWordSubmission={handleCorrectSubmission}
        />
      )}
    </div>
  );
}

export default App;
