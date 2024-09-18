import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class MousePositionService {

  private readonly _mousePosition: THREE.Vector2 = new THREE.Vector2(0, 0);

  public onMouseMove(event: MouseEvent, sceneRoot: HTMLElement): void {
    this.calculateMousePosition(event, sceneRoot);
  }

  private calculateMousePosition(event: MouseEvent, sceneRoot: HTMLElement): void {
    const rect = sceneRoot.getBoundingClientRect();
    const { clientWidth, clientHeight } = sceneRoot;

    const xPosition = ((event.clientX - rect.left) / clientWidth) * 2 - 1;
    const yPosition = - ((event.clientY - rect.top) / clientHeight) * 2 + 1;
    this._mousePosition.set(xPosition, yPosition);
  }


  public get mousePosition(): THREE.Vector2 { 
    return this._mousePosition;
  }

}
