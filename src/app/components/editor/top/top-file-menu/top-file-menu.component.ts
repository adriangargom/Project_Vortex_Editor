import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ObjectLoaderService } from '../../../../services/object-loader/object-loader.service';
import { SceneService } from '../../../../services/scene/scene.service';
import { SelectionService } from '../../../../services/selection/selection.service';
import { ObjectExporterService } from '../../../../services/object-exporter/object-exporter.service';

@Component({
  selector: 'app-top-file-menu',
  standalone: true,
  imports: [ 
    CommonModule
  ],
  templateUrl: './top-file-menu.component.html',
})
export class TopFileMenuComponent {

  @Input() selectedMenu !: string | null;

  constructor(
    private readonly sceneService: SceneService,
    private readonly selectionService: SelectionService,
    private readonly objectLoaderService: ObjectLoaderService,
    private readonly objectExporterService: ObjectExporterService,
  ) {}

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if(input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const data = reader.result as ArrayBuffer;
        this.objectLoaderService.loadGltfModel(data);
      }

      reader.readAsArrayBuffer(file);
    }
  }

  protected onSceneGroupExport(): void {
    const sceneGroup = this.sceneService.sceneGroup;
    this.objectExporterService.exportGltfModel(sceneGroup);
  }

  protected onSelectedObjectExport(): void {
    const selectedObject = this.selectionService.selectedObject;
    if(!selectedObject)
      return;

    this.objectExporterService.exportGltfModel(selectedObject);
  }

}
