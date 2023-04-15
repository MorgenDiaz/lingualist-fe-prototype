import React, { useState, useEffect } from "react";
import WordContextSentenceRoute from "../services/WordContextSentenceRoute";
import WordContextSentenceDTO from "../dto/WordContextSentenceChallengeDTO";

interface WordContextSentenceChallengeProps {
  onCorrectWordSubmission: (word: string, definition: string) => void;
  onUserGaveUp: (word: string, definition: string) => void;
}

export default function WordContextSentenceChallenge(
  props: WordContextSentenceChallengeProps
) {
  const [isIncorrectWord, setIsIncorrectWord] = useState(false);
  const [submittedWord, setSubmittedWord] = useState<string>("");
  const [wordContextSentence, setwordContextSentence] = useState<
    WordContextSentenceDTO | undefined
  >();

  useEffect(() => {
    const wordContextSentenceRoute = new WordContextSentenceRoute();

    const getSentence = async () => {
      const sentence =
        await wordContextSentenceRoute.fetchWordContextSentence();
      setwordContextSentence(sentence);
    };

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

  const handleUserGaveUp = () => {
    props.onUserGaveUp(
      wordContextSentence.word,
      wordContextSentence.definition
    );
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
          {wordContextSentence?.words.map((word) => (
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
          className="px-4 py-2 mb-6 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={handleUserSubmission}
          disabled={!wordContextSentence}
        >
          Submit
        </button>

        <button
          onClick={handleUserGaveUp}
          className="font-semibold text-orange-600 cursor-pointer"
          disabled={!wordContextSentence}
        >
          I'm stuck
        </button>
      </div>
    </div>
  );
}
