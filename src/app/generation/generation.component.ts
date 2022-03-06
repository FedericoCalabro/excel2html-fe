import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../commons/api.service';
import { FileResponse, GenerationEntity, HtmlObj } from '../commons/models';

@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.scss']
})
export class GenerationComponent implements OnInit {

  // htmlObj? : HtmlObj;
  generation? : GenerationEntity;
  id?: string;

  constructor(
    private api : ApiService,
    private activatedSnap : ActivatedRoute ,
  ) { }

  ngOnInit(): void {
    this.id = this.activatedSnap.snapshot.queryParams['id'];
    
    // let generation = JSON.parse(sessionStorage.getItem('generationPreview') || '');
    if(this.id)
      this.api.get(this.id).subscribe(generation => this.generation = generation)
  }

  download(what : string) {
    this.api.download(what, this.id!)
  }

}
