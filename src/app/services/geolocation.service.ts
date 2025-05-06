import { Injectable, inject } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private http = inject(HttpClient); // Injeção moderna

  private nominatimUrl = 'https://nominatim.openstreetmap.org/reverse';

  async getCurrentCity() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      
      const response: any = await this.http.get(this.nominatimUrl, {
        params: {
          format: 'json',
          lat: latitude.toString(),
          lon: longitude.toString(),
          addressdetails: '1'
        }
      }).toPromise();

      return response.address?.city || 
             response.address?.town || 
             response.address?.village || 
             'Santos, SP';
      
    } catch (error) {
      console.error('Error getting location:', error);
      return 'Santos, SP';
    }
  }
}