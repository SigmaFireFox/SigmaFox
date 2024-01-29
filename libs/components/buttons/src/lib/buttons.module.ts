import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardButton } from './standard-button/standard.button';
import { TwoStateIconButton } from './two-state-icon-button/two-state-icon.button';

@NgModule({
  imports: [CommonModule, StandardButton, TwoStateIconButton],
  exports: [StandardButton, TwoStateIconButton],
})
export class ButtonsModule {}
