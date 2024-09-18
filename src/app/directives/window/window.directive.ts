import { Directive, HostListener } from '@angular/core';
import { TransformControlsService } from '../../services/transform-controls/transform-controls.service';
import { SelectionService } from '../../services/selection/selection.service';
import { SelectedObjectService } from '../../services/selected-object/selected-object.service';
import { CopyService } from '../../services/copy/copy.service';
import { CameraService } from '../../services/camera/camera.service';

@Directive({
  selector: '[appWindow]',
  standalone: true
})
export class WindowDirective {

  constructor(
    private readonly selectionService: SelectionService,
    private readonly selectedObjectService: SelectedObjectService,
    private readonly transformControlsService: TransformControlsService,
    private readonly cameraService: CameraService,
    private readonly copyService: CopyService
  ) {}

  @HostListener('window:keydown', ['$event'])
  onWindowKeyDown(event: KeyboardEvent): void {
    if(event.altKey) {
      const formattedEventKey = event.key.toLowerCase();
      this.transformControlsService.transformControlsMode = formattedEventKey;
    }

    if(event.key === 'f' && this.selectionService.selectedObject)
      this.cameraService.focusObject(this.selectionService.selectedObject);

    if(event.key === 'Escape')
      this.selectionService.handleObjectDeselection();

    if(event.key === 'Delete')
      this.selectedObjectService.handleObjectDelete();

    if(event.ctrlKey && event.key === 'c')
      this.copyService.handleCopy();

    if(event.ctrlKey && event.key === 'v')
      this.copyService.handlePaste();

    if(event.ctrlKey && event.key === 'x')
      this.copyService.handleCut();
  }
  
}
