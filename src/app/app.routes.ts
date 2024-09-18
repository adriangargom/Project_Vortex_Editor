import { Routes } from '@angular/router';
import { EditorPanelComponent } from './components/editor/editor-panel/editor-panel.component';
import { ErrorPanelComponent } from './components/error/error-panel/error-panel.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/editor',
        pathMatch: 'full'
    },
    {
        path: 'editor',
        component: EditorPanelComponent
    },
    {
        path: '**',
        component: ErrorPanelComponent
    }
];
