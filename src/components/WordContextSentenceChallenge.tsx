import React, { useState, useEffect } from "react";
import FuzzySet from "fuzzyset";
import WordContextSentenceRoute from "../services/WordContextSentenceRoute";
import WordContextSentenceDTO from "../dto/WordContextSentenceChallengeDTO";
import FillTheBlankSentence from "./FillTheBlankSentence";

interface WordContextSentenceChallengeProps {
  onCorrectWordSubmission: (word: string, definition: string) => void;
  onUserGaveUp: (word: string, definition: string) => void;
}

export default function WordContextSentenceChallenge({
  onCorrectWordSubmission,
  onUserGaveUp,
}: WordContextSentenceChallengeProps) {
  const [fuzzySet, setFuzzySet] = useState(FuzzySet());
  const [shouldShowErrorMessage, setShouldShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [submittedWord, setSubmittedWord] = useState<string>("");
  const [didPlayerGuessCorrectWord, setDidPlayerGuessCorrectWord] =
    useState(false);
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

  useEffect(() => {
    if (!wordContextSentence) return;
    const wordSet = FuzzySet(wordContextSentence.words);
    setFuzzySet(wordSet);
  }, [wordContextSentence]);

  const handleUserSubmission = (): void => {
    if (!submittedWord) return;

    const isCorrectWord =
      wordContextSentence.word.trim().toLowerCase() ===
      submittedWord.trim().toLowerCase();

    if (!isCorrectWord) {
      const fuzzyScores = fuzzySet
        .get(submittedWord)
        ?.sort((a, b) => b[0] - a[0]);

      const INCORRECT_GUESS_MESSAGE =
        "Oops, that's not quite right. Keep trying!";
      const TYPO_MESSAGE = "Almost there! Check your spelling and try again.";

      if (fuzzyScores) {
        const [mostLikelyGuess] = fuzzyScores;
        const [score, guessedWord] = mostLikelyGuess;

        if (
          guessedWord === wordContextSentence.word.trim().toLowerCase() &&
          score >= 0.7
        ) {
          setErrorMessage(TYPO_MESSAGE);
        } else {
          setErrorMessage(INCORRECT_GUESS_MESSAGE);
        }
      } else {
        setErrorMessage(INCORRECT_GUESS_MESSAGE);
      }

      setShouldShowErrorMessage(true);
    } else {
      setShouldShowErrorMessage(false);
      setDidPlayerGuessCorrectWord(true);
    }
  };

  const handleVocabularyWordRevealed = () => {
    onCorrectWordSubmission(
      wordContextSentence.word,
      wordContextSentence.definition
    );
  };

  const handleUserGaveUp = () => {
    onUserGaveUp(wordContextSentence.word, wordContextSentence.definition);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleUserSubmission();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-8 bg-lingualist-background gap-y-8">
      <div className="flex flex-col items-center mb-8">
        <h2 className="mb-2 text-xl font-bold text-lingualist-text">
          Vocabulary Words
        </h2>
        <ul className="text-lg text-lingualist-text">
          {wordContextSentence?.words.map((word) => (
            <li key={word} className="mb-1">
              {word}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center gap-y-4">
        {wordContextSentence ? (
          <FillTheBlankSentence
            sentence={wordContextSentence.sentence}
            word={wordContextSentence.word}
            isRevealTriggered={didPlayerGuessCorrectWord}
            characterRevealDurationMilliseconds={400}
            onRevealed={handleVocabularyWordRevealed}
          />
        ) : (
          <p className="text-lg font-bold text-lingualist-text">
            Generating sentence...
          </p>
        )}

        <div className="flex flex-col items-center">
          {shouldShowErrorMessage ? (
            <p className="mb-2 text-sm font-bold text-red-500">
              {errorMessage}
            </p>
          ) : (
            <label
              htmlFor="vocabulary-word"
              className="mb-2 text-sm font-bold text-lingualist-text"
            >
              Enter the missing vocabulary word:
            </label>
          )}

          <input
            id="vocabulary-word"
            className="w-full max-w-lg p-3 mb-4 text-center bg-gray-200 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-lingualist-accent-focus"
            type="text"
            placeholder="Vocabulary word"
            value={submittedWord}
            onChange={(event) => {
              setSubmittedWord(event.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          className="px-4 py-2 font-bold text-white rounded bg-lingualist-primary-action hover:bg-lingualist-primary-action-hover active:bg-lingualist-primary-action-active"
          onClick={handleUserSubmission}
          disabled={!wordContextSentence}
        >
          Submit
        </button>

        <button
          onClick={handleUserGaveUp}
          className="font-semibold cursor-pointer text-lingualist-secondary"
          disabled={!wordContextSentence}
        >
          I'm stuck
        </button>
      </div>
    </div>
  );
}
