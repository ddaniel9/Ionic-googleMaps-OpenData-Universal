import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import{CITTA} from '../../providers/googlemaps.provider';

import {ResponseHtml} from '../../types';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
  private info:any=[];
  private data:any;
  pagina:any;
  constructor(public navCtrl: NavController, private _http: Http, public navParams: NavParams) {
    this.info=null;
    this.info = this.navParams.data;
    console.log(this.info);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
    //se è una fermata dell'autobus e, se la citta è malaga allora usare questo url + codparada
     if(this.info.stop_name && CITTA.name=='Málaga'){
    this.gethtml(this.info._id);
    this.data=[];
    this.data=this.info.toString();
    //document.getElementById("info").innerHTML= this.info;
    }else{
      this.data=[];
      this.data=this.info.toString();
    //  document.getElementById("info").innerHTML= this.info[0];
    }
  }

  gethtml(_id): Promise<any> {
        return new Promise((resolve) => {
             console.log(_id);
              this._http.get("http://www.emtmalaga.es/emt-mobile/informacionParada.html?codParada=" + _id).toPromise()
                    .then((res: Response) => {

                          //res=res as ResponseHtml;

                        if (res) {

                            this.pagina=res;
                            this.pagina=this.pagina._body;
                            document.getElementById("page").innerHTML=  this.pagina;
                            this.pagina =document.getElementsByClassName("informacion-parada")[0].innerHTML;
                            document.getElementById("page").innerHTML= this.pagina;
                            console.log( this.pagina);
                              resolve( this.pagina);


                        } else {
                            resolve(this.pagina);
                        }
                    })
                    .catch(() => resolve(this.pagina));

        });
    }


}
