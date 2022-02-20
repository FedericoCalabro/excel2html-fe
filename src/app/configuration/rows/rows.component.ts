import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataObj, Config, RowCriteria } from 'src/app/commons/models';

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
    this.configChange.emit(this.config);
    console.log(this.config.rowCriteria)
    this.config.rowCriteria = [...this.config.rowCriteria!];
  }

  removeCriteria(index : number){
    this.config.rowCriteria?.splice(index,1);
    this.configChange.emit(this.config);
    console.log(this.config.rowCriteria)
    this.config.rowCriteria = [...this.config.rowCriteria!];
  }

}
