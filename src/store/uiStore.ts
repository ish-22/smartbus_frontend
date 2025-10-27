import { create } from 'zustand';

type UiState = {
	toast?: { type: 'success'|'error'|'info'; message: string };
	showToast: (toast: UiState['toast']) => void;
};

export const useUiStore = create<UiState>((set) => ({
	toast: undefined,
	showToast: (toast) => set({ toast }),
}));

