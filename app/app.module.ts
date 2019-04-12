import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Platform, NavParams} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleMaps,Spherical } from '@ionic-native/google-maps';
import {GooglemapsProvider} from '../providers/googlemaps.provider';
import { Network } from '@ionic-native/network';
import { NativeGeocoder/*, NativeGeocoderReverseResult, NativeGeocoderForwardResult */} from '@ionic-native/native-geocoder';

import { Bus_stopProvider } from '../providers/bus_stop.provider';
import { Bike_stationProvider } from '../providers/bike_station.provider';
import { Trail_bikeProvider } from '../providers/trail_bike.provider';
import { Municipal_parkingProvider } from '../providers/municipal_parking.provider';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';

import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Spherical,
    GooglemapsProvider,
    NativeGeocoder,
    Network,
    ConnectivityProvider,
    Geolocation,
    BackgroundGeolocation,
    Bike_stationProvider,
    Municipal_parkingProvider,
    Trail_bikeProvider,
    Bus_stopProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
