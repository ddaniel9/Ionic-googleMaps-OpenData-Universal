import { Component } from '@angular/core';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker,
 Spherical,
 CircleOptions,
 Circle
} from '@ionic-native/google-maps';
import { AlertController,App } from 'ionic-angular';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Injectable, NgZone} from '@angular/core';
import { ConnectivityProvider } from './connectivity/connectivity';
import { Http } from '@angular/http';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
export var CITTA;
import { URL_DATA } from '../constants';
import { City } from '../models/locality.model';
import { ResponseServer } from '../types';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/filter';

declare var google;


@Injectable()
export class GooglemapsProvider {

   map: GoogleMap;
   mapElement: any;
   pleaseConnect: any;
   off=true;
   mapInitialised: boolean = false;
   mapLoaded: any;
   mapLoadedObserver: any;
   markers: any = [];
   marker:any;
   marker2:any;
   apiKey: string ;
   icon:any;
   myposition:any;
  public lat:any;
   lon:any;
   watch: any;
   city: City;
   Arraypoints: any= [];
   polyline:any=[];
   polygon:any=[];
   cluster:any=[];
   circle:Circle;
   circle2:Circle;
   radius:number=200;
   location2:any;
   directionsService = new google.maps.DirectionsService;
   directionsDisplay = new google.maps.DirectionsRenderer;
   polylineTravel:any=undefined;


  constructor(
    public connectivityService: ConnectivityProvider,
    public geolocation: Geolocation,
    public backgroundGeolocation:BackgroundGeolocation,
    public nativeGeocoder: NativeGeocoder,
    public _http: Http,
    public zone: NgZone,
    public alertCtrl: AlertController,
    public spherical: Spherical,
    private app: App
   ) {
      console.log("Hello GoogleMapsProvider");

  }

  getURLCity(): Promise<City> {
        return new Promise((resolve) => {

                this._http.get(URL_DATA).toPromise()
                    .then((res) => {
                      const json = res.json() as ResponseServer;
                      if (json.result) {
                        //const nbikestations = json.data;
                        const citys = json.result;
                        this.nativeGeocoder.reverseGeocode(this.lat, this.lon).then((result: NativeGeocoderReverseResult) =>{
                          const pos=result.locality;//JSON.stringify(result.locality);
                          console.log(result);
                          for (let city of citys) {
                            console.log(city.name);
                             if(city.name== pos){
                               this.city=city;
                               CITTA=this.city as City;
                               CITTA as City;
                               CITTA.countryCode=result.countryCode;
                               console.log(CITTA);
                             }
                            }
                             resolve(this.city);
                        }).catch((error: any) => console.log(error));
                         resolve(this.city);

                        } else {
                            resolve(this.city);
                        }
                    })
                    .catch(() => resolve(this.city)
                  );

              });
          }

  init(mapElement: any, pleaseConnect: any): Promise<any> {
//let element: HTMLElement = document.getElementById('map_canvas');//this.mapElement=element
                this.mapElement = mapElement;
                this.pleaseConnect = pleaseConnect;

                return this.loadGoogleMaps();

              }

  initMap(): Promise<any> {

                  return new Promise((resolve) => {

                    this.mapInitialised = true;

                  //  this.lat=46.0697164;//46.0697164,11.1188834  Trento
                //    this.lon=11.1188834;//36.711807,-4.4546  Malaga
                    this.lat=36.711807;
                    this.lon=-4.4546;

                      let mapOptions: GoogleMapOptions = {
                        camera: {
                          target: {
                            lat:   this.lat,
                            lng: this.lon
                          },
                          //zoom: 18,
                          tilt: 30
                        }
                      };
                      console.log("Inizializzo la mappa");
                      this.map = GoogleMaps.create(this.mapElement, mapOptions);
                      this.mapInitialised = true;

                      console.log("mappa creata");
                      console.log(this.map);
                      resolve(true);
                      this.enableMap();
                      console.log(this.addMarker(this.lat,this.lon));
                       let location={lat: this.lat,lng: this.lon};
                       this.addCircle(location);
                       this.addMarkerCircleTouch();
                       //this.directionsDisplay.setMap(this.map);


                    //  this.addMarker(36.711807, -4.4546,'default red');


            });

          }




  loadGoogleMaps(): Promise<any> {

            return new Promise((resolve) => {

                        this.disableMap();

                        if(this.connectivityService.isOnline()){
                          console.log(this.connectivityService.isOnline());
                          this.initMap();
                        }
                        else {
                          console.log("offiline");
                          this.disableMap();
                        }

                        this.addConnectivityListeners();

            });

  }


  disableMap(): void {

            if(this.pleaseConnect){
              console.log("disable");
              this.pleaseConnect.style.display = "block";
              this.mapElement.style.display = "none";
            }
          }

  enableMap(): void {

              if(this.pleaseConnect){
                this.pleaseConnect.style.display = "none";
                this.mapElement.style.display = "block";
              }
            }

  addConnectivityListeners(): void {

                    document.addEventListener('online', () => {

                      console.log("online");

                      setTimeout(() => {

                                if(!this.mapInitialised){
                                  this.loadGoogleMaps();
                                }

                                this.enableMap();


                            }, 2000);

                          }, false);

                    document.addEventListener('offline', () => {

                              console.log("offline");

                              this.disableMap();

                          }, false);

    }

    stopTracking() {

                  console.log('stopTracking');

                  this.backgroundGeolocation.finish();
                  this.watch.unsubscribe();

                }
getRadiusCircle(){return this.radius;}

setRadiusCircle(n){
  this.radius=n;
  this.circle.setRadius(n);
  if(this.circle2){
  this.circle2.setRadius(n);
   }
}
  addCircle(latlon){
              this.map.one(GoogleMapsEvent.MAP_READY)
                .then(() => {
              let circleoptions: CircleOptions = {
                center: latlon,
                radius: this.radius,
                fillColor:'#98FF98',
                visible: true,
                animation: 'DROP',
                strokeWidth:1
              };
              this.map.addCircle(circleoptions).then(circle => {
                this.circle= circle;
                console.log(circle);
              });
                });
            }


  addPolygon(someArray){
    this.removePolygon();

    for (let entry of someArray){
  console.log(entry.array_track);
                      this.map.addPolygon({
                            points: entry.array_track,
                            strokeColor : '#007FFF',
                            fillColor: 'transparent' ,
                            strokeWidth: 2,
                            geodesic: false
                          }).then(polygon=>this.polygon.push(polygon));
      }
   }


  addPolyline(someArray){
    this.removePolyline();
    //calcola la distanza in metri
  //  console.log(Spherical.computeDistanceBetween(someArray[31].array_track[0],someArray[31].array_track[9]));
    for (let entry of someArray){
  //console.log(entry.array_track);

                                this.map.addPolyline({
                                      points: entry.array_track,
                                      'color' : '#FFFF00',
                                      'width': 2,
                                      'geodesic': false
                                    }).then(polyline=>this.polyline.push(polyline));
      }
      //return this.polyline;
   }



  removePolylineTravel():Promise<any>{
    return new Promise((resolve) => {
      if(this.polylineTravel !== undefined){
           this.polylineTravel.remove();
         }
          this.polylineTravel=undefined;
           resolve(true);
    });
  }

  calculateRoute(value){
    let path:any;
    this.polylineTravel=[];
    let location={lat: this.lat,lng: this.lon};
    if(!this.location2){this.location2=location}
     this.directionsService.route({
           origin: location,
           destination: this.location2,
           travelMode: value,
         }, (response, status) => {
           if (status === 'OK') {
             console.log(response);
             let path =response.routes[0].overview_path;
             let array_track=[];
             for(var i = 0; i < path.length; i++){

               let location={ lat:path[i].lat(),lng:path[i].lng() };
               console.log(location);
               array_track.push(location);
             }
             this.map.addPolyline({
                   points: array_track,
                   'color' : '#007FFF',
                   'width': 2,
                   'geodesic': false
                 }).then(polyline=>this.polylineTravel=polyline);
           } else {
             window.alert('Directions request failed due to ' + status);
           }
         });


   }

search(address){
  this.nativeGeocoder.forwardGeocode(address)
  .then((coordinates: NativeGeocoderForwardResult) =>{
   this.MarkerCircle(coordinates.latitude,coordinates.longitude);})
  .catch((error: any) => console.log(error));
}

MarkerCircle(lat, lng){
  this.location2={lat: eval(lat),lng: eval(lng)};
  console.log(this.location2);
      if(this.marker2==undefined){
          this.map.addMarker({
                title: 'Ionic',
                visible: true,
                animation: 'DROP',
                position: {
                  lat:  lat,
                  lng:  lng
                }
              }).then(marker => {
                    this.marker2=marker;console.log(marker);
                    //this.addCircle(point);
                  });
       }else{
         this.marker2.setPosition(this.location2);
       }
       if(this.circle2==undefined){
         let circleoptions: CircleOptions = {
           center: this.location2,
           radius: this.radius,
           fillColor:'#98FF98',
           visible: true,
           animation: 'DROP',
           strokeWidth:1
         };
             this.map.addCircle(circleoptions).then(circle => {
                     this.circle2=circle;
                     console.log(circle);
                     circle.on(GoogleMapsEvent.CIRCLE_CLICK)
                       .subscribe(() => {
                         this.circle2.remove();
                         this.circle2=undefined;
                         this.marker2.destroy();
                         this.marker2=undefined;
                         this.location2=undefined;
                         console.log("touch circle");
                         this.removePolylineTravel();
                         this.clear();
                    });
              });
        }else{
          this.circle2.setCenter(this.location2);
          this.removePolylineTravel();
          this.clear();
        }


}

addMarkerCircleTouch(){
          this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => {

                this.map.on(GoogleMapsEvent.MAP_CLICK)
                       .subscribe((data) => {
                         console.log("Click MAP");
                                   let point=JSON.parse(data);
                                   this.MarkerCircle(point.lat, point.lng);
                                  // this.map.fromPointToLatLng().then(latlon => {  console.log(latlon);});
                          });

                });
    }


  addMarker(lat,lon){

            this.map.one(GoogleMapsEvent.MAP_READY)
              .then(() => {
                console.log('Map is ready!');
                this.icon=null;
                this.icon= 'assets/icon/m1.png';

                // Now you can use all methods safely.

                  this.map.addMarker({
                        title: 'Ionic',
                        icon: {
                              url: this.icon,
                              size: {
                                width: 30,
                                height: 30
                                 }
                             },
                        visible: false,
                        animation: 'DROP',
                        position: {
                          lat:  lat,
                          lng: lon
                        }
                      })
                      .then(marker => {
                        marker.setVisible(false);
                        //marker.setVisible(true);
                        console.log(marker);
                        this.marker=marker;
                        console.log(this.marker);
                        let location={lat: this.lat,lng: this.lon}
                        this.map.setCameraTarget(location);
                        marker.on(GoogleMapsEvent.MARKER_CLICK)
                          .subscribe(() => {
                            alert('clicked');
                          });

                      });

                  });

  }

insideCircle(latlon){
        let location={lat: this.lat,lng: this.lon}
        let insideCircle=Spherical.computeDistanceBetween(latlon,location);
                if(insideCircle < this.radius){
                  return true;
                }else{return false;}
}
insideCircle2(latlon){
      if(this.location2!==undefined){
        let insideCircle=Spherical.computeDistanceBetween(latlon,this.location2);
                if(insideCircle < this.radius){
                  return true;
                }else{return false;}
          }else{return false;}
}
addMarkers2(someArray, icon){

  this.icon=null;
  this.icon=icon;
  let markerOptions: MarkerOptions = {
    icon: {
          url: this.icon,
          size: {
            width: 30,
            height: 30
             }
         },
    visible: true,
    animation: 'DROP'
  };

  for (let entry of someArray){
          //let stringa=entry.toString();
          let location={lat: entry.lat,lng: entry.lon};
          //let marker= new Marker(this.map,markerOptions);
        if(this.insideCircle(location) || this.insideCircle2(location))  {

          this.map.addMarker(markerOptions)
          .then(marker => {
            marker.setPosition(location);
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {


                             this.app.getActiveNavs().slice(-1)[0].push('InfoPage',entry);

              });
            this.markers.push(marker);
          });
        }
  }
}


clear():Promise<any>{

return new Promise((resolve) => {
        console.log("clear");
        console.log(this.markers);
        this.removePolyline();
        this.deleteMarkers();
        this.removePolygon();
       resolve(true);
});


}

 removePolygon(){
         if(this.polygon){
         for (var i = 0; i < this.polygon.length; i++) {
           this.polygon[i].remove();
         }
         this.polygon = [];
       }

 }


  removePolyline(){
            if(this.polyline){
            for (var i = 0; i < this.polyline.length; i++) {
              this.polyline[i].remove();
            }
            this.polyline = [];
          }
      }

  deleteMarkers() {
                if(this.markers){

                for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].destroy();

                }
                this.markers = [];
                 }

              }


  startTracking() {

                  // Background Tracking

                  let config = {
                    desiredAccuracy: 0,
                    stationaryRadius: 20,
                    distanceFilter: 10,
                    debug: true,
                    interval: 2000
                  };

                  this.backgroundGeolocation.configure(config).subscribe((location) => {

                            console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

                            // Run update inside of Angular's zone
                            this.zone.run(() => {
                              this.lat = location.latitude;
                              this.lon = location.longitude;
                            //  console.log(this.marker);//undefined
                            //  this.marker.setPosition(location);

                            });

                          }, (err) => {

                            console.log(err);

                          });

                  // Turn ON the background-geolocation system.
                //  this.backgroundGeolocation.start();


                  // Foreground Tracking

                let options = {
                  frequency: 3000,
                  enableHighAccuracy: true
                };

                this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

                  console.log(position);
                  // Run update inside of Angular's zone
                          this.zone.run(() => {
                            this.lat = position.coords.latitude;
                            this.lon = position.coords.longitude;
                            let mapOptions: GoogleMapOptions = {
                              camera: {
                                target: {
                                  lat:   this.lat,//position.coords.latitude,
                                  lng: this.lon//position.coords.longitude
                                },
                                zoom: 18,
                                tilt: 30
                              }
                            };
                           if(this.marker!==undefined && this.circle!== undefined){
                           let location={lat: this.lat,lng: this.lon}
                           this.marker.setPosition(location);
                           this.circle.setCenter(location);
                           console.log(this.marker);



                           if(this.off){
                             this.map.animateCamera({
                                   target: location,
                                   zoom: 18
                                 });
                                 this.getURLCity();
                             // this.map.moveCamera({
                            //        target: location
                            //      });
                              //this.map.setCameraTarget(location);
                              //animateCameraZoomIn() forever promise
                              //this.map.setCameraZoom(18);

                              console.log(this.off);
                              this.marker.setVisible(true);
                              this.off=false;
                           }
                         }

                       });
                });
       }



}
