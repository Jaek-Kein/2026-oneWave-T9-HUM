/** API 명세 기반 공통/엔드포인트 타입 */

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

/** GET /auth/google/callback */
export type AuthCallbackData = {
  token: string;
  internal_id: string;
  is_new_user: boolean;
};

/** GET /user/profile */
export type UserProfileData = {
  id: string;
  display_name: string;
  email: string;
  settings: {
    language: string;
    level: string;
    max_words: number;
    min_length: number;
  } | null;
};

/** PATCH /user/settings */
export type UserSettingsData = {
  language: string;
  level: string;
  max_words: number;
  min_length: number;
};

/** GET /user/words */
export type UserWordItem = {
  id: string;
  word: string;
  meaning: string;
  count: number;
  synonyms: string[];
};

/** GET /vocabulary/lists */
export type VocabularyEntry = {
  word: string;
  score?: number;
  meaning?: string;
  example?: string;
};

export type VocabularyList = {
  id: string;
  title: string;
  entries: VocabularyEntry[];
  created_at: string;
};

/** GET /music/history */
export type MusicHistoryItem = {
  id: string;
  video_id: string;
  title: string;
  capture_time: number;
  origin: string;
  created_at: string;
};

/** POST /music/history */
export type PostMusicHistoryBody = {
  video_id: string;
  title: string;
  capture_time?: number;
  origin?: string;
};

/** POST /vocabulary/generate */
export type VocabularyGenerateEntry = {
  word: string;
  score?: number;
  meaning?: string;
  example?: string;
  synonyms?: string[];
  occurrences?: number;
};

export type VocabularyGenerateData = {
  entries: VocabularyGenerateEntry[];
  saved: boolean;
  song: { title: string; artist: string };
};

export type PostVocabularyGenerateBody = {
  song_title: string;
  title?: string;
  save?: boolean;
};
