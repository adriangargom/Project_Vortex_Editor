import { Injectable } from '@angular/core';
import { SceneService } from '../scene/scene.service';
import { CameraService } from '../camera/camera.service';
import { RendererService } from '../renderer/renderer.service';
import { SceneControlsService } from '../scene-controls/scene-controls.service';
import { TransformControlsService } from '../transform-controls/transform-controls.service';
import { ObjectGeneratorService } from '../object-generator/object-generator.service';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class InitializeService {

  constructor(
    private readonly sceneService: SceneService,
    private readonly cameraService: CameraService,
    private readonly rendererService: RendererService,
    private readonly sceneControlsService: SceneControlsService,
    private readonly transformControlsService: TransformControlsService,
    private readonly objectGenerationService: ObjectGeneratorService
  ) {
    const scene = this.sceneService.createScene();
    this.sceneService.createSceneGroup();

    const camera = this.cameraService.createCamera();
    const renderer = this.rendererService.createRenderer();

    this.sceneControlsService.createOrbitControls(camera, renderer);
    this.transformControlsService.createTransformControls(camera, renderer);

    scene.add(this.transformControlsService.transformControls);

    const helper = new THREE.GridHelper(10000, 10000);
    scene.add(helper);

    this.objectGenerationService.sceneGroupAddGeometry('box');

    this.sceneService.animate();
  }

}
