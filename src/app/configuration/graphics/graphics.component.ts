import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/commons/api.service';
import { DataObj, Config, Generation, GenerationEntity } from 'src/app/commons/models';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PreviewSuccessDialogComponent } from '../preview-success-dialog/preview-success-dialog.component';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit {

  @Input() dataObj? : DataObj;
  @Input() config! : Config;

  @Output() dataObjChange = new EventEmitter<DataObj>();
  @Output() configChange = new EventEmitter<Config>();

  constructor(
    private api : ApiService,
    private dialog : MatDialog,
  ) { }

  ngOnInit(): void {
  }

  preview(){
    let generation: Generation = new Generation({ data: this.dataObj!.data, config: this.config });
    this.api.generate(generation).subscribe((entity : GenerationEntity) => {
        sessionStorage.setItem('generationPreview', JSON.stringify(entity));
        this.dialog.open(PreviewSuccessDialogComponent, {disableClose: true, data: {id: entity.id}}).afterClosed().subscribe(() => {
          window.open(`/generation`, '_blank')
        })
    })
  }

  drop(event: any) {
    moveItemInArray(this.config.columns!, event.previousIndex, event.currentIndex);
  }

}
