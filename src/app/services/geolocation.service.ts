import { Injectable } from '@angular/core';
import { Coords } from 'src/structures/coords.structures';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  public coordSubject: Subject<Coords> = new Subject<Coords>();
  public coords$: Observable<Coords> = this.coordSubject.asObservable();
  public permission$: Promise<string>;
  public coordsPromise: Promise<Coords>;

  constructor() {
    this.permission$ = (navigator as any).permissions.query({
      name: 'geolocation'
    }).then(permission => permission.state);
  }

  requestGeolocation(){
    if (!this.coordsPromise) {
      this.coordsPromise = this.getGeoLocation();
    }
    this.coordsPromise.then(coords => {
      this.coordSubject.next(coords);
    });
  }

  getGeoLocation(): Promise<Coords> {
    return new Promise((res, rej) => {
      if (!navigator || !('geolocation' in navigator)) {
        return rej('La Geolocalización no esta disponible.');
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          res({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.warn('ERROR(' + error.code + '): ' + error.message);
          rej('La Geolocalización no esta disponible.');
        }
      );
    });
  }
}
