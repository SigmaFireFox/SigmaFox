import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardButton } from './standard-button/standard.button';

@NgModule({
  imports: [CommonModule, StandardButton],
  exports: [StandardButton],
})
export class ButtonsModule {}
