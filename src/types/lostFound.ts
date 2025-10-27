import type { Id, TimestampIso } from './common';

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

