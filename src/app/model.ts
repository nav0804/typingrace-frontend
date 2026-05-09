// ─── User ────────────────────────────────────────────────────────────────────
export interface User {
  id: number;
  username: string;
  email: string;
  avatarUrl?: string;
  role: 'USER' | 'ADMIN';
}

export interface UserStats {
  totalRaces: number;
  totalWins: number;
  bestWpm: number;
  avgWpm: number;
  avgAccuracy: number;
}

// ─── Race / Room ─────────────────────────────────────────────────────────────
export type RoomStatus =
  | 'WAITING'
  | 'COUNTDOWN'
  | 'IN_PROGRESS'
  | 'FINISHED'
  | 'ABANDONED';

export interface RaceRoom {
  id: number;
  roomCode: string;
  status: RoomStatus;
  wordCount: number;
  textSnapshot: string;
  maxPlayers: number;
  startedAt?: string;
  finishedAt?: string;
  createdAt: string;
}

export interface Player {
  userId: number;
  username: string;
  initials: string;
  isHost: boolean;
  isYou: boolean;
  progress: number; // 0-100
  wpm: number;
  accuracy: number;
  position?: number; // final rank
  finishedAt?: string;
}

// ─── WebSocket messages ───────────────────────────────────────────────────────
export type WsEventType =
  | 'PLAYER_JOINED'
  | 'PLAYER_LEFT'
  | 'COUNTDOWN'
  | 'RACE_START'
  | 'PROGRESS_UPDATE'
  | 'PLAYER_FINISHED'
  | 'RACE_FINISHED';

export interface WsMessage<T = unknown> {
  type: WsEventType;
  roomCode: string;
  payload: T;
}

export interface ProgressPayload {
  players: Pick<
    Player,
    'userId' | 'username' | 'progress' | 'wpm' | 'accuracy'
  >[];
}

export interface CountdownPayload {
  count: number;
}
export interface RaceStartPayload {
  textSnapshot: string;
  startedAt: string;
}
export interface RaceFinishedPayload {
  players: Player[];
}

// ─── Leaderboard ─────────────────────────────────────────────────────────────
export interface LeaderboardEntry {
  rank: number;
  userId: number;
  username: string;
  initials: string;
  bestWpm: number;
  avgWpm: number;
  totalRaces: number;
  totalWins: number;
  winRate: number;
  isYou: boolean;
}

// ─── HTTP DTOs ────────────────────────────────────────────────────────────────
export interface CreateRoomRequest {
  wordPackId?: number;
  wordCount?: number;
}
export interface CreateRoomResponse {
  roomId: number;
  roomCode: string;
}
export interface JoinRoomRequest {
  roomCode: string;
}
export interface JoinRoomResponse {
  roomId: number;
  roomCode: string;
  status: RoomStatus;
}

export interface ProgressUpdateRequest {
  roomCode: string;
  wordsTyped: number;
  accuracy: number;
  elapsedMs: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
