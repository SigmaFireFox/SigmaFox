import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'sigmafox-accordion-widget',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './widget-accordion-container.component.html',
  styleUrls: ['./widget-accordion-container.component.scss'],
})
export class WidgetAccordionContainer {
  @Input() hasPadding = true;
}
