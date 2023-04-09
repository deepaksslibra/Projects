import { AbstractControl, ValidationErrors } from '@angular/forms';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  take,
} from 'rxjs';

function imageExists(url: string): Observable<boolean> {
  return new Observable((observer) => {
    try {
      const img = new Image();
      img.onload = () => {
        observer.next(true);
        observer.complete();
      };
      img.onerror = () => {
        observer.next(false);
        observer.complete();
      };
      img.src = url;
    } catch (error) {
      observer.error(error);
    }
  });
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function asyncImageValidator(
  control: AbstractControl
): Observable<{ [key: string]: any } | null> {
  return control.valueChanges.pipe(
    debounceTime(1000),
    distinctUntilChanged(),
    switchMap((value) => {
      if (!isValidUrl(value)) {
        return of({ invalidUrl: true });
      }
      return imageExists(value).pipe(
        map((exists) => {
          return exists ? null : { invalidImage: true };
        }),
        catchError((error) => {
          return of({ invalidImage: true });
        })
      );
    }),
    take(1)
  );
}
