import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import SceneDataIface from '../../../../interfaces/sceneDataIface';
import { Subscription } from 'rxjs';
import { SceneService } from '../../../../services/scene/scene.service';
import { TopSceneFogMenuComponent } from "../top-scene-fog-menu/top-scene-fog-menu.component";

@Component({
  selector: 'app-top-scene-menu',
  standalone: true,
  imports: [ 
    CommonModule, 
    ReactiveFormsModule, 
    TopSceneFogMenuComponent
  ],
  templateUrl: './top-scene-menu.component.html',
})
export class TopSceneMenuComponent implements OnInit, OnDestroy {

  @Input() selectedMenu !: string | null;

  protected sceneData !: SceneDataIface | null;

  protected readonly sceneFormData = new FormGroup({
    sceneName: new FormControl('', Validators.required),
    sceneColor: new FormControl('', Validators.required),
    sceneFogEnabled: new FormControl(false, Validators.required)
  });

  protected sceneFormDataChange$ !: Subscription;

  constructor(
    private readonly sceneService: SceneService
  ) {}

  ngOnInit(): void {
    this.updateSceneDataOnFormChange();
    
    const sceneData = this.sceneService.sceneData;
    if(sceneData)
      this.sceneFormData.setValue(sceneData);
  }

  ngOnDestroy(): void {
    if(this.sceneFormDataChange$)
      this.sceneFormDataChange$.unsubscribe();
  }

  protected updateSceneDataOnFormChange(): void {
    this.sceneFormDataChange$ = this.sceneFormData.valueChanges.subscribe((formData) => {
      const sceneFormData = formData as SceneDataIface;
      this.sceneService.sceneData = sceneFormData;
    });
  }

}
