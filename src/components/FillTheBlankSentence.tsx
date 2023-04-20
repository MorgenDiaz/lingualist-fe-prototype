import React, { useState, useEffect, useCallback } from "react";

interface FillTheBlankSentenceProps {
  sentence: string;
  word: string;
  isRevealTriggered: boolean;
  characterRevealDurationMilliseconds: number;
  onRevealed: () => void;
}

function FillTheBlankSentence({
  sentence,
  word,
  isRevealTriggered = false,
  characterRevealDurationMilliseconds = 300,
  onRevealed,
}: FillTheBlankSentenceProps) {
  const [sentenceBeforeWord, setSentenceBeforeWord] = useState("");
  const [sentenceAfterWord, setSentenceAfterWord] = useState("");
  const [obscuredWord, setObscuredWord] = useState("");
  const [revealIndex, setRevealIndex] = useState(1);

  useEffect(() => {
    const sentenceBreak = new Array(word.length).fill("*").join("");
    const sentenceFragments = sentence.split(sentenceBreak);

    setSentenceBeforeWord(sentenceFragments[0]);
    setSentenceAfterWord(sentenceFragments[1]);
    setObscuredWord(sentenceBreak);
  }, [sentence, word]);

  const revealCharacterOfObscuredWord = useCallback(() => {
    const revealedString =
      word.substring(0, revealIndex) + obscuredWord.substring(revealIndex);
    setObscuredWord(revealedString);
    setRevealIndex(revealIndex + 1);
  }, [word, obscuredWord, revealIndex]);

  useEffect(() => {
    if (!isRevealTriggered) return;

    if (revealIndex === word.length + 1) {
      setTimeout(onRevealed, characterRevealDurationMilliseconds);
    }

    setTimeout(
      revealCharacterOfObscuredWord,
      characterRevealDurationMilliseconds
    );
  }, [
    word,
    revealIndex,
    isRevealTriggered,
    characterRevealDurationMilliseconds,
    onRevealed,
    revealCharacterOfObscuredWord,
  ]);

  return (
    <p className="text-lg font-bold text-violet-900">
      {sentenceBeforeWord} {obscuredWord} {sentenceAfterWord}
    </p>
  );
}

export default FillTheBlankSentence;
