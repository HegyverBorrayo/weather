import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { WeatherIconComponent } from './components/weather-icon/weather-icon.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { LoadingComponent } from './components/loading/loading.component';
import { GeolocationButtonComponent } from './components/geolocation-button/geolocation-button.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    WeatherIconComponent,
    WeatherCardComponent,
    ForecastComponent,
    LoadingComponent,
    GeolocationButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
