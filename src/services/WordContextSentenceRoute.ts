import { AxiosInstance } from "axios";
import LinguaListAxiosInstance from "./LinguaListAxiosInstance";
import WordContextSentenceDTO from "../dto/WordContextSentenceChallengeDTO";

export default class WordContextSentenceRoute {
  linguaListAxiosInstance: AxiosInstance = LinguaListAxiosInstance.create();

  fetchWordContextSentence = async (): Promise<WordContextSentenceDTO> => {
    try {
      const response = await this.linguaListAxiosInstance.get(
        "challenge/word-context-sentence"
      );

      return response.data;
    } catch (error) {
      console.log("error, ", error);
    }
  };
}
