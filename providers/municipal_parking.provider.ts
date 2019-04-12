import {Injectable} from '@angular/core';
//import {reorderArray} from 'ionic-angular';
import {Http, Response} from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {URL_OBJMP} from '../constants';

//import {ReorderIndexes} from '../types';
import {City} from '../models/locality.model';

import{CITTA} from '../providers/googlemaps.provider';

import { GooglemapsProvider } from '../providers/googlemaps.provider';

//Models
import {Municipal_parking} from '../models/municipal_parking.model';
//import {City} from '../models/locality.model';

//Constants
//import {URL_BASE_MALAGA, URL, USE_PROXY} from '../constants';

//Types
import {ResponseServer} from '../types';



@Injectable()
export class Municipal_parkingProvider {
    private parkingmunicipal: Array<Municipal_parking> = null;
    private parkingmunicipalUniversal: Municipal_parking;
    Animation:string= 'assets/icon/parking.png';
    //https://www.spreadshirt.it/image-server/v1/mp/designs/15038297,width=178,height=178/teschio-messicano.png
  //https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png

    constructor(
        private _http: Http,
        public plt: Platform,
        public maps: GooglemapsProvider,

    ) {
        console.log('Hello Municipal_parking Provider');
        console.log(this.plt.platforms());
        if (this.plt.is('mobile')) {
          console.log('I am an device!' );
          }
      this.parkingmunicipal=null;
    }

/*
importare la posizione
metodo che tramite la posizione restituisce l'URL_ENDING
getUrlEnding(posizione){confronta gli url BIKE_STATION.citta = posizione.citta
se sono uguali esce dal ciclo e prende il valore di BIKE_STATION.

}*/


resetMunicipalParking(){  this.parkingmunicipal=null;}

//getBikeStation()
//Málaga
//Lecce
getMunicipalParking(): Promise<Array<Municipal_parking>> {
      return new Promise((resolve) => {
          if (this.parkingmunicipal === null) {
              this.parkingmunicipal = [];
            this._http.get(CITTA.url + CITTA.url_municipalparking).toPromise()
                  .then((res: Response) => {
                      const json = res.json();
                    //  console.log(json);
                         //if json.result--->normale
                         //if json.features.geometry--->add marker, addPolygon, addPolyline
                      if (json.result) {
                        const nparkingmunicipal = json.result.records;
                          this.getUniversalMunicipalParking(CITTA).then((Univ) =>{
                          for (let parkingmunicipal of nparkingmunicipal) {
                                let newparkingmunicipal =new Municipal_parking(parkingmunicipal,Univ);
                                this.parkingmunicipal.push(newparkingmunicipal);
                                 console.log(newparkingmunicipal.lat);

                                 }
                              //  this.parkingmunicipal=
                                this.maps.addMarkers2(this.parkingmunicipal , this.Animation);
                            });
                          resolve(this.parkingmunicipal);
                        //  console.log(this.parkingmunicipal);
                      }


                                                               if(json.features) {
                                                                 console.log("sono entrato");
                                                                 const nparkingmunicipal = json.features;
                                                                 let polyline=[];
                                                                 let point=[];
                                                                 let polygon= [];
                                                                 for (let parkingmunicipal of nparkingmunicipal) {
                                                                 console.log(parkingmunicipal);
                                                                   let type=parkingmunicipal.geometry.type;

                                                          //         console.log(parkingmunicipal.geometry.coordinates);
                                                            //       console.log(type);
                                                                  if(type=="Polygon"){
                                                                   let array_track={array_track: []};
                                                                   let pol=parkingmunicipal.geometry.coordinates[0];
                                                                   console.log(pol);
                                                                   for(let instance  of pol){
                                                                     let lon=instance[0];
                                                                     let lat=instance[1];
                                                                     let location={lat:lat,lng: lon};
                                                                       array_track.array_track.push(location);
                                                                        }
                                                                       polygon.push(array_track);
                                                                    }
                                                                   if(type=="Point"){

                                                                     let lon=parkingmunicipal.geometry.coordinates[0];
                                                                     let lat=parkingmunicipal.geometry.coordinates[1];
                                                                     let location={lat:lat,lon: lon};
                                                                     point.push(location);

                                                                   }
                                                                   if(type=="Polyline"){polyline.push(parkingmunicipal.geometry.coordinates);}
                                                                        }
                                                                    //   this.maps.addMarkers2(this.parkingmunicipal , this.Animation);
                                                                    console.log(polygon);
                                                                    this.maps.addPolygon(polygon);
                                                                    console.log("finish polygon");
                                                                    //console.log(point);
                                                                    this.maps.addMarkers2(point , this.Animation);
                                                                    console.log(polyline);

                                                                 resolve(this.parkingmunicipal);
                                                               //  console.log(this.parkingmunicipal);

                                                                     }
                                                                     

                  })
                  .catch(() => resolve(this.parkingmunicipal));
          } else {
              resolve(this.parkingmunicipal);
          }
      });
  }


getUniversalMunicipalParking(city:City): Promise<any>{
      return new Promise((resolve) => {

        this._http.get(URL_OBJMP).toPromise()
            .then((res) => {
            this.parkingmunicipalUniversal= null;
              const json = res.json() as ResponseServer;
              if (json.result) {
                const parkingmunicipalsUniversal = json.result;
                  for (let parkingmunicipalUniversal of parkingmunicipalsUniversal) {

                       if(city.name== parkingmunicipalUniversal.name){
                         this.parkingmunicipalUniversal=parkingmunicipalUniversal;
                       }
                    }
               resolve(this.parkingmunicipalUniversal);

              } else {
                resolve(this.parkingmunicipalUniversal);

              }
            })
            .catch(() => resolve(this.parkingmunicipalUniversal)
                );
            });
        }


}
