import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TOOLTIP_DEFINITIONS } from 'src/app/commons/constants';
import { DataObj, Config } from 'src/app/commons/models';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  TOOLTIP_DEFINITION = TOOLTIP_DEFINITIONS;
  
  @Input() dataObj? : DataObj;
  @Input() config! : Config;

  @Output() dataObjChange = new EventEmitter<DataObj>();
  @Output() configChange = new EventEmitter<Config>();
  @Output() viewChange = new EventEmitter<boolean>();
  @Output() indexTo = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
