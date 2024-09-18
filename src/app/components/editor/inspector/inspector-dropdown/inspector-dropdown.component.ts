import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inspector-dropdown',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './inspector-dropdown.component.html',
})
export class InspectorDropdownComponent {

  @Input() title !: string;

  protected isExpanded: boolean = false;

  protected handleExpansion(): void {
    this.isExpanded = !this.isExpanded;
  }

}