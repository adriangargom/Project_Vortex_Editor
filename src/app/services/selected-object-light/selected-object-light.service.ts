import { Injectable } from '@angular/core';
import { SelectionService } from '../selection/selection.service';
import ObjectLightDataIface from '../../interfaces/objectLightDataIface';
import { MaterialUtilsService } from '../material-utils/material-utils.service';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class SelectedObjectLightService {

  private _selectedObjectLight !: THREE.Light | null;

  constructor(
    private readonly selectionService: SelectionService,
    private readonly materialUtilsService: MaterialUtilsService
  ) {
    this.listenToSelectedObjectChanges();
  }

  private listenToSelectedObjectChanges(): void {
    this.selectionService.selectedObjectObserver.subscribe((object) => {
      if(!(object instanceof THREE.Light)) {
        this._selectedObjectLight = null;
        return;
      }

      this._selectedObjectLight = object as THREE.Light;
    });
  }


  public get selectedObjectLight(): THREE.Light | null {
    return this._selectedObjectLight;
  }

  public get selectedObjectLightData(): ObjectLightDataIface | null {
    if(this._selectedObjectLight) {
      return {
        color: this.materialUtilsService.formatColor(this._selectedObjectLight.color),
        intensity: this._selectedObjectLight.intensity
      };
    }

    return null;
  }

  public set selectedObjectLightData(newLightData: ObjectLightDataIface) {
    if(this._selectedObjectLight) {
      this._selectedObjectLight.color.set(newLightData.color);
      this._selectedObjectLight.intensity = newLightData.intensity;
    }
  }

}