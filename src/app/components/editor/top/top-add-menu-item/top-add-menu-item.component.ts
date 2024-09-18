import { Component, Input } from '@angular/core';
import { AddMenuItemDataIface } from '../../../../interfaces/addMenuItemDataIface';

@Component({
  selector: 'app-top-add-menu-item',
  standalone: true,
  imports: [],
  templateUrl: './top-add-menu-item.component.html',
})
export class TopAddMenuItemComponent {

  @Input() objectData !: AddMenuItemDataIface;

}
