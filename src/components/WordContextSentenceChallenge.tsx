import React, { useState, useEffect } from "react";

import WordContextSentenceRoute from "../services/WordContextSentenceRoute";
import VocabularyWordRoute from "../services/VocabularyWordRoute";
import WordContextSentenceDTO from "../dto/WordContextSentenceDTO";

interface WordContextSentenceChallengeProps {
  onCorrectWordSubmission: (word: string, definition: string) => void;
}

export default function WordContextSentenceChallenge(
  props: WordContextSentenceChallengeProps
) {
  const [isIncorrectWord, setIsIncorrectWord] = useState(false);
  const [submittedWord, setSubmittedWord] = useState<string>("");
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

  const handleUserSubmission = (): void => {
    if (!submittedWord) return;

    const isCorrectWord =
      wordContextSentence.word.trim().toLowerCase() ===
      submittedWord.trim().toLowerCase();

    if (!isCorrectWord) {
      setIsIncorrectWord(true);
    } else {
      props.onCorrectWordSubmission(
        wordContextSentence.word,
        wordContextSentence.definition
      );
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleUserSubmission();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center mb-20">
        <p className="mb-1 font-bold ">Vocabulary Words</p>
        <ul className="list-disc">
          {vocabularyList.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center">
        <p className="mb-4 text-lg font-bold">
          {wordContextSentence
            ? wordContextSentence.sentence
            : "Generating sentence..."}
        </p>

        <div className="">
          {isIncorrectWord && (
            <p className="text-sm font-bold text-red-500">
              The word you provided doesn't quite fit the sentence. Try again!
            </p>
          )}

          <input
            className="w-full max-w-lg p-2 mb-4 border-2 border-gray-400 rounded-lg"
            type="text"
            placeholder="Vocabulary Word"
            value={submittedWord}
            onChange={(event) => {
              setSubmittedWord(event.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={handleUserSubmission}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
