import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { Coords } from 'src/structures/coords.structures';
import {map} from 'rxjs/operators';
import { Weather } from 'src/structures/weather.structures';
import { GeolocationService } from './geolocation.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  public weatherSubjet: Subject<any> = new Subject<any>();
  public weathers: Observable<any>;

  endpoint: string = 'http://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient, private geolocationService: GeolocationService) {
    this.weathers = this.weatherSubjet.asObservable().pipe(
      map((data:any)=>{
        let mainweather = data.weather[0];
        let weather: Weather = {
          name: data.name,
          code: data.cod,
          temp: data.main.temp,
          ...mainweather
        };
        return weather;
      })
    );

    this.geolocationService.coords$.subscribe((coords) => {
      this.get(coords);
    });
  }

  get(coords: Coords){
    const args = `?lat=${coords.lat}&lon=${coords.lon}&appid=${environment.keyW}&units=metric`;
    let url = this.endpoint + args;

    /*if (isDevMode()) {
      url = 'assets/weather.json';
    }*/
    this.http.get(url).subscribe(this.weatherSubjet);
  }
}
