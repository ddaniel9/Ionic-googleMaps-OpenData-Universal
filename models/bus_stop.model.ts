


export class Bus_stop {

    public _id: number = -1;
    public stop_name: string = "";
    public lat: number = -1;
    public lon: number = -1;
    public timestamp: string = "";

    constructor(obj?: any,objUniv?: any) {
        this.set(obj,objUniv);
    }

    set(obj?: any,objUniv?: any) {
        if (obj) {



              let _id = eval("obj." + objUniv._id);
              //let id_state = eval(objUniv.id_state);
              let stop_name = eval("obj." + objUniv.stop_name);
              let lat = eval("obj." + objUniv.lat);
              let lon = eval("obj." + objUniv.lon);

            this._id = (typeof _id === "number") ? _id : this._id;
            this.lat = (typeof lat === "number") ? lat : this.lat;
            this.lon = (typeof lon === "number") ? lon : this.lon;
            this.stop_name = stop_name || this.stop_name;
            this.timestamp = obj.timestamp || this.timestamp; //creare il timestamp qui



        }
    }

    toString()
    {
        let htm1:HTMLElement= document.createElement("div");
        let htm2:HTMLElement= document.createElement("div");
      /*  let stringa=[];
        htm1.innerHTML="Stop name: "+ this.stop_name;
        htm2.innerHTML= ", Number stop: "+ this._id;
        stringa.push(htm1);
        stringa.push(htm2);
        return stringa;*/
        let   stringa = [];
          stringa[0] = "Stop name: " + String(this.stop_name);
          stringa[1] = "Number stop:" + String(this._id);
          return stringa;
    }









}
