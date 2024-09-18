import { Injectable } from '@angular/core';
import { GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js';
import { SceneService } from '../scene/scene.service';

@Injectable({
  providedIn: 'root'
})
export class ObjectLoaderService {

  private readonly loader: GLTFLoader = new GLTFLoader();

  constructor(
    private readonly sceneService: SceneService
  ) {}

  public loadGltfModel(data: ArrayBuffer): void {
    this.loader.parse(
      data,
      '', 
      (gltf) => this.onLoad(gltf), 
      this.onError
    );
  }

  protected onLoad(loadedObject: GLTF): void {
    this.sceneService.sceneGroup.add(loadedObject.scene);
  }

  protected onError(error: unknown) {
    console.error(error);
  }
  
}
