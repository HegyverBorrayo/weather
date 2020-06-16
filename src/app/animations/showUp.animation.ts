import {trigger, style, animate, query, stagger, transition, state } from '@angular/animations';

export const showUpStaggered = trigger('showUpCollection', [
    transition('* => *', [
      query(':enter', [
        style({opacity: 0, transform: 'scale(0)'}),
        stagger(75,[
          animate(250, style({ opacity: 1, transform: 'scale(1)' }))
        ])
      ], {optional: true})
    ]),
]);

export const showUp = trigger('showUpElement',[
  state('in', style({ opacity: 1, transform: 'scale(1)' })),
  transition(':enter', [
    style({opacity: 0, transform: 'scale(0)'}),
    animate(250)
  ]),
]);
