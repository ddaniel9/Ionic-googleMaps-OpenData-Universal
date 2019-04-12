
import {  Ilatlon } from '../models/Ilatlon.model';

export class Trail {

    public _id: number = -1;
    public nameT: string = "";
    public array_track: any = [];
    public timestamp: string = "";

    constructor(obj?: any,objUniv?: any) {
        this.set(obj,objUniv);
    }

    set(obj?: any,objUniv?: any) {
        if (obj) {

              //let IDSTATE: string ="obj.ID_ESTADO";
              //let ciao= eval(IDSTATE);

              let _id = eval("obj." + objUniv._id);
              let nameT = eval("obj." + objUniv.nameT);
              let array_track = eval("obj." + objUniv.array_track);
              array_track= this.convert(array_track);
            //  console.log(array_track);
            this._id = (typeof _id === "number") ? _id : this._id;

            this.nameT = nameT || this.nameT;
            this.array_track = array_track || this.array_track;
        }
    }

    toString()
    {
      // let geoj1son = WKT.parse('LINESTRING (30 10, 10 30, 40 40)');
        let stringa;
        stringa = this.nameT;
        return stringa;
    }

/*
    convertToPointArray(ptArrayString) {
       let points = [];
       let  ptStringArray = ptArrayString.replace(/\)|\(/gi, "").split(",");
       ptStringArray.forEach(function (pt) {
         let splitpt = [];
          splitpt = pt.trim().split(" ");
            let   x = parseFloat(splitpt[0], 10);
            let   y = parseFloat(splitpt[1], 10);

           points[points.length] = [x, y];
       });
     }

*/

/*
function revert(){
  		console.log('hu')
  		//initialize wkt-textarea-input
	  	var input2 = $('#geojson-output').val();
	  	var input_cache = input2.replace('LINESTRING(','');
	  	input_cache = input_cache.replace(')','');
	  	var input_array = input_cache.split(',')
	  	var output_json = {"type":"LineString", "coordinates":[]}
	  	input_array.forEach(function (p,i){
	  		if(i==0)  var p_cache = p;
	  		else var p_cache = p.slice(1,p.length);
	  		var p_array = p_cache.split(' ');
	  		output_json.coordinates.push([Number(p_array[0]), Number(p_array[1])])

	  	})
	  	var json_str = JSON.stringify(output_json, null, 4)
	  	d3.select('#geojson-input').text(json_str);
  	}
*/

convert(arraystring)
{
  //arraystring=arraystring.toString();
  //arraystring=arraystring.replace('(LINESTRING \()','\{\[');
  //arraystring=arraystring.replace('POINT (','{[');
  //arraystring=arraystring.replace('LINESTRING (','{[');

  //arraystring=arraystring.split(" ");
      for(var i = 0;i<arraystring.length;i++) {
                                 //  arraystring=arraystring.replace(',','][');
          arraystring=arraystring.replace(',','');
                                  //arraystring=arraystring.replace(' ',',');
      }
      //arraystring=arraystring.replace(')',']}');
              if(arraystring.search('(POINT )') !== -1)
              {
                arraystring=arraystring.replace('POINT (','');
              }else{
                arraystring=arraystring.replace('LINESTRING (','');
              }
      arraystring=arraystring.replace(')','');
      arraystring=arraystring.split(" ",arraystring.length);
      let array_track = [];
      for(var i = 0;i<arraystring.length;i+=2) {
                               //  arraystring=arraystring.replace(',','][');
              array_track.push(new Ilatlon(arraystring[i],arraystring[i+1]));

                                //arraystring=arraystring.replace(' ',',');
                    }
        //arraystring=arraystring.replace(',','][');
        //arraystring=arraystring.slice(10,-1);
        //console.log(arraystring);
        return array_track;
        
}



}
