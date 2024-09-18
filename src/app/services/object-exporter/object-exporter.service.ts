import { Injectable } from '@angular/core';
import { GLTFExporter } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ObjectExporterService {

  private readonly exporter = new GLTFExporter();

  public exportGltfModel(exportModel: THREE.Scene | THREE.Group | THREE.Object3D): void {
    this.exporter.parse(
      exportModel,
      (gltf) => this.onDone(gltf),
      this.onError,
      { binary: true }
    );
  }

  protected onDone(gltf: ArrayBuffer | { [key: string]: any }): void {
    const blob = new Blob([gltf] as BlobPart[], { type: 'model/gltf-binary' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = 'scene.gltf';

    link.click();
    link.remove();
  }

  protected onError(error: unknown): void {
    console.error(error);
  }

}
