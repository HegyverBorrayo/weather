import { Component, OnInit, Input } from '@angular/core';
import { Weather } from 'src/structures/weather.structures';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  @Input() weather: Weather;

  constructor() { }

  ngOnInit(): void {
  }

}
