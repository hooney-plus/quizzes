import axios from "axios";
import { AnswerResult, LeaderboardEntry, Player, Question } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

export const createPlayer = async (nickname: string): Promise<Player> => {
  const { data } = await api.post("/players", { nickname });
  return data;
};

export const getQuestions = async (count = 10): Promise<Question[]> => {
  const { data } = await api.get(`/quiz/questions?count=${count}`);
  return data;
};

export const answerQuestion = async (
  userId: string,
  questionId: string,
  answer: string,
): Promise<AnswerResult> => {
  const { data } = await api.post("/quiz/answer", {
    userId,
    questionId,
    answer,
  });
  return data;
};

export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  const { data } = await api.get("/players/leaderboard");
  return data;
};
