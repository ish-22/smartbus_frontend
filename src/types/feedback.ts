export type FeedbackType = 'complaint' | 'suggestion' | 'praise' | 'general';
export type FeedbackStatus = 'pending' | 'reviewed' | 'resolved' | 'rejected';

export type Feedback = {
	id: number;
	user_id: number;
	bus_id?: number | null;
	route_id?: number | null;
	subject: string;
	message: string;
	type: FeedbackType;
	rating?: number | null;
	status: FeedbackStatus;
	admin_response?: string | null;
	responded_by?: number | null;
	responded_at?: string | null;
	created_at: string;
	updated_at: string;
	user?: {
		id: number;
		name: string;
		email?: string;
		phone?: string;
	};
	bus?: {
		id: number;
		number: string;
		type?: string;
	};
	route?: {
		id: number;
		name: string;
	};
	responder?: {
		id: number;
		name: string;
	};
};

export type CreateFeedbackRequest = {
	subject: string;
	message: string;
	type: FeedbackType;
	bus_id?: number | null;
	route_id?: number | null;
	rating?: number | null;
};

export type UpdateFeedbackRequest = {
	subject?: string;
	message?: string;
	type?: FeedbackType;
	bus_id?: number | null;
	route_id?: number | null;
	rating?: number | null;
};

export type FeedbackStats = {
	total: number;
	pending: number;
	resolved: number;
	reviewed: number;
	rejected: number;
	by_type: {
		complaint: number;
		suggestion: number;
		praise: number;
		general: number;
	};
	average_rating: number | null;
	with_rating: number;
};
