import { Component } from '@angular/core';
import { Nullable, PaletteService } from './palette.service';
import { Observable, filter, map, tap } from 'rxjs';

interface BackgroundImageVM {
  imageUrl: Nullable<string>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'img-to-pastel-palette';
  backgroundImgVM$: Observable<BackgroundImageVM> =
    this.paletteService.imageUrl.pipe(
      map((url) => (url ? { imageUrl: `url(${url})` } : { imageUrl: null })),
      tap(console.log)
    );
  constructor(private paletteService: PaletteService) {}
}
