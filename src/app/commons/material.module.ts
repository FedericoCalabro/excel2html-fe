import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select'
import {MatInputModule} from '@angular/material/input'
import {DragDropModule } from '@angular/cdk/drag-drop'
import {MatTooltipModule} from '@angular/material/tooltip';
import { ColorPickerModule } from 'ngx-color-picker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    NgSelectModule,
    FormsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSelectModule,
    DragDropModule,
    MatTooltipModule,
    ColorPickerModule,
    MatSnackBarModule,
    MatDividerModule
  ]
})
export class MaterialModule { }
