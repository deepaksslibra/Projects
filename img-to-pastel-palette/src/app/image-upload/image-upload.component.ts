import { Component } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent {
  imageUrl: string | undefined;
  file: { preview: string } | undefined;

  onFileDropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.file = {
            preview: URL.createObjectURL(file),
          };
          // Clear the imageUrl if it was set previously
          this.imageUrl = undefined;
        });
      }
    }
  }
}
