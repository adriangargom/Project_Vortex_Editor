import { Injectable } from '@angular/core';
import { SceneControlsService } from '../scene-controls/scene-controls.service';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private _camera!: THREE.PerspectiveCamera;

  private readonly _cameraFov: number = 75;
  private readonly _cameraNear: number = 0.1;
  private readonly _cameraFar: number = 1000;

  private readonly _focusOffset: number = 5;
  private readonly _cameraAxisView: {[key: string]: THREE.Vector3} = {
    x: new THREE.Vector3(5, 0, 0),
    y: new THREE.Vector3(0, 5, 0),
    z: new THREE.Vector3(0, 0, 5),
  };

  constructor(
    private readonly sceneControlsService: SceneControlsService,
  ) {}
  
  public createCamera(): THREE.PerspectiveCamera {
    this._camera = new THREE.PerspectiveCamera(this._cameraFov, 0, this._cameraNear, this._cameraFar);
    this._camera.position.set(0, 0, 5);
    return this._camera;
  }

  public setupCamera(width: number, height: number): void {
    this.onResize(width, height);
  }

  public onResize(width: number, height: number): void {
    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();
  }

  public focusObject(object: THREE.Object3D): void {
    if(!object)
      throw new Error('Invalid provided object');

    const selectedObjectPosition = object.position;
    const controls = this.sceneControlsService.orbitControls;

    let offsetPosition = this.calculateCameraFocusPosition(selectedObjectPosition);
    this._camera.position.set(offsetPosition.x, offsetPosition.y, offsetPosition.z);
    this._camera.lookAt(selectedObjectPosition);

    controls.update();
  }

  private calculateCameraFocusPosition(focusPosition: THREE.Vector3): THREE.Vector3 {
    const direction = new THREE.Vector3()
      .subVectors(this._camera.position, focusPosition)
      .normalize()
      .multiplyScalar(this._focusOffset);

      return direction.add(focusPosition);
  }

  public setCameraViewAxis(viewAxis: 'x' | 'y' | 'z'): void {
    const viewAxisPos = this._cameraAxisView[viewAxis];
    this._camera.position.set(viewAxisPos.x, viewAxisPos.y, viewAxisPos.z);

    this.sceneControlsService.orbitControls.update();
  }


  public get camera(): THREE.PerspectiveCamera { 
    return this._camera;
  }

}
