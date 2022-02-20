import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Config, DataObj } from 'src/app/commons/models';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {

  @Input() dataObj? : DataObj;
  @Input() config! : Config;

  @Output() dataObjChange = new EventEmitter<DataObj>();
  @Output() configChange = new EventEmitter<Config>();
  @Output() indexTo = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  selectAll(target : string) {
    if(target === 'columns')
      this.config!.columns = this.dataObj?.columns.map(x => x);
    else if(target === 'linkColumns'){
      this.config.linkColumns = this.dataObj?.columns.map(x => x)
      this.updateLinksCols();
    }
    this.configChange.emit(this.config);
  }

  unselectAll(target : string) {
    if(target === 'columns')
      this.config!.columns = [];
    else if(target === 'linkColumns'){
      this.config.linkColumns = []
      this.updateLinksCols();
    }
    this.configChange.emit(this.config);
  }

  updateLinksCols(){
    this.config.linkNames = [...this.config.linkColumns!];
    this.configChange.emit(this.config);
  }

}
