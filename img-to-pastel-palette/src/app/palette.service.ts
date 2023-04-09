import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Nullable<T> = T | null;

@Injectable({
  providedIn: 'root',
})
export class PaletteService {
  imageUrl: BehaviorSubject<Nullable<string>> = new BehaviorSubject<
    Nullable<string>
  >(null);
  constructor() {}
}
