import type { Id, TimestampIso } from './common';

export type Feedback = {
	id: Id;
	busId: Id;
	userId: Id;
	rating: number; // 1-5
	comment: string;
	createdAt: TimestampIso;
};

