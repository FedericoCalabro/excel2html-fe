import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../commons/api.service';
import { DataObj, Config, HtmlObj, Generation, GenerationEntity } from '../commons/models';
import { ColumnsComponent } from './columns/columns.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  dataObj? : DataObj;
  config = new Config({});
  htmlObj? : HtmlObj;
  index : number = 0;

  constructor(
  ) { }

  ngOnInit(): void {}

  tabChange(event : any){
  }

}
