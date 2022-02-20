import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/commons/api.service';
import { DataObj, Config, Generation, GenerationEntity } from 'src/app/commons/models';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit {

  @Input() dataObj? : DataObj;
  @Input() config! : Config;

  @Output() dataObjChange = new EventEmitter<DataObj>();
  @Output() configChange = new EventEmitter<Config>();

  constructor(
    private api : ApiService
  ) { }

  ngOnInit(): void {
  }

  // preview() {
  //   let generation: Generation = new Generation({ data: this.dataObj!.data, config: this.config });
  //   this.api.generate(generation).subscribe((res: FileResponse) => {
  //     this.htmlObj = new HtmlObj({res: res})
  //     ApiService.generatePreview(res).then(html => {
  //       this.htmlObj!.preview = html;
  //       sessionStorage.setItem('temp_preview', JSON.stringify(html))
  //       this.htmlObjChange.emit(this.htmlObj);
  //       window.open("/generation?id=temp_preview", "_blank")
  //     });
  //   })
  // }

  preview(){
    let generation: Generation = new Generation({ data: this.dataObj!.data, config: this.config });
    this.api.generate(generation).subscribe((entity : GenerationEntity) => {
        window.open(`/generation?id=${entity.id}`, '_blank')
    })
  }

}
