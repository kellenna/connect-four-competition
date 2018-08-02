import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './core/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '4 Gewinnt Wettkampf';
  isOffline = false;

  constructor(private router: Router, private storageService: StorageService) {
  }

  isActive(menu: string): string {
    return menu === this.router.url ? 'active' : '';
  }

  ngOnInit(): void {
    this.isOffline = this.storageService.any();

    this.storageService.watchStorage().subscribe((isOffline:boolean) => {
        this.isOffline = isOffline;
      });    
  }
}
