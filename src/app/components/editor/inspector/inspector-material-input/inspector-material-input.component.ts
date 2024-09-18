import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import ObjectMaterialDataIface from '../../../../interfaces/objectMaterialDataIface';
import { Subscription } from 'rxjs';
import { InspectorDropdownComponent } from "../inspector-dropdown/inspector-dropdown.component";
import { CommonModule } from '@angular/common';
import { SelectedObjectMaterialService } from '../../../../services/selected-object-material/selected-object-material.service';

@Component({
  selector: 'app-inspector-material-input',
  standalone: true,
  imports: [ 
    CommonModule, 
    ReactiveFormsModule, 
    InspectorDropdownComponent
  ],
  templateUrl: './inspector-material-input.component.html',
})
export class InspectorMaterialInputComponent implements OnInit, OnChanges, OnDestroy {

  @Input() title !: string;
  @Input() materialData !: ObjectMaterialDataIface | null;

  protected readonly materialFormData = new FormGroup({
    color: new FormControl('#ffffff', Validators.required),
    roughness: new FormControl(1, [ Validators.required, Validators.min(0), Validators.max(1) ]),
    metalness: new FormControl(0, [ Validators.required, Validators.min(0), Validators.max(1) ]),
    emission: new FormControl(0, [ Validators.required, Validators.min(0), Validators.max(1) ]),
    wireframe: new FormControl(false, Validators.required)
  });

  protected formDataChange$ !: Subscription;
  
  constructor(
    private readonly selectedObjectMaterialService: SelectedObjectMaterialService,
  ) {}

  ngOnInit(): void {
    this.updateDataOnFormChange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for(const propName in changes) {
      const propChange = changes[propName];
      const { previousValue, currentValue } = propChange;

      if(previousValue !== currentValue) {
        this.materialFormData.setValue({
          color: currentValue.color || '#ffffff',
          roughness: currentValue.roughness || 0,
          metalness: currentValue.metalness || 0,
          emission: currentValue.emission || 0,
          wireframe: currentValue.wireframe || false
        }, { emitEvent: false });
      }
    }
  }

  ngOnDestroy(): void {
    if(this.formDataChange$)
      this.formDataChange$.unsubscribe();
  }

  protected updateDataOnFormChange(): void {
    this.formDataChange$ = this.materialFormData.valueChanges.subscribe((formData) => {
      const materialFormData = formData as ObjectMaterialDataIface;
      this.selectedObjectMaterialService.selectedObjectMaterialData = materialFormData;
    });
  }

}