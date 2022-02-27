import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataObj, Config, RowCriteria, AggregationRow, SortingColumn } from 'src/app/commons/models';

@Component({
  selector: 'app-rows',
  templateUrl: './rows.component.html',
  styleUrls: ['./rows.component.scss']
})
export class RowsComponent implements OnInit {

  @Input() dataObj? : DataObj;
  @Input() config! : Config;

  @Output() dataObjChange = new EventEmitter<DataObj>();
  @Output() configChange = new EventEmitter<Config>();
  @Output() indexTo = new EventEmitter<any>();

  constructor() { }

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
    this.config.aggregationRows?.push(new AggregationRow({blockedCol: c0, targetCol: c0, op: 'Sum'}))
    this.config.aggregationRows = [...this.config.aggregationRows!];
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


}
