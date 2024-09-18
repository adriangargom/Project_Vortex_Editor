import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class RendererService {

  private _renderer !: THREE.WebGLRenderer;

  public createRenderer(): THREE.WebGLRenderer {
    this._renderer = new THREE.WebGLRenderer();
    return this._renderer;
  }

  public setupRenderer(width: number, height: number): void {
    this._renderer.setSize(width, height);
  }

  public onResize(width: number, height: number): void {
    this._renderer.setSize(width, height);
  }

 
  public get renderer(): THREE.WebGLRenderer { 
    return this._renderer;
  }
  
}
