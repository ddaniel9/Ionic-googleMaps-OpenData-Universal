


export class Municipal_parking {

    public _id: number = -1;
    public nameMp: string = "";
    public address: string = "";
    public capacity: number = -1;
    public disable_capacity: string = "";
    public date_last_update: string = "";
    public nfree: any = 0;
    public altitude: number = -1;
    public lat: string = "";
    public lon: string = "";
    public nfree_disable: string = "";
    public timestamp: string = "";

    constructor(obj?: any,objUniv?: any) {
        this.set(obj,objUniv);
    }

    set(obj?: any,objUniv?: any) {
        if (obj) {

              //let IDSTATE: string ="obj.ID_ESTADO";
              //let ciao= eval(IDSTATE);
              let _id = eval("obj." + objUniv._id);

            //  let _id = eval(objUniv._id);
              let nameMp = eval("obj." +objUniv.nameMp);
              let capacity = eval("obj." +objUniv.capacity);
              let nfree = eval("obj." +objUniv.nfree);
              let altitude = eval("obj." +objUniv.altitude);
              let lat = eval("obj." +objUniv.lat);
              let lon = eval("obj." +objUniv.lon);
              let nfree_disable = eval("obj." +objUniv.nfree_disable);
              let disable_capacity = eval("obj." +objUniv.disable_capacity);
              let address = eval("obj." +objUniv.address);
              let date_last_update = eval("obj." +objUniv.date_last_update);

            this._id = (typeof _id === "number") ? _id : this._id;
            this.capacity = (typeof capacity === "number") ? capacity : this.capacity;
            this.nfree =  nfree || this.nfree;
            this.altitude = (typeof altitude === "number") ? altitude : this.altitude;
            //this.lat = (typeof lat === "number") ? lat : this.lat;
            //this.lon = (typeof lon === "number") ? lon : this.lon;
            this.lat = lat || this.lat;
            this.lon = lon || this.lon;
            this.nameMp = nameMp || this.nameMp;
            this.nfree_disable = nfree_disable || this.nfree_disable;
            this.address = address || this.address;
            this.date_last_update = date_last_update || this.date_last_update;
            this.disable_capacity = disable_capacity || this.disable_capacity;
            this.timestamp = obj.timestamp || this.timestamp; //creare il timestamp qui



        }
    }

    toString()
    {

      let   stringa = [];
        stringa[0] = "Name: " + String(this.nameMp);
        stringa[1] = "Free seats: " + String( this.nfree);
        stringa[2] = "Address: " + String( this.address);
        stringa[3] = "Capacity: " + String( this.capacity);
        return stringa;
    }









}
