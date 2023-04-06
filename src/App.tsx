import React, { useEffect, useState } from "react";
import "./App.css";
import WordContextSentenceDTO from "./dto/WordContextSentenceDTO";
import WordContextSentenceRoute from "./services/WordContextSentenceRoute";
import VocabularyWordRoute from "./services/VocabularyWordRoute";

function App(): JSX.Element {
  const [vocabularyList, setVocabularyList] = useState<string[]>([]);
  const [wordContextSentence, setwordContextSentence] = useState<
    WordContextSentenceDTO | undefined
  >();

  useEffect(() => {
    const vocabularyWordRoute = new VocabularyWordRoute();
    const wordContextSentenceRoute = new WordContextSentenceRoute();

    const getVocabularyWords = async () => {
      const wordList = await vocabularyWordRoute.fetchVocabularyWords();
      setVocabularyList(wordList);
    };

    const getSentence = async () => {
      const sentence =
        await wordContextSentenceRoute.fetchWordContextSentence();
      setwordContextSentence(sentence);
    };

    getVocabularyWords();
    getSentence();
  }, []);

  return (
    <div className="App">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center mb-20">
          <p className=" font-bold mb-1">Vocabulary Words</p>
          <ul className="list-disc">
            {vocabularyList.map((word) => (
              <li key={word}>{word}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-bold mb-4">
            {wordContextSentence
              ? wordContextSentence.sentence
              : "Generating sentence..."}
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
