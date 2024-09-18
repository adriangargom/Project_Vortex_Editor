import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { HierarchyItemComponent } from "../hierarchy-item/hierarchy-item.component";
import { SceneService } from '../../../../services/scene/scene.service';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import * as THREE from 'three';

@Component({
  selector: 'app-hierarchy-panel',
  standalone: true,
  imports: [ 
    CommonModule, 
    CdkDropList,
    CdkDropListGroup,
    HierarchyItemComponent
  ],
  templateUrl: './hierarchy-panel.component.html',
})
export class HierarchyPanelComponent implements OnInit {

  @ViewChild('hierarchyPanel', { static: true }) hierarchyPanel !: ElementRef<HTMLElement>;

  protected rootComponent !: THREE.Group;

  constructor(
    private readonly sceneService: SceneService
  ) {}

  ngOnInit(): void {
      this.handleResize();
  }

  protected handleDrop(event: CdkDragDrop<any>): void {
    const newParent = event.container.data as THREE.Group;
    const newChild = event.item.data as THREE.Object3D;
    newParent.add(newChild);
  }

  protected get sceneGroup(): THREE.Object3D {
    return this.sceneService.sceneGroup;
  }

  protected get hasSceneGroupElements(): boolean {
    return this.sceneService.sceneGroup.children.length > 0;
  }

  protected get sceneGroupChildren(): THREE.Object3D[] {
    return this.sceneService.sceneGroup.children;
  }
  
  @HostListener('window:resize')
  protected handleResize(): void {
    const hierarchyPanel = this.hierarchyPanel.nativeElement;
    const parentHeight = hierarchyPanel.parentElement?.clientHeight! -1;
    hierarchyPanel.style.height = `${parentHeight}px`;
  }

}
