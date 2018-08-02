import { Injectable } from '@angular/core';
import { StaticDataConnectFourService } from './static-data-connect-four.service'
import { ConnectFourService } from './connect-four.service'
import { IConnectFourService } from './iconnect-four.service';
import { StorageService } from './storage.service';

@Injectable()
export class ConnectFourServiceFactory {
  
    constructor(private connectFourService: ConnectFourService, private staticDataConnectFourService: StaticDataConnectFourService, private storageService: StorageService){ }

    getService(): IConnectFourService {
        if(this.storageService.any()) {
            return this.staticDataConnectFourService;
        }
        return this.connectFourService;
    }
}