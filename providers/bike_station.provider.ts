import {Injectable} from '@angular/core';
//import {reorderArray} from 'ionic-angular';
import {Http, Response} from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {URL_OBJSB} from '../constants';

//import {ReorderIndexes} from '../types';
import {City} from '../models/locality.model';

import{CITTA} from '../providers/googlemaps.provider';

import { GooglemapsProvider } from '../providers/googlemaps.provider';

//Models
import {Bike_station} from '../models/bike_station.model';
//import {City} from '../models/locality.model';

//Constants
//import {URL_BASE_MALAGA, URL, USE_PROXY} from '../constants';

//Types
import {ResponseServer} from '../types';



@Injectable()
export class Bike_stationProvider {
    private bikestations: Array<Bike_station> = null;
    private bikestationUniversal: Bike_station;
    Animation:string= 'assets/icon/bike.png';
    //http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/glossy-black-icons-transport-travel/038400-glossy-black-icon-transport-travel-transportation-bicycle.png
    //https://www.spreadshirt.it/image-server/v1/mp/designs/15038297,width=178,height=178/teschio-messicano.png

    constructor(
        private _http: Http,
        public plt: Platform,
        public maps: GooglemapsProvider,

    ) {
        console.log('Hello Bike_station Provider');
        console.log(this.plt.platforms());
        if (this.plt.is('mobile')) {
          console.log('I am an device!' );
          }
      this.bikestations=null;
    }

/*
importare la posizione
metodo che tramite la posizione restituisce l'URL_ENDING
getUrlEnding(posizione){confronta gli url BIKE_STATION.citta = posizione.citta
se sono uguali esce dal ciclo e prende il valore di BIKE_STATION.

}*/


resetbikestation(){  this.bikestations=null;}

//getBikeStation()
getBikeStation(): Promise<Array<Bike_station>> {
      return new Promise((resolve) => {
          if (this.bikestations === null) {
              this.bikestations = [];

            this._http.get(CITTA.url + CITTA.url_bikestation).toPromise()
                  .then((res: Response) => {

                      const json = res.json() //as ResponseServer;

                      if (json.result) {

                        const nbikestations = json.result.records;

                          this.getUniversalBikeStation(CITTA).then((Univ) =>{
                          for (let bikestation of nbikestations) {


                                let newbikestation =new Bike_station(bikestation,Univ);
                                this.bikestations.push(newbikestation);


                                 }
                                 //this.bikestations=
                                 this.maps.addMarkers2(this.bikestations , this.Animation);

                            });
                          resolve(this.bikestations);
                        //  console.log(this.bikestations);

                      } else {
                        const nbikestations = json;

                          this.getUniversalBikeStation(CITTA).then((Univ) =>{
                          for (let bikestation of nbikestations) {


                                let newbikestation =new Bike_station(bikestation,Univ);
                                this.bikestations.push(newbikestation);
                                console.log(newbikestation);

                                 }
                                 //this.bikestations=
                                 this.maps.addMarkers2(this.bikestations , this.Animation);

                            });
                          resolve(this.bikestations);
                      }

                  })
                  .catch(() => resolve(this.bikestations));
          } else {
              resolve(this.bikestations);
          }
      });
  }


getUniversalBikeStation(city:City): Promise<any>{
      return new Promise((resolve) => {

        this._http.get(URL_OBJSB).toPromise()
            .then((res) => {
            this.bikestationUniversal= null;
              const json = res.json() as ResponseServer;
              if (json.result) {
                const bikestationsUniversal = json.result;
                  for (let bikestationUniversal of bikestationsUniversal) {

                       if(city.name== bikestationUniversal.name){
                         this.bikestationUniversal=bikestationUniversal;
                       }
                    }
               resolve(this.bikestationUniversal);

              } else {
                resolve(this.bikestationUniversal);

              }
            })
            .catch(() => resolve(this.bikestationUniversal)
                );
            });
        }


}
