import { Injectable } from '@angular/core';
import { SceneService } from '../scene/scene.service';
import { SelectionService } from '../selection/selection.service';
import { GeometryFactoryImpl } from '../../patterns/factory/impl/geometryFactoryImpl';
import { LightFactoryImpl } from '../../patterns/factory/impl/lightFactoryImpl';
import { MaterialUtilsService } from '../material-utils/material-utils.service';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ObjectGeneratorService {

  private readonly geometryFactory: GeometryFactoryImpl = new GeometryFactoryImpl();
  private readonly lightFactory: LightFactoryImpl = new LightFactoryImpl();

  constructor(
    private readonly sceneService: SceneService,
    private readonly selectionService: SelectionService,
    private readonly materialUtilsService: MaterialUtilsService
  ) {}

  public sceneGroupAddGeometry(geometryName: string): THREE.Object3D {
    const geometry = this.generateGeometry(geometryName);
    const mesh = this.generateGeometryMesh(geometry, geometryName);

    this.sceneService.sceneGroup.add(mesh);
    this.selectionService.selectedObject = mesh;
    return mesh;
  }

  private generateGeometryMesh(geometry: THREE.BufferGeometry, geometryName: string): THREE.Mesh {
    const material = this.materialUtilsService.generateStandardMaterial();
    const mesh = new THREE.Mesh(geometry, material);

    mesh.name = this.formatObjectName(geometryName);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    return mesh;
  }

  public sceneGroupAddLight(lightName: string): THREE.Object3D {
    const light = this.generateLight(lightName);
    const lightGroup = this.generateLightGroup(light, lightName);

    this.sceneService.sceneGroup.add(lightGroup);
    this.selectionService.selectedObject = lightGroup;
    return lightGroup;
  }

  private generateLightGroup(light: THREE.Light, lightName: string): THREE.Mesh {
    light.name = `${this.formatObjectName(lightName)} light`;
    light.castShadow = true;
    light.position.set(0, 0, 0);

    const geometry = new THREE.OctahedronGeometry(.2, 0);
    const color = new THREE.Color(0xff00ff);
    const material = this.materialUtilsService.generateStandardMaterial({
      color: color,
      wireframe: true,
      emissive: color,
      emissiveIntensity: 1
    });

    const lightGroup = new THREE.Mesh(geometry, material);
    lightGroup.name = `${this.formatObjectName(lightName)} light helper`;
    lightGroup.add(light);

    return lightGroup;
  }

  public generateGeometry(geometryName: string): THREE.BufferGeometry {
    return this.geometryFactory.getNew(geometryName);
  }

  public generateLight(lightName: string): THREE.Light {
    return this.lightFactory.getNew(lightName);
  }

  private formatObjectName(name: string): string {
    return name[0].toUpperCase() + name.substring(1);
  }

}
