import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/commons/api.service';
import { DataObj, Config, RowCriteria, AggregationRow, SortingColumn, Generation, GenerationEntity } from 'src/app/commons/models';
import { PreviewSuccessDialogComponent } from '../../dialogs/preview-success-dialog/preview-success-dialog.component';
import {TOOLTIP_DEFINITIONS} from 'src/app/commons/constants'
@Component({
  selector: 'app-rows',
  templateUrl: './rows.component.html',
  styleUrls: ['./rows.component.scss']
})
export class RowsComponent implements OnInit {

  TOOLTIP_DEFINITION = TOOLTIP_DEFINITIONS;
  
  @Input() dataObj? : DataObj;
  @Input() config! : Config;

  @Output() dataObjChange = new EventEmitter<DataObj>();
  @Output() configChange = new EventEmitter<Config>();
  @Output() indexTo = new EventEmitter<any>();

  aggregationItems : string[] = ["Sum","Min","Max","Mean","Product","Std Deviation","Std Variance"]

  constructor(private api : ApiService, private dialog : MatDialog) { }

  ngOnInit(): void {
  }
  
  addCriteria(){
    let c0 = this.config.columns![0] || '';
    this.config.rowCriteria?.push(new RowCriteria({columnName: c0}))
    this.config.rowCriteria = [...this.config.rowCriteria!];
    this.configChange.emit(this.config);
  }

  removeCriteria(index : number){
    this.config.rowCriteria?.splice(index,1);
    this.config.rowCriteria = [...this.config.rowCriteria!];
    this.configChange.emit(this.config);
  }

  removeRowAggr(index : number){
    this.config.aggregationRows?.splice(index, 1);
    this.config.aggregationRows = [...this.config.aggregationRows!];
    this.configChange.emit(this.config);
  }
  addRowAggr(){
    let c0 = this.config.columns![0] || '';
    this.config.aggregationRows?.push(new AggregationRow({blockedCol: c0, targetCol: c0, op: ['Sum']}))
    this.config.aggregationRows = [...this.config.aggregationRows!];
    this.configChange.emit(this.config);
  }
  selectAllAggr(index : number) {
    this.config.aggregationRows[index].op = this.aggregationItems.map(x => x)!;
    this.configChange.emit(this.config);
  }

  unselectAllAggr(index : number) {
    this.config!.aggregationRows[index].op = [];
    this.configChange.emit(this.config);
  }
  addSort(){
    let c0 = this.config.columns![0] || '';
    this.config.sortByColumns = [...this.config.sortByColumns!, new SortingColumn({name: c0, type:"String"})]
    this.configChange.emit(this.config);
  }
  drop(event: any) {
    moveItemInArray(this.config.sortByColumns!, event.previousIndex, event.currentIndex);
    this.configChange.emit(this.config);
  }
  removeSort(index : any){
    this.config.sortByColumns?.splice(index, 1);
    this.config.sortByColumns = [...this.config.sortByColumns!]
    this.configChange.emit(this.config);
  }

  preview(){this.api.preview(this.dataObj!, this.config)}
  

  getAllColumns(){
    return [
      ... new Set(
        [...this.config.columns,
          ...this.dataObj?.columns!]
      )
    ]
  }
}
