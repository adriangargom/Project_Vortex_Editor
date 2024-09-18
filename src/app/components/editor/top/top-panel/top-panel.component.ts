import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TopSceneMenuComponent } from "../top-scene-menu/top-scene-menu.component";
import { TopAddMenuComponent } from "../top-add-menu/top-add-menu.component";
import { TopFileMenuComponent } from '../top-file-menu/top-file-menu.component';

@Component({
  selector: 'app-top-panel',
  standalone: true,
  imports: [ 
    CommonModule, 
    TopSceneMenuComponent, 
    TopAddMenuComponent, 
    TopFileMenuComponent
  ],
  templateUrl: './top-panel.component.html',
})
export class TopPanelComponent {

  protected selectedMenu: string | null = null;
  
  protected handleSelectedMenu(newMenu: string): void {
    if(newMenu === this.selectedMenu ){
      this.selectedMenu = null;
      return;
    }

    this.selectedMenu = newMenu;
  }

}
