import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class MathUtilsService {

  public fromDegreesToRadians(rotation: THREE.Vector3): THREE.Vector3 {
    return new THREE.Vector3(
        THREE.MathUtils.degToRad(rotation.x),
        THREE.MathUtils.degToRad(rotation.y),
        THREE.MathUtils.degToRad(rotation.z)
    );
  }

  public fromRadiansToDegrees(rotation: THREE.Euler): THREE.Vector3 {
    return new THREE.Vector3(
        THREE.MathUtils.radToDeg(rotation.x),
        THREE.MathUtils.radToDeg(rotation.y),
        THREE.MathUtils.radToDeg(rotation.z)
    );
  }

}
