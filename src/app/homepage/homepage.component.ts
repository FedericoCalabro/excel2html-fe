import { Component, OnInit } from '@angular/core';
import { HtmlObj } from '../commons/models';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  htmlObj? : HtmlObj;

  constructor() { }

  ngOnInit(): void {
  }
}
