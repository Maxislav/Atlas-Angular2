import {Injectable} from "@angular/core";
import {Io} from "./socket.oi.service";
import {LocalStorage} from "./local-storage.service";
import {FriendsService} from "./friends.service";
import {UserService} from "./main.user.service";
import { Device } from '../../types/global';
import { LogService } from './log.service';
//import {Device} from '../../global';

@Injectable()
export class DeviceService {

    private _devices: Array<Device> = [];
    private socket: any;
    public currentChildName: string;

    constructor(private io: Io,
                private ls: LocalStorage,
                private user: UserService,
                private friend: FriendsService,
                private logService: LogService

    ) {
        this.socket = io.socket;
        //this.devices = user.user.devices;

    }

    updateDevices() {
       return this.socket.$emit('getDevice')
            .then(d => {
                if (d && d.result == 'ok') {
                    this.devices = d.devices
                }
                console.log(d);
                return this.devices
            })
            .catch(err => {
                console.log(err)
            })
    }

    onAddDevice(device: Device): Promise<any> {
       return this.socket.$emit('onAddDevice', device)
            .then(d => {
                if (d && d.result == 'ok') {
                    this.updateDevices();
                }
                return d;
            })
    }
    onDelDevice(device: Device){
       return this.socket.$emit('onDelDevice', device)
           .then(d=>{
               if(d.result=='ok'){
                   let index = this.devices.indexOf(device)
                   if(-1<index){
                       this._devices.splice(index,1)
                   }
               }
               return d;
           })
    }
    clearDevices(){
        this._devices.length = 0;
        this.logService.clearDevices();
    }

    onAddDeviceImage(device: Device){
        return this.socket.$get('onAddDeviceImage', {
            deviceKey: device.device_key,
            image: device.image
        })
    }

    get devices(): Array<Device> {
        return this._devices;
    }

    set devices(devices: Array<Device>) {
        this._devices.length = 0;
        devices.forEach(device => {
            this._devices.push(device)
        });
    }


    setCurrentChildName(name){
        this.currentChildName = name
    }


}
