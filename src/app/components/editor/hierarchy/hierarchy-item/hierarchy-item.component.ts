import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ObjectUtilsService } from '../../../../services/object-utils/object-utils.service';
import { SelectionService } from '../../../../services/selection/selection.service';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import * as THREE from 'three';

@Component({
  selector: 'app-hierarchy-item',
  standalone: true,
  imports: [ 
    CommonModule,
    CdkDrag, 
    CdkDropList 
  ],
  templateUrl: './hierarchy-item.component.html',
})
export class HierarchyItemComponent {

  @Input() object !: THREE.Object3D;

  protected isExpanded: boolean = false;

  constructor(
    private readonly selectionService: SelectionService,
    private readonly objectUtilsService: ObjectUtilsService
  ) {}

  protected handleObjectSelection(): void {
    this.selectionService.selectedObject = this.object;
  }

  protected handleExpansionStatus(): void {
    this.isExpanded = !this.isExpanded;
  }


  protected get isObjectSelected(): boolean {
    return this.selectionService.selectedObject === this.object;
  }

  protected get objectDataName(): string {
    return this.object.name;
  }

  protected get objectVisibility(): boolean {
    return this.object.visible;
  }

  protected handleObjectVisibility(): void {
    this.objectUtilsService.handleObjectVisibility(this.object);
  }

  protected get objectChildren(): THREE.Object3D[] {
    return this.object.children;
  }

  protected get hasObjectChildren(): boolean {
    return this.objectChildren.length > 0;
  }
  
}
