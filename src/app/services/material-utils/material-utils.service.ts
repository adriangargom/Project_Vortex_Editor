import { Injectable } from '@angular/core';
import ObjectMaterialDataIface from '../../interfaces/objectMaterialDataIface';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class MaterialUtilsService {

  // Extract the current mesh material of the selected object 
  public extractObjectMaterial(object: THREE.Object3D): THREE.MeshStandardMaterial | null {
    let material: THREE.MeshStandardMaterial | null = null;

    object.traverse((object: THREE.Object3D) => {
      if(object instanceof THREE.Mesh)
        material = object.material;
    });

    return material;
  }

  public formatColor(color: THREE.Color): string {
    return `#${color.getHexString()}`;
  }

  public mapMaterialDataToStandardMaterial(
    materialData: ObjectMaterialDataIface, 
    standardMaterial: THREE.MeshStandardMaterial
  ): THREE.MeshStandardMaterial {

    standardMaterial.color.set(materialData.color);
    standardMaterial.roughness = materialData.roughness;
    standardMaterial.metalness = materialData.metalness;

    standardMaterial.emissive = standardMaterial.color;
    standardMaterial.emissiveIntensity = materialData.emission;

    standardMaterial.wireframe = materialData.wireframe;

    return standardMaterial;
  }

  public fromStandardMaterialToMaterialData(
    standardMaterial: THREE.MeshStandardMaterial,
  ): ObjectMaterialDataIface {

    return {
      color: this.formatColor(standardMaterial.color),
      roughness: standardMaterial.roughness,
      metalness: standardMaterial.metalness,
      emission: standardMaterial.emissiveIntensity,
      wireframe: standardMaterial.wireframe
    };
  }

  public generateStandardMaterial(customSettings?: THREE.MeshStandardMaterialParameters): THREE.MeshStandardMaterial {
    if(customSettings)
      return new THREE.MeshStandardMaterial(customSettings);
    
    return new THREE.MeshStandardMaterial({ 
      color: '#ffffff',
      emissiveIntensity: 0
    });
  }

}
