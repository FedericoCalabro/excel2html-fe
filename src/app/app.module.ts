import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { HomepageComponent } from './homepage/homepage.component';
import { MaterialModule } from './commons/material.module';
import { ReadexcelDirective } from './commons/readexcel.directive';
import { SafeHtmlPipePipe } from './commons/safe-html-pipe.pipe';
import { ConfigurationComponent } from './configuration/configuration.component';
import { UploadComponent } from './configuration/upload/upload.component';
import { ColumnsComponent } from './configuration/columns/columns.component';
import { RowsComponent } from './configuration/rows/rows.component';
import { GraphicsComponent } from './configuration/graphics/graphics.component';
import { GenerationComponent } from './generation/generation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroBannerComponent,
    HomepageComponent,
    ReadexcelDirective,
    SafeHtmlPipePipe,
    ConfigurationComponent,
    UploadComponent,
    ColumnsComponent,
    RowsComponent,
    GraphicsComponent,
    GenerationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
