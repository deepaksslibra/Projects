import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPaletteGridComponent } from './color-palette-grid/color-palette-grid.component';

@NgModule({
  declarations: [AppComponent, ImageUploadComponent, ColorPaletteGridComponent],
  imports: [BrowserModule, NgxFileDropModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
