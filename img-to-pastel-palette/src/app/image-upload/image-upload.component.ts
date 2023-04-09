import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { asyncImageValidator } from '../palette.utils';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  form: FormGroup;
  backgroundImageStyle: string | null = null;
  isFormSubmitted: boolean = false;
  validatingImageUrl = false;

  constructor() {
    this.form = new FormGroup({
      imageUrl: new FormControl(null, {
        asyncValidators: [asyncImageValidator],
      }),
    });
  }

  setBackgroundImage() {
    this.backgroundImageStyle = this.form?.value?.imageUrl as string;
  }

  unsetBackgroundImage() {
    this.backgroundImageStyle = null;
  }

  submitForm() {
    this.setBackgroundImage();
  }

  ngOnInit(): void {
    this.form.controls['imageUrl'].statusChanges.subscribe((status) => {
      this.validatingImageUrl = status === 'PENDING';
      if (status === 'VALID') {
        this.setBackgroundImage();
      } else {
        this.unsetBackgroundImage();
      }
    });
  }
}
