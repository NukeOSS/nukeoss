export interface SessionData {
  MasterName: string;
  Participants: [];
  Sequence: string;
  Topic: string;
  value: string;
  master: boolean;
}

export interface DataId extends SessionData { id: string; }
