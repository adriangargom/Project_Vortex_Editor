import { Component, OnDestroy, OnInit } from '@angular/core';
import SceneFogDataIface from '../../../../interfaces/sceneFogDataIface';
import { SceneService } from '../../../../services/scene/scene.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-scene-fog-menu',
  standalone: true,
  imports: [ 
    ReactiveFormsModule 
  ],
  templateUrl: './top-scene-fog-menu.component.html',
})
export class TopSceneFogMenuComponent implements OnInit, OnDestroy {

  protected sceneFogData !: SceneFogDataIface | null;

  protected readonly sceneFogFormData = new FormGroup({
    fogColor: new FormControl('', Validators.required),
    fogNearDistance: new FormControl(0, [ Validators.required, Validators.min(0) ]),
    fogFarDistance: new FormControl(1, [ Validators.required, Validators.min(0) ])
  });

  protected sceneFogFormDataChanges$ !: Subscription;

  constructor(
    private readonly sceneService: SceneService
  ) {}

  ngOnInit(): void {
    this.updateSceneFogDataOnFormChange();

    const sceneFogData = this.sceneService.sceneFogData;
    this.sceneFogFormData.setValue(sceneFogData);
  }

  ngOnDestroy(): void {
    if(this.sceneFogFormDataChanges$)
      this.sceneFogFormDataChanges$.unsubscribe();
  }

  protected updateSceneFogDataOnFormChange(): void {
    this.sceneFogFormDataChanges$ = this.sceneFogFormData.valueChanges.subscribe((formData) => {
      const sceneFogFormData = formData as SceneFogDataIface;
      this.sceneService.sceneFogData = sceneFogFormData;
    });
  }

}
