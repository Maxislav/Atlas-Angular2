/**
 * Created by maxislav on 25.11.16.
 */
import {Injectable, OnChanges, SimpleChanges} from '@angular/core';
@Injectable()
export class MenuService{
    

    private _menuOpen: boolean;
    private _menuOpenLogin: boolean;


    constructor(){
        this._menuOpen = false
        this._menuOpenLogin = false
    }
    get menuOpen():boolean {
        return this._menuOpen;
    }

    set menuOpen(value:boolean) {
        const click =  onclick.bind(this);
        if(value){
            setTimeout(()=>{
                document.body.addEventListener('click',click)
            },100)
        }else{
            document.body.removeEventListener('click',click);
        }

        function onclick(e){
            document.body.removeEventListener('click',click);
            this.menuOpen = false;
        }
        
        this._menuOpen = value;
    }

    

    get menuOpenLogin():boolean {
        return this._menuOpenLogin;
    }

    set menuOpenLogin(value:boolean) {


        const click =  onclick.bind(this);


        if(value){
            setTimeout(()=>{
                document.body.addEventListener('click',click)
            },100)
        }else{
            document.body.removeEventListener('click', click)
        }

        function onclick(e){
            document.body.removeEventListener('click', click);
            this.menuOpenLogin = false
        }


        this._menuOpenLogin = value;
    }

}