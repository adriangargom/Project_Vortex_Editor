import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-panel',
  standalone: true,
  imports: [],
  templateUrl: './error-panel.component.html',
})
export class ErrorPanelComponent {

  constructor(
    private readonly router: Router
  ) {}

  protected handleNavigateToEditor(): void {
    this.router.navigate(['/editor']);
  }

}
