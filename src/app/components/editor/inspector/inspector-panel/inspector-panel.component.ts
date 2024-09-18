import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SelectionService } from '../../../../services/selection/selection.service';
import { CommonModule } from '@angular/common';
import { InspectorAxisInputComponent } from '../inspector-axis-input/inspector-axis-input.component';
import { SelectedObjectService } from '../../../../services/selected-object/selected-object.service';
import { InspectorMaterialInputComponent } from "../inspector-material-input/inspector-material-input.component";
import ObjectMaterialDataIface from '../../../../interfaces/objectMaterialDataIface';
import { InspectorNameInputComponent } from "../inspector-name-input/inspector-name-input.component";
import { SelectedObjectMaterialService } from '../../../../services/selected-object-material/selected-object-material.service';
import { InspectorLightInputComponent } from "../inspector-light-input/inspector-light-input.component";
import ObjectLightDataIface from '../../../../interfaces/objectLightDataIface';
import { SelectedObjectLightService } from '../../../../services/selected-object-light/selected-object-light.service';
import * as THREE from 'three';

@Component({
  selector: 'app-inspector-panel',
  standalone: true,
  imports: [ 
    CommonModule, 
    InspectorAxisInputComponent, 
    InspectorMaterialInputComponent, 
    InspectorNameInputComponent, 
    InspectorLightInputComponent
  ],
  templateUrl: './inspector-panel.component.html',
})
export class InspectorPanelComponent implements OnInit {

  @ViewChild('inspectorPanel', { static: true }) inspectorPanel !: ElementRef<HTMLElement>;

  constructor(
    private readonly selectionService: SelectionService,
    private readonly selectedObjectService: SelectedObjectService,
    private readonly selectedObjectMaterialService: SelectedObjectMaterialService,
    private readonly selectedObjectLightService: SelectedObjectLightService
  ) {}

  ngOnInit(): void {
    this.handleResize(); 
  }

  protected get isObjectSelected(): boolean {
    return this.selectionService.selectedObject !== null;
  }

  protected get selectedObjectName(): string {
    return this.selectedObjectService.objectName;
  }

  protected updateSelectedObjectName(newName: string): void {
    this.selectedObjectService.objectName = newName;
  }

  protected get selectedObjectPosition(): THREE.Vector3 {
    return this.selectedObjectService.objectPosition;
  }

  protected updateSelectedObjectPosition(newPosition: THREE.Vector3): void {
    this.selectedObjectService.objectPosition = newPosition;
  }

  protected get selectedObjectRotation(): THREE.Vector3 {
    return this.selectedObjectService.objectRotation;
  }

  protected updateSelectedObjectRotation(newRotation: THREE.Vector3): void {
    this.selectedObjectService.objectRotation = newRotation;
  }

  protected get selectedObjectScale(): THREE.Vector3 {
    return this.selectedObjectService.objectScale;
  }

  protected updateSelectedObjectScale(newScale: THREE.Vector3): void {
    this.selectedObjectService.objectScale = newScale;
  }

  protected get selectedObjectMaterialData(): ObjectMaterialDataIface | null {
    return this.selectedObjectMaterialService.selectedObjectMaterialData;
  }

  protected get selectedObjectLightData(): ObjectLightDataIface | null {
    return this.selectedObjectLightService.selectedObjectLightData;
  }

  @HostListener('window:resize')
  protected handleResize(): void {
    const inspectorPanel = this.inspectorPanel.nativeElement;
    const parentHeight = inspectorPanel.parentElement?.clientHeight! - 1;
    inspectorPanel.style.height = `${parentHeight}px`;
  }

}
