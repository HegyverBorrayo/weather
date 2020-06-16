import { Component, OnInit } from '@angular/core';
import { loadingAnimation } from 'src/app/animations/loading.animation';
import { CurrentWeatherService } from 'src/app/services/current-weather.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass'],
  animations: [loadingAnimation()]
})
export class LoadingComponent implements OnInit {
  cElements: string[] = ['#ffe5c', '#ff80a0', '#ff2263', '#800020', '#1a0006'];
  public elements: string[];

  constructor(public currentWeatherService: CurrentWeatherService) { }

  ngOnInit(): void {
    this.set();
  }

  set(){
    this.elements = this.cElements;
    this.scheduleNextIteration();
  }

  scheduleNextIteration(){
    setTimeout(() => {
      if ( this.elements.length === 0 ) {
        return this.set();
      }

      this.clear();

    }, (100 * this.elements.length) + 1050);
  }


  clear(){
    this.elements = [];
    this.scheduleNextIteration();
  }

}
