import { API_BASE_URL } from '@/config/api';

export type NotificationType = 'info' | 'warning' | 'success';

export interface DriverNotification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type: NotificationType;
  read_at: string | null;
  created_at: string;
  updated_at: string;
}

interface NotificationListResponse {
  data: DriverNotification[];
  unread_count: number;
}

const getHeaders = (token: string): HeadersInit => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${token}`,
});

export async function createAdminNotification(
  token: string,
  payload: {
    target_role?: 'driver' | 'passenger' | 'owner' | 'admin';
    title: string;
    message: string;
    type: NotificationType;
  }
): Promise<{ success: boolean; message: string; recipients: number; total_found?: number }> {
  const response = await fetch(`${API_BASE_URL}/admin/notifications`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMessage = 'Failed to create notification';
    
    try {
      const text = await response.text();
      
      if (text) {
        try {
          const json = JSON.parse(text);
          
          // Check for Laravel validation errors
          if (json.errors) {
            const errorKeys = Object.keys(json.errors);
            if (errorKeys.length > 0) {
              const firstErrorKey = errorKeys[0];
              const firstError = json.errors[firstErrorKey];
              if (Array.isArray(firstError) && firstError.length > 0) {
                errorMessage = firstError[0];
              } else if (typeof firstError === 'string') {
                errorMessage = firstError;
              }
            }
          }
          
          // Check for general message
          if (json.message && errorMessage === 'Failed to create notification') {
            errorMessage = json.message;
          }
        } catch (parseError) {
          // If JSON parsing fails, use the raw text if it's not too long
          if (text.length < 200) {
            errorMessage = text;
          }
        }
      }
    } catch (textError) {
      // If we can't even get the response text, use default message
      console.error('Error reading response:', textError);
    }

    throw new Error(errorMessage);
  }

  return response.json();
}

export async function getMyNotifications(
  token: string,
  options?: { only_unread?: boolean }
): Promise<NotificationListResponse> {
  const params = new URLSearchParams();
  if (options?.only_unread) params.append('only_unread', '1');

  const response = await fetch(`${API_BASE_URL}/notifications?${params.toString()}`, {
    method: 'GET',
    headers: getHeaders(token),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Failed to fetch notifications');
  }

  return response.json();
}

export async function markNotificationAsRead(
  token: string,
  id: number
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
    method: 'POST',
    headers: getHeaders(token),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Failed to mark notification as read');
  }
}

export async function markAllNotificationsAsRead(
  token: string
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/notifications/read-all`, {
    method: 'POST',
    headers: getHeaders(token),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Failed to mark all notifications as read');
  }
}


