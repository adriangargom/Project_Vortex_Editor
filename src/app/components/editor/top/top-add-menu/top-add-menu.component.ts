import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ObjectGeneratorService } from '../../../../services/object-generator/object-generator.service';
import { AddMenuItemDataIface } from '../../../../interfaces/addMenuItemDataIface';
import { CommonModule } from '@angular/common';
import { TopAddMenuItemComponent } from "../top-add-menu-item/top-add-menu-item.component";

@Component({
  selector: 'app-top-add-menu',
  standalone: true,
  imports: [
    CommonModule,
    TopAddMenuItemComponent
  ],
  templateUrl: './top-add-menu.component.html',
})
export class TopAddMenuComponent implements OnInit {

  @Input() selectedMenu !: string | null;

  protected geometries: AddMenuItemDataIface[] = []
  protected lights: AddMenuItemDataIface[] = []

  constructor(
    private readonly objectGenerationService: ObjectGeneratorService,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadGeometries();
    this.loadLights();
  }

  private loadGeometries(): void {
    this.http.get('data/geometries.json').subscribe((data: any) => {
      this.geometries = data;
    });
  }

  private loadLights(): void {
    this.http.get('data/lights.json').subscribe((data: any) => {
      this.lights = data;
    });
  }

  protected generateGeometry(generationCode: string): void {
    this.objectGenerationService.sceneGroupAddGeometry(generationCode);
  }

  protected generateLight(generationCode: string): void {
    this.objectGenerationService.sceneGroupAddLight(generationCode);
  }

}
