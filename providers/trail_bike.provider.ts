import {Injectable} from '@angular/core';
//import {reorderArray} from 'ionic-angular';
import {Http, Response} from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {URL_TRBK} from '../constants';

//import {ReorderIndexes} from '../types';
import {City} from '../models/locality.model';

import{CITTA} from '../providers/googlemaps.provider';

import { GooglemapsProvider } from '../providers/googlemaps.provider';

//Models
import {Trail} from '../models/trail.model';
//import {City} from '../models/locality.model';

//Constants
//import {URL_BASE_MALAGA, URL, USE_PROXY} from '../constants';

//Types
import {ResponseServer} from '../types';



@Injectable()
export class Trail_bikeProvider {
    private trails: Array<Trail> = null;
    private trailUniversal: Trail;
    //Animation:string= 'assets/icon/bike.png';
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
      this.trails=null;
    }

/*
importare la posizione
metodo che tramite la posizione restituisce l'URL_ENDING
getUrlEnding(posizione){confronta gli url BIKE_STATION.citta = posizione.citta
se sono uguali esce dal ciclo e prende il valore di BIKE_STATION.

}*/


resetTrail(){  this.trails=null;}

//getBikeStation()
getTrailBike(): Promise<Array<Trail>> {
      return new Promise((resolve) => {
          if (this.trails === null) {
              this.trails = [];
            this._http.get(CITTA.url + CITTA.url_trail_bike).toPromise()
                  .then((res: Response) => {

                      const json = res.json() as ResponseServer;

                      if (json.result) {

                        const ntrails = json.result.records;

                          this.getUniversalTrailBike(CITTA).then((Univ) =>{
                          for (let trail of ntrails) {

                                let newtrail =new Trail(trail,Univ);
                                this.trails.push(newtrail);


                                 }
                                 //console.log(this.trails);
                                //this.trails=
                                this.maps.addPolyline(this.trails);

                            });
                          resolve(this.trails);
                        //  console.log(this.trails);

                      } else {
                          resolve(this.trails);
                      }
                  })
                  .catch(() => resolve(this.trails));
          } else {
              resolve(this.trails);
          }
      });
  }


getUniversalTrailBike(city:City): Promise<any>{
      return new Promise((resolve) => {

        this._http.get(URL_TRBK).toPromise()
            .then((res) => {
            this.trailUniversal= null;
              const json = res.json() as ResponseServer;
              if (json.result) {
                const trailsUniversal = json.result;
                  for (let trailUniversal of trailsUniversal) {

                       if(city.name== trailUniversal.name){
                         this.trailUniversal=trailUniversal;
                       }
                    }
               resolve(this.trailUniversal);

              } else {
                resolve(this.trailUniversal);

              }
            })
            .catch(() => resolve(this.trailUniversal)
                );
            });
        }

/*
getMoreTrailBike(i): Promise<Array<Trail>> {
      return new Promise((resolve) => {

              //this.trails = [];

            this._http.get(CITTA.url + CITTA.url_trail_bike + this.n).toPromise()
                  .then((res: Response) => {

                      const json = res.json() as ResponseServer;

                      if (json.result) {
                         this.tot=json.result.total;
                         console.log(this.tot);
                         i=i+100;
                         let offset='&offset=';
                         this.n=offset.concat(JSON.stringify(i));
                         //this.n=JSON.stringify( this.n);
                         console.log(this.n);

                         //const ntrails = json.result.records;
                         this.ntrails = this.ntrails.concat(json.result.records);
                        //  console.log(ntrails);
                          if(this.tot>i){console.log(i);this.getTrailBike(i);}
                          else{
                          this.getUniversalTrailBike(CITTA).then((Univ) =>{
                          for (let trail of this.ntrails) {

                                let newtrail =new Trail(trail,Univ);
                                this.trails.push(newtrail);
console.log(this.ntrails);
                                 }
                                 //console.log(this.trails);
                                this.maps.addPolyline(this.trails);

                            });

                            resolve(this.trails);}

                        //  console.log(this.trails);

                      } else {
                          resolve(this.trails);
                      }
                  })
                  .catch(() => resolve(this.trails));


      });

  }
*/


}
