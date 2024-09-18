import { Directive, ElementRef, HostListener } from '@angular/core';
import { CameraService } from '../../services/camera/camera.service';
import { RendererService } from '../../services/renderer/renderer.service';
import { SelectionService } from '../../services/selection/selection.service';
import { MousePositionService } from '../../services/mouse-position/mouse-position.service';

@Directive({
  selector: '[appScene]',
  standalone: true
})
export class SceneDirective {

  constructor(
    private readonly cameraService: CameraService,
    private readonly rendererService: RendererService,
    private readonly selectionService: SelectionService,
    private readonly mousePositionService: MousePositionService,
    private readonly sceneRoot: ElementRef<HTMLElement>
  ) {}

  @HostListener('window:resize')
  onWindowResize(): void {
    const { clientWidth, clientHeight } = this.sceneRoot.nativeElement;
    this.cameraService.onResize(clientWidth, clientHeight);
    this.rendererService.onResize(clientWidth, clientHeight);
  }

  @HostListener('mouseup', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if(event.button === 0)
      this.selectionService.launchSelectionRaycaster();
  }

  @HostListener('pointermove', ['$event'])
  onPointerMove(event: MouseEvent): void {
    this.mousePositionService.onMouseMove(event, this.sceneRoot.nativeElement);
  }

}
