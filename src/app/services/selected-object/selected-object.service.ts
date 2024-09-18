import { Injectable } from '@angular/core';
import { SelectionService } from '../selection/selection.service';
import { MathUtilsService } from '../math-utils/math-utils.service';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class SelectedObjectService {

  private _selectedObject !: THREE.Object3D | null;

  constructor(
    private readonly selectionService: SelectionService,
    private readonly mathUtilsService: MathUtilsService,
  ) {
    this.listenToSelectedObjectChanges();
  }

  private listenToSelectedObjectChanges(): void {
    this.selectionService.selectedObjectObserver.subscribe((object) => {
      this._selectedObject = object;
    });
  }

  public handleObjectDelete(): void {
    if(!this._selectedObject)
      return;

    this._selectedObject.parent?.remove(this._selectedObject);
    this.selectionService.selectedObject = null;
  }


  public get objectName(): string {
    return this._selectedObject?.name || '';
  }

  public set objectName(newName: string) {
    if(this._selectedObject) 
      this._selectedObject.name = newName;
  }
  
  public get objectPosition(): THREE.Vector3 {
    const currentPosition = this._selectedObject?.position || new THREE.Vector3();
    return new THREE.Vector3(
      currentPosition.x,
      currentPosition.y,
      currentPosition.z
    );
  }

  public set objectPosition(newPosition: THREE.Vector3) {
    if(this._selectedObject) 
      this._selectedObject.position.set(newPosition.x, newPosition.y, newPosition.z);
  }

  public get objectRotation(): THREE.Vector3 {
    const currentRotation = this.mathUtilsService.fromRadiansToDegrees(
      this._selectedObject?.rotation || new THREE.Euler()
    );

    return new THREE.Vector3(
      currentRotation.x,
      currentRotation.y,
      currentRotation.z
    )
  }

  public set objectRotation(newRotationInDegrees: THREE.Vector3) {
    if(this._selectedObject) {
      const rotationInRadians = this.mathUtilsService.fromDegreesToRadians(newRotationInDegrees);
      this._selectedObject.rotation.set(rotationInRadians.x, rotationInRadians.y, rotationInRadians.z);
    }
  }

  public get objectScale(): THREE.Vector3 {
    const currentScale = this._selectedObject?.scale || new THREE.Vector3();
    return new THREE.Vector3(
      currentScale.x,
      currentScale.y,
      currentScale.z
    );
  }

  public set objectScale(newScale: THREE.Vector3) {
    if(this._selectedObject)
      this._selectedObject.scale.set(newScale.x, newScale.y, newScale.z);
  }
  
}