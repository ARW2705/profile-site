import { trigger, state, style, animate, transition } from '@angular/animations';

export function fadeIn() {
  return trigger('fadeIn', [
    state('*', style({
      opacity: 1
    })),
    transition(':enter', [
      style({
        opacity: 0
      }),
      animate('0.5s ease-in')
    ])
  ]);
}

export function fadeInOut() {
  return trigger('fadeInOut', [
    state('*', style({
      opacity: 1
    })),
    transition(':enter', [
      style({
        opacity: 0
      }),
      animate('0.5s ease-in')
    ]),
    transition(':leave', [
      style({
        opacity: 0
      }),
      animate('0.5s ease-out')
    ])
  ]);
}

export function flyInOut() {
  return trigger('flyInOut', [
    state('*', style({
      transform: 'translateX(0)',
      opacity: 1
    })),
    transition(':enter', [
      style({
        transform:'translateX(-100%)',
        opacity: 0
      }),
      animate('0.5s ease-in')
    ]),
    transition(':leave', [
      animate('0.5s ease-out'),
      style({
        transform: 'translateX(100%)',
        opacity: 0
      })
    ])
  ]);
}
