import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SceneService } from '../scene/scene.service';
import { CameraService } from '../camera/camera.service';
import { MousePositionService } from '../mouse-position/mouse-position.service';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  private readonly _selectedObjectSubject = new BehaviorSubject<THREE.Object3D | null>(null);

  private _raycaster = new THREE.Raycaster();
  
  constructor(
    private readonly sceneService: SceneService,
    private readonly cameraService: CameraService,
    private readonly mousePositionService: MousePositionService
  ) {}

  public launchSelectionRaycaster(): void {
    const sceneGroup = this.sceneService.sceneGroup;
    const camera = this.cameraService.camera;
    const mousePosition = this.mousePositionService.mousePosition;
   
    this._raycaster.setFromCamera(mousePosition, camera);
    const intersects = this._raycaster.intersectObjects(sceneGroup.children);
    this.selectIntersectedObject(intersects);
  }

  private selectIntersectedObject(intersects: THREE.Intersection<THREE.Object3D>[]): void {
    if(intersects.length > 0 && intersects[0].object != this._selectedObjectSubject.value)
      this._selectedObjectSubject.next(intersects[0].object);
  }

  public handleObjectDeselection(): THREE.Object3D | null {
    const selectedObject = this._selectedObjectSubject.value;
    this._selectedObjectSubject.next(null);
    return selectedObject;
  }


  public get selectedObjectObserver() { 
    return this._selectedObjectSubject.asObservable();
  }

  public get selectedObject(): THREE.Object3D | null { 
    return this._selectedObjectSubject.value;
  }

  public set selectedObject(newObject: THREE.Object3D | null) { 
    this._selectedObjectSubject.next(newObject);
  }
  
}