// Currency formatting utilities for Sri Lankan Rupees (LKR)

export function formatLKR(amount: number): string {
  return `LKR ${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

export function formatLKRShort(amount: number): string {
  return `LKR ${amount.toLocaleString('en-US')}`;
}

export const CURRENCY_SYMBOL = 'LKR';
export const CURRENCY_CODE = 'LKR';
export const CURRENCY_NAME = 'Sri Lankan Rupee';