import type { Id, TimestampIso } from './common';

export type LostFoundStatus = 'lost' | 'found' | 'returned';

export interface LostFoundItem {
  id: number;
  item_name: string;
  description: string;
  found_location: string;
  found_date: string;
  status: LostFoundStatus;
  user_id: number;
  bus_id?: number;
  created_at: string;
  updated_at: string;
  user?: { id: number; name: string; email?: string };
  bus?: { id: number; number: string };
}

export type LostItem = {
	id: Id;
	title: string;
	description: string;
	busId?: Id;
	contactEmail: string;
	status: 'LOST' | 'FOUND';
	createdBy: Id;
	createdAt: TimestampIso;
};

