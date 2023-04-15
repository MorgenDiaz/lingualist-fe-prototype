import React, { useState } from "react";
import "./App.css";
import WordContextSentenceChallenge from "./WordContextSentenceChallenge";
import CorrectGuess from "./CorrectGuess";

function App(): JSX.Element {
  const [didUserGuessWord, setDidUserGuessWord] = useState(false);
  const [shouldShowWordDefinition, setshouldShowWordDefinition] =
    useState(false);
  const [word, setWord] = useState<string>("");
  const [definition, setDefinition] = useState<string>("second");

  const handleCorrectSubmission = (word: string, definition: string) => {
    setWord(word);
    setDefinition(definition);
    setDidUserGuessWord(true);
    setshouldShowWordDefinition(true);
  };

  const handlePlayAgain = () => {
    setDidUserGuessWord(false);
    setshouldShowWordDefinition(false);
  };

  const handleUserGaveUp = (word: string, definition: string) => {
    setWord(word);
    setDefinition(definition);
    setDidUserGuessWord(false);
    setshouldShowWordDefinition(true);
  };

  return (
    <div className="App">
      {shouldShowWordDefinition ? (
        <CorrectGuess
          word={word}
          definition={definition}
          didUserGuessWord={didUserGuessWord}
          onPlayAgain={handlePlayAgain}
        />
      ) : (
        <WordContextSentenceChallenge
          onCorrectWordSubmission={handleCorrectSubmission}
          onUserGaveUp={handleUserGaveUp}
        />
      )}
    </div>
  );
}

export default App;
