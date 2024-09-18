import { Injectable } from '@angular/core';
import { TransformControls } from 'three/examples/jsm/Addons.js';
import { SelectionService } from '../selection/selection.service';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class TransformControlsService {

  private _transformControls !: TransformControls;

  constructor(
    private readonly selectionService: SelectionService
  ) {
    this.listenToObjectSelection();
  }

  private listenToObjectSelection(): void {
    this.selectionService.selectedObjectObserver.subscribe((object) => {
      if(!this._transformControls)
        return;

      if(!object){
        this._transformControls.detach();
        return;
      }

      this._transformControls.detach();
      this._transformControls.attach(object);
    });
  }

  public createTransformControls(camera: THREE.Camera, renderer: THREE.WebGLRenderer ): void {
    this._transformControls = new TransformControls(camera, renderer.domElement);
  }


  public get transformControls(): TransformControls {
    return this._transformControls;
  }

  public set transformControlsMode(mode: string) {
    if(mode === 't')
      this.transformControls.mode = 'translate';

    else if (mode === 'r')
      this.transformControls.mode = 'rotate';
    
    else if(mode === 's')
      this.transformControls.mode = 'scale';
  }

}
