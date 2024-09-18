import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CameraService } from '../../../../services/camera/camera.service';

@Component({
  selector: 'app-position-tool-bar',
  standalone: true,
  imports: [ 
    CommonModule
  ],
  templateUrl: './position-tool-bar.component.html',
})
export class PositionToolBarComponent {
  
  constructor(
    private readonly cameraService: CameraService
  ) {}

  protected setCameraViewAxis(viewAxis: 'x' | 'y' | 'z'): void {
    this.cameraService.setCameraViewAxis(viewAxis);
  }

}
