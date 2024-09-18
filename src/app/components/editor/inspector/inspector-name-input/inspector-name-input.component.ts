import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectedObjectService } from '../../../../services/selected-object/selected-object.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inspector-name-input',
  standalone: true,
  imports: [ 
    ReactiveFormsModule, 
    FormsModule
  ],
  templateUrl: './inspector-name-input.component.html',
})
export class InspectorNameInputComponent implements OnInit, OnChanges, OnDestroy {

  @Input() nameData !: string;

  @Output() readonly updateNameEvent: EventEmitter<string> = new EventEmitter();

  protected readonly nameInputData = new FormControl('', Validators.required);

  protected inputDataChange$ !: Subscription;

  constructor(
    private readonly selectedObjectService: SelectedObjectService
  ) {}

  ngOnInit(): void {
    this.updateDataOnInputChange();
  }

  ngOnChanges(): void {
    this.nameInputData.setValue(this.nameData);
  }

  ngOnDestroy(): void {
    this.inputDataChange$.unsubscribe();
  }

  protected updateDataOnInputChange(): void {
    this.inputDataChange$ = this.nameInputData.valueChanges.subscribe((inputData) => {
      this.updateNameEvent.emit(inputData!);
    });
  }

}
