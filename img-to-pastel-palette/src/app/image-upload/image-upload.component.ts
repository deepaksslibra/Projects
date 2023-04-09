import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { asyncImageValidator } from '../palette.utils';
import { PaletteService } from '../palette.service';

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

  constructor(private paletteService: PaletteService) {
    this.form = new FormGroup({
      imageUrl: new FormControl(null, {
        asyncValidators: [asyncImageValidator],
      }),
    });
  }

  private _onFormValid() {
    this.paletteService.imageUrl.next(this.form.get('imageUrl')?.value);
  }

  private _onFormInvalid() {
    this.paletteService.imageUrl.next(null);
  }

  randomizeImage() {
    this.form
      .get('imageUrl')
      ?.setValue(
        `https://source.unsplash.com/random/&${
          Math.floor(Math.random() * 100) + 1
        }`
      );
  }

  ngOnInit(): void {
    this.form.controls['imageUrl'].statusChanges.subscribe((status) => {
      this.validatingImageUrl = status === 'PENDING';
      if (status === 'VALID') {
        this._onFormValid();
      } else {
        this._onFormInvalid();
      }
    });
  }
}
