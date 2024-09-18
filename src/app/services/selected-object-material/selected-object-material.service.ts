import { Injectable } from '@angular/core';
import { MaterialUtilsService } from '../material-utils/material-utils.service';
import { SelectionService } from '../selection/selection.service';
import ObjectMaterialDataIface from '../../interfaces/objectMaterialDataIface';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class SelectedObjectMaterialService {

  private _selectedObjectMaterial !: THREE.MeshStandardMaterial | null;

  constructor(
    private readonly selectionService: SelectionService,
    private readonly materialUtilsService: MaterialUtilsService
  ) {
    this.listenToSelectedObjectChanges();
  }

  private listenToSelectedObjectChanges(): void {
    this.selectionService.selectedObjectObserver.subscribe((object) => {
      if(!object) {
        this._selectedObjectMaterial = null;
        return;
      }

      this._selectedObjectMaterial = this.materialUtilsService.extractObjectMaterial(object);
    });
  }


  public get selectedObjectMaterial(): THREE.MeshStandardMaterial | null {
    return this._selectedObjectMaterial;
  }

  public get selectedObjectMaterialData(): ObjectMaterialDataIface | null {
    if(this._selectedObjectMaterial) {
      return this.materialUtilsService.fromStandardMaterialToMaterialData(
        this._selectedObjectMaterial
      );
    }

    return null;
  }

  public set selectedObjectMaterialData(newMaterialData: ObjectMaterialDataIface) {
    if(this._selectedObjectMaterial) {
      this.materialUtilsService.mapMaterialDataToStandardMaterial(
        newMaterialData,
        this._selectedObjectMaterial
      );
    }
  }

}