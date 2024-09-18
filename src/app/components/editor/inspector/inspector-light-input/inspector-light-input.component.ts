import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { SelectedObjectLightService } from '../../../../services/selected-object-light/selected-object-light.service';
import { CommonModule } from '@angular/common';
import { InspectorDropdownComponent } from "../inspector-dropdown/inspector-dropdown.component";
import ObjectLightDataIface from '../../../../interfaces/objectLightDataIface';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as THREE from 'three';

@Component({
  selector: 'app-inspector-light-input',
  standalone: true,
  imports: [ 
    CommonModule, 
    ReactiveFormsModule, 
    InspectorDropdownComponent
  ],
  templateUrl: './inspector-light-input.component.html',
})
export class InspectorLightInputComponent implements OnInit, OnChanges, OnDestroy {

  @Input() title !: string;
  @Input() lightData !: ObjectLightDataIface | null;

  protected readonly lightFormData = new FormGroup({
    color: new FormControl('#ffffff', Validators.required),
    intensity: new FormControl(1, Validators.required)
  });

  protected formDataChange$ !: Subscription;

  constructor(
    protected readonly selectedObjectLightService: SelectedObjectLightService
  ) {}

  ngOnInit(): void {
    this.updateDataOnFormChange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for(const propName in changes) {
      const propChange = changes[propName];
      const { previousValue, currentValue } = propChange;

      if(previousValue === currentValue) {
        this.lightFormData.setValue({
          color: currentValue.color,
          intensity: currentValue.intensity
        }, { emitEvent: false });
      }
    }
  }

  ngOnDestroy(): void {
    if(this.formDataChange$)
      this.formDataChange$.unsubscribe();
  }

  protected updateDataOnFormChange(): void {
    this.formDataChange$ = this.lightFormData.valueChanges.subscribe((formData) => {
      const lightFormData = formData as ObjectLightDataIface;
      this.selectedObjectLightService.selectedObjectLightData = lightFormData;
    });
  }


  protected get selectedObjectLight(): THREE.Light | null {
    return this.selectedObjectLightService.selectedObjectLight;
  }

}
