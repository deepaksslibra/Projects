import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Vibrant from 'node-vibrant';
import { PaletteService } from '../palette.service';
import { map, from, tap, filter, switchMap, delay } from 'rxjs';
import { toPastelColor } from '../palette.utils';

@Component({
  selector: 'app-color-palette-grid',
  templateUrl: './color-palette-grid.component.html',
  styleUrls: ['./color-palette-grid.component.scss'],
})
export class ColorPaletteGridComponent implements OnInit {
  loading = false;
  palette$ = this.paletteService.imageUrl.pipe(
    filter((imageUrl) => Boolean(imageUrl)),
    tap((_) => {
      this.loading = true;
    }),
    switchMap((imageUrl) => {
      const vibrantUrl = 'https://cors-anywhere.herokuapp.com/' + imageUrl;
      return from(Vibrant.from(vibrantUrl).getPalette());
    }),
    map((palette) => {
      return Object.entries(palette).map((paletteKey) =>
        toPastelColor(paletteKey[1]?.getHex() ?? '')
      );
    }),
    tap((_) => {
      this.loading = false;
      this.cdRef.detectChanges();
    })
  );

  constructor(
    private paletteService: PaletteService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.palette$.subscribe();
  }
}
