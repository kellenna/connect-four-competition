import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StorageService {
  private storageSub = new Subject<boolean>();

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next(true);
  }

  any() : boolean {
      return localStorage.length > 0;
  }

  clear() {
      localStorage.clear();
      this.storageSub.next(false);
  }
}