import { Injectable } from '@angular/core';

import * as THREE from 'three';
import { SelectionService } from '../selection/selection.service';
import { SceneService } from '../scene/scene.service';
import { SelectedObjectService } from '../selected-object/selected-object.service';

@Injectable({
  providedIn: 'root'
})
export class CopyService {

  private copiedElement !: THREE.Object3D | null;

  constructor(
    private readonly sceneService: SceneService,
    private readonly selectionService: SelectionService,
    private readonly selectedObjectService: SelectedObjectService
  ) {}

  public handleCopy(): void {
    if(!this.selectionService.selectedObject)
      throw new Error('No object currently selected');

    this.copiedElement = this.selectionService.selectedObject;
  }

  public handlePaste(): void {
    if(!this.copiedElement)
      throw new Error('No element currently copied');

    const sceneGroup = this.sceneService.sceneGroup;
    const copiedElement = this.copiedElement.clone(true);
    sceneGroup.add(copiedElement);

    this.selectionService.selectedObject = copiedElement;
  }

  public handleCut(): void {
    this.handleCopy();
    this.selectedObjectService.handleObjectDelete();
  }
  
}
