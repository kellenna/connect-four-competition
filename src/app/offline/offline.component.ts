import { Component, OnInit } from '@angular/core';
import { StaticDataConnectFourService } from '../core/services/static-data-connect-four.service'

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.css']
})
export class OfflineComponent implements OnInit {
  isExportFinished: boolean = true;

  constructor(private staticDataConnectFourService: StaticDataConnectFourService) { }

  ngOnInit() {
  }

  export() {
    this.isExportFinished = false;
    this.staticDataConnectFourService.export().subscribe(done => this.isExportFinished = done);
  }

  uploadZip(event) {
    let zipFile = event.target.files[0];
    this.staticDataConnectFourService.uploadZip(zipFile);
  }

  reset() {
    this.staticDataConnectFourService.reset();
  }
}
