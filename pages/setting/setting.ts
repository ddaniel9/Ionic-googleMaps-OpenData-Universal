import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GooglemapsProvider} from '../../providers/googlemaps.provider';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
radius:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public maps: GooglemapsProvider) {
    this.radius=this.maps.getRadiusCircle();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  setRadius(radius){
     this.maps.setRadiusCircle(radius);
     this.radius=radius;
  }

}
