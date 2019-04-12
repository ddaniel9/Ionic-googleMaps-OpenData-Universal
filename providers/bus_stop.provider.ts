import {Injectable} from '@angular/core';
//import {reorderArray} from 'ionic-angular';
import {Http, Response} from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {URL_BUSTOP} from '../constants';

//import {ReorderIndexes} from '../types';
import {City} from '../models/locality.model';

import{CITTA} from '../providers/googlemaps.provider';

import { GooglemapsProvider } from '../providers/googlemaps.provider';

//Models
import {Bus_stop} from '../models/bus_stop.model';
//import {City} from '../models/locality.model';

//Constants
//import {URL_BASE_MALAGA, URL, USE_PROXY} from '../constants';

//Types
import {ResponseServer} from '../types';



@Injectable()
export class Bus_stopProvider {
    private bustops: Array<Bus_stop> = null;
    private bustopUniversal: Bus_stop;
    Animation:string= 'assets/icon/bustop.png';
    //http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/glossy-black-icons-transport-travel/038400-glossy-black-icon-transport-travel-transportation-bicycle.png
    //https://www.spreadshirt.it/image-server/v1/mp/designs/15038297,width=178,height=178/teschio-messicano.png

    constructor(
        private _http: Http,
        public plt: Platform,
        public maps: GooglemapsProvider,

    ) {
        console.log('Hello Bus_stop Provider');
        console.log(this.plt.platforms());
        if (this.plt.is('mobile')) {
          console.log('I am an device!' );
          }
      this.bustops=null;
    }

/*
importare la posizione
metodo che tramite la posizione restituisce l'URL_ENDING
getUrlEnding(posizione){confronta gli url BIKE_STATION.citta = posizione.citta
se sono uguali esce dal ciclo e prende il valore di BIKE_STATION.

}*/


resetbustop(){  this.bustops=null;}

//getbustop()
getBusStop(): Promise<Array<Bus_stop>> {
      return new Promise((resolve) => {
          if (this.bustops === null) {
              this.bustops = [];
              this._http.get(CITTA.url + CITTA.url_bus_stop).toPromise()
                  .then((res: Response) => {

                      const json = res.json() as ResponseServer;

                      if (json.result) {

                        const nbustops = json.result.records;

                          this.getUniversalBusStop(CITTA).then((Univ) =>{
                          for (let bustop of nbustops) {


                                let newbustop =new Bus_stop(bustop,Univ);
                                this.bustops.push(newbustop);


                                 }
                                 //this.maps.addMarkerArrayCluster(this.bustops , this.Animation);
                                // this.bustops=
                                 this.maps.addMarkers2(this.bustops , this.Animation);

                            });
                          resolve(this.bustops);
                        //  console.log(this.bustops);

                      } else {
                          resolve(this.bustops);
                      }
                  })
                  .catch(() => resolve(this.bustops));
          } else {
              resolve(this.bustops);
          }
      });
  }


getUniversalBusStop(city:City): Promise<any>{
      return new Promise((resolve) => {

        this._http.get(URL_BUSTOP).toPromise()
            .then((res) => {
            this.bustopUniversal= null;
              const json = res.json() as ResponseServer;
              if (json.result) {
                const bustopsUniversal = json.result;
                  for (let bustopUniversal of bustopsUniversal) {

                       if(city.name== bustopUniversal.name){
                         this.bustopUniversal=bustopUniversal;
                       }
                    }
               resolve(this.bustopUniversal);

              } else {
                resolve(this.bustopUniversal);

              }
            })
            .catch(() => resolve(this.bustopUniversal)
                );
            });
        }


}
