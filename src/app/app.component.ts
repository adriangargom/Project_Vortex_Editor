import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditorPanelComponent } from './components/editor/editor-panel/editor-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    RouterOutlet, 
    EditorPanelComponent 
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'editor_frontend';
}
