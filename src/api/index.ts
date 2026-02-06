import type {
  UserProfileData,
  UserSettingsData,
  UserWordItem,
  VocabularyList,
  MusicHistoryItem,
  PostMusicHistoryBody,
  VocabularyGenerateData,
  PostVocabularyGenerateBody,
} from "./types";
import { apiRequest, getAuthGoogleUrl } from "./client";

export { getApiBase, getAuthGoogleUrl } from "./client";
export * from "./types";

/** Google 로그인 페이지로 이동할 URL */
export function getGoogleLoginUrl(): string {
  return getAuthGoogleUrl();
}

/** GET /user/profile */
export async function fetchUserProfile(): Promise<UserProfileData> {
  return apiRequest<UserProfileData>("/user/profile");
}

/** PATCH /user/settings */
export async function updateUserSettings(
  patch: Partial<Pick<UserSettingsData, "language" | "level" | "max_words" | "min_length">>,
): Promise<UserSettingsData> {
  return apiRequest<UserSettingsData>("/user/settings", { method: "PATCH", body: patch });
}

/** GET /user/words */
export async function fetchUserWords(): Promise<UserWordItem[]> {
  const data = await apiRequest<UserWordItem[]>("/user/words");
  return Array.isArray(data) ? data : [];
}

/** GET /vocabulary/lists */
export async function fetchVocabularyLists(): Promise<VocabularyList[]> {
  const data = await apiRequest<VocabularyList[]>("/vocabulary/lists");
  return Array.isArray(data) ? data : [];
}

/** POST /vocabulary/generate */
export async function generateVocabulary(body: PostVocabularyGenerateBody): Promise<VocabularyGenerateData> {
  return apiRequest<VocabularyGenerateData>("/vocabulary/generate", { method: "POST", body });
}

/** GET /music/history */
export async function fetchMusicHistory(): Promise<MusicHistoryItem[]> {
  const data = await apiRequest<MusicHistoryItem[]>("/music/history");
  return Array.isArray(data) ? data : [];
}

/** POST /music/history */
export async function postMusicHistory(body: PostMusicHistoryBody): Promise<{ id: string; created_at: string }> {
  return apiRequest<{ id: string; created_at: string }>("/music/history", { method: "POST", body });
}
