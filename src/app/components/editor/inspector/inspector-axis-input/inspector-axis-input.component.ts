import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InspectorDropdownComponent } from "../inspector-dropdown/inspector-dropdown.component";
import { DecimalPipe } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-inspector-axis-input',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    FormsModule, 
    InspectorDropdownComponent
  ],
  providers: [ 
    DecimalPipe
  ],
  templateUrl: './inspector-axis-input.component.html',
})
export class InspectorAxisInputComponent implements OnInit, OnChanges, OnDestroy {

  @Input() title !: string;
  @Input() axisData !: THREE.Vector3;

  @Output() updatedDataEvent: EventEmitter<THREE.Vector3> = new EventEmitter();

  protected readonly axisFormData = new FormGroup({
    x: new FormControl(0, Validators.required),
    y: new FormControl(0, Validators.required),
    z: new FormControl(0, Validators.required)
  });

  protected formDataChange$ !: Subscription;

  constructor(
    private readonly decimalPipe: DecimalPipe
  ) {}
  
  ngOnInit(): void {
    this.updateDataOnFormChange();
  }

  ngOnChanges(): void {
    this.axisFormData.setValue({
      x: Number(this.decimalPipe.transform(this.axisData.x, '0.0-2')),
      y: Number(this.decimalPipe.transform(this.axisData.y, '0.0-2')),
      z: Number(this.decimalPipe.transform(this.axisData.z, '0.0-2'))
    }, { emitEvent: false });
  }

  ngOnDestroy(): void {
    this.formDataChange$.unsubscribe();
  }

  protected updateDataOnFormChange(): void {
    this.formDataChange$ = this.axisFormData.valueChanges.subscribe((formData) => {
      const newData = new THREE.Vector3(
        formData.x!, 
        formData.y!, 
        formData.z!
      );
      this.updatedDataEvent.emit(newData);
    });
  }

}
