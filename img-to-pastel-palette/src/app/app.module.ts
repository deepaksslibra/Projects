import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ImageUploadComponent],
  imports: [BrowserModule, NgxFileDropModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
