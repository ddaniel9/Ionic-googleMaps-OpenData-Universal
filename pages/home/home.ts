import { Component,ElementRef, ViewChild,NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import {GooglemapsProvider,CITTA} from '../../providers/googlemaps.provider';
import { IonicPage, NavController, Platform, NavParams,ViewController } from 'ionic-angular';

import {Bike_station} from '../../models/bike_station.model';
import {Bus_stop} from '../../models/bus_stop.model';
import {Trail} from '../../models/trail.model';
import {Municipal_parking} from '../../models/municipal_parking.model';

import {Bus_stopProvider} from '../../providers/bus_stop.provider';
import {Trail_bikeProvider} from '../../providers/trail_bike.provider';
import {Bike_stationProvider} from '../../providers/bike_station.provider';
import {Municipal_parkingProvider} from '../../providers/municipal_parking.provider';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 @ViewChild('map_canvas') mapElement: ElementRef;
 @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
    bikestations: Array<Bike_station>= null;
    municipalParking: Array<Municipal_parking>= null;
    trailsbike: Array<Trail>= null;
    bustop: Array<Bus_stop>=null;
  //  searchQuery: string = '';
  //  items: string[];
  //  myInput:string;
    //styleElemList=document.getElementsByTagName('input');
    autocompleteItems:any;
    autocomplete:any;
    service:any;
    geo: any;
    value:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
     public maps: GooglemapsProvider,
     private geolocation: Geolocation,
     public Sbikestation:Bike_stationProvider,
     public StrailBike:Trail_bikeProvider,
     public SmunicipalParking:Municipal_parkingProvider,
     public Sbustop:Bus_stopProvider,
     public platform: Platform,
     public viewCtrl: ViewController,
     private zone: NgZone
     ) {
         this.service = new google.maps.places.AutocompleteService();
         this.autocompleteItems = [];
         this.autocomplete = {
      query: ''
    };
  }

  dismiss() {
        // this.viewCtrl.dismiss();
  }

  trail(){
    let styleElem=document.getElementById('trail').style.visibility;
    if(styleElem=='visible'){document.getElementById('trail').style.visibility= 'hidden';}
    else{document.getElementById('trail').style.visibility = 'visible';}

    let styleElem2=document.getElementById('search').style.visibility;
    if(styleElem2=='visible'){document.getElementById('search').style.visibility= 'hidden';}

  }

  calculateRoute(value){
    //value= JSON.stringify(value);
    this.maps.removePolylineTravel().then(() => {
    this.maps.calculateRoute(value);
  });
    console.log(value);
  }


  chooseItem(item: any) {
        //this.viewCtrl.dismiss(item);
        this.search();
        this.geo = item;
        console.log(this.geo);
        this.maps.search(this.geo);
  //  this.geoCode(this.geo);//convert Address to lat and long
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({
       input: this.autocomplete.query,
        componentRestrictions: {country: CITTA.countryCode} },
        function (predictions, status) {
              me.autocompleteItems = [];
              me.zone.run(function () {
                predictions.forEach(function (prediction) {
                  console.log(prediction);
                  me.autocompleteItems.push(prediction.description);
                       });
                   });
               });
    }

    search(){
      //disabilitare la mappa this.maps.disable  / enable?
     let styleElem=document.getElementById('search').style.visibility;
     if(styleElem=='visible'){document.getElementById('search').style.visibility= 'hidden';}
     else{document.getElementById('search').style.visibility = 'visible';}
     let styleElemList=document.getElementById('list').style.visibility;
     if(styleElemList=='visible'){document.getElementById('list').style.visibility= 'hidden';}
     else{document.getElementById('list').style.visibility = 'visible';}

     let styleElem2=document.getElementById('trail').style.visibility;
     if(styleElem2=='visible'){document.getElementById('trail').style.visibility= 'hidden';}

    }



/*  initializeItems() {
      this.items = [
        'Amsterdam',
        'Bogota'
      ];
    }

    getItems(ev: any) {
      // Reset items back to all of the items
      this.initializeItems();

console.log(this.styleElemList);
      // set val to the value of the searchbar
      //let val = ev.target.value;
      let autocomplete = new google.maps.places.Autocomplete(this.styleElemList,{});
console.log(google.maps);
      console.log(autocomplete);
      var place = autocomplete.getPlace();
      console.log(place);
      // if the value is an empty string don't filter the items
    /*  if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }

    upsearchbar(item){
      //forzare la chiusura della tastiera
        this.myInput=item;
        let styleElemList=document.getElementById('list').style.visibility;
        document.getElementById('list').style.visibility= 'hidden';

    }*/


  ionViewDidLoad(){

    this.platform.ready().then(() => {
        this.maps.startTracking();
        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);

          this.maps.getURLCity();
        //encodePath(path)   or Polyline
    });
  }



  changePage(){
    this.navCtrl.push('SettingPage');
  }

  getAll(){
    this.maps.clear().then(() => {
    this.getMunicipalParking();
    this.getBusStop();
    this.getTrailBike();
    this.getStationBike();
      });
  }



  getMunicipalParking()
  {
      this.SmunicipalParking.resetMunicipalParking();
      this.SmunicipalParking.getMunicipalParking()
      .then(municipalparking =>{
        this.municipalParking = municipalparking;
        console.log(municipalparking);
      })
  }

  getBusStop()
  {
     this.Sbustop.resetbustop();
     this.Sbustop.getBusStop()
     .then(bustop => {
       this.bustop= bustop;
       console.log(bustop);
     });
  }


  getTrailBike()
  {
    this.trailsbike=[];
    this.StrailBike.resetTrail();
    this.StrailBike.getTrailBike()
      .then(trails => {

          this.trailsbike = trails;
          console.log(trails);

       });
  }

  /*getMoreTrailBike(){
    this.StrailBike.resetTrail();
   this.StrailBike.getMoreTrailBike();

 }*/


  getStationBike()
  {
    this.Sbikestation.resetbikestation();
    this.Sbikestation.getBikeStation()
      .then(bikestations => {

          this.bikestations = bikestations;
          console.log(bikestations);

       });
  this.getTrailBike();

  }


}
