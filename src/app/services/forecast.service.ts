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
export class ForecastService {

  public weatherSubjet: Subject<any> = new Subject<any>();
  public weathers: Observable<any>;

  endpoint: string = 'http://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient, private geolocationService: GeolocationService) {
    this.weathers = this.weatherSubjet.asObservable().pipe(map(this.structureData));

    this.geolocationService.coords$.subscribe((coords) => {
      this.get(coords);
    });
  }

  structureData(data: any) {
    let minMaxPerDay = {};
    data.list.forEach(weatherObject => {
      let date = new Date(weatherObject.dt * 1000);
      let hours = date.getHours();
      let month = date.getMonth();
      let day = date.getDate();

      let key = `${month}-${day}`;
      let tempPerDay : Weather = minMaxPerDay[key] || {
        minMaxTemp : {}
      };

      if (!tempPerDay.code || hours == 16) {
        let source = weatherObject.weather[0];
        tempPerDay = {...tempPerDay, ...source};

        tempPerDay.code = source.id;
        tempPerDay.name = data.city.name;
      }

      if (!tempPerDay.minMaxTemp.min || ( weatherObject.main.temp_min > tempPerDay.minMaxTemp.min)) {
        tempPerDay.minMaxTemp.min = weatherObject.main.temp_min;
      }

      if (!tempPerDay.minMaxTemp.max || (weatherObject.main.temp_max > tempPerDay.minMaxTemp.max  )) {
        tempPerDay.minMaxTemp.max = weatherObject.main.temp_max;
      }

      minMaxPerDay[key] = tempPerDay;
    });

    return Object.values(minMaxPerDay);
  }

  get(coords: Coords){
    const args = `?lat=${coords.lat}&lon=${coords.lon}&appid=${environment.keyW}&units=metric`;
    let url = this.endpoint + args;

    /*if (isDevMode()) {
      url = 'assets/forecast.json';
    }*/
    this.http.get(url).subscribe(this.weatherSubjet);
  }
}
