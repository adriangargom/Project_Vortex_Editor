import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ObjectUtilsService {

  public handleObjectVisibility(object: THREE.Object3D): void {
    object.visible = !object?.visible;
    this.handleChildrenVisibility(object, object.visible);
  }

  public handleChildrenVisibility(object: THREE.Object3D, isVisible: boolean): void {    
    object.children.forEach((children) => {
      if(children.children.length > 0)
        this.handleChildrenVisibility(children, isVisible);

      children.visible = isVisible;
    });
  }
  
}
