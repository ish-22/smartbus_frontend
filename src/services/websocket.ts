// Real-time WebSocket service
interface WSMessage {
  type: 'bus_location' | 'booking_update' | 'notification';
  payload: Record<string, unknown>;
}

interface BusLocationData {
  busId: string;
  lat: number;
  lng: number;
}

interface BookingUpdateData {
  bookingId: string;
  status: string;
}

interface NotificationData {
  message: string;
  type: 'info' | 'warning' | 'error';
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 3000;

  connect(url: string = 'ws://localhost:8080/ws') {
    try {
      this.ws = new WebSocket(url);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data) as WSMessage;
        this.handleMessage(data);
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.reconnect(url);
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('WebSocket connection failed:', error);
    }
  }

  private reconnect(url: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => this.connect(url), this.reconnectInterval);
    }
  }

  private handleMessage(data: WSMessage) {
    switch (data.type) {
      case 'bus_location':
        this.updateBusLocation(data.payload as unknown as BusLocationData);
        break;
      case 'booking_update':
        this.updateBookingStatus(data.payload as unknown as BookingUpdateData);
        break;
      case 'notification':
        this.showNotification(data.payload as unknown as NotificationData);
        break;
    }
  }

  private updateBusLocation(data: BusLocationData) {
    window.dispatchEvent(new CustomEvent('busLocationUpdate', { detail: data }));
  }

  private updateBookingStatus(data: BookingUpdateData) {
    window.dispatchEvent(new CustomEvent('bookingUpdate', { detail: data }));
  }

  private showNotification(data: NotificationData) {
    window.dispatchEvent(new CustomEvent('notification', { detail: data }));
  }

  send(message: Record<string, unknown>) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  disconnect() {
    this.ws?.close();
  }
}

export const wsService = new WebSocketService();