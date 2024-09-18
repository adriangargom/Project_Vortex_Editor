import { Injectable } from '@angular/core';
import { CameraService } from '../camera/camera.service';
import { RendererService } from '../renderer/renderer.service';
import SceneDataIface from '../../interfaces/sceneDataIface';
import SceneFogDataIface from '../../interfaces/sceneFogDataIface';
import { SceneControlsService } from '../scene-controls/scene-controls.service';
import { MaterialUtilsService } from '../material-utils/material-utils.service';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class SceneService {

  private _scene !: THREE.Scene;

  private _sceneFog: THREE.Fog = new THREE.Fog('#ffffff', 0, 10);

  private _sceneGroup !: THREE.Group;

  constructor(
    private readonly cameraService: CameraService,
    private readonly rendererService: RendererService,
    private readonly sceneControlsService: SceneControlsService,
    private readonly materialUtilsService: MaterialUtilsService
  ) {}

  public createScene(): THREE.Scene {
    this._scene = new THREE.Scene();
    this._scene.name = 'Scene';
    this._scene.background = new THREE.Color('#0f172a');
    return this._scene;
  } 

  public createSceneGroup(): THREE.Group {
    this._sceneGroup = new THREE.Group();
    this._scene.add(this._sceneGroup);
    return this._sceneGroup;
  }

  public handleFogStatus(status: boolean): void {
    this._scene.fog = status ? this._sceneFog : null;
  }

  public animate(): void {
    requestAnimationFrame(() => this.animate());

    const orbitControls = this.sceneControlsService.orbitControls;

    if(orbitControls)
      orbitControls.update();

    const renderer = this.rendererService.renderer;
    const camera = this.cameraService.camera;

    if(renderer && camera)
      renderer.render(this._scene, camera);
  }


  public get scene(): THREE.Scene { 
    return this._scene;
  }

  public get sceneGroup(): THREE.Group {
    return this._sceneGroup;
  }

  public get sceneData(): SceneDataIface {
    return {
      sceneName: this.scene.name,
      sceneColor: this.materialUtilsService.formatColor(this.scene.background as THREE.Color),
      sceneFogEnabled: this.scene.fog !== null
    };
  }

  public set sceneData(newSceneData: SceneDataIface) {
    this._scene.name = newSceneData.sceneName;
    window.document.title = this._scene.name;
    (this._scene.background as THREE.Color).set(newSceneData.sceneColor);
    this.handleFogStatus(newSceneData.sceneFogEnabled);
  }

  public get sceneFogData(): SceneFogDataIface {
    return {
      fogColor: this.materialUtilsService.formatColor(this._sceneFog.color),
      fogNearDistance: this._sceneFog.near,
      fogFarDistance: this._sceneFog.far
    };
  }

  public set sceneFogData(newSceneFogData: SceneFogDataIface) {
    this._sceneFog.color.set(newSceneFogData.fogColor);
    this._sceneFog.near = newSceneFogData.fogNearDistance;
    this._sceneFog.far = newSceneFogData.fogFarDistance;
  }

}
