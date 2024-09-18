import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CameraService } from '../../../services/camera/camera.service';
import { RendererService } from '../../../services/renderer/renderer.service';
import { WindowDirective } from '../../../directives/window/window.directive';
import { SceneDirective } from '../../../directives/scene/scene.directive';
import { ControlsToolBarComponent } from "../tools/controls-tool-bar/controls-tool-bar.component";
import { CdkDrag } from '@angular/cdk/drag-drop';
import { PositionToolBarComponent } from "../tools/position-tool-bar/position-tool-bar.component";
import { HierarchyPanelComponent } from '../hierarchy/hierarchy-panel/hierarchy-panel.component';
import { InspectorPanelComponent } from "../inspector/inspector-panel/inspector-panel.component";
import { TopPanelComponent } from '../top/top-panel/top-panel.component';
import { InitializeService } from '../../../services/initialize/initialize.service';

@Component({
  selector: 'app-editor-panel',
  standalone: true,
  imports: [
    CdkDrag,
    WindowDirective,
    SceneDirective,
    ControlsToolBarComponent,
    PositionToolBarComponent,
    HierarchyPanelComponent,
    InspectorPanelComponent,
    TopPanelComponent
],
  templateUrl: './editor-panel.component.html',
})
export class EditorPanelComponent implements OnInit {

  @ViewChild('leftPanel', { static: true }) leftPanel !: ElementRef<HTMLElement>;
  @ViewChild('sceneRoot', { static: true }) sceneRoot !: ElementRef<HTMLElement>;

  startCursorXPosition: number = 0;
  startPaneXPosition: number = 0;

  constructor(
    private readonly initializeService: InitializeService,
    private readonly cameraService: CameraService,
    private readonly rendererService: RendererService,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeScene();
    this._changeDetectorRef.detectChanges();
  }

  private initializeScene(): void {
    const { clientWidth, clientHeight } = this.leftPanel.nativeElement;
    this.cameraService.setupCamera(clientWidth, clientHeight);
    this.rendererService.setupRenderer(clientWidth, clientHeight);
    this.sceneRoot.nativeElement.appendChild(this.rendererService.renderer.domElement);
  }

  protected handleLeftPaneResize(event: MouseEvent): void {
    this.startCursorXPosition = event.clientX;
    this.startPaneXPosition = this.leftPanel.nativeElement.getBoundingClientRect().width;

    document.addEventListener('mousemove', this.handleResizeMouseMove);
    document.addEventListener('mouseup', this.handleResizeMouseUp);
  }

  protected handleResizeMouseMove = (event: MouseEvent) => {
    const newPosition = this.startPaneXPosition - (this.startCursorXPosition - event.clientX);
    this.leftPanel.nativeElement.style.width = `${newPosition}px`;

    const { clientWidth, clientHeight } = this.sceneRoot.nativeElement;
    this.cameraService.onResize(clientWidth, clientHeight);
    this.rendererService.onResize(clientWidth, clientHeight);
  }

  protected handleResizeMouseUp = (): void => {
    document.removeEventListener('mousemove', this.handleResizeMouseMove);
    document.removeEventListener('mouseup', this.handleResizeMouseUp);
  }
  
}
