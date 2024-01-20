import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  state('void', style({ color: 'blue', opacity: 0 })),
  state('*', style({ color: 'blue', 'font-weight': 'bold' })),
  transition(':enter', [animate(2000)]),
]);
