import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { ApiService } from 'src/app/commons/api.service';
import { DataObj, Config, Generation, GenerationEntity, CardHeaderColorCriteria } from 'src/app/commons/models';
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

  preview(){this.api.preview(this.dataObj!, this.config)}

  addColorCriteria(){
    let c0 = this.config.columns![0] || '';
    let cc = new CardHeaderColorCriteria({columnName: c0})
    this.config.cardHeaderConfig.colorsCriteria.push(cc);
    this.config.cardHeaderConfig.colorsCriteria = [...this.config.cardHeaderConfig.colorsCriteria]
    this.configChange.emit(this.config);
  }

  removeColorCriteria(index : number){
    this.config.cardHeaderConfig.colorsCriteria?.splice(index,1);
    this.config.cardHeaderConfig.colorsCriteria = [...this.config.cardHeaderConfig.colorsCriteria!];
    this.configChange.emit(this.config);
  }

  getAllColumns(){
    return [
      ... new Set(
        [...this.config.columns,
          ...this.dataObj?.columns!]
      )
    ]
  }

  drop(event: any) {
    moveItemInArray(this.config.columns!, event.previousIndex, event.currentIndex);
    moveItemInArray(this.config.themeColor!, event.previousIndex, event.currentIndex);
    moveItemInArray(this.config.textColor!, event.previousIndex, event.currentIndex);
  }

}
