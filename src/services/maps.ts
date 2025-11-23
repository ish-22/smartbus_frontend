// Google Maps integration for Sri Lanka
/// <reference types="google.maps" />

declare global {
  interface Window {
    google: typeof google;
  }
}

type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;
type GoogleInfoWindow = google.maps.InfoWindow;
type GoogleDirectionsService = google.maps.DirectionsService;
type GoogleDirectionsRenderer = google.maps.DirectionsRenderer;

export class GoogleMapsService {
  private map: GoogleMap | null = null;
  private markers: GoogleMarker[] = [];

  async initialize(elementId: string) {
    if (typeof window !== 'undefined' && window.google) {
      const colombo = { lat: 6.9271, lng: 79.8612 }; // Colombo coordinates
      
      this.map = new (window as any).google.maps.Map(document.getElementById(elementId)!, {
        zoom: 12,
        center: colombo,
        styles: [
          {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'on' }]
          }
        ]
      });
    }
  }

  addBusMarker(bus: { id: string; lat: number; lng: number; route: string }) {
    if (!this.map) return;

    const marker = new (window as any).google.maps.Marker({
      position: { lat: bus.lat, lng: bus.lng },
      map: this.map,
      title: `Bus ${bus.route}`,
      icon: {
        url: '/bus-icon.png',
        scaledSize: new (window as any).google.maps.Size(32, 32),
      },
    });

    const infoWindow = new (window as any).google.maps.InfoWindow({
      content: `
        <div>
          <h3>Bus ${bus.route}</h3>
          <p>Live Location</p>
        </div>
      `,
    });

    marker.addListener('click', () => {
      infoWindow.open(this.map, marker);
    });

    this.markers.push(marker);
  }

  updateBusLocation(busId: string, lat: number, lng: number) {
    const marker = this.markers.find(m => m.getTitle()?.includes(busId));
    if (marker) {
      marker.setPosition({ lat, lng });
    }
  }

  addRoute(waypoints: { lat: number; lng: number }[]) {
    if (!this.map || waypoints.length < 2) return;

    const directionsService = new (window as any).google.maps.DirectionsService();
    const directionsRenderer = new (window as any).google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: '#2563eb',
        strokeWeight: 4,
      },
    });

    directionsRenderer.setMap(this.map);

    directionsService.route({
      origin: waypoints[0],
      destination: waypoints[waypoints.length - 1],
      waypoints: waypoints.slice(1, -1).map(point => ({ location: point, stopover: true })),
      travelMode: (window as any).google.maps.TravelMode.DRIVING,
    }, (result: any, status: string) => {
      if (status === 'OK' && result) {
        directionsRenderer.setDirections(result);
      }
    });
  }

  getCurrentLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => reject(error)
        );
      } else {
        reject('Geolocation not supported');
      }
    });
  }
}

export const mapsService = new GoogleMapsService();