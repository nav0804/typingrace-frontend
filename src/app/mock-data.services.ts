import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  User,
  UserStats,
  RaceRoom,
  Player,
  LeaderboardEntry,
  CreateRoomResponse,
  JoinRoomResponse,
} from './model';

// ─── Hardcoded data — replace calls with HTTP service later ──────────────────

const MOCK_ME: User = {
  id: 1,
  username: 'alex_dev',
  email: 'alex@dev.io',
  role: 'USER',
};

const MOCK_STATS: UserStats = {
  totalRaces: 142,
  totalWins: 87,
  bestWpm: 87,
  avgWpm: 72,
  avgAccuracy: 94.2,
};

const MOCK_TEXT =
  'the quick brown fox jumps over the lazy dog and the farmer watched from ' +
  'the old red barn while the sun set slowly behind the distant hills and ' +
  'the river flowed quietly through the meadow';

const MOCK_PLAYERS: Player[] = [
  {
    userId: 1,
    username: 'alex_dev',
    initials: 'AD',
    isHost: true,
    isYou: true,
    progress: 58,
    wpm: 72,
    accuracy: 94,
  },
  {
    userId: 7,
    username: 'speedkey99',
    initials: 'SK',
    isHost: false,
    isYou: false,
    progress: 51,
    wpm: 68,
    accuracy: 97,
  },
];

const MOCK_FINISHED_PLAYERS: Player[] = [
  {
    userId: 7,
    username: 'speedkey99',
    initials: 'SK',
    isHost: false,
    isYou: false,
    progress: 100,
    wpm: 81,
    accuracy: 98,
    position: 1,
    finishedAt: '1m 48s',
  },
  {
    userId: 1,
    username: 'alex_dev',
    initials: 'AD',
    isHost: true,
    isYou: true,
    progress: 100,
    wpm: 76,
    accuracy: 94,
    position: 2,
    finishedAt: '1m 54s',
  },
];

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: 7,
    username: 'speedkey99',
    initials: 'SK',
    bestWpm: 124,
    avgWpm: 109,
    totalRaces: 389,
    totalWins: 288,
    winRate: 74,
    isYou: false,
  },
  {
    rank: 2,
    userId: 8,
    username: 'keylegend',
    initials: 'KL',
    bestWpm: 118,
    avgWpm: 101,
    totalRaces: 512,
    totalWins: 348,
    winRate: 68,
    isYou: false,
  },
  {
    rank: 3,
    userId: 9,
    username: 'typepr0',
    initials: 'TP',
    bestWpm: 115,
    avgWpm: 98,
    totalRaces: 201,
    totalWins: 127,
    winRate: 63,
    isYou: false,
  },
  {
    rank: 4,
    userId: 10,
    username: 'dashfinger',
    initials: 'DF',
    bestWpm: 109,
    avgWpm: 94,
    totalRaces: 310,
    totalWins: 180,
    winRate: 58,
    isYou: false,
  },
  {
    rank: 5,
    userId: 11,
    username: 'qwerty_king',
    initials: 'QK',
    bestWpm: 104,
    avgWpm: 91,
    totalRaces: 178,
    totalWins: 98,
    winRate: 55,
    isYou: false,
  },
  {
    rank: 41,
    userId: 1,
    username: 'alex_dev',
    initials: 'AD',
    bestWpm: 87,
    avgWpm: 72,
    totalRaces: 142,
    totalWins: 87,
    winRate: 61,
    isYou: true,
  },
];

@Injectable({ providedIn: 'root' })
export class MockDataService {
  getMe(): Observable<User> {
    return of(MOCK_ME).pipe(delay(100));
  }

  getUserStats(): Observable<UserStats> {
    return of(MOCK_STATS).pipe(delay(150));
  }

  createRoom(): Observable<CreateRoomResponse> {
    return of({ roomId: 42, roomCode: 'XK92PL4A' }).pipe(delay(400));
  }

  joinRoom(code: string): Observable<JoinRoomResponse> {
    return of({
      roomId: 42,
      roomCode: code.toUpperCase(),
      status: 'WAITING' as const,
    }).pipe(delay(400));
  }

  getRoomPlayers(): Observable<Player[]> {
    return of(MOCK_PLAYERS).pipe(delay(100));
  }

  getRaceText(): Observable<string> {
    return of(MOCK_TEXT).pipe(delay(100));
  }

  getFinishedPlayers(): Observable<Player[]> {
    return of(MOCK_FINISHED_PLAYERS).pipe(delay(100));
  }

  getLeaderboard(): Observable<LeaderboardEntry[]> {
    return of(MOCK_LEADERBOARD).pipe(delay(200));
  }

  getMe_sync(): User {
    return MOCK_ME;
  }
  getStats_sync(): UserStats {
    return MOCK_STATS;
  }
  getPlayers_sync(): Player[] {
    return MOCK_PLAYERS;
  }
  getText_sync(): string {
    return MOCK_TEXT;
  }
  getFinished_sync(): Player[] {
    return MOCK_FINISHED_PLAYERS;
  }
  getLeaderboard_sync(): LeaderboardEntry[] {
    return MOCK_LEADERBOARD;
  }
}
