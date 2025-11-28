
export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export type Platform = 'instagram' | 'linkedin' | 'twitter' | 'youtube' | 'facebook' | 'tiktok';

export interface ContentParams {
  type: 'post' | 'story' | 'hook' | 'calendar';
  platform?: Platform;
  topic: string;
  context: string;
  tone: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type PageRoute = 'dashboard' | 'automation' | 'brand' | 'academy' | 'confidence' | 'collab';

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
}

export interface CollabProfile {
  id: string;
  name: string;
  role: 'Influencer' | 'Brand';
  niche: string;
  followers: string;
  engagement: string;
  bio: string;
  requirements: string[];
  viabilityScore: number; // 0-100
  matchReason: string;
}
