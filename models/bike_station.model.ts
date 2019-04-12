


export class Bike_station {

    public _id = -1;
    public nameStation: string = "";
    public id_state: number = -1;
    public nameState: string = "";
    public address: string = "";
    public nderby: number = -1;
    public nfree: number = 0;
    public noccupied: number = -1;
    public lat: number = -1;
    public lon: number = -1;
    public timestamp: string = "";

    constructor(obj?: any,objUniv?: any) {
        this.set(obj,objUniv);
    }

    set(obj?: any,objUniv?: any) {
        if (obj) {

              //let IDSTATE: string ="obj.ID_ESTADO";
              //let ciao= eval(IDSTATE);
              let id_state = eval("obj." + objUniv.id_state);

              let _id = eval("obj." + objUniv._id);
              //let id_state = eval(objUniv.id_state);
              let nderby = eval("obj." + objUniv.nderby);
              let nfree = eval("obj." + objUniv.nfree);
              let noccupied = eval("obj." + objUniv.noccupied);
              let lat = eval("obj." + objUniv.lat);
              let lon = eval("obj." + objUniv.lon);
              let nameStation = eval("obj." + objUniv.nameStation);
              let nameState = eval("obj." + objUniv.nameState);
              let address = eval("obj." + objUniv.address);

            this._id = _id || this._id;
            this.id_state = (typeof id_state === "number") ? id_state : this.id_state;
            this.nderby = (typeof nderby === "number") ? nderby : this.nderby;
            this.nfree = (typeof nfree === "number") ? nfree : this.nfree;
            this.noccupied = (typeof noccupied === "number") ? noccupied : this.noccupied;
            this.lat = (typeof lat === "number") ? lat : this.lat;
            this.lon = (typeof lon === "number") ? lon : this.lon;
            this.nameStation = nameStation || this.nameStation;
            this.nameState = nameState || this.nameState;
            this.address = address || this.address;
            this.timestamp = obj.timestamp || this.timestamp; //creare il timestamp qui



        }
    }

    toString()
    {

      //  let stringa;
    //    stringa = "Name: " + this.nameStation + ", Bicycles available: " + this.nfree;
      let   stringa = [];
        stringa[0] = "Name: " + String(this.nameStation);
        stringa[1] = "Bicycles available: " + String(this.nfree);
        stringa[2] = "Address: " + String(this.address);
        stringa[3] = "Bicycles tot: " + String(this.nderby);
        return stringa;
    }








}
