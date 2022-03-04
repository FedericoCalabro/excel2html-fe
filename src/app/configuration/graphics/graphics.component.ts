import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/commons/api.service';
import { DataObj, Config, Generation, GenerationEntity } from 'src/app/commons/models';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { PreviewSuccessDialogComponent } from '../preview-success-dialog/preview-success-dialog.component';
import { TOOLTIP_DEFINITIONS } from 'src/app/commons/constants';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit {

  TOOLTIP_DEFINITION = TOOLTIP_DEFINITIONS;
  
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
        this.dialog.open(PreviewSuccessDialogComponent, {disableClose: true, data: {id: entity.id}}).afterClosed().subscribe(() => {
          window.open(`/generation?id=${entity.id}`, '_blank')
        })
    })
  }

  drop(event: any) {
    moveItemInArray(this.config.columns!, event.previousIndex, event.currentIndex);
  }

}
