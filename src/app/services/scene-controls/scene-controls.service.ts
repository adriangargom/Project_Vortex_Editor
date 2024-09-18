import { Injectable } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class SceneControlsService {

  private _orbitControls !: OrbitControls;

  public createOrbitControls(camera: THREE.Camera, renderer: THREE.Renderer): void {
    this._orbitControls = new OrbitControls(camera, renderer.domElement);
    this._orbitControls.mouseButtons = { MIDDLE: THREE.MOUSE.ROTATE };
    this._orbitControls.update();
  }


  public get orbitControls(): OrbitControls { 
    return this._orbitControls;
  }

}