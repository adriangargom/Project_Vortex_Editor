import { Component } from '@angular/core';
import { TransformControlsService } from '../../../../services/transform-controls/transform-controls.service';
import { CommonModule } from '@angular/common';
import { TransformControls, TransformControlsMode } from 'three/examples/jsm/Addons.js';

@Component({
  selector: 'app-controls-tool-bar',
  standalone: true,
  imports: [ 
    CommonModule
  ],
  templateUrl: './controls-tool-bar.component.html',
})
export class ControlsToolBarComponent {

  constructor(
    private readonly transformControlsService: TransformControlsService
  ) {}

  protected updateTransformControlsMode(mode: string): void {
    this.transformControlsService.transformControlsMode = mode;
  }


  protected get transformControls(): TransformControls {
    return this.transformControlsService.transformControls;
  }

  protected get mode(): TransformControlsMode {
    return this.transformControlsService.transformControls.mode;
  }

}