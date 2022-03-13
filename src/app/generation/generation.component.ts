import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../commons/api.service';
import { Config, FileResponse, GenerationEntity, HtmlObj } from '../commons/models';

@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.scss']
})
export class GenerationComponent implements OnInit {

  generation? : GenerationEntity;
  id?: string;
  loading : boolean = true;

  constructor(
    private api : ApiService,
    private activatedSnap : ActivatedRoute ,
  ) { }

  ngOnInit(): void {
    this.id = this.activatedSnap.snapshot.queryParams['id'];
    
    if(this.id)
      this.api.get(this.id).subscribe(generation => {
        this.generation = generation
        let config : Config = JSON.parse(this.generation.config || '')
        if(config.view === 'PLOT'){
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }else{
          this.loading = false;
        }
      })
  }

  download(what : string) {
    this.api.download(what, this.id!)
  }

}
