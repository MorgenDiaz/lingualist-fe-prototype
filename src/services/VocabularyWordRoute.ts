import LinguaListAxiosInstance from "./LinguaListAxiosInstance";

export default class VocabularyWordRoute {
  linguaListAxiosInstance = LinguaListAxiosInstance.create();

  fetchVocabularyWords = async (): Promise<string[]> => {
    try {
      const response = await this.linguaListAxiosInstance.get(
        "vocabulary-word"
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
}
